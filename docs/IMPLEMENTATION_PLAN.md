# AttendSense Phase 1 Implementation Plan

## 1. Implementation Overview

Build AttendSense as one mobile-first Next.js PWA with a small trusted server layer, PostgreSQL persistence, replaceable document-extraction adapters, and a pure deterministic TypeScript domain layer. The finalized PRD is authoritative; this document explains how to build it without changing product scope.

Attendance, timetable, and Academic Calendar are independently confirmed inputs. Candidate replacements remain isolated until validation, extraction/structuring, automatic validation, review/edit, confirmation, and atomic save complete. Calculators consume active confirmed structured data only and never update it.

## 2. Final Technology Stack

| Area | Choice | Reason / trade-off |
|---|---|---|
| Application | Next.js App Router, React, TypeScript | PRD-approved full-stack typed application. |
| Styling | Tailwind CSS | PRD-approved responsive styling without an extra component-library dependency. |
| Auth | Auth.js, Google provider, Prisma adapter, database sessions | Implements approved Google authentication with server-revocable sessions; adds session-table reads. |
| Database | PostgreSQL on Neon, Prisma ORM | Managed serverless PostgreSQL for a solo developer; adds a hosting vendor. |
| Temporary file storage | Private Vercel Blob | Fits Vercel and private direct uploads; files are deleted after terminal processing. |
| PDF extraction | pdfjs-dist server adapter | Direct text/structure extraction before OCR. |
| Image OCR | Google Cloud Vision behind an adapter | Practical initial OCR; needs privacy/cost controls and remains replaceable. |
| Validation/forms | Zod; React Hook Form only for editable review forms | Strong shared schemas with limited form boilerplate. |
| Tests | Vitest, Testing Library, Playwright | Unit, component, and critical-browser coverage. |
| Delivery | Vercel, Git, GitHub | PRD-approved deployment and version control. |

No separate backend, microservices, event bus, Kubernetes, or global client-state library is planned. Exact package versions and provider configuration belong in implementation setup.

## 3. System Architecture

~~~mermaid
flowchart LR
  Browser[Browser / installed PWA] --> Next[Next.js App Router]
  Next --> Auth[Auth.js + Google]
  Next --> Server[Route Handlers / Server Actions]
  Server --> Validate[Zod + trusted validation]
  Server --> Extract[Extraction adapters]
  Extract --> Blob[Private temporary Blob storage]
  Server --> Prisma[Prisma ORM]
  Prisma --> DB[(PostgreSQL)]
  Server --> Domain[Pure TypeScript domain engine]
~~~

Browser code owns presentation and temporary interaction state. Route Handlers own uploads, callbacks, share target, and calculation requests. Server Actions own authenticated internal form mutations. Domain modules own normalization, matching, schedule generation, and calculations; they import neither React, Prisma, nor extraction packages.

## 4. Repository and Project Structure

Planned structure, not created by this task:

    app/
      (public)/page.tsx
      (app)/dashboard/page.tsx
      (app)/attendance/[candidateId]/review/page.tsx
      (app)/timetable/[candidateId]/review/page.tsx
      (app)/calendar/[candidateId]/review/page.tsx
      (app)/safe-bunk/page.tsx
      (app)/recovery/page.tsx
      (app)/simulator/page.tsx
      api/auth/[...nextauth]/route.ts
      api/uploads/route.ts
      api/uploads/callback/route.ts
      api/share-target/route.ts
      manifest.ts
    components/{ui,attendance,timetable,calendar,analysis}/
    lib/{auth,db,storage,extraction,validation,domain,server}/
    lib/domain/{attendance,matching,schedule,calculators}/
    prisma/schema.prisma
    types/
    tests/{unit,integration,fixtures,e2e}/
    public/{icons,offline.html}

## 5. Database Architecture and Prisma Data Model

Use UUID primary keys, created/updated timestamps, user ownership on every student-data model, and explicit lifecycle fields. Database enums:

