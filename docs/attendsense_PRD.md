# 1. Project Overview

## 1.1 Product Name

**AttendSense**

---

## 1.2 Product Description

AttendSense is a student-focused attendance analysis and smart bunk-planning application for students across the Sankalchand Patel College of Engineering (SPCE), designed to help them understand, manage, and plan their academic attendance more effectively.

The application analyzes student-provided and confirmed attendance data together with the student's confirmed timetable and official SPCE Academic Calendar to provide accurate and schedule-aware attendance information.

AttendSense uses a fixed minimum attendance requirement of **75%** for Phase 1. This threshold is defined by the product requirements and cannot be modified by students.

The application provides three primary attendance-analysis capabilities:

1. **Safe Bunk Calculator**  
   Available when the applicable confirmed attendance record is at or above the fixed 75% threshold. It allows the student to select applicable upcoming classes they are considering missing and determines whether those selected classes can be missed while keeping the applicable course attendance at or above 75%, with overall attendance available as supporting context where useful.

2. **Attendance Recovery Calculator**  
   Available when an applicable confirmed course attendance record is below the fixed 75% threshold. It determines the additional attendance required for that course record to mathematically reach at least the required 75% attendance threshold.

3. **Future Attendance Simulator**  
   Available regardless of the student's current attendance percentage. It allows the student to create hypothetical future attendance scenarios by selecting applicable upcoming classes as attended or missed and shows the resulting projected course attendance, with overall attendance available as supporting context where useful.

AttendSense is intended to reduce the need for students to manually calculate attendance percentages or independently determine the attendance impact of future academic decisions.

---

## 1.3 Phase 1 Product Platform

AttendSense Phase 1 shall be implemented as a **Progressive Web Application (PWA)**.

The application shall:

- Be accessible through supported web browsers.
- Be installable as a PWA on supported devices and browsers.
- Provide an app-like experience when launched as an installed PWA.
- Follow a mobile-first design approach.
- Provide responsive operation across smartphones, tablets, laptops, and desktop computers.
- Require an active internet connection for Phase 1 operation.

PWA installation shall remain optional. Students shall be able to use the core application through a supported web browser without installing the PWA.

Offline application functionality is outside the scope of Phase 1.

---

## 1.4 Phase 1 Academic Scope

AttendSense Phase 1 shall operate for students across the Sankalchand Patel College of Engineering (SPCE). It shall support SPCE's multiple departments, semesters, batches, subjects, theory courses, practical courses, and timetable structures without expanding AttendSense into a multi-college product.

Students shall provide their own timetable as a one-time setup input in **image or screenshot format only**. AttendSense shall not provide or automatically assign a predefined timetable. The timetable workflow shall be:

**Timetable Image → Extraction → Validation → Student Review/Edit → Student Confirmation → Save**

After confirmation, the timetable shall remain stored in the student's account and be reused automatically until the student explicitly replaces or updates it.

Students shall provide the official SPCE Academic Calendar as a one-time setup input in **PDF format only**. AttendSense shall not provide or automatically assign an Academic Calendar. The Academic Calendar workflow shall be:

**Academic Calendar PDF → Extraction → Validation → Student Review/Edit → Student Confirmation → Save**

After confirmation, the Academic Calendar shall remain stored in the student's account and be reused automatically until the student explicitly replaces or updates it.

The confirmed timetable shall preserve theory and practical sessions separately where official data identifies them separately. AttendSense shall respect the student's confirmed batch for batch-specific sessions; if batch applicability cannot be determined safely, it shall require student review rather than guess.

Academic Calendar data shall be interpreted conservatively. Teaching and Teaching Continues shall allow timetable classes, while confirmed public holidays and confirmed non-teaching periods may suppress them. Unknown or ambiguous events shall require review and shall not silently suppress timetable classes.

---

## 1.5 Core Product Principle

AttendSense shall prioritize reliable attendance information over simply producing a result.

The attendance-data workflow shall follow the principle:

**Attendance Upload (PDF, Image, or Multiple Images Where Required) → Extraction → Normalization / Validation → Student Review/Edit → Student Confirmation → Save**

Attendance, timetable, and Academic Calendar extraction shall not be blindly trusted. Students shall be able to review extracted structured data, manually correct incorrect values, and confirm the corrected data. Only confirmed data shall be trusted for calculations.

If AttendSense cannot reliably determine information required for an attendance calculation because required data is missing, ambiguous, contradictory, unconfirmed, or unreliable, the application shall stop the affected calculation or require review rather than silently produce a potentially incorrect or misleading result.

Students may update attendance data whenever they want newer official attendance data to be used. Once an attendance dataset has successfully completed the required extraction, normalization / validation, student review/edit, confirmation, and saving workflow, it shall become the student's **latest confirmed attendance dataset**.

The latest confirmed attendance dataset shall remain the active base attendance data used by AttendSense for Safe Bunk Calculation, Attendance Recovery Calculation, and Future Attendance Simulation until a newer attendance dataset is successfully processed, reviewed, confirmed, and saved.

Results produced by attendance calculators or future simulations shall not modify the student's confirmed attendance dataset.

If a newly submitted attendance dataset fails extraction, validation, review, confirmation, or saving, the previously confirmed attendance dataset shall remain unchanged and available for subsequent analysis.

Where a valid structured course code exists, AttendSense shall use the course code as the primary identity to match attendance subjects with timetable subjects. Theory and practical courses with separate course codes shall remain separate, including theory courses ending in T and practical courses ending in P; minor OCR differences in course names shall not override a valid course-code match. Code-less or ambiguous timetable sessions may be preserved for display and review but shall not affect attendance calculations unless they have a confirmed mapping.

Attendance calculations shall operate on confirmed course-wise attendance records and confirmed timetable/session structure. For a matched future class that the student skips, conducted attendance shall increase, present attendance shall remain unchanged, absent attendance shall increase, and projected attendance shall be recalculated deterministically for the applicable course record. Multiple future classes shall affect their respective course records. A laboratory spanning two timetable periods may represent one continuous attendance event; AttendSense shall not apply a universal lecture or laboratory slot-weighting rule.

For current-day bunk planning, a class shall be selectable only before its scheduled start time.

Calculation-critical attendance percentages, projected attendance, bunk safety, and threshold decisions shall be deterministic and mathematically verifiable. Document-processing technology may assist with reading uploaded data, but generative AI / LLM reasoning shall not determine those calculations.

---

## 1.6 Phase 1 Product Goal

The goal of AttendSense Phase 1 is to provide students with a reliable and easy-to-use system for understanding their current attendance position and evaluating the effect of future attendance decisions.

The Phase 1 product shall focus on delivering:

- Accurate course-aware attendance calculations, with overall attendance available as supporting context where useful.
- Reliable attendance-data processing.
- Schedule-aware attendance analysis.
- Safe bunk planning for students at or above the required attendance threshold.
- Attendance recovery planning for students below the required attendance threshold.
- Future attendance simulation regardless of the student's current attendance position.
- Correct use of confirmed timetable and session structure, including theory/practical separation and batch-specific sessions where applicable.
- Clear and understandable results.
- A mobile-first and responsive user experience.
- Secure persistence of the student's latest confirmed attendance dataset, timetable, and Academic Calendar.
- Safe replacement of confirmed attendance data only after a newer dataset has successfully completed the required processing and confirmation workflow.

# 2. Problem Statement

Students across the Sankalchand Patel College of Engineering (SPCE) are required to maintain a minimum **75% attendance**, but understanding how future attendance decisions will affect their attendance is not always straightforward.

Attendance information provided by an academic attendance system primarily represents a student's recorded attendance status. By itself, this information does not directly answer practical attendance-planning questions such as:

- Can I miss this applicable upcoming class and keep the relevant course attendance at or above 75%?
- Which upcoming classes are actually relevant to me today after considering my timetable, Academic Calendar, batch, and current time?
- What happens to the attendance of the applicable course if I miss one or more future classes?
- If an applicable course attendance record is below 75%, what future attendance is required to recover?
- What would happen under a hypothetical future attend or bunk scenario?

Answering these questions manually requires students to correctly interpret their confirmed course attendance and combine it with the confirmed timetable, official SPCE Academic Calendar, course identity, batch applicability where relevant, current date and time, and fixed **75% attendance requirement**. Overall attendance may be useful as supporting context, but it does not answer every course-specific attendance-planning question.

The problem is further complicated because attendance information obtained from academic systems may be supplied as PDFs, images, or multiple images and may require extraction, normalization, and validation before it can be safely used for calculation. Incorrect extraction or interpretation of attendance, timetable, or Academic Calendar information can produce inaccurate attendance advice.

Students therefore need a reliable way to use their own timetable image or screenshot and official SPCE Academic Calendar PDF alongside their attendance data. These inputs must be reviewed, editable, confirmed, saved, and reused until the student replaces them rather than being assumed to be automatically supplied by AttendSense.

Attendance planning becomes more complex when future scheduled classes are considered. A session is relevant only when the confirmed timetable, Academic Calendar, course identity, batch applicability where relevant, and date/time support it. Confirmed public holidays and non-teaching periods may suppress classes, while Teaching and Teaching Continues periods permit them; ambiguous calendar events and unmatched activities require review rather than guessing, while current-day sessions that have already started are not future bunk opportunities.

Reliable course matching is also required. Where a valid structured course code exists, it is the primary identity for matching an attendance record with a timetable session, and minor course-name differences shall not override that match. Theory and practical courses remain separate when they have separate official course codes, and code-less or ambiguous timetable activities shall not silently affect attendance calculations without a confirmed mapping. A laboratory shown across two timetable periods may represent one continuous attendance event, so its impact must follow the confirmed timetable/session structure and matched course record rather than a universal slot-weighting assumption.

As a result, students may have access to their attendance records but still lack a simple and reliable way to determine the effect of future attendance decisions without performing multiple calculations and manually checking their academic schedule.

AttendSense addresses this problem by providing a centralized attendance analysis and planning system that processes student-provided attendance information, validates the extracted information, and allows students to review, manually correct, and confirm it before it becomes eligible for attendance analysis.

Once successfully confirmed, the attendance dataset becomes the student's **latest confirmed attendance dataset** and remains the active base attendance data used by AttendSense until a newer attendance dataset is successfully extracted, validated, reviewed, confirmed, and saved.

Results produced by attendance calculators or future simulations shall **not modify the student's latest confirmed attendance dataset**. If a newer upload fails extraction, validation, review, confirmation, or saving, the previously confirmed attendance dataset shall remain unchanged.

Using the latest confirmed attendance dataset, the fixed **75% attendance threshold**, the student's confirmed timetable, and the official SPCE Academic Calendar, AttendSense shall provide three primary attendance-analysis capabilities:

1. **Safe Bunk Calculator**  
   Available when the applicable confirmed attendance record is **at or above 75%**. It allows the student to evaluate selected applicable upcoming classes they are considering missing and determines whether the selected bunk plan keeps the applicable course attendance at or above the required 75% threshold.

2. **Attendance Recovery Calculator**  
   Available when an applicable confirmed course attendance record is **below 75%**. It determines the additional attendance required for that course record to mathematically recover to at least the required 75% threshold.

3. **Future Attendance Simulator**  
   Available **regardless of the student's current attendance percentage**. It allows the student to create hypothetical future attendance scenarios by marking applicable upcoming classes as attended or missed and shows the resulting projected course attendance, with overall attendance available as supporting context where useful.

Attendance calculations, projected attendance, threshold results, and bunk-safety decisions must remain deterministic and mathematically verifiable. Document-processing technology may assist with extracting uploaded information, but generative AI / LLM reasoning shall not determine those calculations.

Through these capabilities, AttendSense reduces manual calculation effort and provides students with a reliable, schedule-aware method for understanding the effect of future attendance decisions while maintaining a clear separation between **confirmed attendance data** and **hypothetical attendance-analysis results**.

# 3. Proposed Solution & Scope

## 3.1 Proposed Solution

AttendSense shall provide students across the Sankalchand Patel College of Engineering (SPCE) with a centralized attendance analysis and smart attendance-planning system. It shall combine the student's latest confirmed course-aware attendance information, confirmed student-uploaded timetable, confirmed student-uploaded official SPCE Academic Calendar, course and batch applicability, current date/time, and future attendance decisions to provide deterministic attendance planning.

Students shall access AttendSense through secure authentication. Phase 1 authentication shall use **Sign in with Google**. The academic information configured for the student's account may retain the student academic context required for attendance planning, including course or batch applicability where relevant, but shall not automatically assign a timetable or Academic Calendar.

Whenever a student wants to provide or update attendance information, AttendSense shall accept attendance data in a supported:

- PDF file, or
- One or more image files.

Attendance files may be provided through the in-application upload workflow. On supported platforms and browsers, an installed AttendSense PWA may also receive supported attendance files through the operating system's share interface where PWA share-target functionality is successfully supported and validated.

The submitted attendance data shall pass through the required processing workflow before it becomes eligible for attendance analysis:

**Attendance Input → File/Input Validation → Extraction → Structured Data / Normalization Where Applicable → Automatic Validation → Student Review/Edit → Student Confirmation → Save**

AttendSense shall not use newly extracted attendance information for calculations until the student has reviewed, manually corrected where necessary, and confirmed that the system has correctly interpreted the submitted attendance data.

Once confirmed, the processed attendance information shall become the student's **latest confirmed attendance dataset**.

The latest confirmed attendance dataset shall remain the active base attendance data for subsequent attendance analyses until a newer attendance dataset is successfully processed, reviewed, confirmed, and saved.

If a newer attendance upload fails extraction, normalization, validation, review, confirmation, or saving, the existing latest confirmed attendance dataset shall remain unchanged.

Attendance calculator and simulation results shall not modify the latest confirmed attendance dataset.

AttendSense Phase 1 attendance calculations shall operate on the student's confirmed course-aware attendance records. Where a valid structured course code exists, it shall be the primary identity used to match a confirmed attendance record with a confirmed timetable session. Theory and practical courses with separate official course codes shall remain separate, and code-less or ambiguous timetable activities shall not affect attendance mathematics unless a confirmed mapping exists.

The system shall use the relevant combination of:

- Latest confirmed attendance dataset.
- Confirmed course attendance records.
- Confirmed student-uploaded timetable.
- Confirmed student-uploaded official SPCE Academic Calendar.
- Course identity and batch applicability where relevant.
- Applicable future timetable sessions and current date/time.
- Fixed 75% attendance threshold.
- Student-selected future attendance decisions, where applicable.

Using this information, AttendSense shall provide:

1. **Safe Bunk Calculator**
2. **Attendance Recovery Calculator**
3. **Future Attendance Simulator**

Attendance calculations and simulations shall use deterministic mathematical calculations.

Generative AI / LLM reasoning shall not be used to determine attendance percentages, projected attendance, safe bunk eligibility, recovery requirements, threshold results, or future attendance results.

Core feasibility for the required attendance PDF/image extraction, timetable screenshot extraction, Academic Calendar PDF extraction, course-code matching, batch filtering, calendar filtering, and deterministic attendance calculation has been successfully validated. This does not claim production readiness. PWA share-target compatibility remains subject to its own implementation validation on supported platforms and browsers.

---

## 3.2 Core MVP Features

### 3.2.1 Secure Student Access

Students shall authenticate before accessing protected AttendSense functionality.

Phase 1 authentication shall use **Sign in with Google**.

The authenticated Google identity shall be used to identify the AttendSense user and restore the student's saved application data where applicable.

For a returning student, an existing valid session may allow direct access without requiring another Google authentication.

If a valid session is unavailable, including after logout, session expiration, relevant application/browser data removal, PWA reinstallation, or access from another supported device or browser, the student shall authenticate again using Google.

Authentication with the same Google identity shall restore the existing AttendSense account and its persisted data rather than create a new account.

Detailed authentication and session behavior shall be defined in the Functional Requirements and User Flow sections of this PRD.

---

### 3.2.2 Academic Configuration

AttendSense shall maintain the academic information required to retain the student's academic context for attendance planning, including course or batch applicability where relevant.

The student shall provide only the required academic configuration through predefined selections wherever possible.

The saved academic configuration shall not automatically load, assign, or associate a timetable or Academic Calendar.

The student's saved academic configuration shall be associated with their AttendSense account and restored for returning use where applicable.

---

### 3.2.3 Academic Calendar

Students shall upload the official SPCE Academic Calendar as a one-time setup input in **PDF format only**. AttendSense shall not maintain or automatically assign an Academic Calendar.

The Academic Calendar workflow shall be:

**Academic Calendar PDF → File/Input Validation → Extraction → Structured Data → Automatic Validation → Student Review/Edit → Student Confirmation → Save**

After successful confirmation, the Academic Calendar shall remain associated with the student's account and be reused for attendance planning until the student explicitly replaces or updates it.

---

### 3.2.4 Class Timetable

Students shall upload their own timetable as a one-time setup input in **image or screenshot format only**. AttendSense shall not maintain or automatically assign a timetable.

The timetable workflow shall be:

**Timetable Image → File/Input Validation → Extraction → Structured Data → Automatic Validation → Student Review/Edit → Student Confirmation → Save**

After successful confirmation, the timetable shall remain associated with the student's account and be reused for attendance planning until the student explicitly replaces or updates it.

---

### 3.2.5 Attendance Data Input

Students shall be able to provide or update their attendance information using:

- A supported PDF file, or
- One or more supported image files.

Multiple images shall be supported when the complete attendance information cannot be represented in a single image.

AttendSense shall obtain the course-aware attendance information required for analysis from the submitted attendance data.

Students shall not be required to specify the original source or layout of the submitted attendance file.

Detailed requirements for in-application file selection, PWA share-target input, file validation, document processing, and failure handling shall be defined in the relevant sections of this PRD.

---

### 3.2.6 Attendance Data Processing and Confirmation

Before newly submitted attendance information becomes eligible for analysis, AttendSense shall perform the required:

1. File/input validation.
2. Attendance data extraction.
3. Attendance data normalization.
4. Automatic validation.
5. Student review/edit.
6. Student confirmation.
7. Saving.

The processing workflow shall determine the confirmed attendance records required for course-aware calculations. Where relevant non-attendance information is present, it shall be interpreted during normalization according to the defined attendance-data rules.

The student shall be shown the interpreted attendance information, may manually correct incorrect values, and shall be required to confirm its correctness before the dataset can become the latest confirmed attendance dataset.

If processing, review, confirmation, or saving does not successfully complete, the submitted dataset shall not replace the existing confirmed attendance dataset and shall not be used for calculations.

AttendSense shall not intentionally guess or invent missing attendance information when reliable processing is not possible.

---

### 3.2.7 Future Lecture and Laboratory Selection

After confirmed attendance, timetable, and Academic Calendar information is available, AttendSense shall use the confirmed timetable, confirmed Academic Calendar, course identity/mapping, batch applicability where relevant, and current date/time to present relevant upcoming sessions for an analysis feature.

Future class selection shall represent **future attendance decisions** applied to the corresponding matched course records. A practical or laboratory session spanning multiple timetable periods shall be treated as one scheduled attendance event when the confirmed timetable identifies it as continuous.

Only sessions applicable to the student's confirmed batch shall be considered. If required batch applicability cannot be safely determined, AttendSense shall require review rather than guess; batch-mismatched, code-less, ambiguous, or unmatched sessions shall not affect calculations.

Confirmed public holidays and non-teaching periods may suppress timetable sessions, while Teaching and Teaching Continues periods permit them. Unknown or ambiguous Academic Calendar events shall require review and shall not silently suppress classes.

For the current date, a class shall be selectable only while its scheduled start time is in the future. Once the class has started, it shall no longer be a future selectable bunk opportunity.

Where an analysis requires the student to select future classes, the interface shall allow selection of one or multiple applicable sessions according to the rules of that analysis feature.

---

### 3.2.8 Safe Bunk Calculator

