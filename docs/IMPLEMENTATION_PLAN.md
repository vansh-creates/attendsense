# 1. Implementation Overview

## 1.1 Purpose
This document serves as the Technical Implementation Plan for **AttendSense**, an AI-powered Student Success Platform. It details the architecture, design patterns, directory layouts, coding standards, and operational workflows for the development team. 

## 1.2 Development Philosophy
*   **Decoupled & Modular Design**: Maintain clear boundaries between frontend rendering layers, API route handlers, data access layers, and external service connectors.
*   **Defensive Coding**: Validate all request parameters, payload sizes, and datatypes at the system boundary before executing database queries or processing external operations.
*   **Zero-Stub Enforcement**: Ensure all modules checked into the codebase are fully implemented and typed. Unresolved placeholders are prohibited.

## 1.3 Development Methodology
*   **Milestone-Driven Scaffolding**: Features must be built sequentially matching the development priority order (refer to [Section 22 (Future Development Guidelines)]). Core dependencies (Database and Auth.js) must be fully established and verified before downstream features are initiated.
*   **Continuous Verification**: Run type-checking compilers and linters locally before merging pull requests.

## 1.4 Architecture Principles
*   **Adapter Pattern for ERP Abstraction**: Isolate core academic calculations from specific institutional databases by querying external data via a standardized adapter interface (refer to [Section 16 (ERP Integration Layer)]).
*   **Advisory AI Paradigm**: Structure AI operations as read-only asynchronous prompts, storing the advice in a persistent data cache to control API traffic (refer to [Section 13 (AI Attendance Advisor)]).
*   **Role-Based Data Isolation**: Enforce data routing logic at the database query level to ensure students can access only personal records, and faculty can access records in read-only states (refer to [Section 7 (RBAC Implementation)]).

---

# 2. Repository Structure

The project uses Next.js with the App Router architecture. The directory structure is organized as follows:

```text
attendsense/
├── .env.example              # Configuration template for environment variables
├── package.json              # App dependencies, engines, and run scripts
├── tsconfig.json             # TypeScript compiler settings (strict: true)
├── tailwind.config.ts        # Tailwind configuration for the visual design system
├── postcss.config.js         # PostCSS configuration for Tailwind CSS compilation
├── prisma/                   # Database migrations and models
│   ├── schema.prisma         # Prisma schema defining entities and relations
│   ├── seed.ts               # Database seeder script for mock data
│   └── migrations/           # SQL migration files managed by Prisma CLI
├── public/                   # Static assets (images, vectors, fonts)
├── docs/                     # Documentation and architectural records
│   ├── attendsense_PRD.md    # Product Requirements Document (Source of Truth)
│   └── IMPLEMENTATION_PLAN.md# Technical implementation guidelines
└── src/                      # Source directory
    ├── app/                  # Next.js App Router root
    │   ├── layout.tsx        # Base root layout wrapper with HTML/body tags
    │   ├── page.tsx          # Public Landing Page component
    │   ├── providers.tsx     # Global React contexts (Auth.js session, Theme, UI)
    │   ├── (auth)/           # Route group for auth flows
    │   │   ├── login/
    │   │   │   └── page.tsx  # Secure Login UI for Students and Faculty
    │   ├── dashboard/        # Dashboard layout routing (RBAC protected)
    │   │   ├── layout.tsx    # Workspace frame containing Header/Sidebar
    │   │   ├── student/
    │   │   │   └── page.tsx  # Student Dashboard UI
    │   │   ├── faculty/
    │   │   │   ├── page.tsx  # Faculty Dashboard UI (Student list, Search, Filters)
    │   │   │   └── student/[id]/
    │   │   │       └── page.tsx # Read-only view of a student's profile/records
    │   ├── planner/          # Simulation views
    │   │   └── page.tsx      # Attendance Planning interactive interface
    │   ├── development-hub/  # Student Development Hub views
    │   │   └── page.tsx      # Professional profile editor interface
    │   └── api/              # Route handlers for REST API endpoints
    │       ├── auth/
    │       │   └── [...nextauth]/route.ts # Auth.js API handler
    │       ├── attendance/
    │       │   ├── route.ts  # CRUD / analytical calculations endpoint
    │       │   └── sync/
    │       │       └── route.ts # ERP synchronization trigger endpoint
    │       ├── planner/
    │       │   └── route.ts  # Mathematical attendance forecasting helper API
    │       ├── advisor/
    │       │   └── route.ts  # OpenAI Advisor request and recommendation cache API
    │       ├── profile/
    │       │   └── route.ts  # Student Development Hub URL/info data endpoint
    │       ├── certifications/
    │       │   └── route.ts  # Add/Edit/Delete certification record endpoint
    │       ├── achievements/
    │       │   └── route.ts  # Add/Edit/Delete achievement record endpoint
    │       ├── resume/
    │       │   └── route.ts  # Resume upload and deletion registration endpoint
    │       └── upload/
    │           └── route.ts  # Direct signature/upload handler for Supabase Storage
    ├── components/           # Reusable React components
    │   ├── ui/               # Atomic design elements (Buttons, Inputs, Badges, Modals)
    │   ├── layouts/          # Structural page wrappers (Header, Sidebar, Shell)
    │   ├── dashboard/        # Specialty widgets (Attendance trends, Safety cards)
    │   ├── planner/          # Planning components (Scenarios, sliders, calculators)
    │   └── dev-hub/          # Portfolio cards (Cert forms, achievement tables)
    ├── lib/                  # Shared core utilities and external configurations
    │   ├── db.ts             # Instantiated Prisma client singleton
    │   ├── openai.ts         # OpenAI API client configuration and prompt helpers
    │   ├── supabase.ts       # Supabase Storage client configuration and helpers
    │   ├── erp-adapter.ts    # Abstract interface and concrete mock implementations for ERP
    │   └── utils.ts          # Common formatting and UI utility functions (clsx, tailwind-merge)
    ├── hooks/                # Custom React client hooks
    │   ├── use-attendance.ts # Hook fetching and calculating local attendance states
    │   └── use-toast.ts      # Hook rendering state notification triggers
    └── types/                # Core TypeScript structural declarations
        ├── index.ts          # Main type exports
        └── db.d.ts           # Extended database relational interface declarations
```