- InputKind: ATTENDANCE, TIMETABLE, ACADEMIC_CALENDAR.
- CandidateStatus: UPLOADED, VALIDATING, EXTRACTING, REVIEW_READY, CONFIRMING, CONFIRMED, FAILED, REJECTED.
- ConfirmedInputStatus: ACTIVE, REPLACED, INVALID.
- SourceKind: ATTENDANCE_PDF, ATTENDANCE_IMAGE, TIMETABLE_IMAGE, ACADEMIC_CALENDAR_PDF.
- Modality: THEORY, PRACTICAL, UNKNOWN.
- ReviewState: CLEAR, REQUIRES_REVIEW, UNMAPPED, INVALID.
- CalculationEligibility: ELIGIBLE, INELIGIBLE, REVIEW_REQUIRED.
- CalendarState: TEACHING, TEACHING_CONTINUES, NON_TEACHING, UNKNOWN.
- MappingState: MATCHED_BY_CODE, CONFIRMED_MANUAL, UNMATCHED, AMBIGUOUS.

### Auth.js models

Use User, Account, and Session models for the selected database-session strategy. User has id, name/email/image where supplied by Google, createdAt, updatedAt, and relations to owned data. Account has userId, provider, providerAccountId, token fields required by Auth.js, and a unique provider/providerAccountId pair. Session has sessionToken unique, userId, expires, and an index on userId. VerificationToken is not required for Google-only OAuth/database sessions; add it only if a later approved Auth.js provider requires it.

### Academic and confirmed-input models

AcademicConfiguration has userId unique, approved academic-context fields, and timestamps. It does not reference a selected timetable or calendar.

AttendanceDataset has id, userId, status, isActive, confirmedAt, replacedAt nullable, sourceCandidateId unique nullable, and timestamps. Index userId/isActive and userId/status. AttendanceCourseRecord belongs to a dataset and has normalizedCourseCode nullable, sourceCourseCode nullable, courseLabel nullable, modality, conducted, present, absent, calculatedPercentage nullable, calculationEligibility, reviewState, mappingState, and source row metadata JSON. Add a unique datasetId/normalizedCourseCode index where normalizedCourseCode is not null; preserve code-less records without forcing a false identity.

Timetable has id, userId, status, isActive, confirmedAt, replacedAt nullable, sourceCandidateId unique nullable, and timestamps. TimetableSession belongs to a timetable and has weekday/date applicability, start/end local time, normalizedCourseCode nullable, label nullable, modality, batch rule JSON, continuousEventKey nullable, mappingState, reviewState, and source row metadata JSON. Index timetableId/weekday and timetableId/normalizedCourseCode.

AcademicCalendar has id, userId, status, isActive, confirmedAt, replacedAt nullable, sourceCandidateId unique nullable, and timestamps. CalendarEvent belongs to a calendar and has startDate/endDate, calendarState, scope metadata JSON, source text, reviewState, and timestamps. Index calendarId/startDate/endDate.

### Candidate and mapping models

ProcessingCandidate has id, userId, inputKind, sourceKind, status, privateBlobKeys JSON, file metadata JSON, extractionVersion, draftPayload JSON, warnings JSON, sanitizedErrorCode nullable, reviewEditedAt nullable, and timestamps. It is the only persisted home for unconfirmed extraction data.

CourseMapping has id, userId, timetableSessionId, attendanceDatasetId, attendanceCourseRecordId nullable, normalizedCourseCode, mappingState, confirmedAt nullable, and timestamps. A unique userId/timetableSessionId mapping prevents conflicting active manual resolutions.

Every user-owned table indexes userId. Relation deletes use restrictive or cascade behavior chosen so deleting a candidate never deletes active confirmed inputs.

### Active-input and replacement invariant

PostgreSQL partial unique indexes enforce at most one active attendance dataset, timetable, and calendar per user. Prisma migrations create these indexes with SQL because Prisma schema cannot express every partial index directly.