The Safe Bunk Calculator shall be available when the applicable course record in the student's latest confirmed attendance dataset is **at or above 75%**.

The calculator shall use the student's latest confirmed course-aware attendance dataset as its starting point.

For Safe Bunk planning, AttendSense shall generate only the applicable remaining scheduled lectures and laboratory sessions for the **current day**.

The available classes shall be determined using the student's confirmed timetable, confirmed Academic Calendar, course-code mapping, batch applicability, and current date/time. Only classes whose scheduled start time has not yet been reached shall be selectable bunk opportunities; once a class has started, it shall no longer be selectable for Safe Bunk planning.

Timetable occurrences falling on holidays or other non-working academic days shall not be presented as applicable bunk options.

The student shall be able to select one or multiple applicable classes they are considering missing.

There shall be no predefined limit on how many of the displayed future classes the student may select for bunk analysis.

The calculation shall operate only on the matched course records for the explicitly selected applicable classes. Unselected displayed classes shall not be treated as projected attended sessions or otherwise affect the projection.

For each selected bunk of a matched applicable class:

- Projected conducted attendance shall increase by one.
- Projected present attendance shall remain unchanged.
- Projected absent attendance shall increase by one.

If multiple selected classes belong to the same matched course, each selected skipped occurrence shall affect that course record. If selected classes belong to different courses, each affected course record shall be calculated independently.

AttendSense shall calculate the resulting projected attendance for each affected course after applying the complete selected plan. Overall attendance may be displayed as supporting context where useful.

The selected bunk plan shall be considered **safe** only when the resulting attendance for each affected matched course remains **at or above 75%**.

If the selected plan would reduce an affected matched course below 75%, AttendSense shall clearly indicate that the selected plan is unsafe.

The result shall clearly communicate that it reflects only the classes explicitly selected for bunk analysis and does not assume attendance for unselected displayed classes.

Safe Bunk calculations shall not modify the student's latest confirmed attendance dataset.

---

### 3.2.9 Attendance Recovery Calculator

The Attendance Recovery Calculator shall be available when an applicable course record in the student's latest confirmed attendance dataset is **below 75%**.

The calculator shall use the student's latest confirmed course-aware attendance dataset.

AttendSense shall calculate the additional future attendance required for the applicable course record to mathematically reach at least the required **75% threshold**.

After calculating the required recovery attendance, AttendSense shall use the confirmed timetable, confirmed Academic Calendar, course-code mapping, and batch applicability to determine the actual upcoming sessions for that course that can contribute toward recovery.

For an attended future matched class, projected conducted attendance and projected present attendance shall each increase by one, while projected absent attendance remains unchanged.

Recovery planning shall begin with the next applicable future scheduled class and may continue across subsequent academic weeks until the required recovery attendance has been accumulated.

Holidays and other non-working academic days shall not contribute recovery opportunities.

Where sufficient timetable and academic-calendar information is available, AttendSense shall determine the earliest projected point at which the student can mathematically reach at least 75% by attending the applicable future classes.

If the available timetable or Academic Calendar data ends before enough future sessions are available to determine the complete recovery path, AttendSense shall:

- Still provide the mathematically required recovery attendance.
- Clearly indicate that the complete recovery schedule or date cannot currently be determined.
- Not invent future class occurrences beyond the available academic data.

The recovery result shall clearly communicate that the calculated recovery path assumes the applicable listed sessions are successfully attended.

If the student later misses attendance during the recovery period, the previous recovery projection shall not automatically modify the student's confirmed attendance. A new calculation shall use the latest confirmed attendance dataset available at that time.

Attendance Recovery calculations shall not modify the student's latest confirmed attendance dataset.

---

### 3.2.10 Future Attendance Simulator

The Future Attendance Simulator shall be available **regardless of the student's current attendance percentage**.

The simulator shall use the student's latest confirmed course-aware attendance dataset as its starting point.

Safe Bunk focuses on today's remaining applicable classes, while Future Attendance Simulation may cover an applicable future simulation period within the available confirmed timetable and Academic Calendar coverage.

The student shall be able to select an applicable future simulation period within the range supported by the available timetable and academic-calendar data.

AttendSense shall generate the applicable upcoming sessions within the selected simulation period using the confirmed timetable, confirmed Academic Calendar, course-code mapping, batch applicability, and current date/time.

Holidays and other non-working academic days shall not generate applicable future class occurrences.

Every displayed future class shall initially be treated as **ATTEND**.

The student shall be able to freely change one or multiple applicable future classes between:

- **ATTEND**
- **BUNK/MISS**

There shall be no attendance-percentage eligibility restriction on these hypothetical selections.

For each future matched class selected for simulation:

- **ATTEND** shall increase projected conducted attendance and projected present attendance by one and leave projected absent attendance unchanged.
- **BUNK/MISS** shall increase projected conducted attendance and projected absent attendance by one and leave projected present attendance unchanged.

AttendSense shall apply the complete selected scenario independently to each corresponding matched course record, maintaining theory/practical separation, and calculate the resulting projected course attendance percentage. Overall attendance may be displayed as supporting context where useful.

The simulator may update the predicted result interactively as the student changes future ATTEND/BUNK selections.

The result may display:

- Relevant confirmed course attendance.
- Number of simulated attended and missed sessions.
- Projected course attendance.
- Change from the current course attendance position.
- Position relative to the fixed 75% threshold.
- Selected future attendance scenario.

Future Attendance Simulation shall represent a **hypothetical mathematical scenario** and shall not be presented as a guarantee of future official attendance.

Simulation results shall never modify the student's latest confirmed attendance dataset.

---

### 3.2.11 Attendance Results

AttendSense shall present calculation results in a clear, understandable, and student-friendly form.

Depending on the selected analysis, results may include:

- Relevant confirmed course attendance.
- Projected course attendance where applicable.
- Attendance position of the applicable course relative to the fixed 75% threshold.
- Whether a selected bunk plan is safe or unsafe.
- Projected attendance of affected courses after a selected bunk plan.
- Additional attendance required for course recovery.
- Relevant future sessions associated with a recovery plan where applicable.
- Projected course attendance for a Future Attendance Simulation.
- Attendance position after a simulated future scenario.
- Relevant future class dates.
- Relevant future session impact.

Current attendance information may be displayed as supporting context where required to explain an analysis result.

**Current Attendance Calculation shall not exist as a separate calculator or standalone Phase 1 feature.**

---

## 3.3 Attendance Threshold

AttendSense shall use a fixed minimum attendance threshold of:

**75%**

The threshold shall:

- Be defined by the product requirements.
- Not be configurable by students.
- Determine Safe Bunk Calculator eligibility when the applicable confirmed course attendance is at or above 75%.
- Determine Attendance Recovery Calculator eligibility when an applicable confirmed course attendance is below 75%.
- Be used to evaluate Safe Bunk results for affected matched course records.
- Be used as the recovery target for applicable course records.
- Be used as contextual information when evaluating Future Attendance Simulation results.

Future Attendance Simulator availability shall **not depend on whether the student's attendance is above or below 75%**.

---

## 3.4 Phase 1 Scope

The AttendSense Phase 1 MVP shall include:

- Secure Sign in with Google authentication.
- First-time academic configuration.
- Returning-user account and session handling.
- Restoration of persisted user data after successful returning-user authentication.
- Saved academic context for attendance planning, including course or batch applicability where relevant.
- Attendance input through supported PDF and image formats.
- Multiple-image attendance input where required.
- Attendance data extraction.
- Attendance data normalization.
- Automatic attendance-data validation.
- Mandatory student review, manual editing, confirmation, and saving of newly extracted attendance information.
- Student-uploaded timetable input in image or screenshot format only.
- Timetable extraction, validation, student review/edit, confirmation, and persistence until replaced.
- Student-uploaded official SPCE Academic Calendar input in PDF format only.
- Academic Calendar extraction, validation, student review/edit, confirmation, and persistence until replaced.
- Course-code-first matching of confirmed attendance records with confirmed timetable sessions.
- Theory/practical separation where official course codes are separate.
- Batch-aware timetable filtering and review where batch applicability is uncertain.
- Conservative Academic Calendar handling for Teaching, Teaching Continues, Non-Teaching, and unknown or ambiguous events.
- Course-aware attendance calculations based on confirmed records and matched applicable sessions.
- Future session selection where required by an analysis feature.
- Safe Bunk Calculator for applicable confirmed course attendance at or above 75%.
- Attendance Recovery Calculator for applicable confirmed course attendance below 75%.
- Future Attendance Simulator regardless of current attendance percentage.
- Schedule-aware future attendance analysis.
- Fixed 75% attendance threshold.
- Deterministic and mathematically verifiable attendance calculations.
- Persistence of the student's latest confirmed attendance dataset.
- Use of the latest confirmed attendance dataset across subsequent analysis features until it is validly replaced.
- Safe replacement of previously confirmed attendance data only when a newer dataset is successfully processed, reviewed, confirmed, and saved.
- Preservation of the previous confirmed dataset when a newer upload fails or is rejected.
- Separation of confirmed attendance data from hypothetical calculator and simulation results.
- Clear attendance-analysis results, with overall attendance available as supporting context where useful.
- Progressive Web Application (PWA) operation.
- Mobile-first, modern, interactive, responsive, and student-friendly UI/UX.
- Online-only Phase 1 operation.
- In-application PDF and image file selection.
- PWA share-target functionality for supported attendance files on supported platforms, subject to successful technical evaluation of installation, share-target registration, file reception, and relevant platform/browser support.

Features outside the requirements defined for Phase 1 shall not be considered part of the Phase 1 MVP unless they are formally added to this PRD.

# 4. User Flow

## 4.1 Overview

AttendSense shall provide a structured student workflow covering authentication, academic configuration, timetable and Academic Calendar setup, attendance-data processing, and attendance analysis.

Attendance analysis shall operate using the student's latest confirmed course-aware attendance dataset together with a confirmed timetable and confirmed Academic Calendar.

The general application flow shall be:

**Open AttendSense → Authentication → Academic Context → Required Timetable/Academic Calendar Setup → Dashboard / Today's Decision Center → Attendance Data Availability → Select Analysis Feature → Feature-Specific Attendance Planning → Calculation/Simulation → Result**

A student shall not be required to upload attendance data every time they use AttendSense.

Once an attendance dataset has been successfully processed, reviewed, confirmed, and saved, it shall remain the student's latest confirmed attendance dataset until a newer dataset successfully replaces it.

Calculator and simulation results shall not modify that confirmed dataset.

For calendar-dependent flows, confirmed Teaching and Teaching Continues states shall permit timetable sessions, while confirmed public holidays and non-teaching periods may suppress them. Unknown or ambiguous calendar events shall require review or conservative handling and shall not silently suppress classes.

Where structured course codes exist, course code shall be the primary identity for matching attendance records and timetable sessions. Theory and Practical records with separate official codes shall remain separate, and minor OCR differences in course names shall not override a valid course-code match.

---

## 4.2 Student Authentication Flow

When the student opens AttendSense, the system shall determine whether a valid authenticated session already exists.

### Returning Student with Valid Session

1. The student opens AttendSense.
2. AttendSense detects an existing valid authenticated session.
3. The student's account and saved application data are restored.
4. The student is taken directly to the main application interface/dashboard.

The student shall not be required to authenticate again while a valid session remains available.

### Student Without Valid Session

If no valid session exists:

1. The student opens AttendSense.
2. AttendSense presents the authentication interface.
3. The student selects **Sign in with Google**.
4. Google authentication is completed.
5. AttendSense identifies the user through the authenticated Google identity.
6. If the identity belongs to an existing AttendSense account, the existing account and persisted data are restored.
7. If the identity represents a first-time user, AttendSense creates the required account and proceeds to first-time academic configuration.

Authentication shall be required again when the previous session is unavailable because of circumstances such as:

- Manual logout.
- Session expiration.
- Relevant browser/application data removal.
- PWA reinstallation.
- Access through another supported device or browser.

Reinstallation of the PWA shall not create a new AttendSense account when the student authenticates using the same Google identity.

Only authenticated students shall be allowed to access protected attendance-analysis functionality.

---

## 4.3 First-Time Academic Configuration Flow

After the first successful authentication, AttendSense shall determine whether the student has completed the required academic configuration.

For a first-time student:

1. AttendSense presents the academic setup interface.
2. The student selects the required academic information from supported predefined options.
3. AttendSense validates and saves the academic context required for attendance planning.
4. AttendSense determines whether a confirmed timetable and confirmed Academic Calendar are available.
5. The student completes the required setup flow for any missing input before calculations that depend on it are allowed.

Saving academic configuration shall not automatically assign or provide timetable or Academic Calendar data.

Returning students shall not be required to repeat first-time academic configuration unless the stored configuration needs to be updated.

### Timetable Setup

If no confirmed timetable exists, the student shall select timetable setup and upload a timetable **image or screenshot only**. AttendSense shall perform file/input validation, extract structured timetable data, perform automatic validation, and show the result for student review and manual editing. After the student confirms and the timetable is saved, it shall remain active until the student explicitly replaces or updates it.

### Academic Calendar Setup

If no confirmed Academic Calendar exists, the student shall select Academic Calendar setup and upload the official SPCE Academic Calendar **PDF only**. AttendSense shall perform file/input validation, extract structured calendar data, perform automatic validation, and show the result for student review and manual editing. After the student confirms and the Academic Calendar is saved, it shall remain active until the student explicitly replaces or updates it.

---

## 4.4 Main Dashboard Flow

After authentication and completion of required academic configuration, the student shall reach the AttendSense dashboard.

The dashboard shall provide access to:

- Attendance-data upload/update.
- Today's Decision Center / Safe Bunk Calculator.
- Attendance Recovery Calculator.
- Future Attendance Simulator.
- Timetable update/replacement.
- Academic Calendar update/replacement.
- Relevant account or academic-configuration controls.

If a latest confirmed attendance dataset exists, AttendSense shall make it available to all applicable attendance-analysis features.

If no confirmed attendance dataset exists, the student shall be required to provide attendance information before performing attendance analysis. If a confirmed timetable or Academic Calendar required by an analysis is unavailable, the student shall be directed to complete the corresponding setup flow.

The interface may display contextual information about the latest confirmed attendance dataset, such as when it was last updated.

**Current Attendance Calculation shall not appear as a separate calculator or standalone dashboard feature.**

---

## 4.5 Attendance Data Input Flow

Attendance data may be provided through:

1. The in-application attendance upload interface.
2. PWA share-target input on supported platforms and browsers where the required functionality has been successfully validated.

Supported Phase 1 attendance input shall consist of:

- A supported PDF file, or
- One or more supported image files.

### In-Application Input

When the student chooses to provide attendance information from within AttendSense:

1. The student selects the attendance upload/update action.
2. AttendSense presents the supported file-selection interface.
3. For image input, the student may select one or multiple supported images.
4. For PDF input, the system shall use the device/browser's supported file-selection interface so the student may select an accessible PDF.
5. AttendSense receives the selected file or files.
6. File validation begins.

The student shall not be required to manually identify the original attendance source.

---

## 4.6 PWA Share-Target Input Flow

Where supported and successfully validated, an installed AttendSense PWA may appear as a share target when the student shares a supported attendance PDF or image from another application.

The expected flow shall be:

1. The student selects a supported attendance image or PDF in another application.
2. The student activates the device's share interface.
3. If AttendSense is available as a registered share target, the student selects AttendSense.
4. AttendSense launches or receives the shared attendance file.
5. The system checks whether the student has a valid authenticated AttendSense session.

### If the Student Is Authenticated

The shared attendance file proceeds to the attendance-input processing workflow.

### If the Student Is Not Authenticated

1. AttendSense temporarily retains the received input only as permitted by the selected technical implementation.
2. The student is required to authenticate using Google.
3. After successful authentication, AttendSense resumes the intended attendance-upload workflow where technically supported.
4. If the shared input cannot be safely retained through authentication, the student shall be clearly asked to provide the attendance file again.

PWA share-target behavior shall remain subject to successful technical evaluation of:

- PWA installation.
- Share-target registration.
- Appearance in the operating-system share interface.
- File reception.
- Authentication interaction.
- Platform/browser compatibility.

AttendSense shall not claim guaranteed share-sheet availability on every device or browser.

---

## 4.7 Attendance Processing Flow

After attendance data is received:

1. AttendSense validates the submitted file or files.
2. The system determines the applicable processing workflow.
3. Attendance information is extracted.
4. Extracted information is normalized.
5. Relevant No Attendance/non-attendance values are handled according to the defined normalization rules.
6. AttendSense determines the course-aware attendance information required for approved calculations and preserves valid structured course codes where available.
7. Theory and practical attendance records remain separate when they have separate official course codes.
8. Automatic attendance-data validation is performed.
9. If validation succeeds, the interpreted attendance information is prepared for student review and editing.

The required processing pipeline shall be:

**Attendance Input → File/Input Validation → Extraction → Structured Data / Normalization → Automatic Validation → Student Review/Edit → Student Confirmation → Save**

If reliable processing cannot be completed, the workflow shall stop and the student shall receive an appropriate error or re-upload request.

AttendSense shall not generate an attendance-analysis result from uncertain or invalid attendance data.

---

## 4.8 Attendance Review and Confirmation Flow

After successful processing and automatic validation:

1. AttendSense displays the interpreted attendance information to the student.
2. The student reviews the information for correctness.
3. The student may manually correct incorrect extracted values.
4. Any corrected data is validated before confirmation.
5. The student either:
   - Confirms the extracted attendance dataset, or
   - Rejects the extracted attendance dataset.

### If Confirmed

1. The processed dataset becomes the student's **latest confirmed attendance dataset**.
2. The dataset is saved for subsequent attendance analyses.
3. If an older confirmed dataset exists, the newly confirmed dataset safely replaces it.
4. The student proceeds to the dashboard or intended analysis workflow.

### If Rejected

1. The new dataset shall not be used for attendance calculations.
2. The previous confirmed dataset, if one exists, shall remain unchanged.
3. The student shall be allowed to provide attendance data again.

---

## 4.9 Analysis Feature Selection Flow

After a confirmed attendance dataset is available, the student shall be able to select one of the three Phase 1 attendance-analysis features:

1. **Safe Bunk Calculator**
2. **Attendance Recovery Calculator**
3. **Future Attendance Simulator**

Feature availability shall be determined as follows:

### Safe Bunk Calculator

Available when an applicable confirmed course attendance record is:

**>= 75%**

### Attendance Recovery Calculator

Available when an applicable confirmed course attendance record is:

**< 75%**

### Future Attendance Simulator

Available at:

**Any confirmed attendance percentage**

Both Safe Bunk and Attendance Recovery may remain visible in the interface regardless of eligibility, but the interface shall clearly communicate when a feature is not currently applicable.

Future Attendance Simulator shall remain available whenever valid confirmed attendance data exists.

---

## 4.10 Safe Bunk User Flow

When the student selects **Safe Bunk Calculator**:

1. AttendSense verifies that an applicable confirmed course attendance record is at or above 75%.
2. If the relevant course attendance is below 75%, the Safe Bunk workflow shall not proceed for that course and the student shall be directed toward Attendance Recovery where appropriate.
3. AttendSense loads:
   - Latest confirmed course-aware attendance data.
   - Confirmed timetable.
   - Confirmed Academic Calendar.
   - Course mappings.
   - Batch applicability.
   - Current date/time.
4. AttendSense determines whether today's confirmed Academic Calendar status permits applicable classes.
5. AttendSense generates only the student's applicable remaining classes for the current day. A class is selectable only while its scheduled start time is in the future; once it has started, it is not a future bunk option.
6. Batch filtering is applied. If batch applicability cannot be safely determined, AttendSense shall require review rather than guess.
7. Sessions are matched to attendance records primarily by structured course code where available. Code-less, unmatched, or ambiguous sessions may remain visible for review but shall not affect attendance calculations without a confirmed mapping.
8. AttendSense presents the applicable remaining classes in a student-friendly schedule interface.
9. The student selects one or more classes they are considering missing.
10. Only the explicitly selected classes are projected as skipped. For each selected matched class:
    - Projected conducted attendance increases by one.
    - Projected present attendance remains unchanged.
    - Projected absent attendance increases by one.