---

# 3. Development Workflow

## 3.1 Git Workflow
*   Direct commits to the `main` branch are disabled.
*   Developers must create feature branches from `main` and initiate pull requests (PRs) for review.
*   Merging requires squash-and-merge formatting to maintain a clean linear commit history.

## 3.2 Branch Strategy
Branches must be named in the format `[category]/[brief-description]` using lowercase letters and hyphens:
*   `feature/` - Active feature implementations (e.g., `feature/ai-caching-handler`).
*   `bugfix/` - Defect remediations (e.g., `bugfix/division-by-zero-fallback`).
*   `chore/` - Config files, database seeding, or dependency management updates (e.g., `chore/configure-prisma`).
*   `docs/` - System and documentation updates (e.g., `docs/update-security-checklist`).

## 3.3 Commit Conventions
We enforce the Conventional Commits specification. Commit titles must follow: `<type>(<scope>): <description>` in lowercase:
*   `feat`: A new feature entry (e.g., `feat(auth): configure nextauth credentials provider`).
*   `fix`: A bug fix (e.g., `fix(planner): resolve safe miss count floating-point rounding`).
*   `docs`: Documentation-only updates.
*   `style`: Non-breaking format, lint, or layout adjustments.
*   `refactor`: Structural codebase modifications that do not impact execution output.
*   `test`: Introducing test files or modifying verification routines.
*   `chore`: Workspace configuration, dependency changes, or seeder updates.

## 3.4 Code Review Process
1.  **Compiler Compliance Check**: Developers must successfully build the project (`npm run build`) locally before staging pull requests.
2.  **Schema Validations**: Database alterations must contain valid migration scripts checked into version control.
3.  **Review Approvals**: Merge approvals are granted when code files show strict TypeScript declarations, clear RBAC boundaries, and complete validation coverage.

---

# 4. Coding Standards

## 4.1 TypeScript Standards
*   **Strict Compilation**: Enforce `"strict": true` in `tsconfig.json`.
*   **Explicit Datatypes**: Avoid type inferences for API response types, custom hooks, or relational queries. Explicitly declare return signatures.
*   **No Implicit 'any'**: Eliminate the use of `any`. Explicitly declare fallback parameters or utilize `unknown` if types are undefined.
*   **Interface Declarations**: Implement `interface` structures for persistent database models, and `type` declarations for utility union or intersection operations.