Confirmation uses a short interactive Prisma transaction: lock/read the candidate and existing active row, confirm ownership/status, rerun validation, write final child records, set prior active input isActive false/status REPLACED, set replacement isActive true/status ACTIVE, and mark candidate CONFIRMED. The transaction is the sole activation path. Any validation, write, or commit failure rolls back, leaving the prior active confirmed data unchanged. Calculator and Simulator outputs have no confirmed-data model and must never be written as attendance records.

## 6. Authentication and Authorization

Use Auth.js database-backed sessions with the Google provider and Prisma adapter. The Account provider/google providerAccountId pair maps the stable Google identity to exactly one User. A returning Google user resolves through that Account to the same User and existing confirmed data.

Auth.js stores a random session token in the Session table and an HTTP-only secure cookie in the browser. Server pages, Server Actions, Route Handlers, and every protected database query obtain the authenticated user ID from the Auth.js server session. Logout deletes or invalidates the current Session row and clears the cookie; expiration or a missing/invalid session requires Google reauthentication. PWA reinstall creates no account and restores access only after the normal session check/sign-in flow.

Every data query filters by authenticated user ID. URL parameters and client user IDs are never authority. Return safe 401/403/404 responses without revealing another student's data. Use middleware only for broad route gating; retain authorization in each trusted operation.

## 7. File Upload and Temporary Storage Architecture

Create a user-owned processing candidate before issuing a private Vercel Blob upload token. Blob paths use opaque candidate IDs, not personally identifiable values. Callback processing verifies storage signature and candidate ownership.

Validate allowed source kind, declared MIME type, file signature or parser readability, configured size limits, image count, dimensions, corruption, and duplicate content hash. Limits are configurable implementation constants set after testing. Never execute uploads.

Retain private blob keys only while a candidate needs processing/review. Delete source files after successful confirmation or terminal failure/rejection once no longer needed. Use synchronous terminal-state cleanup first; add a small manually run maintenance cleanup script only if deletion fails.

## 8. Document Extraction Architecture

All provider code remains behind replaceable adapters. An adapter receives a validated source and extraction context, returns structured candidate data plus warnings/evidence/review requirements, and never calculates attendance, activates confirmed data, or silently resolves ambiguous mappings.

    type DocumentSource = {
      candidateId: string; userId: string; inputKind: InputKind;
      sourceKind: SourceKind; blobKey: string; sha256: string;
      mimeType: string; byteSize: number;
    };
    type ExtractionContext = {
      timezone: 'Asia/Kolkata'; extractionVersion: string;
      source: DocumentSource;
    };
    type ExtractionEvidence = {
      sourcePage?: number; sourceImageIndex?: number;
      sourceText?: string; confidence?: number;
    };
    type ExtractionWarning = {
      code: string; message: string; evidence?: ExtractionEvidence[];
    };
    type ReviewRequirement = {
      fieldPath: string; reason: string; blocking: boolean;
    };
    type ExtractionError = {
      code: string; safeMessage: string; retryable: boolean;
    };
    type ExtractionResult<T> = {
      candidate: T; warnings: ExtractionWarning[];
      reviewRequirements: ReviewRequirement[];
      evidence: ExtractionEvidence[]; errors: ExtractionError[];
    };
    interface ExtractionAdapter<T> {
      extract(context: ExtractionContext): Promise<ExtractionResult<T>>;
    }

AttendanceCandidate contains course-record candidates, supporting overall fields, duplicate/conflict groups, and raw mapping state. TimetableCandidate contains session candidates, continuous-event candidates, and batch/mapping review state. AcademicCalendarCandidate contains calendar-event candidates, source wording, scope metadata, and calendar-state review state. Candidate types are normalized enough for review, but are not confirmed persistence models.

### Attendance PDF

Use direct pdfjs-dist text/structure extraction first where machine-readable content is reliable. Locate course-wise rows by content and pattern, not fixed page number. If direct extraction is insufficient, use the OCR/document-vision adapter on rendered relevant pages. Parse code, label, conducted, present, absent, reported percentage, and supporting fields. Escalate incomplete or unreliable records to review.

