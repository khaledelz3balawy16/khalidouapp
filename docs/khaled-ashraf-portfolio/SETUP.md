# Setup

Start from the sanitized original README when available. The entries below are extracted from this specific source snapshot.

## Environment

Supply your own development or sandbox service configuration. Environment templates contain placeholder values. Runtime credentials and production data are excluded.

- `backend/.env.example`
- `backend/.env.root.example`
- `frontend/admin-dashboard/.env.example`
- `frontend/archive/admin-dashboard-basic/.env.example`
- `frontend/desktop-agent/.env.example`

## JavaScript / TypeScript

### `backend`

Package manager metadata: `not specified`.

| Existing script | Command in manifest |
| --- | --- |
| `npm run dev` | `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/dev-backend.ps1` |
| `npm run test` | `.\.venv\Scripts\python.exe -m pytest` |

### `e2e`

Package manager metadata: `not specified`.

### `frontend/admin-dashboard`

Package manager metadata: `not specified`.

| Existing script | Command in manifest |
| --- | --- |
| `npm run dev` | `vite dev` |
| `npm run build` | `vite build` |
| `npm run start` | `node .output/server/index.mjs` |
| `npm run lint` | `eslint src` |

### `frontend/archive/admin-dashboard-basic`

Package manager metadata: `not specified`.

| Existing script | Command in manifest |
| --- | --- |
| `npm run dev` | `vite` |
| `npm run build` | `tsc -b && vite build` |
| `npm run lint` | `oxlint` |

### `frontend/desktop-agent`

Package manager metadata: `not specified`.

| Existing script | Command in manifest |
| --- | --- |
| `npm run dev` | `concurrently -k "vite --host 127.0.0.1" "wait-on http://127.0.0.1:5173 && cross-env VITE_DEV_SERVER_URL=http://127.0.0.1:5173 electron ."` |
| `npm run build` | `tsc -b && vite build && tsc -p tsconfig.electron.json` |
| `npm run lint` | `oxlint src electron` |
| `npm run test` | `node --test tests/*.test.ts` |

### `frontend`

Package manager metadata: `not specified`.

| Existing script | Command in manifest |
| --- | --- |
| `npm run dev` | `npm run dev:admin` |
| `npm run build` | `npm --prefix admin-dashboard run build && npm --prefix desktop-agent run build` |
| `npm run lint` | `npm --prefix admin-dashboard run lint && npm --prefix desktop-agent run lint` |


## Python requirement files

- `backend/requirements-test.txt`
- `backend/requirements.txt`

## External integrations

Consult the source configuration for databases, identity providers, email, storage, payments, and other APIs. Select local or sandbox targets before running startup hooks, migrations, seeds, or integration tests. No external-service credentials are provided in this copy.