## 4.2 React Standards
*   **Server vs. Client Demarcation**: Components are React Server Components (RSC) by default. Use the `"use client"` directive only when integrating component hooks (`useState`, `useEffect`, `useContext`) or client-side UI handlers.
*   **Decoupled Side Effects**: Isolate API requests, layout state changes, and mathematical calculations within custom React hooks, keeping functional UI files presentational and declarative.
*   **File Layout Guidelines**: Organize components as:
    1.  Import blocks (external libraries followed by internal utility paths).
    2.  TypeScript properties declaration (`Props`).
    3.  React component logic.
    4.  Localized layout styles and static parameters.

## 4.3 API Standards
*   **Directory Mapping**: Enforce route file placement in the `src/app/api/` folder using dynamic directories matching the REST structure.
*   **HTTP Methods**:
    *   `GET` - Read-only queries (must be idempotent).
    *   `POST` - Create actions and credential verifications.
    *   `PATCH` - In-place property updates.
    *   `DELETE` - Hard deletes of specific resources.
*   **Request Schema Validation**: Check headers, parameters, and payloads before processing handler blocks.
*   **Standard JSON Response Envelopes**:
    *   *Success Cases (200/201 Status)*: `{ "success": true, "data": T }`
    *   *Failure Cases (400/401/403/404/500 Status)*: `{ "success": false, "error": "Clear user message" }`

## 4.4 Naming Conventions
*   **Folders and Files**: Use PascalCase for React component folders and files (e.g., `components/dev-hub/ResumeManager.tsx`) and kebab-case for utility and controller files (e.g., `lib/erp-adapter.ts`).
*   **Identifiers**: camelCase for variables, constants, and functions (e.g., `calculateRecoveryClasses`).
*   **Models & Classes**: PascalCase for class, interface, type, and database schemas.
*   **Environment Settings**: UPPER_SNAKE_CASE for environment configurations and global secret keys (e.g., `DATABASE_URL`).

---

# 5 Database Implementation

## 5.1 Prisma Integration
*   **Single Client Instantiation**: Instantiate the Prisma client as a global singleton block inside `src/lib/db.ts` to prevent database connection leakage during development.
*   **Schema Configuration**: Define tables using standard model specifications mapping directly to the PRD specifications.

## 5.2 Schema Generation Sequence
Generate tables matching the dependency graph:
1.  **User**: Holds root user records and authorization credentials.
2.  **Student / Faculty**: Mapped profiles. Each record requires a one-to-one mapping to the parent User record.
3.  **Student Development / Resume**: Profiles linked directly to Student IDs.
4.  **Attendance / Certification / Achievement / AI Recommendation**: Multi-row child records linking directly to Student IDs.

## 5.3 Entity Relationships
*   **One-to-One Relationships**:
    *   `User` $\leftrightarrow$ `Student` (via `User ID` with cascade deletes).
    *   `User` $\leftrightarrow$ `Faculty` (via `User ID` with cascade deletes).
    *   `Student` $\leftrightarrow$ `Student Development` (via `Student ID` with cascade deletes).
    *   `Student` $\leftrightarrow$ `Resume` (via `Student ID` with cascade deletes).
*   **One-to-Many Relationships**:
    *   `Student` $\to$ `Attendance` (linked via `Student ID` with cascade deletes).
    *   `Student` $\to$ `Certification` (linked via `Student ID` with cascade deletes).
    *   `Student` $\to$ `Achievement` (linked via `Student ID` with cascade deletes).
    *   `Student` $\to$ `AI Recommendation` (linked via `Student ID` with cascade deletes).

## 5.4 Database Migrations
*   **Script Generation**: Create migrations using Prisma command-line tools (`npx prisma migrate dev`).
*   **SQL Auditing**: Verify that SQL scripts are checked into code versions under the `prisma/migrations` folder directory.
*   **Cascading Rules**: Apply cascade deletes on student relationship constraints to ensure relational consistency.

## 5.5 Indexing Strategy
Implement database indexes on:
*   **Foreign references**: Index all fields referencing `Student ID` and `User ID` to optimize resource joins.
*   **Search criteria fields**: Index `Roll Number`, `Department`, and `Semester` inside the Student schema to support faculty search engines.
*   **Status query parameters**: Index overall and subject attendance flags.

---

# 6 Authentication Implementation

## 6.1 Auth.js Integration
*   Mount Auth.js using credentials handler configurations inside `src/app/api/auth/[...nextauth]/route.ts`.
*   Establish Auth.js configuration variables, enforcing cookie-based user verification checks.