11. Multiple selected classes for the same course shall each affect that course record; selected classes for different courses shall be calculated independently. Unselected displayed classes shall not be assumed to be attended or otherwise affect the projection.
12. AttendSense calculates projected attendance for each affected course and compares it with the fixed 75% threshold. Overall attendance may be displayed as supporting context where useful.

### Safe Result

If the projected attendance for each affected course is at or above 75%, AttendSense shall indicate that the selected bunk plan is mathematically safe.

### Unsafe Result

If the projected attendance for an affected course falls below 75%, AttendSense shall indicate that the selected bunk plan is unsafe.

The result shall clearly distinguish Safe, At Threshold, or Below Threshold status as applicable and shall state that it reflects only the classes explicitly selected for bunk analysis.

The student shall be able to modify the selections and recalculate the plan.

Safe Bunk analysis shall not modify the student's confirmed attendance dataset.

---

## 4.11 Attendance Recovery User Flow

When the student selects **Attendance Recovery Calculator**:

1. AttendSense verifies that an applicable confirmed course attendance record is below 75%.
2. If the relevant course attendance is already at or above 75%, AttendSense shall indicate that recovery is not currently required for that course.
3. AttendSense loads:
   - Latest confirmed course record, including conducted, present, and absent attendance.
   - Confirmed timetable and Academic Calendar.
   - Course mapping and batch applicability.
   - Fixed 75% threshold.
4. AttendSense calculates the minimum future attended sessions required for the applicable course to mathematically reach at least 75%.
5. For each projected attended matched session, conducted attendance and present attendance increase by one while absent attendance remains unchanged.
6. Valid upcoming sessions for that course are generated from the confirmed timetable and Academic Calendar, with course matching and batch applicability applied.
7. Confirmed holidays and non-teaching periods are excluded.
8. Future attendance opportunities are accumulated until the calculated recovery requirement is met.
9. If necessary, recovery planning continues across subsequent academic weeks within available schedule/calendar coverage.
10. Where sufficient future schedule data is available, AttendSense determines the earliest projected recovery point/date.

The result may include:

- Current confirmed course attendance.
- Required 75% threshold.
- Required future attendance for course recovery.
- Applicable future sessions contributing to the recovery path.
- Projected course attendance at the recovery point.
- Estimated recovery date where determinable.

The result shall clearly communicate that the recovery projection assumes the identified sessions are successfully attended.

If available timetable/calendar data ends before the complete recovery path can be determined, AttendSense shall provide the mathematical recovery requirement but shall not invent unavailable future class occurrences.

Attendance Recovery analysis shall not modify the student's confirmed attendance dataset.

---

## 4.12 Future Attendance Simulator User Flow

When the student selects **Future Attendance Simulator**:

1. AttendSense loads the latest confirmed course-aware attendance dataset.
2. No 75% eligibility restriction is applied.
3. The student selects the desired future simulation period within the available academic timetable/calendar range.
4. AttendSense generates applicable future sessions within that period using the confirmed timetable, confirmed Academic Calendar, course mapping, batch applicability, and date/time as appropriate.
5. Holidays and other non-working academic days are excluded.
6. Every displayed future class initially has the status **ATTEND**.
7. The student may freely change one or multiple classes between:
   - **ATTEND**
   - **BUNK/MISS**
8. For each explicitly marked matched class:
   - **ATTEND** increases projected conducted attendance and projected present attendance by one and leaves projected absent attendance unchanged.
   - **BUNK/MISS** increases projected conducted attendance and projected absent attendance by one and leaves projected present attendance unchanged.
9. AttendSense applies the scenario independently to each affected course record, maintaining theory/practical separation, and calculates the resulting projected course attendance. Overall attendance may be shown as supporting context where useful.
10. The prediction may update interactively while the student changes the scenario.

The simulator result may display:

- Current confirmed course attendance.
- Future attended and missed sessions.
- Projected course attendance.
- Difference from the current course attendance position.
- Position relative to 75%.
- Selected future attendance plan.

The simulator shall describe the result as a hypothetical mathematical scenario rather than a guaranteed future official attendance value.

Future Attendance Simulator results shall not modify the student's latest confirmed attendance dataset.

---

## 4.13 Reuse and Persistence Flow

Once the student has successfully confirmed attendance data, that dataset shall be available for repeated attendance analyses.

For example:

**Confirmed Attendance → Safe Bunk → Result → Future Simulator → Result → Safe Bunk Again**

All of these analyses shall use the same latest confirmed attendance dataset unless the student successfully provides and confirms newer attendance information.

The student shall not be required to re-upload attendance merely because:

- Another calculator is selected.
- A previous analysis has been completed.
- The application is reopened while the existing confirmed dataset remains associated with the account.
- Another hypothetical scenario is created.

Calculator and simulation outputs shall never automatically become confirmed attendance data.

The confirmed timetable and confirmed Academic Calendar shall also be reused for applicable analysis features. The student shall not be required to upload either again merely because the application is reopened, another feature is selected, another calculation is performed, or the student signs back into the same account.

---

## 4.14 Attendance Update and Replacement Flow

When the student wants calculations based on newer official attendance information:

1. The student selects **Update Attendance**.
2. A newer PDF or image attendance dataset is provided.
3. The complete processing workflow is performed:
    - File Validation.
    - Extraction.
    - Normalization.
    - Automatic validation.
    - Student review/edit.
    - Student confirmation.
    - Saving.
4. If successfully confirmed and saved, the new dataset becomes the latest confirmed attendance dataset.
5. Subsequent Safe Bunk, Recovery, and Future Simulation analyses use the newly confirmed dataset.

The previous confirmed attendance dataset shall only be replaced after the newer dataset has successfully completed the required workflow.

If the newer dataset:

- Cannot be processed,
- Fails validation,
- Is rejected by the student, or
- Cannot be successfully saved,

the previous confirmed attendance dataset shall remain active and unchanged.

### Timetable Update and Replacement

When the student needs to update the timetable, the student uploads a replacement timetable image or screenshot. AttendSense validates the input, extracts and validates structured timetable data, and allows the student to review, manually edit, confirm, and save it. The existing confirmed timetable shall remain active until the replacement has successfully completed the full workflow. A failed or rejected replacement shall not overwrite the existing confirmed timetable.

### Academic Calendar Update and Replacement

When the student needs to update the Academic Calendar, the student uploads a replacement official SPCE Academic Calendar PDF. AttendSense validates the input, extracts and validates structured calendar data, and allows the student to review, manually edit, confirm, and save it. The existing confirmed Academic Calendar shall remain active until the replacement has successfully completed the full workflow. A failed or rejected replacement shall not overwrite the existing confirmed Academic Calendar.

---

## 4.15 Result Flow

After completing an attendance analysis, AttendSense shall present a result appropriate to the selected feature.

Results may include:

- Confirmed applicable course attendance.
- Projected course attendance.
- Position of an applicable course relative to the fixed 75% threshold.
- Safe/unsafe bunk-plan status.
- Projected attendance for affected courses after a Safe Bunk plan.
- Required future attendance for course recovery.
- Projected course attendance at the recovery point.
- Estimated recovery date where determinable.
- Projected course attendance from a Future Attendance Simulation.
- Relevant upcoming sessions and affected courses.
- Overall attendance as supporting context where useful.

AttendSense shall clearly distinguish:

- **Confirmed official attendance data**
- **Calculated attendance requirements**
- **Hypothetical/projected attendance results**

A projected or simulated attendance value shall never be represented as updated official attendance.

---

## 4.16 Error and Invalid Data Flow

AttendSense shall prevent attendance analysis when required information is missing, invalid, unconfirmed, or cannot be reliably determined.

Examples include:

- Unsupported attendance file format.
- Corrupted attendance file.
- Unreadable attendance image.
- Invalid PDF.
- Incomplete attendance information.
- Missing confirmed timetable.
- Missing confirmed Academic Calendar.
- Invalid or unreadable timetable image.
- Invalid, unreadable, or unsupported Academic Calendar PDF.
- Extracted timetable or Academic Calendar data has not been confirmed.
- Required course-aware attendance information cannot be reliably determined.
- Required course code is unmatched or course mapping is ambiguous.
- Batch applicability is uncertain.
- Academic Calendar status is ambiguous.
- Relevant non-attendance information cannot be normalized reliably where required.
- Missing academic configuration.
- Invalid attendance values.
- Attendance data has not been confirmed.
- Applicable future timetable occurrence cannot be determined.
- Required extraction, validation, or save operation fails.

AttendSense shall display a clear error message indicating what the student needs to correct or retry.

AttendSense shall not silently guess, invent, or substitute required attendance information.

---

## 4.17 Primary User Flow Summary

The primary AttendSense workflow can be represented as:

**Student Opens AttendSense**  
↓  
**Valid Session?**

**Yes → Restore Existing Account and Saved Data**

**No → Sign in with Google**  
↓  
**Academic Context Available?**

**No → Academic Configuration → Save Academic Context**

↓  
**Confirmed Timetable Available?**

**No → Upload Timetable Image/Screenshot → Extract → Review/Edit → Confirm → Save**

↓  
**Confirmed Academic Calendar Available?**

**No → Upload Official SPCE Academic Calendar PDF → Extract → Review/Edit → Confirm → Save**

↓  
**Dashboard / Today's Decision Center**

↓  
**Confirmed Attendance Dataset Available?**

**No → Import Attendance PDF/Image → Extract → Normalize/Validate → Review/Edit → Confirm → Save**

**Yes → Use Existing Latest Confirmed Attendance**  
↓  
**Select Analysis Feature**

├── **Safe Bunk Calculator — Applicable Course Attendance at or Above 75%**  
│   ↓  
│   Today's Remaining Applicable Classes Only  
│   ↓  
│   Student Selects Classes to Bunk  
│   ↓  
│   Project Only Selected Skips by Matched Course  
│   ↓  
│   Safe / At Threshold / Below Threshold Result  
│  
├── **Attendance Recovery — Applicable Course Attendance Below 75%**  
│   ↓  
│   Calculate Required Future Attended Sessions  
│   ↓  
│   Map to Applicable Future Timetable and Academic Calendar Sessions  
│   ↓  
│   Determine Recovery Path Where Coverage Allows  
│   ↓  
│   Recovery Result  
│  
└── **Future Attendance Simulator — Any Confirmed Attendance Position**  
    ↓  
    Select Future Simulation Period  
    ↓  
    Student Creates ATTEND/BUNK Scenario  
    ↓  
    Project Each Matched Course Independently  
    ↓  
    Hypothetical Course-Attendance Result

↓  
**Modify Analysis / Select Another Feature / Update Attendance, Timetable, or Academic Calendar**

All analysis features shall continue using the latest confirmed attendance dataset, timetable, and Academic Calendar until each is successfully replaced through its required review, confirmation, and saving workflow.

# 5. Functional Requirements

## 5.1 Authentication and Student Account

### FR-001 — Google Authentication

AttendSense shall require students to authenticate before accessing protected application functionality.

Phase 1 authentication shall use **Sign in with Google**.

The system shall:

- Allow a student to authenticate using a supported Google account.
- Use the authenticated Google identity to identify the corresponding AttendSense account.
- Create an AttendSense account for a first-time authenticated user.
- Restore the existing AttendSense account when a returning student authenticates using the same Google identity.
- Prevent unauthenticated access to protected attendance-analysis functionality.

AttendSense shall not require college-issued enrollment numbers as the primary authentication mechanism in Phase 1.

---

### FR-002 — Authentication Session Persistence

AttendSense shall maintain the student's authenticated session according to the selected authentication technology and applicable security controls.

When a valid authenticated session exists:

- The student shall not be required to sign in again.
- The student shall be allowed to access their existing AttendSense account and persisted application data.

The student shall be required to authenticate again when a valid session is unavailable, including circumstances such as:

- Manual logout.
- Session expiration.
- Relevant browser or application data removal.
- PWA reinstallation.
- Access from another supported device or browser where no valid session exists.

PWA reinstallation shall not create a new AttendSense account when the student subsequently authenticates using the same Google identity.

---

### FR-003 — Logout

AttendSense shall provide an authenticated student with the ability to log out.

After logout:

- The active authenticated session shall be terminated according to the authentication implementation.
- Protected AttendSense functionality shall require authentication before it can be accessed again.
- Persisted account data shall remain associated with the student's AttendSense account unless separately deleted through supported functionality.

---

## 5.2 Academic Configuration

### FR-004 — First-Time Academic Configuration

After first-time authentication, AttendSense shall require the student to complete the academic configuration required to retain the student's academic context for attendance planning.

The student shall provide only the required academic information through supported predefined selections wherever possible.

Academic configuration shall not automatically assign, select, or provide timetable or Academic Calendar data.

---

### FR-005 — Academic Configuration Persistence

AttendSense shall save the student's completed academic configuration to the authenticated AttendSense account.

Returning students shall not be required to repeat first-time academic configuration while a valid saved configuration exists.

The saved academic configuration shall be restored after successful returning-user authentication where applicable.

---

### FR-006 — Academic Configuration Update

AttendSense shall allow the student to update supported academic configuration when necessary.

When academic configuration is changed, subsequent schedule-aware attendance analysis shall use the updated academic context where relevant, without automatically replacing the student's confirmed timetable or Academic Calendar.

The system shall validate supported configuration selections before saving them.

---

## 5.3 Academic Calendar and Timetable

### FR-007 — Timetable Upload, Confirmation, and Replacement

AttendSense shall allow an authenticated student to upload a timetable **image or screenshot only**. The timetable workflow shall perform file/input validation, extraction, structured timetable representation, automatic validation, student review/edit, explicit confirmation, and saving.

Only a confirmed timetable may be used for attendance calculations. A confirmed timetable shall remain associated with the account and be reused until the student explicitly replaces or updates it.

A replacement timetable shall not overwrite the previous confirmed timetable unless the replacement successfully completes the complete workflow. A failed or rejected replacement shall leave the previous confirmed timetable active.

---

### FR-008 — Academic Calendar Upload, Confirmation, and Replacement

AttendSense shall allow an authenticated student to upload the official SPCE Academic Calendar **PDF only**. The Academic Calendar workflow shall perform file/input validation, extraction, structured calendar representation, automatic validation, student review/edit, explicit confirmation, and saving.

Only a confirmed Academic Calendar may be used for attendance calculations. A confirmed Academic Calendar shall remain associated with the account and be reused until the student explicitly replaces or updates it.

A replacement Academic Calendar shall not overwrite the previous confirmed Academic Calendar unless the replacement successfully completes the complete workflow. A failed or rejected replacement shall leave the previous confirmed Academic Calendar active.

---

### FR-009 — Confirmed Timetable and Academic Calendar Structure

The confirmed timetable shall preserve calculation-relevant information where reliably available, including day/date applicability, class start/end time, course code or session identity, theory/practical distinction, batch applicability, and continuous multi-period session structure. A continuous practical or laboratory session shall be treated as one scheduled attendance event when identified as continuous; AttendSense shall not apply a universal duration-based attendance weight.

The confirmed Academic Calendar shall classify relevant information conservatively as Teaching, Teaching Continues, Non-Teaching, or Unknown / Requires Review. Teaching and Teaching Continues permit timetable sessions; confirmed public holidays and non-teaching periods may suppress them. Unknown or ambiguous calendar events shall require review or conservative handling and shall not silently suppress timetable sessions.

Academic Calendar applicability and scope metadata shall be respected where required.

---

## 5.4 Attendance Data Input

### FR-010 — Attendance File Input

AttendSense shall allow authenticated students to provide attendance information when no confirmed attendance dataset exists and to provide newer attendance information whenever they want to update the existing confirmed attendance dataset.

Phase 1 shall support:

- Supported PDF files.
- One or more supported image files.

A student shall not be required to upload attendance information again for every attendance analysis while a valid latest confirmed attendance dataset already exists.

---

### FR-011 — Image File Selection

When the student selects image-based attendance input from within AttendSense:

- The system shall invoke the supported device/browser file-selection interface.
- The student shall be able to select a supported attendance image.
- The student shall be able to select multiple images when the complete attendance information spans more than one image.
- The selected images shall enter the standard attendance-processing workflow.

AttendSense shall validate the selected files before attempting attendance-data extraction.

---

### FR-012 — PDF File Selection

When the student selects PDF-based attendance input from within AttendSense:

- The system shall invoke the supported device/browser file-selection interface.
- The student shall be able to select an accessible supported PDF.
- The selected PDF shall enter the standard attendance-processing workflow.

The student shall not be required to upload the PDF to a specific cloud-storage provider such as Google Drive or Dropbox before selecting it if the device/browser file picker can access the file through another supported location.

---

### FR-013 — Attendance Input Source Independence

AttendSense shall not require the student to manually identify the original attendance-system layout or source before submitting an attendance file.

The document-processing workflow shall attempt to determine whether the submitted information contains the required attendance values.

Phase 1 acceptance shall be based primarily on whether the required attendance information can be reliably extracted and validated from the supported PDF or image input.

---

## 5.5 PWA Share-Target Input

### FR-014 — PWA Share-Target Registration

AttendSense shall implement PWA share-target functionality for supported attendance files where the selected platform and browser provide the required support.

When successfully installed and registered as a supported share target, AttendSense may appear as an available destination in the device's operating-system share interface.

Share-target availability shall remain subject to:

- Successful PWA installation.
- Successful share-target registration.
- Operating-system support.
- Browser/PWA support.
- Correct file-type registration.
- Successful file reception.

AttendSense shall not assume or guarantee that the PWA will appear in the share interface on every platform, browser, or device.

---

### FR-015 — Shared Attendance File Reception

Where PWA share-target functionality is supported:

1. The student may select a supported attendance image or PDF in another application.
2. The student may activate the operating-system share interface.
3. If AttendSense is available as a share target, the student may select AttendSense.
4. AttendSense shall receive the supported shared file.
5. The shared file shall enter the normal attendance-input processing workflow.

Shared files shall be subject to the same file validation, extraction, normalization, automatic validation, review, and confirmation requirements as files selected directly within AttendSense.

---

### FR-016 — Shared File Authentication Handling

When AttendSense receives a supported shared attendance file, the system shall determine whether a valid authenticated session exists.

If the student is authenticated:

- The shared file may proceed to the standard attendance-processing workflow.

If the student is not authenticated:

- AttendSense shall require Google authentication before protected attendance processing proceeds.
- The implementation may temporarily retain the shared input only where this can be done safely and reliably.
- After successful authentication, the intended upload workflow should resume where technically supported.
- If the shared file cannot be safely retained through the authentication workflow, AttendSense shall clearly request the student to provide the file again.

The exact share-target behavior shall be verified during technical evaluation on the supported Phase 1 platforms and browsers.

---

## 5.6 Attendance File Validation and Processing

### FR-017 — File Validation

Before attendance-data extraction begins, AttendSense shall validate the submitted input.

Validation shall include applicable checks such as:

- Supported file type.
- Supported image format.
- Supported PDF format.
- File readability.
- File corruption.
- Empty or unusable input.
- Number of selected images where relevant.

Invalid files shall not proceed to attendance analysis.

The student shall receive a clear error or retry instruction when the input cannot be processed.

Core feasibility for attendance PDF/image extraction, multiple-image handling, timetable screenshot extraction, Academic Calendar PDF extraction, course-code matching, batch/calendar filtering, deterministic calculation, and end-to-end integration has been successfully validated. This does not claim production readiness; PWA share-target compatibility remains subject to implementation and platform validation.

---

### FR-018 — PDF Attendance Extraction

AttendSense shall process supported PDF attendance files to extract the course-aware attendance information required for approved calculations.

