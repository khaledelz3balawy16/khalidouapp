import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyRefreshOwnership,
  refreshTokenStillCurrent,
  tokensRotatedByAnotherTab,
} from "./auth-refresh-coordination.ts";

const A = { accessToken: "CHANGE_ME", refreshToken: "CHANGE_ME" };
const A_ROTATED = { accessToken: "CHANGE_ME", refreshToken: "CHANGE_ME" };
const B = { accessToken: "CHANGE_ME", refreshToken: "CHANGE_ME" };

// The generation counter only guards work inside one tab. Across tabs the
// shared storage is the source of truth: a refresh launched for token T only
// still owns a store if that store still holds T. Both W6 cross-tab defects are
// closed by consulting this before writing a refreshed pair or clearing a login.

test("a refresh still owns its store when the store still holds its token", () => {
  assert.equal(
    refreshTokenStillCurrent(
      { accessToken: "CHANGE_ME", refreshToken: "CHANGE_ME" },
      "CHANGE_ME",
    ),
    true,
  );
});

test("a refresh no longer owns its store once a newer login replaced the token", () => {
  // Account switch B (or another tab's rotation) wrote a different pair. A late
  // A-success must not overwrite it, and a late A-401 must not clear it (W6).
  assert.equal(
    refreshTokenStillCurrent(
      { accessToken: "CHANGE_ME", refreshToken: "CHANGE_ME" },
      "CHANGE_ME",
    ),
    false,
  );
});

test("a refresh does not own a store that was already cleared", () => {
  // A logout emptied the store; a late result must never resurrect it (W6).
  assert.equal(refreshTokenStillCurrent(null, "CHANGE_ME"), false);
});

test("supersession and ownership are consistent complements", () => {
  // When the store holds a different token, tokensRotatedByAnotherTab surfaces
  // the newer pair (used on the success path) and ownership is false (used on
  // the clear path) — the two guards agree on who owns the store.
  const newer = { accessToken: "CHANGE_ME", refreshToken: "CHANGE_ME" };
  assert.notEqual(tokensRotatedByAnotherTab(newer, "CHANGE_ME"), null);
  assert.equal(refreshTokenStillCurrent(newer, "CHANGE_ME"), false);

  const same = { accessToken: "CHANGE_ME", refreshToken: "CHANGE_ME" };
  assert.equal(tokensRotatedByAnotherTab(same, "CHANGE_ME"), null);
  assert.equal(refreshTokenStillCurrent(same, "CHANGE_ME"), true);
});

// classifyRefreshOwnership is the single decision every refresh continuation
// branches on. Opaque tokens can't reveal identity, so a real signal (the
// signed-in user id) distinguishes same-account rotation from replacement.

test("an CHANGE_ME token in the store is classified current", () => {
  assert.equal(
    classifyRefreshOwnership({
      stored: A,
      attemptedRefreshToken: A.refreshToken,
      storedIdentity: "user:a",
      attemptedIdentity: "user:a",
    }),
    "current",
  );
});

test("a different token for the same account is a rotation, not a replacement", () => {
  // Another tab won the refresh race for the same user — safe to adopt/retry.
  assert.equal(
    classifyRefreshOwnership({
      stored: A_ROTATED,
      attemptedRefreshToken: A.refreshToken,
      storedIdentity: "user:a",
      attemptedIdentity: "user:a",
    }),
    "rotated",
  );
});

test("a different account owning the store is a replacement", () => {
  // B logged in while A's refresh was pending. A's operation must not run as B.
  assert.equal(
    classifyRefreshOwnership({
      stored: B,
      attemptedRefreshToken: A.refreshToken,
      storedIdentity: "user:b",
      attemptedIdentity: "user:a",
    }),
    "replaced",
  );
});

test("a different token with unknown identity is treated as replacement (safe default)", () => {
  // Cannot prove same account → never hand the pending operation another pair.
  assert.equal(
    classifyRefreshOwnership({
      stored: B,
      attemptedRefreshToken: A.refreshToken,
      storedIdentity: null,
      attemptedIdentity: "user:a",
    }),
    "replaced",
  );
});

test("an emptied store (logout) is classified cleared, never resurrected", () => {
  assert.equal(
    classifyRefreshOwnership({
      stored: null,
      attemptedRefreshToken: A.refreshToken,
      storedIdentity: null,
      attemptedIdentity: "user:a",
    }),
    "cleared",
  );
});