## 6.2 Session Management
*   **Secure Cookies**: Issue cookies with HTTP-only, HTTPS-only, and SameSite parameters.
*   **Session Expiration Rules**: Session lifespans must expire after a designated timeframe, forcing re-authentication once exceeded.
*   **Dynamic Context Extraction**: Mount session variables using global React Context providers inside `src/app/providers.tsx` to support client routing logic.

## 6.3 Login Flow
1.  User posts credentials at the login interface.
2.  Auth.js parses payload data and resolves credentials against the `User` database entity.
3.  On success, role attributes (`Student` or `Faculty`) are written into session scopes.
4.  **Route Redirections**:
    *   *Student Roles*: Redirected to `/dashboard/student`. First-time logins must complete a profile initialization step before accessing features.
    *   *Faculty Roles*: Redirected to `/dashboard/faculty`.

## 6.4 Route Protection
*   Implement layout checking logic that intercepts unauthenticated paths and redirects users back to the landing page.
*   API endpoints must parse the session context first and reject requests if sessions are missing.

---

# 7 RBAC Implementation

## 7.1 Access Privilege Matrix
*   **Student Roles**:
    *   *Read-Only*: Personal attendance summaries, course trends, and history logs.
    *   *Write / Edit / Delete*: Personal Student Development Hub links, resume paths, certifications data, and achievements history.
    *   *No Access*: Faculty management pages, student search directories, or other student profile directories.
*   **Faculty Roles**:
    *   *Read-Only*: Academic search lists, course trends, status indicators, and student achievements/resumes.
    *   *No Access*: Editing/deleting profile data, student planners, or system credentials.

## 7.2 Middleware Routing Interceptor
*   Use Next.js middleware controllers to validate route navigation attempts.
*   Block unauthorized accesses dynamically by parsing session tokens.

## 7.3 API Route Access Validation
*   Check user roles inside API handlers before querying data:
    *   Reject mismatches with a standard `403 Forbidden` response.
    *   Ensure resource lookups filter queries using the caller's verified `Student ID` or `Faculty ID` keys.

---

# 8 Environment Configuration

## 8.1 Required Variables
*   `DATABASE_URL`: Connection route to the PostgreSQL database.
*   `NEXTAUTH_SECRET`: Encryption key for Auth.js sessions.
*   `NEXTAUTH_URL`: Domain reference validation route.
*   `OPENAI_API_KEY`: API access token for OpenAI.
*   `SUPABASE_URL`: Web access point to Supabase Storage.
*   `SUPABASE_SERVICE_ROLE_KEY`: Service-level token to manage storage buckets.

## 8.2 Secret Management
*   Prevent checking active credentials into version control.
*   Exclude `.env` files from repository commits.

## 8.3 Environment Profiles
*   **Local Profile**: Configured in `.env` using local databases and mock keys.
*   **Production Profile**: Managed securely within the host provider (Vercel) dashboard controls.

---

# 9 Backend API Implementation

## 9.1 API Architecture
*   Use Next.js API Route Handlers returning JSON outputs.
*   Enforce stateless validation routines for database operations.

## 9.2 Route Designations
*   `GET /api/attendance` - Resolves subject-wise and overall percentages for the authenticated student.
*   `POST /api/attendance/sync` - Syncs database properties with remote ERP records.
*   `POST /api/planner` - Performs mathematical forecasting on attendance simulator parameters.
*   `GET / POST /api/advisor` - Retrieves generated advisor recommendations, checking database caches before querying external APIs.
*   `GET / PATCH /api/profile` - Manages professional development links.
*   `POST / PATCH / DELETE /api/certifications` - Operates CRUD queries on certification schemas.
*   `POST / PATCH / DELETE /api/achievements` - Operates CRUD queries on achievement lists.
*   `POST / DELETE /api/resume` - Tracks active resumes in database tables.
*   `POST /api/upload` - Generates signed URLs or handles proxies for Supabase Storage uploads.

## 9.3 Request Validation
*   Parse parameters using validation logic, rejecting empty properties or mismatched schemas.
*   Enforce file constraint validations (max 5MB, whitelisted MIME types).