The extraction workflow shall attempt to identify relevant values such as:

- Course code and course name/label where available.
- Conducted, present, and absent attendance values.
- Theory/practical identity where represented by official course code.
- No Attendance or equivalent non-attendance slots, where applicable.
- Reported course or overall percentage, where available for validation.

The system shall not use unreliable or incomplete extracted information for attendance analysis.

---

### FR-019 — Image Attendance Extraction

AttendSense shall process supported attendance images to extract the course-aware attendance information required for approved calculations.

The extraction workflow shall attempt to identify relevant values such as:

- Course code and course name/label where available.
- Conducted, present, and absent attendance values.
- Theory/practical identity where represented by official course code.
- No Attendance or equivalent non-attendance slots, where applicable.
- Reported course or overall percentage, where available for validation.

Course-aware records shall be the primary basis for Phase 1 calculations. Overall attendance may be retained as supporting context.

---

### FR-020 — Multiple Image Processing

AttendSense shall support attendance submissions containing multiple images when the complete attendance information cannot be represented in a single image.

For a multi-image submission, the system shall:

1. Treat the selected images as one attendance submission.
2. Process the relevant information contained in each image.
3. Combine complementary attendance information where required.
4. Detect duplicated or overlapping attendance information where reasonably possible.
5. Prevent duplicated information from being counted more than once.
6. Determine whether the complete submission provides sufficient information to derive and validate a reliable course-aware attendance dataset.

If the images cannot be reliably combined into a valid attendance dataset, the system shall stop the processing workflow and request appropriate corrective action from the student.

---

## 5.7 Attendance Normalization and Validation

### FR-021 — Standard Course-Aware Attendance Structure

AttendSense shall normalize successfully extracted attendance information into a standard internal attendance structure.

The normalized structure shall contain calculation-eligible course records with course code where available, course name/label where available, conducted, present, absent, calculated percentage, theory/practical identity where applicable, and required validation/review status. No Attendance or equivalent information and overall attendance may be preserved where useful for normalization, cross-validation, or supporting context.

Course-wise conducted, present, and absent records shall be the primary calculation basis for Phase 1 analysis.

---

### FR-022 — No Attendance Normalization

AttendSense shall correctly handle attendance representations containing **No Attendance** or equivalent non-attendance slots.

If the displayed Total Slots value includes No Attendance slots:

**Effective Total Slots = Displayed Total Slots - No Attendance Slots**

If the submitted attendance representation already provides a total that excludes No Attendance slots, AttendSense shall not subtract those slots again.

For example:

**Displayed Total Slots = 188**

**No Attendance Slots = 21**

Then:

**Effective Total Slots = 188 - 21 = 167**

If another valid attendance representation already reports:

**Total Slots = 167**

with No Attendance already excluded, the system shall use the appropriate value without performing a second subtraction.

AttendSense shall validate the interpretation before the resulting attendance dataset becomes eligible for student confirmation.

---

### FR-023 — Attendance Value Validation

AttendSense shall validate normalized attendance values before student confirmation.

Validation shall include applicable checks such as:

- Conducted, present, and absent attendance shall not be negative.
- Present plus absent attendance shall equal conducted attendance.
- Present and absent attendance shall not exceed conducted attendance.
- Calculated course attendance shall be between 0% and 100%.
- Required course identity shall be available before a record becomes calculation-eligible.
- Theory/practical separation shall be preserved where applicable.
- Duplicate or overlapping records shall not be double-counted.
- No Attendance slots shall not be negative where present.
- Related extracted attendance values shall be internally consistent.
- Required values shall be present before attendance analysis is allowed.

Where conducted attendance is zero, AttendSense shall not divide by zero and shall require safe handling according to the applicable calculation.

Data that fails required validation shall not be accepted as a confirmed attendance dataset.

---

### FR-024 — Independent Course Attendance Calculation

AttendSense shall independently calculate attendance for each valid confirmed course record with conducted attendance greater than zero.

The Phase 1 formula shall be:

**Course Attendance Percentage = (Present / Conducted) × 100**

The independently calculated value shall be used for course-aware attendance analysis. Full precision shall be used internally; rounding shall be applied only for student-facing display, and threshold decisions shall use the unrounded value.

A percentage extracted directly from an uploaded attendance file may be used for validation or comparison where available but shall not replace the system's independent calculation.

---

### FR-025 — Attendance Cross-Validation

AttendSense shall perform automatic cross-validation before presenting newly interpreted attendance information for student confirmation.

Cross-validation may include:

- Comparing independently calculated course attendance with a reported percentage where available.
- Verifying conducted, present, and absent attendance consistency.
- Verifying No Attendance normalization where relevant.
- Checking consistency between displayed totals and normalized totals.
- Detecting duplicated or overlapping information across multiple submitted images.
- Checking internal consistency among related extracted attendance values.
- Detecting obviously impossible or incomplete attendance data.

If a material inconsistency cannot be resolved reliably, the system shall not proceed to attendance analysis.

---

### FR-026 — No Silent Guessing

AttendSense shall not intentionally invent, estimate, or silently substitute required attendance values when they cannot be reliably determined from the submitted information.

If required values are:

- Missing.
- Ambiguous.
- Contradictory.
- Unreadable.
- Incomplete.
- Unreliably extracted.

the system shall stop the new-dataset processing workflow and request appropriate corrective action.

---

## 5.8 Attendance Review and Confirmation

### FR-027 — Mandatory Attendance Review

After successful extraction, normalization, and automatic validation, AttendSense shall present the interpreted attendance information to the student before it becomes eligible for attendance analysis.

The review interface shall prominently present relevant interpreted course records, including course identity where available, conducted, present, absent, calculated percentage, theory/practical distinction where applicable, and relevant normalization information.

The review interface shall clearly communicate that the student is confirming the correctness of the interpreted attendance information.

---

### FR-028 — Student Confirmation

The student shall explicitly confirm the interpreted attendance dataset before that dataset can be used as the latest confirmed attendance dataset.

If the student confirms the dataset:

1. The dataset shall become eligible for attendance analysis.
2. The dataset shall be securely saved as the student's latest confirmed attendance dataset.
3. If an older confirmed dataset exists, the newly confirmed and successfully saved dataset shall replace it.

If the student rejects the dataset:

- The rejected dataset shall not be used for attendance calculations.
- The rejected dataset shall not replace the existing confirmed attendance dataset.
- The student shall be allowed to provide attendance information again.

Students shall be allowed to manually correct extracted attendance information before confirmation. Corrected data shall pass required validation before it can be confirmed and saved.

---

### FR-029 — Latest Confirmed Attendance Dataset Persistence

AttendSense shall securely persist the student's latest successfully confirmed attendance dataset.

The latest confirmed attendance dataset shall:

- Remain associated with the authenticated student's AttendSense account.
- Be reusable across Safe Bunk Calculator, Attendance Recovery Calculator, and Future Attendance Simulator.
- Remain active until a newer attendance dataset successfully completes file processing, normalization, validation, student review, confirmation, and saving.
- Remain unchanged if a newer upload fails processing.
- Remain unchanged if a newer upload fails validation.
- Remain unchanged if the student rejects a newer extracted dataset.
- Remain unchanged if a newer dataset cannot be successfully saved.

Calculator and simulation outputs shall never modify the latest confirmed attendance dataset.

---

## 5.9 Future Lecture and Laboratory Selection

### FR-030 — Future Class Generation

When an attendance-analysis feature requires future class information, AttendSense shall generate applicable future lecture and laboratory occurrences using:

- The student's confirmed timetable.
- The student's confirmed Academic Calendar.
- Course-code mapping.
- Batch applicability where relevant.
- The relevant date/time and feature-specific analysis period.

Confirmed holidays and non-teaching periods may suppress timetable sessions, while Teaching and Teaching Continues permit them. Unknown or ambiguous calendar events shall not silently suppress sessions. Batch-mismatched, code-less, ambiguous, or unmatched sessions shall not affect attendance calculations without confirmed applicability or mapping.

Where a valid structured course code exists, it shall be the primary identity for matching an attendance record with a timetable session. Theory and practical courses with separate official codes shall remain separate, minor OCR course-name differences shall not override a valid course-code match, and code-less activities may remain visible only for display/review until a mapping is confirmed.

When Safe Bunk considers the current date, only classes where current_time is before class_start_time shall be generated as selectable bunk opportunities.

---

### FR-031 — Future Class Attendance Decisions

Future session selection shall represent **future attendance decisions** applied to corresponding matched course records.

A practical or laboratory session confirmed as one continuous multi-period session shall be treated as one scheduled attendance event.

Where applicable, the student shall be able to select one or multiple future classes according to the workflow of the selected analysis feature.

The effect of future attendance decisions shall be applied to each affected matched course record.

---

## 5.10 Confirmed Attendance Context

### FR-032 — Confirmed Attendance Context

AttendSense shall make current confirmed course attendance available as supporting information within relevant screens and attendance-analysis results. Overall attendance may also be displayed as supporting context where available.

**Current Attendance Calculation shall not exist as a separate calculator or standalone Phase 1 analysis feature.**

---

## 5.11 Safe Bunk Calculator

### FR-033 — Safe Bunk Eligibility

The Safe Bunk Calculator shall be available to evaluate a potential skip for an applicable matched course when that course's confirmed attendance is **at or above 75%**.

If the applicable confirmed course attendance is below 75%:

- Safe Bunk analysis shall not proceed.
- AttendSense shall clearly indicate that the student is currently below the required threshold.
- The interface may direct the student toward Attendance Recovery.

---

### FR-034 — Safe Bunk Planning Period

Safe Bunk analysis shall consider only the student's applicable remaining scheduled classes for the **current day**.

AttendSense shall:

- Use the confirmed timetable and confirmed Academic Calendar.
- Apply course-code mapping and batch applicability.
- Exclude sessions whose scheduled start time has been reached.
- Exclude confirmed holidays and non-teaching periods.

---

### FR-035 — Safe Bunk Class Selection

Safe Bunk shall display today's remaining applicable classes and allow the student to explicitly select one or multiple classes they are considering missing.

The system shall not impose an arbitrary predefined limit on the number of displayed classes that the student may mark as BUNK.

Unselected displayed classes shall not be assumed to be attended or otherwise affect the Safe Bunk projection. The calculation itself shall determine whether the complete selected plan remains mathematically safe.

---

### FR-036 — Safe Bunk Calculation

For each explicitly selected applicable skipped class of matched course C, AttendSense shall calculate:

**new_conducted_C = conducted_C + 1**  
**new_present_C = present_C**  
**new_absent_C = absent_C + 1**

**Projected Course Attendance = (new_present_C / new_conducted_C) × 100**

Multiple selected skipped occurrences for the same course shall be aggregated. Selected classes from different courses shall be calculated independently.

A selected bunk plan shall be classified as mathematically safe only when every affected matched course remains at or above 75% using unrounded values. A projected value below 75% shall be classified as unsafe; the student-facing result shall distinguish Above Threshold / Safe, Exactly At Threshold, and Below Threshold / Unsafe as applicable.

Overall attendance may be displayed as supporting context only.

Safe Bunk calculations shall not modify the latest confirmed attendance dataset.

---

## 5.12 Attendance Recovery Calculator

### FR-037 — Attendance Recovery Eligibility

Attendance Recovery Calculator shall be available when an applicable confirmed course attendance record is **below 75%**.

If the applicable confirmed course attendance is already at or above 75%, AttendSense shall indicate that attendance recovery is not currently required for that course.

---

### FR-038 — Required Course Recovery Calculation

AttendSense shall calculate the minimum number of additional future sessions that must be successfully attended for an applicable course record to mathematically reach at least 75%.

For:

- `P` = Course Present
- `C` = Course Conducted
- `x` = Additional successfully attended sessions for that course

AttendSense shall determine the minimum non-negative integer `x` satisfying:

**(P + x) / (C + x) >= 0.75**

The resulting `x` shall represent the minimum number of additional future attended sessions for that course.

---

### FR-039 — Recovery Schedule Mapping

After determining the required course recovery attendance, AttendSense shall map the requirement to applicable future scheduled sessions of the same course using:

- The confirmed timetable.
- The confirmed Academic Calendar.
- Course-code mapping.
- Batch applicability.

Recovery mapping shall begin with the next applicable future scheduled class.

For each projected attended matched session, conducted attendance and present attendance shall increase by one while absent attendance remains unchanged.

Holidays and other non-working academic days shall not contribute attendance opportunities.

Recovery planning may continue across available future schedule coverage until sufficient attended sessions have been accumulated.

---

### FR-040 — Recovery Point Determination

Where sufficient timetable and Academic Calendar information is available, AttendSense shall determine the earliest projected point at which the applicable course attendance reaches at least 75% by successfully attending the applicable recovery sessions.

The recovery result may include:

- Required future attended sessions for the course.
- Applicable future sessions for the course.
- Projected course attendance at the recovery point.
- Earliest projected recovery date where determinable.

If available timetable or academic-calendar data ends before enough future attendance opportunities can be generated:

- AttendSense shall still display the mathematically required attended-session count.
- AttendSense shall clearly indicate that the complete recovery schedule or recovery date cannot currently be determined.
- AttendSense shall not invent future class occurrences.

Attendance Recovery calculations shall not modify the latest confirmed attendance dataset.

---

## 5.13 Future Attendance Simulator

### FR-041 — Future Simulator Availability

Future Attendance Simulator shall be available whenever a valid latest confirmed attendance dataset exists.

Its availability shall **not depend on whether the student's confirmed attendance is above, equal to, or below 75%**.

---

### FR-042 — Future Simulation Period

Future Attendance Simulator shall allow the student to select an applicable future simulation period within the range supported by confirmed timetable and Academic Calendar data.

Unlike Safe Bunk, which focuses on today's remaining applicable classes, Future Attendance Simulator may cover the selected applicable future period.

AttendSense shall generate applicable scheduled sessions within the selected simulation period using confirmed timetable, Academic Calendar, course-code mapping, batch applicability, and date/time as appropriate.

Holidays and other non-working academic days shall be excluded.

---

### FR-043 — Future Simulation Selection

Every applicable future class displayed in the simulator shall initially have the status:

**ATTEND**

The student shall be able to freely change one or multiple applicable future classes between:

- **ATTEND**
- **BUNK/MISS**

No 75% eligibility restriction shall be applied to the student's hypothetical selections.

---

### FR-044 — Future Attendance Simulation Calculation

For each explicitly marked matched class of course C:

**ATTEND**  
conducted_C += 1  
present_C += 1  
absent_C unchanged

**BUNK/MISS**  
conducted_C += 1  
present_C unchanged  
absent_C += 1

AttendSense shall apply the selected scenario independently to each affected course, maintaining theory/practical separation, and calculate projected course attendance. Overall attendance may be displayed as supporting context where useful.

The simulator may update the predicted attendance interactively as the student changes ATTEND/BUNK selections.

---

### FR-045 — Future Simulation Result

The Future Attendance Simulator result may display:

- Current confirmed course attendance.
- Number of future attended and missed sessions.
- Projected course attendance.
- Change from the current course attendance.
- Position relative to the fixed 75% threshold.
- Selected future attendance scenario.

The result shall clearly indicate that it represents a **hypothetical mathematical projection** and not updated official attendance.

Future Attendance Simulator results shall not modify the latest confirmed attendance dataset.

---

## 5.14 Attendance Threshold

### FR-046 — Fixed 75% Threshold

AttendSense Phase 1 shall use a fixed minimum attendance threshold of:

**75%**

The threshold shall:

- Be defined by the product requirements.
- Not be configurable by students.
- Determine Safe Bunk eligibility for an applicable confirmed course attendance record at or above 75%.
- Determine Attendance Recovery applicability for an applicable confirmed course attendance record below 75%.
- Determine whether each affected matched course remains safe after a selected bunk plan.
- Serve as the mathematical target for course-specific Attendance Recovery.
- Be shown as contextual information where relevant in Future Attendance Simulation.

Future Attendance Simulator availability shall not depend on the 75% threshold.

---

## 5.15 Result Presentation

### FR-047 — Attendance Analysis Results

AttendSense shall present attendance-analysis results in a clear, understandable, and student-friendly format.

Depending on the selected feature, results may include:

- Confirmed applicable course attendance.
- Projected course attendance and position relative to 75%.
- Safe/unsafe bunk-plan status.
- Projected attendance for affected courses after a Safe Bunk plan.
- Selected future bunk/attend decisions.
- Minimum additional attended sessions required for course recovery.
- Applicable future sessions contributing to recovery.
- Projected course attendance at the recovery point.
- Estimated recovery date where determinable.
- Future attended and missed sessions.
- Projected course attendance from Future Attendance Simulator.
- Relevant future class dates.
- Relevant future session impact.
- Overall attendance as supporting context where useful.

AttendSense shall visually and semantically distinguish between:

- **Confirmed Attendance Data**
- **Calculated Attendance Requirements**
- **Projected Attendance Results**
- **Hypothetical Simulation Results**

Projected or simulated attendance values shall not be presented as updated official attendance.

---

### FR-048 — Analysis Modification and Recalculation

After viewing an attendance-analysis result, the student shall be able to perform applicable follow-up actions such as:

- Modify a Safe Bunk plan.
- Recalculate a Safe Bunk plan.
- Modify a Future Attendance Simulation.
- Reset a Future Attendance Simulation.
- Perform another Future Attendance Simulation.
- Select another applicable analysis feature.
- Return to the dashboard.
- Update attendance information.
- Update or replace timetable information.
- Update or replace Academic Calendar information.

Repeated analyses shall continue using the same latest confirmed attendance dataset until a newer dataset is successfully processed, reviewed, confirmed, and saved.

---

## 5.16 Attendance Dataset Update

### FR-049 — Attendance Update

AttendSense shall allow the student to provide newer official attendance information when they want subsequent analysis to use updated attendance data.

A newer attendance submission shall pass through the complete required workflow:

**Input → File/Input Validation → Extraction → Normalization → Automatic Validation → Student Review/Edit → Student Confirmation → Save**

Only after successful completion of the complete workflow shall the newer dataset become the latest confirmed attendance dataset.

---

### FR-050 — Safe Dataset Replacement

When a newer attendance dataset is successfully processed, validated, reviewed, confirmed, and saved:

- It shall replace the previous latest confirmed attendance dataset.
- Subsequent attendance analyses shall use the newly confirmed dataset.

If the newer dataset:

- Fails file/input validation.
- Fails extraction.
- Fails normalization.
- Fails required validation.
- Is rejected by the student.
- Does not complete student confirmation.
- Cannot be successfully saved.

the previously confirmed attendance dataset shall remain active and unchanged.

---

## 5.17 Error and Failure Handling

### FR-051 — Invalid or Incomplete Attendance Data

AttendSense shall prevent newly submitted attendance data from becoming eligible for analysis when required information is missing, invalid, incomplete, or cannot be reliably determined.

Examples include:

- Unsupported file format.
- Corrupted file.
- Unreadable image.
- Invalid PDF.
- Required course-aware attendance values cannot be determined.
- Missing or ambiguous course identity where required.
- Inconsistent conducted, present, and absent attendance values.
- Required No Attendance normalization cannot be performed reliably.
- Contradictory attendance values.
- Invalid attendance values.
- Incomplete multi-image submission.

The system shall provide a clear error or corrective instruction.

---

### FR-052 — Missing Academic Data

When an attendance-analysis feature requires schedule information that is unavailable, AttendSense shall not invent the missing academic data.

Examples include:

- Missing timetable.
- Missing academic calendar.
- Invalid or unreadable timetable image.
- Invalid or unreadable Academic Calendar PDF.
- Unconfirmed timetable or Academic Calendar.
- Uncertain batch applicability.
- Unmatched or ambiguous course mapping.
- Ambiguous calendar state.
- Future timetable data unavailable for the requested period.