### Attendance images and multiple images

Run each image through the OCR/document-vision adapter, normalize rows, then merge one submission. Use normalized course code plus counts/label evidence to eliminate clear duplicates; mark materially conflicting duplicates for review.

### Timetable screenshot/image

Accept image or screenshot input only and reject timetable PDFs. Use OCR/document vision plus a timetable row/column reconstruction adapter. Extract sessions, times, code/label, T/P, batch markers, and continuous-event candidates. Unclear sessions are review-required.

### Academic Calendar PDF

Accept the official SPCE Academic Calendar as PDF input only and reject calendar images/screenshots. Use direct PDF text/structure where available; if the official PDF is scanned or image-based, use OCR/document vision as a fallback while retaining PDF-only input. Parse date/range and state wording into candidate events. Preserve source wording/scope metadata for review. Unknown never means silent suppression.

The finalized PRD records core feasibility as validated on tested samples/scenarios. Production implementation must preserve those validated behaviors through regression fixtures. No extractor is assumed perfect or production-ready.

## 9. Normalization and Validation Layer

Canonical course record fields: normalized code nullable, source code, label, modality of THEORY/PRACTICAL/UNKNOWN, conducted, present, absent, calculated percentage nullable, calculation eligibility, and review state of CLEAR/REQUIRES_REVIEW/UNMAPPED/INVALID.

Normalize codes by trim, uppercase, and removal of display separators only; preserve source text separately. A valid structured code takes priority over label similarity. Never merge separate T/P codes.

Validate non-negative integer counts, present + absent equals conducted, present/absent no greater than conducted, no division by zero, percentage bounds, time ordering, allowed calendar states, candidate ownership, and duplicate conflicts. Conducted-zero, code-less, unmatched, unknown batch, unknown calendar, and conflicts remain review/non-eligible. Supporting overall/No Attendance values are separate and never replace course records.

## 10. Review, Edit, and Confirm Architecture

Extraction creates ProcessingCandidate draft data and does not alter active data. Review pages load only the owner's candidate, show warnings and evidence, and save edits through shared Zod schemas.

Every edit revalidates candidate data. Confirmation is blocked on validation errors; review-required sessions only become eligible after explicit confirmed mapping. The confirmation action invokes the transaction in Section 5. Rejection marks terminal state and triggers temporary-file cleanup. Failed candidate processing cannot deactivate the current confirmed input.

## 11. Course and Session Matching Engine

Deterministic priority:

1. Exact normalized confirmed course-code match.
2. Confirmed user mapping for a review-required timetable session.
3. UNMATCHED or AMBIGUOUS result.

Fuzzy labels are display/review assistance only, never calculation-critical matching. Keep Theory/Practical codes separate. Batch mismatch excludes a session; unknown batch requires review. Timetable periods with the same confirmed continuous-event key produce one occurrence.

## 12. Academic Schedule Generation Engine

Expand a weekly confirmed timetable over a bounded date range. Apply calendar event scope/state:

- Teaching and Teaching Continues allow applicable sessions.
- Confirmed Non-Teaching, holiday, or applicable vacation suppresses sessions.
- Unknown/ambiguous retains a review/conservative state and never silently suppresses.

Then apply exact course mapping and batch rules. Safe Bunk generates only the local current date and requires current_time < class_start_time. Recovery and Simulator use bounded confirmed coverage. Use one Asia/Kolkata time utility with an injected clock for tests.

## 13. Deterministic Calculation Engine

Pure TypeScript functions:

    calculateCourseAttendance(record) -> confirmed course result
    classifyThreshold(percentage) -> AT_OR_ABOVE | BELOW | REVIEW
    calculateSafeBunk(records, selectedOccurrences) -> course-aware safe result
    calculateRecovery(record) -> required sessions
    simulateAttendance(records, decisions) -> course-aware simulation result
    formatPercentage(value) -> display text