## 9.4 Error Processing
*   Wrap handlers in try-catch blocks.
*   Return clean JSON error payloads to protect system details:
    *   `400 Bad Request` - Data validation failures.
    *   `401 Unauthorized` - Missing session variables.
    *   `403 Forbidden` - Privilege level mismatch errors.
    *   `404 Not Found` - Resource query failures.
    *   `500 Internal Server Error` - Database or downstream system connection failures.

---

# 10 Frontend Implementation

## 10.1 UI Architecture
*   Implement React Server Components (RSC) to query data directly from databases via Prisma during initial server load.
*   Use client-side components to handle interactive elements (forms, inputs, tab selectors).
*   Enforce component styles using Tailwind CSS variables.

## 10.2 Layout Grid Scaffolding
*   **Root Shell Layout**: Handles provider initializations and global CSS definitions.
*   **Dashboard Context Shell**: Mounts sidebar panels, navigation items, header menus, and user banners.

## 10.3 Component Architecture
Organize component hierarchies cleanly:
1.  *Atomic UI Elements*: Stateless inputs, buttons, badges, and modals.
2.  *Widget blocks*: Domain UI structures (Safety margin tables, dynamic slider components).
3.  *Views / Templates*: Core workspace pages compiling widgets into responsive layouts.

## 10.4 Application State Lifecycles
*   **Forms & Visuals**: Handled via component-level state variables.
*   **Relational Query Properties**: Query data directly in page routes, invoking API routes for client-side state updates.
*   **Access Context**: Session variables managed via Auth.js contexts.

---

# 11 Attendance Intelligence Module

## 11.1 Mathematical Formulas
*   **Subject Attendance Calculation**:
    $$\text{Percentage} = \left( \frac{\text{Present Classes}}{\text{Total Classes}} \right) \times 100$$
    *Note: If total classes are 0, return $100\%$ to prevent division-by-zero errors. This is an implementation decision chosen solely to prevent division-by-zero errors and provide deterministic calculations; user interfaces may alternatively display "N/A" while preserving the underlying calculation.*
*   **Overall Cumulative Percentage**:
    $$\text{Overall Percentage} = \left( \frac{\sum \text{Present Classes}}{\sum \text{Total Classes}} \right) \times 100$$
    *Note: If cumulative classes are 0, return $100\%$. This is an implementation decision chosen solely to prevent division-by-zero errors and provide deterministic calculations; user interfaces may alternatively display "N/A" while preserving the underlying calculation.*

## 11.2 Safety Margin Buffer
*   Define the safe limits:
    $$\text{Safety Margin} = \text{Overall Percentage} - \text{Threshold}$$
    *The threshold is institution-configurable, with 75% serving only as a default/example value to ensure the implementation remains future-proof for institutions with different requirements.*

## 11.3 Status Indicators
Categorize metrics based on target zones:
*   `Safe`: Meets or exceeds the institution-configurable safety threshold (e.g., $\ge 75\%$ by default).
*   `Warning`: Below safety threshold levels but above critical thresholds.
*   `Critical`: Drops below critical thresholds, requiring academic intervention.

## 11.4 Trajectory Trends
*   Compile synchronization dates to track attendance changes over time.
*   Map changes to vectors (stable, upward, or declining paths) to visualize trends.

---

# 12 Attendance Planning Module

## 12.1 Simulation Formulas
*   **Attend Simulation**: Computes the attendance percentage if a student attends $X$ consecutive future classes:
    $$\text{Simulated Attendance} = \left( \frac{\text{Present Classes} + X}{\text{Total Classes} + X} \right) \times 100$$
*   **Miss Simulation**: Computes the attendance percentage if a student misses $Y$ consecutive future classes:
    $$\text{Simulated Attendance} = \left( \frac{\text{Present Classes}}{\text{Total Classes} + Y} \right) \times 100$$
*   **Recovery Solver**: Computes the minimum number of consecutive classes ($X$) a student must attend to reach a safety threshold ($T$):
    $$X \ge \frac{(T \times \text{Total Classes}) - (100 \times \text{Present Classes})}{100 - T}$$
    *Note: If current attendance meets or exceeds $T$, return $0$.*
*   **Safe Miss Solver**: Computes the maximum number of classes ($Y$) a student can safely miss before falling below a safety threshold ($T$):
    $$Y \le \frac{(100 \times \text{Present Classes}) - (T \times \text{Total Classes})}{T}$$
    *Note: If current attendance is already below $T$, return $0$.*