The system shall clearly communicate the limitation to the student.

Where a mathematical result can still be reliably determined without unavailable schedule information, AttendSense may provide that mathematical result while clearly indicating that the corresponding schedule/date cannot currently be determined.

---

### FR-053 — Calculation Integrity

AttendSense shall perform attendance calculations only using:

- Valid latest confirmed attendance data.
- Confirmed timetable and Academic Calendar data where required.
- Course-code mapping and batch applicability where required.
- Fixed 75% threshold.
- Student-selected future attendance decisions where required.

AttendSense shall not use:

- Rejected attendance datasets.
- Unconfirmed newly extracted attendance data.
- Failed newer attendance uploads.
- Hypothetical simulator results as confirmed attendance.
- Previous calculator outputs as updated official attendance.

Generative AI / LLM reasoning shall not determine final attendance percentages, projected attendance, Safe Bunk eligibility/results, recovery requirements, threshold classifications, or Future Attendance Simulation results.

These results shall be produced through deterministic mathematical logic.

---

## 5.18 Online Operation

### FR-054 — Online-Only Phase 1

AttendSense Phase 1 shall require an active network connection for application functionality that depends on server-side authentication, persisted user data, attendance-file processing, or other required backend services.

Offline attendance calculation and offline application operation shall not be required for Phase 1.

The application shall clearly handle situations in which required network connectivity is unavailable.

---

## 5.19 UI/UX Functional Behavior

### FR-055 — Mobile-First Interaction

AttendSense shall provide a mobile-first interface suitable for students using the application as an installed PWA or through a supported browser.

Core workflows shall be usable without requiring desktop-specific interaction.

---

### FR-056 — Responsive Interface

AttendSense shall provide responsive layouts across supported mobile and desktop screen sizes.

The interface shall adapt appropriately while maintaining the functionality required for:

- Authentication.
- Academic configuration.
- Timetable upload, review/edit, and replacement.
- Academic Calendar upload, review/edit, and replacement.
- Attendance upload.
- Attendance review/edit.
- Safe Bunk planning.
- Attendance Recovery.
- Future Attendance Simulation.
- Result presentation.

---

### FR-057 — Interactive Attendance Planning

Attendance-planning interfaces shall provide clear interactive controls for applicable future session selections.

Where ATTEND/BUNK selection is used:

- The current state of each future class shall be visually clear.
- Changing a class state shall be straightforward.
- Lecture and laboratory sessions shall be distinguishable.
- Relevant dates and schedule grouping shall be understandable.
- Result changes shall be presented clearly.

Safe Bunk controls shall support explicit bunk selection only; Future Attendance Simulator controls may support the complete ATTEND/BUNK scenario.

The UI shall prioritize clarity, usability, and efficient student interaction rather than presenting attendance analysis as a basic numerical calculator.

---

## 5.20 Functional Requirement Summary

The Phase 1 functional workflow shall support:

**Google Authentication**  
↓  
**Academic Context**  
↓  
**Confirmed Timetable Available? → Upload Image/Screenshot → Extract → Validate → Review/Edit → Confirm → Save, if needed**  
↓  
**Confirmed Academic Calendar Available? → Upload PDF → Extract → Validate → Review/Edit → Confirm → Save, if needed**  
↓  
**Attendance PDF/Image(s) Input or Supported PWA Share Target**  
↓  
**Extraction → Normalization/Structured Data → Automatic Validation → Student Review/Edit → Confirmation → Save**  
↓  
**Latest Confirmed Course-Aware Attendance Dataset**  
↓  
**Course-Code-First Matching and Select Analysis Feature**

### Safe Bunk

**Applicable Confirmed Course Attendance >= 75%**  
↓  
**Today's Remaining Applicable Classes Only**  
↓  
**Student Selects Classes to Bunk**  
↓  
**Project Only Selected Skips by Matched Course**  
↓  
**Compare Each Affected Course with 75%**  
↓  
**Safe / At Threshold / Unsafe Result**

### Attendance Recovery

**Applicable Confirmed Course Attendance < 75%**  
↓  
**Calculate Required Future Attended Sessions for That Course**  
↓  
**Map to Confirmed Timetable and Academic Calendar Sessions**  
↓  
**Determine Recovery Path Where Coverage Allows**  
↓  
**Course Recovery Result**

### Future Attendance Simulator

**Available at Any Confirmed Attendance Position**  
↓  
**Select Future Simulation Period**  
↓  
**Student Creates ATTEND/BUNK Scenario**  
↓  
**Project Each Matched Course Independently**  
↓  
**Hypothetical Course-Attendance Result**

All three analysis features shall use the student's latest confirmed attendance dataset, confirmed timetable, and confirmed Academic Calendar where required. Calculator and simulation results shall not modify confirmed attendance. Each confirmed input shall remain active until a newer replacement successfully completes its required review, confirmation, and saving workflow.

---

# 6. Attendance Calculation Rules

## 6.1 Purpose

This section defines the deterministic, course-aware mathematical rules used by AttendSense for all Phase 1 attendance calculations.

All attendance-analysis features shall begin with the student's **latest confirmed attendance dataset** and the relevant confirmed course record or records within it.

For each calculation-eligible confirmed course record C, the primary values shall be:

- `C.conducted`
- `C.present`
- `C.absent`
- `T = Minimum Attendance Threshold`

For Phase 1:

**T = 75% = 0.75**

The calculation engine shall be used by:

1. Safe Bunk Calculator.
2. Attendance Recovery Calculator.
3. Future Attendance Simulator.

Calculator and simulation results shall never modify the student's latest confirmed attendance dataset.

---

## 6.2 Core Attendance Values

AttendSense Phase 1 shall perform calculation-critical attendance analysis using confirmed course records.

The following conditions shall be satisfied before a course record participates in calculation:

- `conducted >= 0`
- `present >= 0`
- `absent >= 0`
- `present + absent = conducted`
- `present <= conducted`
- `absent <= conducted`

For `conducted > 0`, course attendance shall be `(present / conducted) × 100`. If `conducted = 0`, AttendSense shall not divide by zero or make a percentage-based attendance decision; the record shall require conservative review. Invalid, incomplete, unconfirmed, unmatched, or unreliable records shall not enter calculation-critical logic.

---

## 6.3 Supporting Overall Attendance Normalization

Where valid and available, overall attendance and No Attendance normalization may be retained for supporting context or cross-validation. They shall not replace course-wise conducted, present, and absent records as the primary basis for Safe Bunk, Recovery, or Future Attendance Simulator calculations.

Where:

- `D = Displayed Total Slots`
- `N = No Attendance Slots`

and the displayed total includes No Attendance slots:

**E = D - N**

### Example

Suppose the uploaded attendance information contains:

- Present Slots = 142
- Displayed Total Slots = 188
- No Attendance Slots = 21

Then:

**E = 188 - 21**

**E = 167**

Therefore, supporting overall normalization shall use:

- **P = 142**
- **E = 167**

and not `188` as the denominator.

If another valid attendance representation already reports:

**Total Slots = 167**

with No Attendance already excluded, AttendSense shall use:

**E = 167**

and shall **not subtract the 21 No Attendance slots again**.

This normalization may occur before supporting overall attendance is displayed or cross-validated; it shall not replace course-wise calculation inputs.

---

## 6.4 Confirmed Course Attendance Percentage

For a valid confirmed course record with `conducted > 0`, course attendance shall be calculated using:

**Course Attendance % = (present / conducted) × 100**

### Example

For AI Theory, suppose:

- conducted = 30
- present = 27
- absent = 3

Then:

**Course Attendance = (27 / 30) × 100**

**= 90%**

Therefore, the confirmed AI Theory attendance is:

**90%**

AttendSense shall calculate this percentage independently.

An extracted percentage may be used for validation but shall not replace the system's independently calculated course attendance.

Current overall attendance may be displayed as supporting information throughout AttendSense.

**Current Attendance Calculation shall not exist as a separate calculator or standalone Phase 1 feature.**

---

## 6.5 Attendance Threshold Classification

AttendSense shall compare the applicable confirmed course attendance against the fixed Phase 1 threshold:

**75%**

The attendance state shall be classified as:

### At or Above Threshold

If:

**present / conducted >= 0.75**

the applicable course is considered to be at or above the required attendance threshold.

This makes the student eligible for the **Safe Bunk Calculator**.

### Below Threshold

If:

**present / conducted < 0.75**

the applicable course is considered below the required attendance threshold.

This makes the student eligible for the **Attendance Recovery Calculator**.

### Exactly 75%

A student whose exact calculated attendance is:

**75%**

shall be considered to satisfy the minimum attendance threshold.

The **Future Attendance Simulator** shall remain available regardless of whether the student's attendance is above, equal to, or below 75%.

---

## 6.6 Confirmed Future Session Model

One confirmed scheduled attendance event represents one future attendance occurrence for its matched course. AttendSense shall not apply a universal lecture, laboratory, or duration-based weighting rule.

If a practical or laboratory session visually spans multiple timetable periods but the confirmed timetable identifies it as one continuous session, it shall be one scheduled attendance event.

Future updates are applied independently to each matched course record. For an attended occurrence, conducted and present increase by one. For a skipped occurrence, conducted and absent increase by one.

## 6.7 Course-Code, Timetable, Calendar, and Batch Applicability

Where a valid structured course code exists, it is the authoritative primary identity for matching a confirmed attendance record with a confirmed timetable session. Theory and Practical records with separate official codes, including T-coded Theory and P-coded Practical, shall remain separate. Minor OCR course-name differences shall not override a valid course-code match.

Only sessions supported by the confirmed uploaded timetable, confirmed Academic Calendar, confirmed course mapping, applicable batch, and relevant date/time may participate. Batch mismatches are excluded; unresolved batch applicability, code-less sessions, unmatched sessions, and ambiguous sessions require review and shall not silently affect calculations.

Teaching and Teaching Continues permit timetable sessions. Confirmed public holidays and Non-Teaching periods may suppress them. Unknown or ambiguous calendar states require conservative handling and shall not silently suppress sessions. Calendar applicability and scope metadata shall be respected where required.

---

# 6.8 Safe Bunk Calculator Rules

## 6.8.1 Eligibility

Safe Bunk Calculator shall evaluate a potential skip only when the applicable confirmed course attendance is at or above 75%.

If the applicable course attendance is below 75%, Safe Bunk shall not approve a bunk for that course.

AttendSense shall direct the student toward Attendance Recovery where appropriate.

---

## 6.8.2 Safe Bunk Analysis Window

Safe Bunk Calculator shall consider only today's remaining applicable classes. A current-day session is selectable only when `current_time < class_start_time`; once `current_time >= class_start_time`, it is not a future selectable bunk opportunity.

Applicable sessions shall use the confirmed timetable, confirmed Academic Calendar, confirmed course mapping, and applicable batch.

---

## 6.8.3 Safe Bunk Selection

AttendSense shall display today's remaining applicable classes. The student may explicitly select one or more classes they are considering missing, with no arbitrary predefined maximum.

Only explicitly selected classes shall affect the Safe Bunk projection. Unselected displayed classes shall not change conducted, present, or absent attendance and shall not be assumed to be attended.

---

## 6.8.4 Safe Bunk Calculation

For one explicitly selected skipped occurrence of matched course C:

**new_conducted_C = conducted_C + 1**  
**new_present_C = present_C**  
**new_absent_C = absent_C + 1**

**Projected Attendance_C = new_present_C / new_conducted_C × 100**

For N selected skipped occurrences of the same course, conducted and absent each increase by N while present remains unchanged. Different courses shall be calculated independently.

---

## 6.8.5 Safe Bunk Decision

If:

**Every affected matched course has Projected Attendance >= 75%**

the selected bunk plan shall be classified:

**SAFE**

If:

**Any affected matched course has Projected Attendance < 75%**

the selected bunk plan shall be classified:

**UNSAFE**

Exactly 75% satisfies the threshold. Classification shall use unrounded values.

---

## 6.8.6 Safe Bunk Example

For AI Theory, suppose conducted = 30, present = 27, and absent = 3. Current attendance is `27 / 30 × 100 = 90%`.

If the student selects one upcoming AI Theory class to bunk, conducted becomes 31, present remains 27, and absent becomes 4. Projected attendance is `27 / 31 × 100 ≈ 87.10%`; the selected skip is therefore Safe.

If the student selects N AI Theory classes, the projection is `27 / (30 + N) × 100`; all N selected skips are aggregated for AI Theory only.

The calculation does not modify the confirmed attendance dataset.

---

# 6.9 Attendance Recovery Calculator Rules

## 6.9.1 Eligibility

Attendance Recovery Calculator shall operate on one applicable confirmed course record below 75%. If that course is already at or above 75%, recovery is not required for that course.

---

## 6.9.2 Course Recovery Formula

Let:

- `P = Course Present`
- `C = Course Conducted`
- `x = Additional Future Sessions Successfully Attended`

To reach at least 75%:

**(P + x) / (C + x) >= 0.75**

Solving for `x`:

**P + x >= 0.75(C + x)**

**0.25x >= 0.75C - P**

Therefore:

**x >= (0.75C - P) / 0.25**

The required attended sessions shall therefore be:

**Required Attended Sessions = max(0, ceil((0.75C - P) / 0.25))**

with a minimum result of `0`.

The result is the minimum integer number of future successfully attended sessions for that course.

---

## 6.9.3 Recovery Example

For a course with conducted = 20, present = 14, and absent = 6, current attendance is `14 / 20 = 70%`.

`x >= (0.75 × 20 - 14) / 0.25 = 4`, so four future successfully attended sessions of that course are required. After attending four, conducted = 24, present = 18, absent = 6, and attendance is `18 / 24 = 75%`.

---

## 6.9.4 Recovery Schedule Mapping

After x is determined, AttendSense shall map it chronologically to actual future sessions of the same matched course using the confirmed timetable, confirmed Academic Calendar, course-code mapping, and batch applicability. Each projected attended matched session increases conducted and present by one and leaves absent unchanged.

Recovery may continue across multiple academic weeks within available confirmed schedule/calendar coverage. If coverage ends before x applicable sessions can be identified, AttendSense shall still return the mathematical required-session count, state that the complete recovery path/date cannot be determined, and not invent future sessions.

---

# 6.10 Future Attendance Simulator Rules

## 6.10.1 Availability

Future Attendance Simulator shall be available whenever a valid latest confirmed attendance dataset and the required confirmed timetable and Academic Calendar coverage exist.

There shall be no eligibility restriction based on the student's attendance percentage.

Therefore, it shall be available when attendance is:

- Above 75%.
- Exactly 75%.
- Below 75%.

---

## 6.10.2 Simulation Period

The student shall select an applicable future simulation period within confirmed timetable and Academic Calendar coverage. Unlike Safe Bunk, which is today-only, the simulator may cover that selected future period.

---

## 6.10.3 Default Simulation State

Every applicable future session within the selected simulation period shall initially have the state:

**ATTEND**

The student may freely change one or multiple classes between:

**ATTEND**

and:

**BUNK/MISS**

The simulator shall treat these selections purely as hypothetical future attendance decisions.

---

## 6.10.4 Future Simulation Calculation

For each matched future occurrence of course C, ATTEND increases conducted and present by one while absent is unchanged. BUNK/MISS increases conducted and absent by one while present is unchanged.

Occurrences are aggregated by course and calculated independently, maintaining theory/practical separation. Projected course attendance is `projected_present_C / projected_conducted_C × 100`; overall attendance is supporting context only.

---

## 6.10.5 Future Simulation Example

Suppose the student selects one future AI Theory occurrence as ATTEND and one future ML Theory occurrence as BUNK/MISS. AI Theory increases its conducted and present counts by one; ML Theory increases its conducted and absent counts by one. Each affected course's projected percentage is calculated independently.

The student can therefore compare the mathematical impact of hypothetical decisions without modifying the confirmed attendance dataset.

---

# 6.11 Timetable-Aware Calculation

AttendSense shall not invent future academic classes.

When an attendance analysis requires future classes, the system shall generate actual applicable occurrences using the student's confirmed uploaded timetable.

The timetable shall determine:

- Which classes occur.
- On which academic day they occur.
- Their date or day, start time, and end time.
- Matched course identity, theory/practical identity, batch applicability, and continuous multi-period structure.

The timetable shall therefore provide the schedule structure required for attendance planning.

For current-day Safe Bunk, only applicable classes whose scheduled start time has not yet passed shall be selectable. Future dates are processed only for Recovery and Future Attendance Simulator according to confirmed timetable and Academic Calendar coverage.

---

# 6.12 Academic Calendar-Aware Calculation

The confirmed Academic Calendar shall be applied together with the confirmed uploaded timetable. Teaching and Teaching Continues allow sessions; confirmed public holidays and Non-Teaching periods may suppress them. Unknown or ambiguous states require review or conservative handling and shall not silently suppress classes.

---

# 6.13 Overall Attendance Calculation Principle

Safe Bunk, Attendance Recovery, and Future Attendance Simulator shall use course-wise attendance as their primary decision basis. Overall attendance may be retained only as supporting context or cross-validation information.

---

# 6.14 Multiple Future Class Selection

AttendSense shall allow multiple future session selections in an attendance-analysis scenario where supported by the selected feature.

The system shall group selected future occurrences by matched course code and calculate each course independently.

For example:

AI Theory → 2 selected skipped occurrences; ML Theory → 1 selected skipped occurrence.

Therefore:

AI Theory conducted and absent each increase by 2; ML Theory conducted and absent each increase by 1. AttendSense shall not combine course occurrences into generic attended or missed totals.

---

# 6.15 Rounding Rules

AttendSense shall perform internal attendance calculations using full available numerical precision.

Attendance percentages displayed to the student shall normally be rounded to:

**Two Decimal Places**

### Example

**85.029940...% → 85.03%**

Rounding shall occur only for presentation.

Threshold decisions shall use the underlying mathematical values rather than prematurely rounded display values.

For example, an internal result of:

**74.999%**

shall remain below the 75% threshold even if an inappropriate early rounding operation could make it appear as 75.00%.

---

# 6.16 Rounding and Integer Recovery Rule

AttendSense shall use full available precision internally and round only student-facing display values, normally to two decimal places. Threshold decisions shall use unrounded values; 74.999% remains below 75%, while exactly 75% satisfies the threshold.

Recovery required-session counts shall be non-negative integers and use ceiling where required by the course recovery formula.

---

# 6.17 Calculation Boundary Rules

AttendSense shall enforce the following calculation boundaries:

- Conducted, present, and absent attendance cannot be negative.
- Present plus absent must equal conducted.
- Percentage-based decisions shall not divide by zero.
- Attendance percentage cannot be below 0%.
- Attendance percentage cannot exceed 100%.
- Future selected occurrences cannot be negative.
- Recovery required-session counts cannot be negative.
- Calculations shall not proceed using unconfirmed attendance data.
- Calculations shall not proceed using rejected attendance data.
- Failed newer attendance uploads shall not replace valid confirmed attendance data.
- Calculator or simulator results shall not become confirmed attendance data.
- Required timetable and Academic Calendar data shall be confirmed, and unmatched or ambiguous sessions shall not silently affect calculation.

---

# 6.18 Latest Confirmed Dataset Rule

Every attendance-analysis calculation shall begin from the student's:

**Latest Confirmed Attendance Dataset**

Suppose a student uploads and confirms AI Theory with conducted = 30, present = 27, and absent = 3.

The student may then perform:

**Safe Bunk Analysis**

followed by:

**Future Attendance Simulation**

followed by:

**Another Safe Bunk Analysis**

All calculations shall continue to begin from:

- **conducted = 30**
- **present = 27**
- **absent = 3**

unless the student successfully uploads, processes, validates, reviews, confirms, and saves newer attendance information.

A hypothetical result shall never become the starting attendance dataset for another calculation.

---

# 6.19 New Attendance Dataset Replacement Rule