Use unrounded numbers for all logic and a named threshold of 0.75. Safe Bunk adds absence only for selected skips. Recovery uses max(0, ceil((0.75 * conducted - present) / 0.25)).

Simulator alone defaults future displayed occurrences to ATTEND and handles ATTEND/BUNK/MISS. No domain function accesses database, UI, OCR, files, or external APIs.

## 14. Safe Bunk Implementation

Load active confirmed inputs, generate only today's remaining applicable sessions, and render selectable cards. Local state is selected occurrence IDs. There is no Safe Bunk ATTEND state; unselected sessions have zero projected effect.

Recalculate locally for immediate feedback, then have the final calculation route rebuild occurrences and revalidate active input versions, ownership, time, mapping, batch, and calendar applicability. Present selected sessions and affected course results; overall attendance is supporting context only.

## 15. Attendance Recovery Implementation

Choose one below-threshold confirmed course, calculate required attended sessions, and map chronologically to matching future occurrences within confirmed coverage. If coverage is insufficient, return the mathematical count plus an unavailable-path/date state. Recovery projections remain temporary and never write attendance.

## 16. Future Attendance Simulator Implementation

The student chooses a bounded future range inside confirmed coverage. Generated occurrences begin as ATTEND in local state and may switch to BUNK/MISS. Recalculate independently by course, revalidate submitted scenarios server-side, and never persist scenario output as confirmed attendance.

## 17. API, Server Action, and Route Handler Design

| Interface | Purpose | Key validation/output |
|---|---|---|
| POST /api/uploads | Issue authenticated private upload token | Kind, metadata, limits; candidate ID and token. |
| POST /api/uploads/callback | Receive Blob callback | Signature, candidate ownership; start extraction. |
| saveCandidateDraft action | Save review edits | Ownership/Zod; validation states. |
| confirmCandidate action | Activate candidate | Revalidation/transaction; new active input. |
| rejectCandidate action | Discard candidate | Terminal state and cleanup. |
| POST /api/calculations/safe-bunk | Final Safe Bunk result | Rebuilt session applicability and selected IDs. |
| POST /api/calculations/recovery | Recovery count/path | Course eligibility and coverage. |
| POST /api/calculations/simulator | Hypothetical result | Date range and decisions. |
| POST /api/share-target | Attendance-only handoff | Auth/normal candidate workflow. |

Use Server Actions for internal form mutations; Route Handlers for uploads, callbacks, share target, and calculation requests. Return stable safe error codes.

## 18. Frontend Screen and Component Architecture

Use Server Components for initial authenticated data and Client Components only for uploads, review edits, selections, and interactive calculations.

- Auth/welcome: Google sign-in/session restoration.
- Setup: academic context plus confirmed timetable/calendar status.
- Shared candidate UI: upload, processing state, review table, validation summary, confirmation.
- Dashboard: Today's Decision Center, course statuses, setup/update links, supporting overall context.
- Safe Bunk: remaining-today cards and explicit selection.
- Recovery: course picker, required sessions, mapped path.
- Simulator: date range and ATTEND/BUNK/MISS controls.
- Settings: academic context and independently confirmed-input replacement.

Every view implements loading, empty, review-required, validation-error, save-error, network-error, and success states. Meaning cannot rely on color alone.

## 19. State Management Strategy

Database state: account, active inputs, candidates, mappings, authorization. Local state: selected Safe Bunk occurrences, Simulator decisions, modals, unsaved form input. URL state: selected course and simulator date range where navigation/restoration helps.

Use React state, Server Components, Server Actions, and form state first. Do not add Redux or Zustand. Validated candidate drafts persist server-side after edits so refreshes do not lose review work.

## 20. PWA Implementation

Implement app/manifest.ts, icons in public, standalone display, and install guidance. Use a minimal service worker for installability/static shell only; Phase 1 does not promise offline data access. Network-failure screens require retry online.

Implement attendance-only share target after standard upload works. Register supported file types conditionally, pass shared files into the same candidate workflow, and offer ordinary in-app upload fallback. Test actual browser/platform support; do not claim universal availability.