## 12.2 Interactive Planning Interface
*   Provide client-side inputs (increment buttons and slider components) to adjust simulation inputs ($X$ and $Y$).
*   Implement client-side update scripts to run simulation formulas immediately on input change, rendering results instantly.

---

# 13 AI Attendance Advisor

## 13.1 AI Architecture
*   Route client-facing advisor request parameters through `/api/advisor`.
*   Validate requests and load student metrics before querying the external AI models.

## 13.2 Prompt Strategy
*   **Role Instructions**: Force the language model to adopt a professional, encouraging, and academically disciplined role.
*   **System Constraints**:
    *   Strictly prohibit suggestions that promote absenteeism or endorse proxy attendance systems.
    *   Force responses to use calculations that correspond to the actual attendance metrics.
*   **Context Payload**: Inject current student percentages, course breakdowns, safety margins, and planning simulation values into the model context block.

## 13.3 Response Validation
*   Check that model outputs correspond to expected layouts.
*   Filter outputs to flag and discard recommendations containing keywords associated with skipping classes.

## 13.4 Error Handling
*   Wrap queries in timeout handlers to manage slow upstream network requests.
*   If connections fail, return pre-configured local advice recommendations based on the student's warning threshold levels.

## 13.5 Cost Optimization
*   Verify the existence of cached advice records in the `AI Recommendation` database schema.
*   Serve the cached recommendation if it is within its valid period. Cached AI recommendations are invalidated and regenerated when:
    *   Attendance data changes,
    *   Student profile information used by the prompt changes,
    *   The AI prompt version changes, or
    *   The cache TTL expires (example: 24 hours).

---

# 14 Student Development Hub

## 14.1 Hub Implementation
*   **Interface**: Composed of responsive forms, layouts, and document lists under the profile route.
*   **Stateful Forms**: Manage local component state for updating text URL variables (GitHub, LinkedIn, Coding Profiles).
*   **Certification Records**: Form layouts mapping inputs to the `Certification` database entity. Displays uploaded credentials alongside external verification URLs.
*   **Resume Controller**: Handles single-active-resume uploads. Replacing a resume follows a structured workflow to prevent accidental data loss if an upload fails: (1) Upload the new resume file, (2) Verify upload success, (3) Update the database reference, and (4) Delete the previous resume.
*   **Achievements Log**: A list system that displays academic and technical records, binding entries to the student ID. The `Achievement` entity is used to capture various accomplishments, including workshops, hackathons, competitions, conferences, extracurricular activities, and similar accomplishments.

---

# 15 Faculty Dashboard

## 15.1 Dashboard Implementation
*   **Student Directory**: Main grid rendering basic summaries of students.
*   **Search Engine**: Implements backend queries to look up entries by matching text inputs to student Names, Roll Numbers, Departments, or Semesters.
*   **Filter Logic**: Restricts directory listings to match specific warning thresholds.
*   **Read-Only Detail View**: Renders the complete profile of a selected student, pulling their overall attendance tables, active resume document, achievements, and certifications using their ID. Modifying elements is blocked on this dashboard.

---

# 16 ERP Integration Layer

## 16.1 Adapter Architecture
*   **Abstraction Interface**: Set up an ERP Adapter definition establishing shared functions (e.g. sync student records, fetch course schedules, pull raw attendance logs).
*   **Mock Implementation**: A mock adapter class provides mock records for development, matching the exact interface structure.
*   **Synchronizer Handler**: Processes imports into local PostgreSQL tables, writing synchronization dates onto the local records.
*   **Decoupled design**: Code outside the adapter directory queries local databases, isolating the system from future ERP connector replacements.

---

# 17 File Storage

## 17.1 Supabase Storage
*   Create a private storage bucket on Supabase to host uploaded resumes and certification documents.
*   Use direct client-side upload signing or server-side API proxy routes to write objects into the bucket.

## 17.2 Upload Validation
*   **Size Checks**: Verify that files do not exceed maximum size limits (e.g., 5MB).
*   **Type Whitelisting**: Restrict uploads strictly to verified file signatures (e.g., PDF and common image formats).

## 17.3 Security
*   **Access Control**: Read access is restricted to the uploading student and authorized faculty accounts.
*   **Bucket Security Policies**: Apply policies in Supabase Storage to allow object modifications only to authenticated accounts matching the student profile ID.

## 17.4 File Organization
Files are organized in folders to isolate resources:
*   `resumes/[student_id]/resume_[timestamp].[extension]` - Houses the single active student resume.
*   `certifications/[student_id]/[certification_id]_[timestamp].[extension]` - Houses supporting certification documents.