When the student provides newer official attendance information, the newer dataset shall not immediately replace the existing confirmed dataset.

Replacement shall occur only after successful completion of:

**Input**  
↓  
**Validation**  
↓  
**Extraction**  
↓  
**Normalization**  
↓  
**Automatic Validation**  
↓  
**Review/Edit**  
↓  
**Confirmation**  
↓  
**Save**

Only then shall:

**New Confirmed Dataset → Replace Previous Confirmed Dataset**

If the newer dataset fails any required stage or is rejected by the student:

**Previous Confirmed Dataset → Remains Active**

---

# 6.20 Deterministic Calculation Requirement

All final attendance calculations shall be deterministic.

For identical confirmed course records, threshold, current date/time where relevant, course-code mapping, timetable, Academic Calendar, batch applicability, and selected hypothetical decisions, AttendSense shall produce the same mathematical result.

Generative AI shall not determine course attendance percentages, Safe Bunk eligibility or safe/unsafe results, recovery required-session counts or threshold achievement, or Future Attendance Simulator percentages.

AI/OCR/vision or document-processing technologies may assist only with extracting attendance information from uploaded documents. Final calculation-critical values and outcomes shall use deterministic mathematical logic.

---

# 6.21 Calculation Result Classification

AttendSense shall distinguish between four different concepts:

### Confirmed Course Attendance

The attendance for an eligible course record calculated from the latest confirmed attendance dataset. This is the base information used by AttendSense for calculation-critical analysis.

### Safe Bunk Result

A mathematical projection showing whether the student's explicitly selected remaining classes for today keep every affected course at or above 75%.

### Attendance Recovery Result

A mathematical calculation identifying the minimum additional attended sessions required for one course to reach at least 75%, together with schedule-aware recovery information where determinable.

### Future Attendance Simulation

A hypothetical mathematical projection showing the attendance outcome of the student's selected future ATTEND/BUNK scenario.

Safe Bunk, Attendance Recovery, and Future Attendance Simulation results shall not be treated as updated official attendance.

---

# 6.22 Calculation Rules Summary

The Phase 1 attendance calculation model shall begin with the latest confirmed attendance dataset and use each matched course record's conducted, present, and absent values.

**Confirmed Course Attendance = (present / conducted) × 100**

**Fixed Threshold = 75%**

### Safe Bunk

**Course Attendance >= 75%**

↓

**Display today's remaining applicable classes only**

↓

**Student explicitly selects classes to skip**

↓

**For each selected course: conducted + 1, present unchanged, absent + 1**

↓

**Every affected course >= 75% → SAFE; otherwise → UNSAFE**

---

### Attendance Recovery

**Course Attendance < 75%**

↓

**Required Attended Sessions = max(0, ceil((0.75C - P) / 0.25))**

↓

**Map sessions to the same course's confirmed future timetable where possible**

---

### Future Attendance Simulator

**Available for a selected future period within confirmed coverage**

↓

**Default ATTEND; student may choose ATTEND or BUNK/MISS**

↓

**Calculate projected attendance independently for each affected course**

---

All calculations shall use deterministic mathematical logic, respect confirmed timetable, Academic Calendar, course-code, and batch applicability where future sessions are required, and preserve the latest confirmed attendance dataset until validly replaced. Overall attendance may be displayed only as supporting context.

# 7. Attendance Data and Validation Requirements

## 7.1 Purpose

This section defines how AttendSense shall accept, extract, normalize, validate, review, confirm, persist, and replace attendance data before it becomes eligible for Phase 1 attendance analysis.

The trusted calculation input shall be a confirmed, structured, course-aware attendance dataset. Raw uploaded PDF or image content shall not be passed directly to the deterministic calculation engine.

---

## 7.2 Supported Attendance Input

Phase 1 shall support attendance input through PDF, one image, or multiple images belonging to one attendance submission.

Attendance input is separate from timetable input, which is image or screenshot only, and Academic Calendar input, which is PDF only. Attendance input may be supplied through in-application upload and, where technically supported and validated, the PWA share target.

---

## 7.3 Primary Course-Aware Attendance Data

The Phase 1 calculation engine shall primarily use confirmed course-aware attendance records.

For each calculation-eligible course record, AttendSense shall preserve where available:

- Course code.
- Course name or label.
- Conducted attendance.
- Present attendance.
- Absent attendance.
- Theory or Practical identity where represented by the official course code.
- Independently calculated course attendance percentage.
- Calculation-eligibility status.
- Validation, review, and relevant mapping metadata.

For a valid course record:

**present + absent = conducted**

For conducted greater than 0:

**Course Attendance Percentage = (present / conducted) × 100**

Course-wise conducted, present, and absent values shall be the primary calculation basis for Safe Bunk Calculator, Attendance Recovery Calculator, and Future Attendance Simulator. Overall attendance may be retained only as supporting context or cross-validation.

---

## 7.4 Course Identity and Conservative Mapping

Where a valid structured course code exists, it shall be the authoritative primary identity for the course record.

AttendSense shall preserve the course code, course name or label where available, Theory or Practical identity, conducted, present, and absent values. Theory and Practical records with separate official course codes, including T-coded Theory and P-coded Practical records, shall remain separate and shall not be merged merely because their names are similar.

Minor OCR errors in a course name shall not invalidate an otherwise reliable structured course-code identity.

Code-less or ambiguous records, including activities whose course identity cannot be safely determined, may be retained for display or review. They shall be clearly marked as requiring review or not calculation-eligible and shall not silently participate in Safe Bunk, Recovery, or Future Attendance Simulator mathematics unless the required mapping is explicitly confirmed.

---

## 7.5 Attendance Processing Pipeline

Attendance processing shall follow this conceptual sequence:

**Attendance Input**  
↓  
**File/Input Validation**  
↓  
**Course-Aware Attendance Extraction**  
↓  
**Structured Course-Aware Data / Normalization**  
↓  
**Automatic Course/Record Validation**  
↓  
**Student Review/Edit**  
↓  
**Student Confirmation**  
↓  
**Successful Save**  
↓  
**Latest Confirmed Course-Aware Attendance Dataset**  
↓  
**Eligible for Attendance Analysis**

Failure at any mandatory stage shall prevent the new dataset from replacing the existing confirmed dataset.

---

## 7.6 Course-Aware Extraction

For PDF, one-image, and multiple-image attendance input, AttendSense shall attempt to extract the course-aware information required for approved calculations, including where available:

- Structured course code and course name or label.
- Conducted, present, and absent values.
- Theory or Practical identity where represented.
- Reported course percentage for validation.
- Overall attendance information for supporting context or cross-validation.
- No Attendance or equivalent information relevant to normalization.

Where reliable machine-readable or structured PDF data exists, direct extraction may be preferred. The objective shall be a course-aware dataset, not an overall-only attendance dataset.

Image extraction may use OCR, vision, or other document-processing methods and shall reasonably account for image dimensions, device or screenshot dimensions, cropping, resolution, layout differences, and text positioning.

If calculation-critical information cannot be obtained reliably, the affected record shall not silently become calculation-eligible.

---

## 7.7 Multiple-Image, Duplicate, and Overlap Handling

Multiple images belonging to one attendance submission shall be processed as one submission. AttendSense shall validate every image, extract course-aware records, combine complementary information, detect repeated or overlapping information, preserve reliable course identity, and determine calculation-eligibility and review state for each record.

Where two extracted pieces clearly represent the same course attendance record, AttendSense shall not count them twice. Reliable identifiers, especially structured course code, shall be used where available.

If overlapping records conflict materially and the conflict cannot be resolved safely, AttendSense shall not silently choose a value. It shall require review or correction and prevent unreliable values from becoming calculation-eligible.

The objective is one confirmed dataset containing course-aware attendance records, not a single overall-only calculation value.

---

## 7.8 Normalized Course-Aware Dataset

The normalized dataset shall contain one latest confirmed attendance dataset with one or more course records. Each course record shall contain course identity, Theory or Practical identity where applicable, conducted, present, absent, independently calculated percentage, calculation eligibility, and validation or review metadata.

Supporting overall attendance or normalization information may be retained where valid and useful. Raw PDFs and images shall remain separate from this structured data.

### 7.8.1 No Attendance Normalization

Where relevant, if a displayed total includes No Attendance, a supporting normalized total may use:

**Effective Total = Displayed Total - No Attendance**

If the displayed total already excludes No Attendance, AttendSense shall not subtract it again.

This normalization may support document interpretation, overall attendance display, cross-validation, or consistency checking. It shall not replace course-wise conducted, present, and absent records as the primary calculation basis.

---

## 7.9 Automatic Course Record Validation

Before a course record becomes calculation-eligible, AttendSense shall validate:

- Conducted, present, and absent values are non-negative.
- Present plus absent equals conducted.
- Present and absent do not exceed conducted.
- Required calculation-critical fields are present.
- Course identity is reliable enough for calculation eligibility.
- Theory and Practical separation is preserved where applicable.
- Duplicate records are not double-counted.

For conducted greater than 0, the calculated percentage shall be within 0% to 100%. For conducted equal to 0, AttendSense shall not divide by zero or make a percentage-based attendance decision; the record shall be handled conservatively according to the approved review and calculation rules.

For each valid course record, AttendSense shall independently calculate:

**Course Attendance Percentage = (present / conducted) × 100**

This independently calculated value shall be authoritative for calculation logic. Where an uploaded representation also shows a course percentage, AttendSense may compare it for validation. Small legitimate display-rounding differences may be accepted; material inconsistencies shall trigger review, correction, or processing or validation failure rather than being silently ignored.

Overall attendance may also be independently calculated where reliable and useful, but only as supporting context or cross-validation. AttendSense shall use full available precision internally, round only for student-facing display, and avoid premature rounding in threshold-related validation or calculation.

---

## 7.10 Student Review, Editing, Confirmation, and Save

A mandatory review screen shall prominently show calculation-relevant course records. For each relevant course, it shall display where available:

- Course code and course name or label.
- Theory or Practical identity.
- Conducted, present, and absent values.
- Independently calculated percentage.
- Any warning, mapping, validation, or review state.

Supporting overall or No Attendance information may also be displayed where useful.

The student shall be allowed to manually correct incorrect extracted structured data before confirmation. After a manual correction, automatic validation shall run again, the corrected data shall satisfy the required invariants, and the student shall explicitly confirm the data before it can become trusted. The student may reject or re-upload attendance information, but re-upload shall not be the only correction path.

Student confirmation shall remain mandatory even when extraction confidence is high. Only validated, confirmed, and successfully saved structured course-aware data shall become the latest confirmed attendance dataset. Confirmation alone shall not replace the previous persisted dataset; if saving fails, the previous confirmed dataset shall remain active.

---

## 7.11 Latest Confirmed Dataset, Replacement, and Freshness

The latest confirmed attendance dataset shall provide the starting course records for attendance analysis. Safe Bunk shall start from the relevant latest confirmed course record, Future Attendance Simulator shall start again from those same confirmed course records, and Attendance Recovery shall start from the relevant confirmed course record.

A previous calculator projection, recovery plan, or simulation result shall not become the base state for a subsequent calculator. Calculator and simulator results shall not modify confirmed conducted, present, absent, or latest-confirmed-dataset values.

If Dataset A is confirmed and Dataset B is newly uploaded, Dataset A shall remain active while Dataset B is processed. Dataset B shall replace Dataset A only after it successfully completes Input, Validation, Extraction, Normalization, Automatic Validation, Review/Edit, Confirmation, and Successful Save. If Dataset B fails, is rejected, or is not saved, Dataset A shall remain active.

AttendSense shall not automatically synchronize attendance with an external ERP or college system. The latest confirmed attendance dataset means the latest official attendance information successfully provided, reviewed or edited, confirmed, and saved by the student in AttendSense. Passage of time, attendance planning, and simulation do not update confirmed attendance; only a newer confirmed attendance submission may replace it.

---

## 7.12 Attendance, Timetable, and Academic Calendar Separation

The confirmed attendance dataset shall provide course identity; conducted, present, and absent values; calculated course percentage; and supporting overall information where available.

The confirmed student-uploaded timetable shall provide scheduled sessions; day, date, and time; course or session identity; Theory or Practical distinction; batch applicability; and continuous multi-period session structure.

The confirmed student-uploaded Academic Calendar shall provide Teaching, Teaching Continues, Non-Teaching, Unknown or Requires Review, and relevant applicability or scope metadata.

Schedule-aware calculations shall combine these inputs through course-code mapping, batch applicability, date or time, and calendar applicability.

---

## 7.13 Confirmed Future Session Rule

One confirmed scheduled attendance event shall equal one future attendance occurrence for its matched course.

If a practical or laboratory session spans multiple timetable periods but the confirmed timetable identifies it as one continuous session, it shall count as one scheduled attendance event.

Theory and Practical records shall remain separate where their official course codes are separate. AttendSense shall not apply a universal lecture, laboratory, or duration-based attendance weighting rule.

---

## 7.14 Processing Feedback and Failure Handling

Where useful, AttendSense shall provide clear processing feedback, including file selected, uploading, validation, extraction, normalization or structured processing, automatic validation, preparing review, ready for review/edit, confirmation, saving, success, processing failure, validation failure, and save failure.

If a new dataset fails required validation, it shall not become confirmed or be used for calculations. AttendSense shall provide a clear explanation, preserve the previous confirmed dataset, and allow the student to correct or review the data where appropriate or provide attendance information again.

---

## 7.15 Raw Files, Extraction Technology, and No Assumed Updates

AttendSense shall preserve the conceptual separation between raw uploaded PDF or image files and validated, confirmed, and saved normalized course-aware attendance data. The deterministic calculation engine shall operate only on structured confirmed data, not raw documents.

Core extraction feasibility has been validated on tested samples for attendance PDFs, attendance images, multiple-image handling, timetable screenshots, Academic Calendar PDFs, and course-code-first calculation-critical extraction. The exact production extraction implementation may be finalized during implementation. This validation does not imply universally perfect extraction or production readiness.

Selecting a class for bunk in Safe Bunk, including a class in a Recovery plan, marking a class ATTEND or BUNK/MISS in Future Attendance Simulator, or the passage of a scheduled date shall not update confirmed conducted, present, absent, or the latest confirmed attendance dataset. Only newer official attendance information that successfully completes processing, validation, review/edit, confirmation, and saving may update confirmed attendance.

---

## 7.16 Final Attendance Data Processing Rule

The final Phase 1 attendance-data model shall be:

**Supported Attendance Input**  
↓  
**File/Input Validation**  
↓  
**Course-Aware Attendance Extraction**  
↓  
**Structured Data / Normalization**  
↓  
**Automatic Course/Record Validation**  
↓  
**Student Review/Edit**  
↓  
**Student Confirmation**  
↓  
**Successful Save**  
↓  
**Latest Confirmed Course-Aware Attendance Dataset**  
↓  
**Eligible for Attendance Analysis**

Failure at any mandatory stage shall prevent the new dataset from replacing the existing confirmed dataset.

# 8. UI/UX and PWA Requirements

## 8.1 Experience Principles and Primary Views

AttendSense Phase 1 shall provide a modern, polished, student-focused interface with mobile-first responsive design, fast navigation, clear visual hierarchy, readable and accessible interaction, consistent design patterns, and interactive planning.

The UI may combine functions where this improves usability, but shall provide access to:

1. Welcome and Google Authentication.
2. First-Time Academic Configuration.
3. Timetable upload, review/edit, confirmation, and replacement.
4. Academic Calendar upload, review/edit, confirmation, and replacement.
5. Student Dashboard and Today's Decision Center.
6. Attendance upload or update, processing, review/edit, and confirmation.
7. Safe Bunk Calculator, Attendance Recovery Calculator, and Future Attendance Simulator.
8. Analysis result views and profile or academic settings.

There shall be no separate standalone calculation feature for current attendance.

---

## 8.2 Authentication and First-Time Academic Setup

The welcome flow shall support Google Authentication and clearly guide a first-time student through missing required setup inputs.

Academic configuration shall not automatically assign or associate a timetable or Academic Calendar.

The student shall provide:

- A timetable as an image or screenshot only, using Upload, Extract, Validate, Review/Edit, Confirm, and Save.
- The official SPCE Academic Calendar as a PDF only, using Upload, Extract, Validate, Review/Edit, Confirm, and Save.

The student shall not be required to construct either document from scratch. Each confirmed item shall remain active until explicitly and successfully replaced.

---

## 8.3 Timetable and Academic Calendar Review

The timetable review UI shall show extracted calculation-relevant information where available, including day, start and end time, course or session identity, course code, Theory or Practical identity, batch applicability, and continuous multi-period session structure.

The Academic Calendar review UI shall show relevant classifications and scope information, including Teaching, Teaching Continues, Non-Teaching, Unknown or Requires Review, and applicable metadata where relevant.

The student shall be able to manually correct extracted timetable or Academic Calendar information before confirmation. Unknown or ambiguous batch, course-mapping, or calendar information shall be visibly reviewable rather than silently guessed.

After confirmation and successful save, each item shall remain active until replaced. A failed replacement shall not overwrite the previous confirmed timetable or Academic Calendar.

---

## 8.4 Dashboard and Today's Decision Center

The dashboard shall provide clear access to Today's Decision Center and Safe Bunk, Attendance Recovery, Future Attendance Simulator, attendance upload or update, timetable setup or replacement, Academic Calendar setup or replacement, and relevant account or academic settings.

Where useful, dashboard context may show the latest confirmed attendance update, course-level attendance status, courses at or above 75%, courses below 75%, timetable or calendar confirmation status, and overall attendance as supporting context.

Course-aware eligibility shall be clear:

- Safe Bunk applies to relevant confirmed course records at or above 75%.
- Recovery applies to relevant confirmed course records below 75%.
- Future Simulator is available at any attendance percentage once required confirmed data exists.

Overall attendance shall not be the primary dashboard model or the sole eligibility basis for any analysis feature.

---

## 8.5 Attendance Upload, Processing, and Review

Attendance upload shall support PDF, one image, and multiple images. The UI shall support normal in-application file selection and PWA share-target input only where supported and successfully validated.

The upload UI shall clearly show selected files and allow the student to remove incorrect selections before processing.

During processing, the interface shall communicate progress without appearing frozen. Suitable conceptual stages include Uploading, Reading or Extracting, Structuring or Normalizing, Automatic Validation, and Preparing Review.

The attendance review UI shall primarily show course-aware records. For each relevant record, it shall show where available:

- Course code and course name or label.
- Theory or Practical identity.
- Conducted, present, and absent values.
- Independently calculated course percentage.
- Warning, mapping, validation, or review state.

Overall attendance and No Attendance information may appear only as supporting context.

The student shall be able to manually correct extracted attendance values before confirmation. The review flow shall offer actions conceptually equivalent to Edit or Correct, Confirm Attendance, and Reject or Upload Again. After a manual correction, automatic validation shall run again, and invalid corrected values shall not be confirmable.

The UI shall clearly communicate that confirmation plus successful save makes the new dataset the latest confirmed attendance dataset.

---

## 8.6 Safe Bunk UI: Today's Remaining Classes

Safe Bunk shall be presented as a today-only decision tool. It shall show only today's remaining applicable classes.

A current-day class is selectable only when:

**current_time < class_start_time**

When current_time is at or after class_start_time, the class shall no longer be selectable for Safe Bunk planning.

Displayed sessions shall respect the confirmed timetable, confirmed Academic Calendar, course-code mapping, Theory or Practical separation, confirmed batch applicability, current date or time, and calendar applicability. Teaching and Teaching Continues permit sessions; confirmed holidays and Non-Teaching periods may suppress them. Unknown or ambiguous calendar state shall not silently suppress classes. Batch mismatches are not applicable, and unknown batch or mapping states shall be visibly conservative or reviewable.

For each displayed class, the UI may show course name, course code where available, Theory or Practical identity, start and end time, and batch where relevant. A confirmed continuous practical or laboratory session spanning multiple timetable periods shall be presented as one attendance event.