## 21. Security and Privacy Implementation

Use HTTPS, Auth.js session/CSRF protections, Zod, React output escaping, Prisma parameterization, private blobs, authorization checks, rate limits on auth/upload/extraction/calculation routes, least-privilege external extraction credentials, and safe errors.

Keep secrets in environment variables. Log correlation IDs, source kind, sanitized error codes, and timings—not tokens, raw files, full extracted records, or credentials. Review external OCR privacy terms before production use.

## 22. Error Handling and Observability

Define typed errors for authentication, upload, extraction, normalization, validation, review, save, matching, schedule, calculation, network, and external service failures. Each carries a stable code, retryability, safe message, and correlation ID.

Use minimized structured server logs and candidate processing status. Give students correction/retry paths for recoverable errors. Start with Vercel logs and database status; add an external monitoring service only after privacy review.

## 23. Testing Strategy

- Unit: C/P/A, threshold, Safe Bunk selected/no-effect and aggregation, Recovery boundaries/coverage, Simulator states, rounding, conducted zero.
- Validation: codes, T/P, duplicates/conflicts, ambiguous mappings, batch/calendar states.
- Extraction fixtures: approved representative PDFs/images/screenshots/calendar samples and adapter contracts.
- Matching/schedule: code priority, mapping, batch, Teaching/Continues/Non-Teaching/unknown, strict start-time equality, continuous events.
- Database/integration: ownership, candidate edits, atomic replacement, failed/rejected/save-failure preservation.
- Components/E2E: review errors, accessible states, Google test account, setup, calculators, replacements, upload fallback.
- PWA/responsive/security: manifest/install, online failure, mobile widths, authorization, upload validation, safe errors/rate limits.

Promote tested feasibility scenarios to versioned regression fixtures without changing technical-evaluation artifacts.

## 24. Development Environment

Use current Node.js LTS, pnpm, local Docker PostgreSQL, Prisma migrations, and environment files outside source control. Variables include Auth.js secret, Google credentials, pooled/direct database URLs, Blob token, OCR credentials, and application URL.

Use distinct local, test, preview, and production values. Tests use disposable PostgreSQL and mocked extraction adapters. Never commit secrets or real student documents.

## 25. Deployment Architecture

Deploy Next.js to Vercel, PostgreSQL to Neon, and temporary documents to private Vercel Blob. Use preview deployments for branches and production-only environment values. Application traffic uses pooled Postgres connections; Prisma migration deployment uses the direct connection.

Require HTTPS/domain configuration. Roll back application code with Vercel. Make destructive schema changes through expand/migrate/contract releases with backup before production migration.

## 26. CI/CD and Git Workflow

Use main as deployable and short-lived feature/topic branches. Each pull request runs formatting/lint, TypeScript check, unit/integration tests, Prisma schema validation, and production build. Add Playwright preview smoke tests when test credentials/environment are available.

Merge only green checks. Keep small commits and review migrations; do not add enterprise release process.

## 27. Implementation Phases

### Phase 1. Foundation

- **Goal:** establish a reproducible Next.js PWA development baseline.
- **Dependencies:** none.
- **What Gets Implemented:** Next.js/TypeScript/Tailwind project setup, directory conventions, lint/format/type/test commands, base responsive shell, environment-variable validation, and initial manifest/icons.
- **Deliverables:** runnable local app, documented setup command set, empty authenticated/public route boundaries, CI script definitions.
- **Tests Required:** production build, lint, type-check, basic responsive rendering smoke test.
- **Definition of Done:** a clean checkout builds, lints, type-checks, and renders the mobile-first shell without application features.

### Phase 2. Data and Auth