---

# 18 Testing Strategy

## 18.1 Unit Testing
*   **Math Calculators**: Enforce validation testing on calculation functions (percentages, safety margins, recovery class counts, and safe absence ceilings) against edge scenarios (such as division-by-zero, negative input checks, and maximum bounds).
*   **Adapter Assertions**: Test the logic of parsing adapter raw data streams into expected internal data structures.

## 18.2 Integration Testing
*   **API Routes**: Test route endpoints using mock sessions, checking standard response shapes, header structures, and error fallback codes.
*   **Database Operations**: Test database query executions via Prisma, ensuring constraint checks and relational cascading rules succeed during CRUD operations.

## 18.3 End-to-End Testing
*   **Student Workflows**: Test user paths from login redirection, dashboard visualization, planner slider manipulation, profile link updates, to resume file uploads.
*   **Faculty Workflows**: Test search inputs, list filter checkboxes, pagination controls, and read-only student record transitions.

---

# 19 Performance Optimization

## 19.1 Database Optimization
*   **Foreign Key Indexes**: Enforce database indexing on foreign references linking child tables to Student IDs.
*   **Query Selection**: Restrict queries to retrieve only required fields (e.g. avoiding pulling large resume binary strings when loading search lists).
*   **Pagination**: Implement cursor-based pagination for faculty directory list queries.

## 19.2 Caching
*   **AI Cache Management**: Retrieve responses from cached database recommendations to minimize OpenAI billing costs.
*   **Session Persistence**: Store session flags using secure client cookies to reduce backend state-checking lookups.

## 19.3 Lazy Loading
*   Use Next.js dynamic routing utilities and React Suspense layouts to defer loading resource-heavy components (like charts, list metrics, and certificate entry forms) until requested.

## 19.4 API Optimization
*   **Response Compression**: Enable JSON compression headers.
*   **Supabase Direct Storage**: Bypass backend stream routes by uploading files directly to Supabase Storage via signed/proxied authorization keys.

---

# 20 Deployment Strategy

## 20.1 Vercel Deployment
*   Connect the Vercel dashboard to the GitHub repository.
*   Enforce automated staging previews on branch pull requests, and restrict production builds to merges on the main branch.

## 20.2 Production Configuration
*   **Connection Pooling**: Configure database connection pooling parameters to prevent exhausting PostgreSQL server limits.
*   **Build Optimization**: Enforce lint and type-checking checks at build time to fail early if build anomalies are detected.

---

# 21 Security Checklist

*   [ ] **HTTPS Enforcement**: Configure all routes to serve content exclusively over Secure Sockets Layer.
*   [ ] **Cookie Security**: Set cookie flags to HttpOnly, Secure, and SameSite: Lax.
*   [ ] **Server-Side RBAC**: Confirm role validation checks occur inside server files and API route handlers (do not rely on client-side visual hiding).
*   [ ] **Input Validation**: Apply input checks to every payload parameter.
*   [ ] **Upload Bounds**: Restrict upload sizes to a maximum of 5MB and validate MIME types.
*   [ ] **Storage Policies (RLS)**: Enforce policies in Supabase Storage buckets to verify that students can only write to their own folder namespaces.
*   [ ] **Credentials Security**: Use password hashing algorithms before writing records to database tables.
*   [ ] **Error Shielding**: Prevent database stack traces and system paths from returning in final client-side API payloads.
*   [ ] **Secret Verification**: Verify that `.env` files are excluded from Git repository histories.

---

# 22 Future Development Guidelines

## 22.1 ERP Adapters
Future developers creating integrations for alternative university systems must extend the abstraction adapter class (`erp-adapter.ts`) and register the new class implementation inside the initialization files, leaving the remaining dashboard logic unchanged.

## 22.2 Database Schema Extensions
When modifying databases, write migrations using the Prisma CLI rather than executing direct SQL commands on the PostgreSQL engine, and update corresponding model types.

## 22.3 AI Advisor Refinement
Ensure prompt updates are verified against mathematical compliance checks before push releases, verifying the system continues to reject suggestions promoting class absenteeism.

## 22.4 Component Modularity
Keep new components stateless and reusable, storing them in dedicated feature directories under `src/components/`.

---

END OF IMPLEMENTATION PLAN