---

## 8.7 Safe Bunk Selection and Result

Safe Bunk shall use explicit bunk selection rather than per-class attendance-state toggles. Displayed classes are future bunk opportunities; the student explicitly selects one or more classes they are considering bunking.

Suitable UI patterns include selectable class cards, checkboxes, or a clear Select to Bunk action. Only explicitly selected classes shall affect the projection. Unselected displayed classes shall have no projected attendance effect and shall not be assumed attended.

The Safe Bunk summary and result shall be course-aware. It may show selected classes, affected courses, confirmed and projected course attendance, projected conducted, present, and absent values where useful, and position relative to 75%.

Multiple selected classes for one course shall be aggregated for that course. Different affected courses shall be shown independently. A plan is SAFE only when every affected matched course remains at or above 75%, using full precision for decision logic and rounded values only for display.

Overall attendance may be shown only as supporting context. The result shall evaluate the student's specific selected bunk plan, rather than simply state a generic number of classes that may be missed.

---

## 8.8 Attendance Recovery UI

Attendance Recovery shall be course-specific and shall apply to an applicable confirmed course record below 75%.

The UI shall clearly identify the course, current confirmed course attendance, conducted, present, absent where useful, the fixed 75% target, and the minimum additional future attended sessions or classes required.

Where confirmed timetable and Academic Calendar coverage is sufficient, the UI may show actual upcoming matched sessions contributing to recovery, including date, day, time, course, Theory or Practical identity, running attended-session progress, projected attendance, and earliest recovery date where determinable.

One confirmed scheduled attendance event counts as one future attendance occurrence for its matched course. A confirmed continuous practical or laboratory session counts as one scheduled attendance event. If coverage ends before a complete recovery path can be generated, the UI shall still show the mathematical required-session count, explain that a complete path or date cannot yet be determined, and not invent future sessions.

---

## 8.9 Future Attendance Simulator UI

Future Attendance Simulator shall remain distinct from Safe Bunk. It may cover a selected future period within available confirmed timetable and Academic Calendar coverage.

Every displayed applicable future class may initially be ATTEND, and the student may switch an applicable class between ATTEND and BUNK/MISS. This default scenario behavior applies only to Future Attendance Simulator.

Applicable sessions shall respect confirmed timetable, Academic Calendar, course-code mapping, Theory or Practical separation, batch applicability, and date or time. Each scheduled attendance event has one occurrence effect for its matched course.

The simulator result shall be course-aware. It may show the affected course, confirmed course attendance, simulated attended sessions, simulated missed sessions, projected course attendance, change from current course attendance, position relative to 75%, and the selected scenario. If multiple courses are affected, results shall be presented independently by course.

Overall attendance may be shown only as supporting context and shall not be the primary simulator result.

---

## 8.10 Confirmed, Projected, and Result Presentation

The UI shall clearly distinguish:

- Confirmed Attendance: the latest validated, reviewed or edited, confirmed, and saved official attendance dataset.
- Safe Bunk Projection: a hypothetical result from explicitly selected bunk classes.
- Recovery Projection: a mathematical scenario assuming required future matched sessions are attended.
- Future Simulation: a hypothetical ATTEND or BUNK/MISS scenario.

The interface shall never imply that a projection has updated official attendance.

Results shall use answer first and supporting details second:

- Safe Bunk primary result: SAFE or UNSAFE.
- Recovery primary result: minimum additional future attended sessions required for the applicable course.
- Future Simulator primary result: projected course attendance for affected courses.

Supporting information may show course context, current and projected attendance, the 75% position, scenario details, and overall attendance only where useful.

---

## 8.11 Error, Review, and Replacement States

The UI shall clearly communicate when calculation or confirmation cannot safely proceed, including missing confirmed attendance, timetable, or Academic Calendar; unconfirmed replacement input; invalid attendance record; unmatched course code; code-less or ambiguous session; uncertain batch applicability; ambiguous calendar event; failed extraction, validation, or save; unsupported file; and network failure.

The interface shall not silently guess. Where the issue can be resolved through review or editing, it shall provide a clear path to correction.

The UI shall make it clear that confirmed attendance, timetable, and Academic Calendar data remain available until successfully replaced. While replacement is processed, existing confirmed data remains active. Only successful extraction, validation, review/edit, confirmation, and save replaces confirmed data; a failed or rejected replacement shall not appear to have overwritten it.

---

## 8.12 PWA, Responsive Schedule Design, and User Control

Phase 1 shall be mobile-first and responsive, support optional installation and an app-like installed experience, remain accessible through the browser without installation, and operate online only.

The UI shall provide a network-error state. The same Google account shall remain associated across browser and installed PWA use, and reinstalling the PWA shall not create a separate account. PWA share-target input shall be described only as conditional on support and successful validation.

Responsive schedules shall support grouping by date or day where applicable, clear course identity and code where useful, Theory or Practical identification, batch where relevant, start and end time, Safe Bunk selection state, Future Simulator ATTEND or BUNK/MISS state, Recovery progress, efficient scrolling, and accessible interaction.

The UI shall support reversible actions, including removing an upload before processing, editing extracted attendance, timetable, or calendar data, rejecting data before confirmation, selecting or deselecting a Safe Bunk class, changing or resetting Future Simulator decisions, modifying a Safe Bunk selection, and returning to the dashboard.

Exact colors, fonts, component libraries, icon libraries, animation frameworks, CSS systems, and frontend technologies shall remain implementation decisions.

# 9. Non-Functional Requirements

## 9.1 Scope and Quality Principles

AttendSense Phase 1 shall provide reliable, secure, maintainable, accessible, mobile-first, online-only attendance analysis without adding unapproved product features.

All quality requirements in this section shall support the approved course-aware architecture: confirmed attendance may originate from PDF, one image, or multiple images; a student-uploaded timetable uses image or screenshot input only; and a student-uploaded official SPCE Academic Calendar uses PDF input only.

---

## 9.2 Performance

The interface shall provide responsive feedback for confirmed course attendance display, Safe Bunk selection or deselection, Attendance Recovery, Future Attendance Simulator scenarios, 75% threshold evaluation, and course or session matching where applicable.

Safe Bunk interactions shall recalculate only the affected course records for explicitly selected bunk classes. Future Simulator interactions may recalculate the affected course records after ATTEND or BUNK/MISS scenario changes.

Document workflows for attendance PDF, attendance images, multiple images, timetable images or screenshots, and Academic Calendar PDFs shall provide visible progress without artificial fixed-time guarantees. Extraction reliability shall take priority over an artificially low processing time.

---

## 9.3 Deterministic Reliability

For identical confirmed structured inputs, confirmed timetable and Academic Calendar data, mappings, applicable date or time, and analysis selections, AttendSense shall produce identical mathematical results.

Calculation-critical outcomes shall use full available precision internally and apply display rounding only after calculation. Generative AI or LLM output shall not determine course attendance percentages, projected course attendance, Safe Bunk safety, Recovery requirements, Future Simulator results, or threshold compliance.

Document-processing technology may assist extraction, but extraction is fallible. Mandatory review/edit, confirmation, and successful save shall remain required even when extraction confidence is high.

---

## 9.4 Conservative Failure and Recovery

AttendSense shall fail conservatively when required information is missing, invalid, contradictory, ambiguous, unmatched, unconfirmed, or unreliable.

The system shall not silently guess attendance values, course mappings, batch applicability, calendar meaning, or future sessions, and shall not replace confirmed data with incomplete replacement data.

Where correction is possible, the student shall receive a clear review/edit, retry, or replacement path.

---

## 9.5 Confirmed-Data Integrity and Replacement

AttendSense shall protect three independently confirmed persisted inputs:

1. The latest confirmed course-aware attendance dataset.
2. The confirmed student-uploaded timetable.
3. The confirmed student-uploaded Academic Calendar.

Each shall remain active until its own replacement successfully completes the applicable Input, Extraction or Structuring, Validation, Review/Edit, Confirmation, and Save or Persistence stages.

A failed extraction, validation, save, or rejected replacement shall preserve the corresponding previous confirmed data. This protection shall apply independently to attendance, timetable, and Academic Calendar data.

---

## 9.6 Course-Aware Record Integrity

Calculation-critical course information shall preserve course code, course identity, Theory or Practical distinction, conducted, present, absent, calculation eligibility, and review or mapping state where applicable.

Where valid structured course codes exist, they shall be the authoritative primary identity. Minor OCR name differences shall not override a valid course-code identity. Theory and Practical records with separate official codes shall not be merged.

Code-less or ambiguous records shall not silently become calculation-eligible. Course, batch, and calendar ambiguity shall remain reviewable or conservatively excluded from calculation-critical outcomes.

Overall attendance may be retained only as supporting context or cross-validation and shall not be the primary calculation basis.

---

## 9.7 Session and Schedule Integrity

One confirmed scheduled attendance event shall equal one future attendance occurrence for its matched course.

If a practical or laboratory session spans multiple timetable periods but the confirmed timetable identifies it as one continuous session, it shall count as one scheduled attendance event. AttendSense shall not apply universal lecture, laboratory, or duration-based attendance weighting.

Timetable integrity shall preserve, where relevant, day or date applicability, start and end time, course or session identity, course code, Theory or Practical identity, batch applicability, and continuous multi-period session structure.

Academic Calendar integrity shall preserve Teaching, Teaching Continues, Non-Teaching, Unknown or Requires Review, and relevant scope or applicability metadata. Unknown or ambiguous calendar states shall not silently suppress timetable sessions.

---

## 9.8 Safe Bunk Quality Requirements

Safe Bunk shall be today-only. It shall consider only today's remaining applicable classes, and a class shall be selectable only when:

**current_time < class_start_time**

When current_time is at or after class_start_time, the class shall not be selectable.

Only explicitly selected bunk classes shall affect the projection. Unselected displayed classes shall have no projected attendance effect. Multiple selected classes for one course shall aggregate for that course, while different affected courses shall be calculated independently.

A Safe Bunk plan shall be SAFE only when every affected matched course remains at or above 75%. Overall attendance may be displayed only as supporting context.

---

## 9.9 Attendance Recovery Quality Requirements

Attendance Recovery shall be course-specific and shall reliably calculate the minimum additional future attended sessions required for the applicable course to reach at least 75%.

For each projected attended matched session, conducted and present shall increase by one while absent remains unchanged.

A recovery schedule or date may be produced only where confirmed timetable and Academic Calendar coverage supports it. If coverage ends first, AttendSense shall still return the mathematical required attended-session count, explain that a complete path or date cannot currently be determined, and not invent future sessions.

---

## 9.10 Future Simulator and Hypothetical-Data Isolation

Future Attendance Simulator may use ATTEND and BUNK/MISS scenario selections.

For a matched simulated ATTEND, conducted and present increase by one while absent is unchanged. For a matched BUNK/MISS, conducted and absent increase by one while present is unchanged.

Simulation shall operate independently for each affected course and preserve Theory or Practical separation. Overall attendance may be supporting context only. Simulator output shall remain hypothetical and shall never modify confirmed attendance.

Confirmed attendance, confirmed timetable and Academic Calendar data, Safe Bunk selections, Recovery projections, Future Simulator scenarios, and projected attendance shall remain isolated. Passage of time shall not convert a planned or simulated action into official attendance. Opening another calculator shall begin from the latest confirmed attendance dataset, not the result of another calculator.

---

## 9.11 Usability and Responsive Design

The interface shall use student-friendly language, minimal unnecessary navigation and repeated data entry, clear interaction feedback, and answer-first result presentation.

Students shall be able to distinguish confirmed course attendance, supporting overall attendance where shown, Safe Bunk SAFE or UNSAFE results, projected affected-course attendance, course-specific Recovery requirements and projections, and hypothetical Future Simulator results.

The interface shall distinguish Safe Bunk explicit select or deselect bunk actions from Future Simulator ATTEND or BUNK/MISS state changes.

Mobile-first responsive schedules shall remain usable with course identity, Theory or Practical distinction, batch information, time, Safe Bunk selection state, Future Simulator state, and Recovery progress. Safe Bunk shall remain today-only; Recovery and Future Simulator may span multiple dates only within confirmed coverage.

---

## 9.12 PWA, Compatibility, and Accessibility

The PWA shall be installable where supported, optional to install, available in the browser without installation, and provide an app-like installed experience. Phase 1 shall operate online only.

The same Google account shall remain associated across browser and installed PWA use, and reinstalling the PWA shall not create a separate account. PWA share-target support shall be conditional on platform support and successful validation, apply only to supported attendance files, and never prevent standard in-app attendance upload if it fails.

File compatibility shall distinguish:

- Attendance: PDF, supported image, or multiple supported images.
- Timetable: image or screenshot only.
- Academic Calendar: PDF only.

Unsupported or unreadable input shall fail gracefully.

Important states shall not rely on color alone. Accessible states include SAFE, UNSAFE, at threshold, below threshold, Recovery Required, Projected, Hypothetical, Requires Review, Validation Error, and Confirmed.

---

## 9.13 Online Operation and Error Recovery

Network failures shall not produce false success. Retry and recovery behavior shall cover Google authentication; attendance, timetable, and Academic Calendar upload, extraction, and save; recalculation; and schedule loading where applicable.

Retry shall not duplicate, overwrite, or corrupt confirmed data.

---

## 9.14 Maintainability and Extensibility

The system shall preserve modular separation among authentication, academic configuration, attendance input and extraction, timetable input and extraction, Academic Calendar input and extraction, validation and review, persistence, deterministic calculation, course or session mapping, calendar or batch filtering, PWA functionality, and UI.

Reusable UI and application components may include course-aware record displays, review/edit interfaces, schedule or session cards, Safe Bunk selection controls, Future Simulator scenario controls, status indicators, result presentation, and loading or error states.

Student-uploaded timetable and Academic Calendar extraction technologies shall be replaceable without redesigning the deterministic calculation engine. The engine shall remain independent from document acquisition and extraction method. The architecture shall not hard-code one timetable, department, semester, batch, or calendar layout, and shall not expand Phase 1 into multi-college support.

---

## 9.15 Testability

Calculation tests shall cover course attendance above, exactly at, and below 75%; Safe Bunk safe and unsafe boundaries; multiple selected skips for one course; selected skips across courses; an unselected Safe Bunk class with no effect; the strict current_time before class_start_time boundary; Theory or Practical separation; conducted equal to zero; precision boundaries; missing, unmatched, or code-less courses; batch match, mismatch, and unknown state; Teaching Continues; holiday, Non-Teaching, and ambiguous calendar states; continuous multi-period sessions; Recovery required-session calculations and incomplete coverage; Future Simulator ATTEND, BUNK/MISS, and mixed scenarios; and isolation of confirmed data from calculator results.

Attendance validation tests shall cover valid course-aware records, present plus absent equals conducted, mismatches, negative values, conducted equal to zero, percentage validation, structured course-code identity, Theory or Practical separation, duplicate or overlapping multiple-image records, conflicts, and code-less or ambiguous records.

Timetable tests shall cover image or screenshot extraction, event completeness, day or time, course code, Theory or Practical identity, batch, continuous multi-period sessions, unknown mapping or review state, and replacement preservation.

Academic Calendar tests shall cover PDF extraction, Teaching, Teaching Continues, Non-Teaching, Unknown or Requires Review, scope or applicability, holiday suppression, and replacement preservation.

Replacement tests shall cover attendance, timetable, and Academic Calendar failures during extraction, validation, rejection, and save, plus successful replacement only after confirmation and save.

---

## 9.16 Observability, Security, and Privacy

Diagnostics shall help developers investigate authentication, document-processing, validation, save, calculation, timetable or calendar mapping, share-target, and unexpected application failures.

Observability shall not expose sensitive implementation details to students or log secrets or sensitive authentication credentials.

---

## 9.17 Phase 1 Boundaries

This section shall not introduce notifications, offline operation, ERP integration, an admin or faculty portal, multi-college support, AI attendance decision-making, historical analytics, new calculators, or automatic attendance synchronization.

# 10. Security and Privacy Requirements

## 10.1 Security Scope

AttendSense Phase 1 shall protect three independently confirmed persisted inputs:

1. Latest confirmed course-aware attendance dataset.
2. Confirmed student-uploaded timetable.
3. Confirmed student-uploaded official SPCE Academic Calendar.

Only structured data that has completed the applicable input, validation, extraction or structuring, automatic validation, student review/edit, confirmation, and save or persistence workflow may become trusted persisted data.

---

## 10.2 Authentication and Session Security

Phase 1 shall use Sign in with Google and shall not require a separate AttendSense password.

Google authentication shall be securely verified, associated with a stable Google identity, and restore the same AttendSense account for a returning user. A valid authenticated session shall be required for protected functionality, and logout shall invalidate the active session. Reauthentication shall be required when a valid session is unavailable.

PWA installation or reinstallation shall not create, delete, or bypass the server-side account, authentication, or authorization.

---

## 10.3 Privacy and User-Data Isolation

AttendSense shall collect and retain only information required for authentication, academic context, the latest confirmed course-aware attendance dataset, confirmed timetable, confirmed Academic Calendar, required mappings or batch applicability, and approved analysis functionality.

Academic configuration provides academic context only. Timetable and Academic Calendar data are student-uploaded and independently confirmed; they shall not be automatically associated by academic configuration.

A student shall never access or modify another student's uploads, extracted data, confirmed attendance, timetable, Academic Calendar, academic configuration, mappings, temporary Safe Bunk selections, Recovery projections, Future Simulator scenarios, analysis results, or account information.

Authorization shall be enforced in trusted application or server logic, not merely by hiding UI elements or trusting a client-provided user identifier.

---

## 10.4 Untrusted Upload and File-Processing Security

All uploaded documents shall be treated as untrusted input.

Supported input security shall distinguish:

- Attendance: PDF, one image, or multiple images.
- Timetable: image or screenshot only.
- Academic Calendar: PDF only.
- PWA share target: supported attendance files only, where supported and successfully validated.

Validation shall consider actual supported type, file size, readability, corruption, image-count limits where applicable, and safe processing characteristics. Filename, extension, and client-provided MIME type shall not be trusted alone.

Uploaded files shall not be executed. Document-processing components shall have only the access necessary for extraction and validation. Processing failures shall not expose another user's data, overwrite confirmed data, bypass review, create trusted calculation data, or expose secrets or internal system information.

---

## 10.5 Course-Aware Attendance Integrity

The trusted attendance model shall be course-aware.

Calculation-critical records may include course code, course identity or label, Theory or Practical identity, conducted, present, absent, calculated course percentage, calculation eligibility, and review or mapping state where applicable.

Where a valid structured course code exists, it shall be the authoritative primary identity. Minor OCR course-name errors shall not override a valid course-code identity. Theory and Practical records with separate official codes shall remain separate. Code-less or ambiguous records shall not silently become calculation-eligible.

Validation shall include, where applicable:

- Present plus absent equals conducted.
- Conducted, present, and absent are non-negative.
- Present and absent do not exceed conducted.
- Percentage is within valid bounds where applicable.
- Extracted or reported percentage consistency where used for validation.
- Duplicate or conflicting records.
- Unresolved mapping or review states.

Overall attendance and No Attendance information may be retained only as supporting context, normalization, validation, or traceability. They shall not be the primary calculation model.

---

## 10.6 Session, Timetable, and Academic Calendar Integrity

One confirmed scheduled attendance event shall equal one future attendance occurrence for its matched course.

If a practical or laboratory session spans multiple timetable periods but is confirmed as one continuous session, it shall count as one scheduled attendance event. AttendSense shall not apply universal lecture, laboratory, or duration-based attendance weighting.

The confirmed timetable shall be student-uploaded as an image or screenshot, extracted, validated, manually reviewable and editable, explicitly confirmed, and persisted until replaced. Trusted timetable data shall preserve where applicable day or date, start and end time, course or session identity, course code, Theory or Practical identity, batch applicability, continuous multi-period structure, and mapping or review state.