- **Goal:** establish owned persistent data and Google-authenticated access.
- **Dependencies:** Phase 1.
- **What Gets Implemented:** Prisma schema/migrations, local PostgreSQL workflow, Auth.js database sessions with Google provider, User/Account/Session models, academic context, authorization helpers, and active-input database invariants.
- **Deliverables:** database schema, seed-free local auth path, protected route/server-operation helpers, environment template.
- **Tests Required:** migrations against disposable database, returning-user identity, logout invalidation, unauthenticated/other-user authorization tests, active-input uniqueness tests.
- **Definition of Done:** an authenticated user can access only their own empty account state; no protected operation trusts a client user ID.

### Phase 3. Pure Domain Engine

- **Goal:** complete the independently testable calculation and validation core before document/UI work.
- **Dependencies:** Phase 2 types and approved PRD fixtures.
- **What Gets Implemented:** canonical domain types, C/P/A validation, course-code normalization, T/P rules, matching states, calendar/batch filtering, schedule generation, threshold, Safe Bunk, Recovery, Simulator, rounding, and clock abstraction.
- **Deliverables:** pure domain modules with no React/Prisma/OCR imports and documented function contracts.
- **Tests Required:** all calculation boundaries, current_time strictness, unselected Safe Bunk no-effect, same/different-course aggregation, recovery formula/coverage, simulator ATTEND/BUNK/MISS, zero-conducted, T/P, batch, and calendar tests.
- **Definition of Done:** the deterministic regression suite passes and calculator outputs are reproducible from structured inputs alone.

### Phase 4. Candidate Pipeline

- **Goal:** safely move untrusted input through review/edit/confirmation into active confirmed data.
- **Dependencies:** Phases 2 and 3.
- **What Gets Implemented:** private upload tokens, ProcessingCandidate lifecycle, Blob ownership checks, draft persistence, review actions, validation summaries, confirmation transaction, rejection, and temporary-source cleanup.
- **Deliverables:** generic candidate workflow reusable by attendance, timetable, and calendar inputs.
- **Tests Required:** invalid input rejection, candidate ownership, edits/revalidation, failed extraction/validation/save, rejection, atomic confirmation, and previous-active-data preservation.
- **Definition of Done:** no candidate can alter an active confirmed input before explicit confirmation and successful transaction commit.

### Phase 5. Attendance Extraction

- **Goal:** produce reviewable course-aware attendance candidates from supported attendance files.
- **Dependencies:** Phase 4 and extraction adapter contracts.
- **What Gets Implemented:** PDF direct-text extraction with OCR fallback, image OCR, multi-image merging, duplicate/conflict detection, extraction evidence/warnings, and approved regression fixtures.
- **Deliverables:** AttendanceCandidate adapter(s), candidate processing UI state, representative fixture suite.
- **Tests Required:** machine-readable PDF, scanned/image input, multiple-image complement/overlap/conflict, code recognition, C/P/A extraction, review-required failure paths.
- **Definition of Done:** supported attendance input produces only reviewable course-aware candidates; raw output never reaches calculations directly.

### Phase 6. Timetable and Calendar

- **Goal:** independently confirm schedule inputs required for calculation applicability.
- **Dependencies:** Phases 3 and 4.
- **What Gets Implemented:** image-only timetable extraction/reconstruction, PDF-only calendar direct extraction with scanned-PDF OCR fallback, review/edit screens, persistence/replacement, session/event and calendar-state normalization.
- **Deliverables:** TimetableCandidate and AcademicCalendarCandidate adapters, active schedule data, replacement flows.
- **Tests Required:** timetable PDF rejection, calendar image rejection, session time/batch/T/P/continuous-event parsing, Teaching/Teaching Continues/Non-Teaching/Unknown behavior, failed replacement preservation.
- **Definition of Done:** active timetable/calendar inputs are independently reviewable, confirmed, replaceable, and usable by Phase 3 schedule generation.

### Phase 7. Calculators and UI

- **Goal:** deliver the approved student analysis experience using confirmed data only.
- **Dependencies:** Phases 3 through 6.
- **What Gets Implemented:** dashboard, attendance setup/update navigation, Today’s Decision Center, Safe Bunk cards/results, Recovery path, Simulator range/scenario UI, result presentation, and loading/error/review states.
- **Deliverables:** responsive authenticated student flows with course-aware results.
- **Tests Required:** component accessibility tests and E2E flows for setup, Safe Bunk, Recovery, Simulator, confirmed-versus-projected distinction, and replacement visibility.
- **Definition of Done:** all three calculators obey the locked PRD behavior in browser flows and never update confirmed records.

