# Testing and validation

## Preparation checks completed

- Captured source at the recorded commit.
- Checked archive paths, symlinks, and file inclusion rules.
- Replaced detected credential literals, connection strings, and contact addresses with placeholders.
- Removed data exports, runtime environments, private keys, generated output, and internal assistant artifacts.
- Re-scanned the prepared text for the supported sensitive-value patterns.
- Parsed generated JSON documents and package manifests.

## Application validation

Dependencies were not installed. Application tests, servers, migrations, seeders, and database or external-service requests were not run. Runtime correctness after configuration and data removal remains to be verified by the project maintainer.

## Existing test sources

- `backend/tests/conftest.py`
- `backend/tests/test_agent_versions.py`
- `backend/tests/test_appearance_sync.py`
- `backend/tests/test_application_history.py`
- `backend/tests/test_config_security.py`
- `backend/tests/test_daily_attendance.py`
- `backend/tests/test_database_session.py`
- `backend/tests/test_development_environment.py`
- `backend/tests/test_device_location.py`
- `backend/tests/test_device_token_registry_repair.py`
- `backend/tests/test_diagnostics_audit.py`
- `backend/tests/test_downloads.py`
- `backend/tests/test_email.py`
- `backend/tests/test_employee_archive.py`
- `backend/tests/test_employee_onboarding_rules.py`
- `backend/tests/test_employee_onboarding_status.py`
- `backend/tests/test_employee_portal.py`
- `backend/tests/test_employee_screenshot_delete.py`
- `backend/tests/test_false_overtime_safeguard.py`
- `backend/tests/test_flexible_schedule.py`
- `backend/tests/test_health.py`
- `backend/tests/test_hr_payroll_access.py`
- `backend/tests/test_identity_workflows.py`
- `backend/tests/test_input_integrity.py`
- `backend/tests/test_leave_balance_edit.py`
- `backend/tests/test_meeting_mode.py`
- `backend/tests/test_meeting_mode_api_flow.py`
- `backend/tests/test_metadata.py`
- `backend/tests/test_midnight_rollover_repair.py`
- `backend/tests/test_offline_midnight_recovery.py`
- `backend/tests/test_payroll_encryption.py`
- `backend/tests/test_payroll_rules.py`
- `backend/tests/test_payroll_run_locking.py`
- `backend/tests/test_payroll_stale_batch.py`
- `backend/tests/test_people_schemas.py`
- `backend/tests/test_phase1_financial_policy.py`
- `backend/tests/test_prayer_breaks.py`
- `backend/tests/test_quality_gate.py`
- `backend/tests/test_reset_production_data.py`
- `backend/tests/test_restore_salary_key.py`
- `backend/tests/test_screenshot_api_security.py`
- `backend/tests/test_screenshot_capture_policy.py`
- `backend/tests/test_screenshot_retention.py`
- `backend/tests/test_screenshot_storage.py`
- `backend/tests/test_security.py`
- `backend/tests/test_session_tracking.py`
- `backend/tests/test_shift_reschedule.py`
- `backend/tests/test_sustained_work_start.py`
- `backend/tests/test_team_authorization.py`
- `backend/tests/test_time_http_flow.py`
- `backend/tests/test_time_state_machine.py`
- `backend/tests/test_tracking_settings.py`
- `backend/tests/test_web_bug_fixes.py`
- `e2e/chaos/duplicate-delivery.spec.ts`
- `e2e/chaos/time-network.spec.ts`
- `e2e/desktop/edge-cases.spec.ts`
- `e2e/desktop/smoke.spec.ts`
- `e2e/journey/workday.spec.ts`
- `e2e/web/admin-flows.spec.ts`
- `e2e/web/auth.spec.ts`
- `e2e/web/permissions.spec.ts`
- `frontend/admin-dashboard/src/components/employee-workspace/adapters.test.ts`
- `frontend/admin-dashboard/src/components/employee-workspace/quote-reminders.test.ts`
- `frontend/admin-dashboard/src/components/ui/aspect-ratio.tsx`
- `frontend/admin-dashboard/src/lib/async-load-state.test.ts`
- `frontend/admin-dashboard/src/lib/attendance-presentation.test.ts`
- `frontend/admin-dashboard/src/lib/attendance-query-policy.test.ts`
- `frontend/admin-dashboard/src/lib/auth-lifecycle.test.ts`
- `frontend/admin-dashboard/src/lib/auth-refresh-coordination.test.ts`
- `frontend/admin-dashboard/src/lib/auth-restore-policy.test.ts`
- `frontend/admin-dashboard/src/lib/break-rules.test.ts`
- `frontend/admin-dashboard/src/lib/device-presence.test.ts`
- `frontend/admin-dashboard/src/lib/format.test.ts`
- `frontend/admin-dashboard/src/lib/member-activity-status.test.ts`
- `frontend/admin-dashboard/src/lib/monitoring-day.test.ts`
- `frontend/admin-dashboard/src/lib/monitoring-query-policy.test.ts`
- `frontend/admin-dashboard/src/lib/security-boundaries.test.ts`
- `frontend/admin-dashboard/src/lib/timesheet-pagination.test.ts`
- `frontend/desktop-agent/tests/authQueueRetention.test.ts`
- `frontend/desktop-agent/tests/breakSchedule.test.ts`