The confirmed Academic Calendar shall be the official SPCE calendar uploaded by the student as a PDF, extracted, validated, manually reviewable and editable, explicitly confirmed, and persisted until replaced. Trusted calendar data shall preserve Teaching, Teaching Continues, Non-Teaching, Unknown or Requires Review, date or range, and scope or applicability metadata.

Unconfirmed or ambiguous timetable information shall not silently become trusted calculation input. Unknown or ambiguous calendar information shall not silently suppress timetable classes.

---

## 10.7 Trusted Calculation Validation

Authoritative calculations shall use trusted validated application logic. Client-provided calculated percentages, projected results, eligibility, or safety labels shall not automatically be trusted.

Trusted logic shall enforce course-aware attendance mathematics, the fixed 75% threshold, course-code matching, Theory or Practical separation, batch applicability, calendar applicability, current-time rules where applicable, deterministic formulas, full internal precision, and display rounding only after calculation.

Generative AI or LLM output shall not determine calculation-critical attendance results.

---

## 10.8 Safe Bunk and Simulator Input Security

Safe Bunk shall use explicit bunk selection only. Trusted logic shall revalidate that selected classes are today's applicable matched sessions, satisfy current_time before class_start_time, and meet course, batch, calendar, and time applicability requirements.

Only explicitly selected bunk classes shall affect a Safe Bunk projection. Unselected displayed classes shall have no projected effect. Manipulated client selections shall not bypass trusted session or course validation.

Future Simulator ATTEND and BUNK/MISS scenario selections remain valid hypothetical inputs and shall be revalidated against applicable confirmed schedule data.

---

## 10.9 Hypothetical-Data Isolation

Confirmed attendance, confirmed timetable, confirmed Academic Calendar, Safe Bunk selections, Recovery projections, Future Simulator scenarios, and calculated or projected results shall remain logically separated.

Safe Bunk, Recovery, and Future Simulator shall never modify confirmed attendance. Passage of time shall not convert a planned or simulated action into confirmed attendance. A calculator result shall not become input to another calculator as if it were official attendance.

---

## 10.10 Persistence and Safe Replacement

The persisted attendance dataset shall be capable of representing course-aware records required for approved calculations, including course identity, Theory or Practical identity, conducted, present, absent, calculated percentage, calculation eligibility, validation or mapping metadata, supporting overall information where useful, and dataset ownership metadata.

Confirmed timetable and confirmed Academic Calendar data shall be associated with the authenticated user's account, protected from other users, and reused until explicitly and successfully replaced. Logging out or reinstalling the PWA shall not delete them.

For attendance, timetable, and Academic Calendar independently, existing confirmed data shall remain active while replacement input is received, validated, extracted or structured, automatically validated, reviewed or edited, awaiting confirmation, or being saved.

Replacement shall occur only after successful validation, extraction or structuring, review/edit, explicit student confirmation, and successful persistence. If any required stage fails or the student rejects the replacement, the previous confirmed data shall remain active. Partially processed replacement data shall not overwrite confirmed data.

---

## 10.11 Source Files, Input Validation, and Retention

Original attendance PDFs or images, timetable images or screenshots, and Academic Calendar PDFs shall be treated as temporary processing inputs unless implementation genuinely requires otherwise.

Once confirmed structured data is successfully persisted and an original source file is no longer needed, it should be removed according to the selected temporary-storage policy. Failed or rejected processing should also clean temporary files after they are no longer needed. AttendSense shall not require permanent storage of original documents or a fixed retention duration.

Application input validation shall cover academic configuration, attendance, timetable and Academic Calendar uploads, manual review corrections, Safe Bunk explicit bunk selections, Recovery inputs where applicable, Future Simulator ATTEND or BUNK/MISS selections, future simulation range, and replacement operations.

---

## 10.12 Communication, Secrets, Logging, and Errors

Production communication shall use HTTPS. Authentication information, session data, uploaded documents, confirmed attendance, timetable or calendar data, and other protected user-specific data shall not intentionally travel over unsecured HTTP in production.

Secrets shall not be hard-coded into public source code, exposed to client code when server-confidential, committed to a public repository, logged, or exposed in user-facing errors. This includes OAuth, authentication, database, storage, and document-processing service credentials without requiring a specific vendor.

Logs shall not unnecessarily contain authentication secrets, access or session tokens, database or storage credentials, raw uploaded documents, or sensitive user-specific structured data. Operational diagnostics may use minimized information only where genuinely required and shall not expose technical diagnostics to students.

User-facing errors shall be safe and clear without exposing internal implementation details.

---

## 10.13 PWA Security and Phase 1 Boundaries

PWA share-target input shall be limited to supported attendance files, conditional on platform support and successful validation, and shall follow the same authentication, security, validation, review, confirmation, and save pipeline as standard attendance upload. Share-target failure shall not weaken or prevent standard upload security.

This section shall not introduce passwords, OTP authentication, ERP integration, faculty or admin accounts, notifications, offline operation, multi-college support, historical attendance analytics, automatic attendance synchronization, AI attendance decision-making, or new calculators.

# 11. Technology and System Constraints

## 11.1 Approved Primary Stack

AttendSense Phase 1 shall be a Progressive Web Application built with:

- Next.js, React, and TypeScript for the frontend application.
- Tailwind CSS for styling.
- Next.js server-side capabilities and Route Handlers where appropriate.
- Sign in with Google for authentication.
- PostgreSQL with Prisma ORM for persistence.
- Deterministic TypeScript logic for calculations.
- Vercel for deployment.
- Git and GitHub for version control and repository hosting.

No additional framework, service, vendor, or lower-level library is required by this PRD unless approved elsewhere. Exact production libraries, providers, deployment configuration, scaling choices, and implementation details may be finalized in IMPLEMENTATION_PLAN.md.

---

## 11.2 Platform and Trust Boundary

The application shall be browser-accessible, installable as a PWA where supported, mobile-first, responsive across smartphones, tablets, laptops, and desktops, and online-only in Phase 1. Installation shall be optional, and no separate native Android or iOS application is required.

Trusted server or application logic shall handle authentication verification, authorization, user-data isolation, protected persistence, upload-processing coordination, trusted validation, confirmed-data replacement, database operations, and other security-sensitive operations.

Client input is not inherently trusted. Client-side validation may improve UX, but integrity-critical validation shall occur in trusted logic where required. The architecture shall not require a separate backend service unless later implementation constraints require one.

---

## 11.3 Authentication and Persistence Technology

Google authentication shall use a stable Google identity association, recognize returning users, support session handling and logout, and require reauthentication when needed. No username/password or OTP authentication is required. The compatible authentication library may be selected in IMPLEMENTATION_PLAN.md.

PostgreSQL and Prisma shall support, where applicable, the AttendSense account, Google identity association, academic context, latest confirmed course-aware attendance dataset, confirmed timetable, confirmed Academic Calendar, required course or batch mappings, review or validation metadata, ownership metadata, and other minimal Phase 1 metadata genuinely required.

The database shall not be modeled primarily around overall attendance values or unnecessary historical version tracking.

---

## 11.4 Course-Aware Attendance Architecture

The latest confirmed attendance dataset shall represent course records containing, where applicable:

- Course code and course name or label.
- Theory or Practical identity.
- Conducted, present, and absent values.
- Calculated course attendance percentage.
- Calculation eligibility.
- Review, mapping, and validation state.
- Ownership and dataset metadata.

Where a valid structured course code exists, it shall be the authoritative primary identity. Minor OCR course-name differences shall not override it. Theory and Practical records with separate official codes shall remain separate. Code-less or ambiguous records may be retained for review or display but shall not silently become calculation-eligible.

Overall attendance, Reported Total, and No Attendance information may be retained only for supporting context, normalization, validation, or traceability. They are not the primary Phase 1 calculation model.

---

## 11.5 Attendance Input and Extraction Architecture

Attendance input shall support PDF, one image, and multiple images. Multiple images belonging to one submission may be processed together, and duplicated or overlapping information shall not be counted more than once where reasonably possible.

Attendance PDF and image processing shall attempt to obtain, where available, course code, course name or label, conducted, present, absent, Theory or Practical identity, reported course percentage, and supporting overall or non-attendance values where useful.

Where machine-readable PDF text or structure is reliable, direct extraction may be preferred over unnecessary OCR. Course-wise content shall be located by content or structure rather than a permanently hard-coded page number or sample layout.

Image/OCR/document-vision processing shall support the same course-aware structure and multiple-image handling. No OCR or vision system shall be assumed perfectly accurate. Extraction output shall complete extraction, structuring or normalization, validation, student review/edit, confirmation, and persistence before it can support attendance analysis.

Exact supported extensions, size limits, image-count limits, and production extraction libraries or services may be finalized in IMPLEMENTATION_PLAN.md.

---

## 11.6 Extraction and Calculation Separation

The deterministic calculation engine shall consume confirmed structured course-aware data. It shall not depend directly on original PDF or image layout, an OCR vendor, or a PDF parser.

Document-extraction technology shall not determine Safe Bunk eligibility or result, Recovery result, Future Simulator result, or authoritative threshold compliance. Those outcomes belong to deterministic TypeScript calculation logic.

Core technical feasibility has been validated on the tested samples and scenarios for attendance PDF extraction, attendance image extraction, multiple-image attendance handling, timetable screenshot or image extraction, Academic Calendar PDF extraction, course-code matching, Theory or Practical separation, batch and calendar filtering, deterministic bunk calculation, and end-to-end core calculation integration.

This validation does not imply universal extraction perfection or production readiness.

---

## 11.7 Deterministic Calculation Engine

The deterministic TypeScript engine shall support course-aware confirmed attendance, Safe Bunk, Attendance Recovery, Future Attendance Simulator, the fixed 75% threshold, course-code matching, Theory or Practical separation, applicable batch, calendar, and session filtering, current-time boundaries, multiple selected Safe Bunk skips, independent multiple-course calculations, continuous multi-period session handling, precision rules, and missing, unmatched, or review states.

Threshold decisions shall use full internal precision; display rounding shall occur only after calculation. Generative AI or LLM output shall not determine calculation-critical results.

One confirmed scheduled attendance event shall equal one future attendance occurrence for its matched course. If a practical or laboratory session spans multiple timetable periods but the confirmed timetable identifies it as one continuous session, it shall count as one attendance event. Attendance weight shall not be inferred from session duration.

---

## 11.8 Student-Uploaded Timetable System

AttendSense shall not maintain or automatically assign a timetable from academic configuration. The student shall upload their own timetable as an image or screenshot only.

The timetable workflow shall be:

**Timetable Image/Screenshot**  
↓  
**File/Input Validation**  
↓  
**Extraction / Structuring**  
↓  
**Automatic Validation**  
↓  
**Student Review/Edit**  
↓  
**Student Confirmation**  
↓  
**Persistence**

The confirmed timetable shall remain associated with the authenticated account and be reused until explicitly and successfully replaced. Failed or rejected replacement shall preserve the previous timetable.

Confirmed timetable data shall preserve where applicable day or date, start and end time, course or session identity, course code, Theory or Practical identity, batch applicability, continuous multi-period structure, and mapping or review state. Timetable extraction shall not hard-code one layout and shall remain separable from deterministic calculation logic.

---

## 11.9 Student-Uploaded Academic Calendar System

AttendSense shall not maintain or automatically assign an Academic Calendar from academic configuration. The student shall upload the official SPCE Academic Calendar as a PDF only.

The calendar workflow shall be:

**Official SPCE Academic Calendar PDF**  
↓  
**File/Input Validation**  
↓  
**Extraction / Structuring**  
↓  
**Automatic Validation**  
↓  
**Student Review/Edit**  
↓  
**Student Confirmation**  
↓  
**Persistence**

The confirmed calendar shall remain associated with the authenticated account and be reused until explicitly and successfully replaced. Failed or rejected replacement shall preserve the previous calendar.

Confirmed calendar data shall preserve Teaching, Teaching Continues, Non-Teaching, Unknown or Requires Review, dates or date ranges, event information required for interpretation, and scope or applicability metadata. Teaching and Teaching Continues allow applicable timetable sessions; confirmed Non-Teaching, public holiday, or vacation periods suppress them. Unknown or ambiguous states shall not silently suppress sessions.

---

## 11.10 Future Session Generation and Current-Time Rule

Schedule-aware calculations shall generate applicable sessions from the confirmed student-uploaded timetable, confirmed student-uploaded Academic Calendar, course-code mapping, Theory or Practical identity, batch applicability, relevant date or range, and current date or time where required.

Generated sessions shall preserve enough identity to match the correct confirmed course record. Batch mismatches are not applicable; unknown batch applicability requires conservative review. Code-less or unmatched sessions shall not affect calculation without a confirmed mapping.

For current-day Safe Bunk, a class is selectable only when:

**current_time < class_start_time**

When current_time is at or after class_start_time, the class shall not be selectable for bunk planning.

---

## 11.11 Safe Bunk, Recovery, and Simulator Technical Models

Safe Bunk shall be today-only and generate today's remaining applicable sessions. Only explicitly selected bunk classes shall affect projection. Unselected displayed classes shall not be assumed attended and shall not modify projected conducted, present, or absent values.

For one selected matched skipped occurrence, conducted increases by one, present remains unchanged, and absent increases by one. Multiple skips of one course aggregate for that course; different courses are calculated independently. A plan is SAFE only when every affected matched course remains at or above 75%. Overall attendance may be supporting context only.

Attendance Recovery shall be course-specific. For a course below 75%, it shall determine the minimum additional future attended sessions needed to satisfy (P + x) / (C + x) at or above 0.75, where P is confirmed present, C is confirmed conducted, and x is additional attended sessions. Each projected attended session increases conducted and present by one and leaves absent unchanged. If confirmed coverage cannot map all required sessions, the system shall return the mathematical count without inventing future sessions.

Future Simulator shall operate on confirmed course-aware attendance. A simulated ATTEND increases conducted and present by one; BUNK/MISS increases conducted and absent by one. Scenarios shall be applied independently to affected course records, preserve Theory or Practical separation, remain hypothetical, and not modify confirmed attendance.

---

## 11.12 Confirmed-Data Replacement and Temporary Source Files

The technical architecture shall support independent persistence and safe replacement of attendance, timetable, and Academic Calendar data.

Each existing confirmed input shall remain active until its replacement completes input or upload, validation, extraction or structuring, automatic validation, student review/edit, confirmation, and persistence. Failure, rejection, or save failure shall preserve previous confirmed data.

Attendance PDFs or images, timetable images or screenshots, and Academic Calendar PDFs shall be temporary source inputs. Original documents need not be permanently retained once confirmed structured data is persisted and a source file is no longer needed. Failed or rejected inputs should be cleaned after they are no longer required for active processing or error handling. Exact storage mechanisms belong in IMPLEMENTATION_PLAN.md.

---

## 11.13 PWA, Share Target, and Online Operation

The PWA shall include a manifest, app name and icons, display configuration, required PWA metadata, standalone app-like experience, optional installation, and browser operation while remaining online-only in Phase 1.

Reinstalling the PWA shall not create duplicate accounts, academic configuration, confirmed attendance, confirmed timetables, or confirmed Academic Calendars.

PWA share-target functionality shall be conditional and limited to supported attendance files. It depends on installation, registration, OS and browser or PWA support, supported file registration, successful file reception, authentication interaction, and implementation or platform validation.

Shared attendance input shall enter the same attendance-processing pipeline and shall not bypass authentication, validation, extraction, normalization, review/edit, confirmation, persistence, or temporary-file cleanup. It shall not be extended to timetable or Academic Calendar input.

Active internet access is required for Phase 1 operations including authentication, protected server operations, persisted data access, attendance, timetable, and Academic Calendar upload or extraction, database operations, and any selected external processing service.

---

## 11.14 External Services and Phase 1 Boundaries

Controlled external dependency categories may include Google authentication, PostgreSQL hosting, document processing where required, and deployment. Any selected service shall satisfy security/privacy, deployment, maintainability, reliability, and cost requirements without locking an unapproved provider in this PRD.

Course attendance values may be displayed as confirmed-data and analysis context, but there shall be no separate standalone calculation feature for current attendance.

This section shall not introduce a native mobile application, offline operation, ERP integration, automatic attendance synchronization, admin or faculty portal, multi-college architecture, notifications, historical analytics, AI or LLM attendance decision-making, or new calculators.

# 12. Future Scope (Post Phase 1)

## 12.1 Purpose

Phase 1 already provides secure Google authentication, student-provided attendance input, course-aware extraction and confirmation, student-uploaded timetable and official Academic Calendar workflows, deterministic course-aware attendance planning, Safe Bunk, Attendance Recovery, Future Attendance Simulator, and confirmed-data persistence.

Section 12 describes possible post-Phase-1 expansions. These possibilities shall extend, not replace, the approved Phase 1 principles.

---

## 12.2 Institutional Integration

Phase 1 has no ERP or institutional API integration.

Future versions may support direct college or university attendance-system integration, automatic official attendance synchronization, secure institutional data import, institutional authentication where appropriate, and broader institutional integration.

Multi-institution expansion remains future scope.

---

## 12.3 Attendance History

Phase 1 uses the latest confirmed attendance dataset as the active attendance base and does not require full historical dataset storage.

Future versions may support attendance upload history, dataset or version history, weekly or monthly trends, historical analytics, and attendance progress over time.

---

## 12.4 Smart Notifications

Notifications are outside Phase 1.

Future versions may support low-attendance warnings, recovery reminders, upcoming attendance-risk reminders, useful attendance milestones, and push, email, or in-app notifications.

---

## 12.5 Advanced Attendance Analytics

Course-aware calculations and Theory/Practical separation where official course codes differ already exist in Phase 1. Supporting overall attendance may be shown where useful, but it is not the primary calculation basis.

Future versions may add deeper analytical capabilities such as historical course-attendance trends, heatmaps, comparative trends over time, advanced visual analytics, semester-level trend dashboards, and richer insights derived from historical confirmed data.

---

## 12.6 Multi-Semester Historical Support

Phase 1 supports students who belong to different SPCE semesters within their current active academic context.

Future multi-semester functionality means one student retaining, switching between, or comparing multiple historical semester datasets. Possible future features include multiple saved semesters, semester switching, archived semester records, and cross-semester comparisons.

---

## 12.7 Non-Authoritative AI Enhancements

Phase 1 may already use OCR or document-vision technology for extraction. Future AI enhancements may improve document interpretation, extraction-error detection, natural-language explanation, natural-language attendance queries, or optional personalized insights.

AI or LLM shall not replace deterministic calculation logic for attendance percentages, Safe Bunk, Recovery, Future Simulator, or 75% threshold decisions. Mandatory student review/edit/confirmation shall remain required.

---

## 12.8 Faculty and Administrative Portal

Phase 1 is student-focused.

Future institutional functionality may include faculty dashboards, department analytics, batch-level analytics, administrative reporting, and institutional attendance visualization. These remain separate from the student Phase 1 PWA.

---

## 12.9 Cross-Platform Expansion

Phase 1 remains PWA-only and online-only.

Future versions may include native Android, native iOS, desktop, or other appropriate platform experiences. These are not required for Phase 1.

---

## 12.10 Future Product Vision

Future AttendSense functionality shall build on secure authentication, reliable document extraction, course-aware structured attendance, mandatory student review/edit/confirmation, deterministic calculations, course-code-first matching where available, safe handling of ambiguous data, confirmed-data integrity, privacy-conscious handling, and student-friendly UX.

Future expansion shall remain realistic and directly related to AttendSense. It shall not introduce social networking, leaderboards, gamification, attendance manipulation, fake or proxy attendance, facial recognition, biometrics, blockchain, payments, advertising, parent monitoring, AI-generated bunk recommendations, or college-management ERP replacement without separate approval.