### Phase 8. PWA and Share Target

- **Goal:** complete optional installability and safely add the conditional attendance-file share path.
- **Dependencies:** Phase 7.
- **What Gets Implemented:** final manifest/icons/install UX, online/network handling, supported-browser capability checks, attendance-only share target, authentication handoff, and standard-upload fallback.
- **Deliverables:** installable online PWA and documented support/fallback behavior.
- **Tests Required:** manifest/install checks, offline/network-error behavior, share-target supported-path test, unauthenticated handoff, unsupported-platform fallback.
- **Definition of Done:** PWA enhancements do not change data/authorization rules and standard upload remains available if share target is absent or fails.

### Phase 9. Hardening and Release

- **Goal:** make the completed Phase 1 system safe to deploy and maintain.
- **Dependencies:** Phases 1 through 8.
- **What Gets Implemented:** rate limits, log scrubbing, error correlation, CI gates, preview/production environment separation, Vercel/Neon/Blob configuration, migration rehearsal, backup/rollback procedure, and release checklist.
- **Deliverables:** deployable production configuration, operational runbook, CI workflow, release checklist.
- **Tests Required:** security/authorization regression, upload abuse checks, migration smoke test, production build, critical E2E suite, responsive/PWA smoke suite.
- **Definition of Done:** deployment, rollback, observability, secret handling, migrations, and all required regression checks are verified without adding Phase 1 scope.

Dependencies are strictly left-to-right; later phases do not replace earlier confirmed-data or domain guarantees.

## 28. Requirement Traceability

| PRD requirement group | Implementation location |
|---|---|
| Confirmed/replacement workflows | ProcessingCandidate, review actions, Prisma transaction |
| Course-aware C/P/A/matching | Domain types, validators, matching engine |
| Timetable/calendar applicability | Structured models and schedule generator |
| Safe Bunk/Recovery/Simulator | Pure calculators plus interactive screens |
| PWA/share target | App shell, manifest, conditional route |
| Security/privacy | Auth, authorization, private storage, validation, logging |
| Reliability/testability | Fixtures, unit suite, integration/E2E tests |

## 29. Key Technical Risks and Mitigations

| Risk | Mitigation |
|---|---|
| OCR/layout variability | Adapter contracts, fixtures, mandatory review/edit, no automatic eligibility for unreliable data. |
| Timetable layout variability | Image/OCR plus timetable structure reconstruction, mandatory review/edit, and timetable regression fixtures. |
| Academic Calendar parsing variability | Direct PDF extraction when machine-readable; OCR fallback only for scanned official PDFs; conservative Unknown state, review/edit, and calendar regression fixtures. |
| Ambiguous mapping | Exact code priority, confirmed mapping, no fuzzy automatic calculation match. |
| Temporary-file exposure | Private blobs, opaque paths, ownership check, terminal cleanup. |
| Replacement race/partial save | Atomic activation transaction and active-input uniqueness invariant. |
| Date/time errors | Single India-time utility, injected clock, strict-boundary tests. |
| Share-target variability | Conditional capability, tested support, standard-upload fallback. |
| Serverless extraction limits | File limits, direct upload, adapter timeout, safe retryable failure. |

## 30. Phase 1 Definition of Done

Phase 1 is implementation-complete only when the approved stack is deployed securely; Google-authenticated users have isolated data; attendance, timetable, and calendar candidates are reviewable/editable/confirmable/safely replaceable; deterministic unit-tested calculators obey course-aware rules; source files are private and cleaned; mobile/browser PWA flows work online; share-target fallback is safe; accessibility, security, migration, regression, and deployment checks pass; and no hypothetical result can update confirmed attendance.
