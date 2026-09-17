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

This section defines the security and privacy requirements for the Phase 1 version of AttendSense.

AttendSense shall follow the principle of collecting, processing, storing, and exposing only the information necessary for the application's intended functionality.

Security controls shall protect user authentication, attendance information, uploaded files, academic configuration, persisted attendance data, hypothetical attendance-analysis data, and application functionality from unauthorized access or modification.

---

## 10.1 Google Authentication Security

### SR-001 — Google-Based Authentication

AttendSense shall use **Sign in with Google** as the authentication mechanism for Phase 1.

AttendSense shall not require students to create or maintain a separate AttendSense password.

Authentication shall rely on the verified Google identity returned through the configured Google authentication mechanism.

Any valid Google account may be used to authenticate during Phase 1.

Google authentication shall verify the user's Google identity but shall not be treated as verification of official student enrollment.

---

### SR-002 — Authentication Verification

Authentication information received from Google shall be securely verified before an AttendSense authenticated session is established.

The application shall not trust client-provided identity information without the required authentication verification.

---

### SR-003 — Google Identity Association

Each AttendSense account shall be associated with the corresponding authenticated Google identity.

The system shall use a stable identifier provided through the Google authentication process to recognize returning users.

A returning user authenticating with the same associated Google identity shall access the existing AttendSense account rather than creating a new account.

---

## 10.2 Authentication Session Security

### SR-004 — Protected Application Access

Functionality requiring authentication shall only be accessible through a valid authenticated session.

Unauthenticated users attempting to access protected functionality shall be redirected or required to authenticate.

---

### SR-005 — Session Validation

AttendSense shall validate the user's authentication state before providing access to protected user-specific functionality.

Expired, invalid, or otherwise unusable sessions shall not provide access to protected functionality.

---

### SR-006 — Logout Security

When a student logs out:

- The current authenticated session shall be invalidated appropriately.
- Protected functionality shall no longer be accessible through that session.
- Reauthentication shall be required before protected functionality can be accessed again.

Logging out shall not delete:

- The student's AttendSense account.
- Academic configuration.
- Latest confirmed attendance dataset.

---

### SR-007 — PWA Authentication

Installing or uninstalling the AttendSense PWA shall not create or delete the user's server-side AttendSense account.

If local authentication state is unavailable after:

- PWA reinstallation.
- Browser data removal.
- Application data removal.
- Session expiration.
- Manual logout.
- Access from another supported device or browser.

the student shall authenticate again using Google.

After successful authentication using the same associated Google identity, AttendSense shall recognize the existing account and restore the user's persisted application information.

---

## 10.3 User Data Privacy

### SR-008 — Data Minimization

AttendSense shall collect and maintain only user information required for application functionality.

Phase 1 shall avoid collecting unnecessary sensitive or institutional student information.

AttendSense shall not require official student enrollment numbers solely for authentication.

---

### SR-009 — Google Account Information

AttendSense shall request only the Google identity information required for authentication and account functionality.

The application shall not request unnecessary access to unrelated Google account services or information.

---

### SR-010 — Academic Configuration Privacy

Academic configuration associated with a user shall only contain information required to determine the applicable timetable, academic calendar, and related AttendSense functionality.

The application shall avoid collecting unrelated academic or personal information.

---

## 10.4 Attendance File Security

### SR-011 — Upload Validation

Uploaded or shared attendance files shall be validated before being accepted for processing.

Validation shall include applicable checks such as:

- Supported file type.
- Configured file-size limit.
- Valid file structure where possible.
- Maximum permitted number of uploaded images.
- Whether the file can be safely processed by the attendance-processing pipeline.

A file shall not be trusted solely because of its filename or extension.

Where technically practical, AttendSense shall validate the actual file type or relevant content characteristics rather than relying exclusively on the filename extension or client-provided MIME type.

---

### SR-012 — Restricted Attendance Upload Access

Protected attendance-file processing shall only be available to authenticated users.

An uploaded or shared attendance file shall be associated only with the authenticated user/session performing the relevant attendance workflow.

Where a file is received through PWA share-target functionality while no valid authenticated session exists, protected attendance processing shall not proceed until the required authentication has successfully completed.

---

### SR-013 — Safe File Handling

Uploaded PDFs and images shall be treated as untrusted input.

AttendSense shall not execute content contained within uploaded files.

Uploaded files shall only be processed using the mechanisms required for:

- Attendance extraction.
- Normalization.
- Validation.
- Student review and confirmation.

File-processing components shall operate only with the access required to perform the intended attendance-processing operation.

---

### SR-014 — PWA Share-Target File Security

Attendance files received through supported PWA share-target functionality shall be subject to the same security and data-integrity requirements as files selected directly within AttendSense.

A shared file shall not bypass:

- Authentication requirements.
- File validation.
- Safe file processing.
- Attendance extraction.
- Attendance normalization.
- Automatic validation.
- Student review.
- Student confirmation.
- Data-retention requirements.

Receiving a shared file shall not automatically create or replace a confirmed attendance dataset.

If a shared file is received while the student is unauthenticated, AttendSense may temporarily retain the input only where the selected technical implementation can do so safely and reliably.

If the shared input cannot be safely retained through authentication, the student shall be required to provide the attendance file again.

---

## 10.5 User Data Isolation

### SR-015 — User-Specific Data Access

A student shall not be able to access another user's:

- Uploaded attendance information.
- Extracted attendance data.
- Confirmed attendance data.
- Academic configuration.
- Attendance calculation or simulation information.
- User-specific account information.

User-specific data access shall be restricted to the authenticated account to which the data belongs.

---

### SR-016 — Server-Side Authorization

Access restrictions for protected user data shall not rely exclusively on hiding interface elements.

Where user-specific data is requested, created, updated, replaced, or deleted, AttendSense shall verify authorization in trusted server-side application logic where applicable.

Attendance dataset replacement shall only be performed for the authenticated user who owns the applicable confirmed attendance dataset.

---

### SR-017 — Database Access Protection

Persisted user-specific data shall be accessed through authorized application operations and shall not be directly exposed to unauthenticated clients.

Database credentials, privileged database operations, and other server-side data-access secrets shall not be exposed to browser/client code.

Client-provided user identifiers shall not by themselves be treated as sufficient authorization to access or modify user-specific database records.

---

## 10.6 Attendance Data Integrity

### SR-018 — Extraction Integrity

Raw attendance extraction results shall not be treated as automatically trustworthy.

Attendance information shall pass through the approved workflow:

**Attendance Input → Extraction → Normalization → Automatic Validation → Student Review → Student Confirmation**

before becoming eligible for attendance calculations or persistence as the student's latest confirmed attendance dataset.

---

### SR-019 — Calculation Input Protection

The attendance calculation engine shall only accept attendance values that satisfy the application's required validation rules.

The system shall prevent invalid values such as:

- Negative Overall Present Slots.
- Negative No Attendance slots where applicable.
- Overall Present Slots greater than Overall Effective Total Slots.
- Overall Effective Total Slots less than or equal to zero where a percentage calculation is required.
- Attendance percentages outside the valid 0%–100% range.
- Missing required attendance values.
- Incorrect or unresolved No Attendance normalization.
- Unresolved conflicting attendance information.

from being treated as valid calculation inputs.

---

### SR-020 — Trusted Calculation Validation

Security- and integrity-critical attendance rules shall not depend exclusively on values supplied or modified through the client interface.

Where applicable, attendance values, feature eligibility, attendance-slot weights, normalization rules, and calculation inputs shall be validated or applied in trusted application logic before authoritative calculation results are produced.

The defined Phase 1 attendance-slot weights shall remain:

- **Lecture = 1 attendance slot**
- **Laboratory session = 2 attendance slots**

---

### SR-021 — Hypothetical Attendance Data Isolation

Safe Bunk selections, Attendance Recovery projections, and Future Attendance Simulator scenarios shall remain logically separate from the student's latest confirmed attendance dataset.

Hypothetical or projected attendance information shall not overwrite, modify, or become confirmed attendance merely because it has been:

- Calculated.
- Displayed.
- Temporarily stored in client state.
- Revisited later.
- Associated with a date that has subsequently passed.

Safe Bunk, Attendance Recovery, and Future Attendance Simulator results shall not modify the student's latest confirmed attendance dataset.

Confirmed attendance shall change only when a newer attendance submission successfully completes the required:

**Input → Extraction → Normalization → Automatic Validation → Student Review → Student Confirmation → Persistence**

workflow.

---

## 10.7 Input Validation

### SR-022 — User Input Validation

User-provided application inputs shall be validated before being processed or stored.

Validation shall be appropriate to the expected data type and intended use.

Examples include:

- Academic configuration selections.
- Uploaded or shared file metadata.
- Calculation parameters.
- Future class selections.
- Safe Bunk ATTEND/BUNK selections.
- Future Attendance Simulator ATTEND/BUNK selections.
- Future simulation date/range selections.

---

### SR-023 — Malformed Input Handling

Malformed, manipulated, or unexpected input shall not cause AttendSense to expose internal application information or produce uncontrolled application behavior.

Invalid input shall be rejected gracefully.

---

## 10.8 Communication Security

### SR-024 — HTTPS

Production deployment of AttendSense shall use HTTPS.

Authentication information, session information, uploaded attendance data, user-specific information, and other protected communication shall not intentionally be transmitted over unsecured HTTP in production.

---

### SR-025 — Secure Authentication Communication

Authentication-related communication shall use the security mechanisms required by the selected Google authentication implementation.

Authentication credentials, tokens, or other sensitive authentication information shall not be unnecessarily exposed through:

- Application URLs.
- Logs.
- User-facing interfaces.
- Client-visible error messages.

---

## 10.9 Secrets and Configuration Security

### SR-026 — Secret Management

Application secrets and sensitive configuration shall not be hard-coded into publicly accessible source code or exposed to client-side code where they are intended to remain confidential.

Examples include:

- Authentication secrets.
- OAuth client secrets, where applicable.
- Database credentials.
- Storage credentials.
- External document-processing credentials, if introduced during implementation.

Sensitive values shall be managed using appropriate environment and configuration mechanisms.

---

### SR-027 — Repository Protection

Secrets shall not be intentionally committed to the public Git repository.

Configuration examples intended for the repository shall use placeholder values rather than real credentials.

Environment files containing sensitive production credentials shall not be publicly committed.

---

## 10.10 Error Information Security

### SR-028 — User-Facing Errors

User-facing error messages shall provide enough information for the student to understand the problem without unnecessarily exposing:

- Stack traces.
- Database information.
- Internal server paths.
- Secret values.
- Authentication tokens.
- Internal implementation details.

Detailed technical errors may be recorded using appropriate development or server-side logging mechanisms where required.

---

## 10.11 Application Logging

### SR-029 — Sensitive Data Logging

AttendSense shall avoid unnecessarily recording sensitive user information in application logs.

The system shall not intentionally log:

- Authentication secrets.
- Session credentials.
- Access tokens.
- OAuth secrets.
- Database credentials.
- Raw secret configuration values.

Uploaded attendance document content shall not be unnecessarily duplicated into application logs.

Extracted or confirmed attendance information shall only be logged when genuinely required for controlled debugging or operational purposes and shall be minimized appropriately.

---

## 10.12 Attendance Data Persistence and Retention

### SR-030 — Confirmed Attendance Data Persistence

AttendSense shall persist the student's latest successfully validated and confirmed attendance dataset.

This allows the student to return to AttendSense and continue using attendance-analysis functionality without uploading attendance data every time the application is opened.

The persisted latest confirmed attendance dataset may contain normalized information required by AttendSense, including:

- **Overall Present Slots.**
- **Overall Effective Total Slots.**
- Displayed or Reported Total Slots, where required for normalization or traceability.
- No Attendance or equivalent non-attendance slots, where applicable.
- Calculated Overall Attendance Percentage.
- Relevant validation metadata required by the implementation.
- Information required to identify and manage the latest confirmed attendance dataset.

Individual subject-wise attendance percentages shall not form the calculation basis of the persisted Phase 1 attendance dataset.

Course-level or other extracted information shall only be persisted where it is genuinely required by the final implementation for supported application functionality, validation, or traceability.

The persisted attendance dataset shall remain associated with the student's AttendSense account until it is:

- Successfully replaced by newer confirmed attendance data, or
- Removed according to an authorized application operation or future retention requirement.

Logging out or reinstalling the PWA shall not automatically delete the student's latest confirmed attendance dataset.

---

### SR-031 — Uploaded Source File Retention

Original uploaded or shared PDF/image files shall be treated as **temporary processing inputs**.

They shall not be retained longer than necessary to complete the required attendance-processing workflow.

The required workflow shall be:

**PDF/Image Received**

↓

**File Validation**

↓

**Attendance Extraction**

↓

**Normalization**

↓

**Automatic Validation**

↓

**Student Review**

↓

**Student Confirmation**

↓

**Normalized Attendance Successfully Persisted**

↓

**Original Upload No Longer Required**

↓

**Original PDF/Image Removed**

Once the normalized attendance dataset has been successfully persisted and the original source file is no longer required for the active workflow, the original file shall be removed according to the selected temporary-storage mechanism.

If processing fails, validation fails, or the student rejects the interpreted dataset, temporary uploaded files shall also be removed after they are no longer required for the active processing or error-handling workflow.

AttendSense shall avoid maintaining unnecessary permanent copies of uploaded attendance documents.

Temporary-file cleanup behavior shall be included in implementation and testing requirements for the selected storage architecture.

---

### SR-032 — Attendance Dataset Replacement

When a student provides newer attendance data, AttendSense shall process the new submission independently from the student's existing confirmed attendance dataset.

The existing confirmed attendance dataset shall remain unchanged while the new submission is being:

- Received.
- Validated as a file/input.
- Extracted.
- Normalized.
- Automatically validated.
- Reviewed by the student.

The existing dataset shall only be replaced after the new attendance dataset has:

1. Passed required file/input validation.
2. Been successfully extracted.
3. Been successfully normalized.
4. Passed required automatic validation.
5. Been reviewed by the student.
6. Been explicitly confirmed by the student.
7. Been successfully persisted.

The replacement workflow shall therefore be:

**Existing Confirmed Attendance**

↓

**Student Provides New Attendance**

↓

**New Input Validated**

↓

**New Data Extracted**

↓

**New Data Normalized**

↓

**New Data Automatically Validated**

↓

**Student Reviews New Data**

↓

**Student Confirms New Data**

↓

**New Data Successfully Saved**

↓

**Previous Attendance Dataset Replaced**

↓

**New Dataset Becomes Latest Confirmed Attendance Dataset**

The replacement operation shall only affect the confirmed attendance dataset belonging to the authenticated user performing the update.

The previous confirmed attendance dataset shall not be erased merely because a new upload or update was attempted.

---

### SR-033 — Failed Replacement Protection

If a new attendance submission:

- Fails to upload or be received.
- Fails file validation.
- Fails extraction.
- Fails normalization.
- Fails automatic validation.
- Contains incomplete information.
- Contains unresolved conflicting information.
- Is rejected by the student during review.
- Fails to persist successfully.

the student's existing confirmed attendance dataset shall remain unchanged.

A failed attendance update shall never automatically destroy the last successfully confirmed attendance dataset.

---

### SR-034 — Latest Confirmed Attendance Dataset

AttendSense shall maintain only the latest confirmed attendance dataset as the student's current confirmed attendance state for Phase 1.

After a new dataset successfully replaces the previous dataset, the previous dataset shall no longer be treated as the student's current confirmed attendance information.

Phase 1 shall not require historical attendance-upload version tracking unless such functionality is explicitly introduced later.

Calculated, projected, or simulated attendance results shall never become the latest confirmed attendance dataset automatically.

---

## 10.13 Client-Side Data Protection

### SR-035 — Sensitive Browser Storage

Sensitive authentication credentials, application secrets, database credentials, or privileged service credentials shall not be stored in insecure client-side storage.

AttendSense shall use the session-management mechanisms provided by the selected authentication architecture.

Client-side storage, where used for non-secret application state, shall not be treated as a trusted source for security-sensitive or attendance-integrity-sensitive decisions.

---

### SR-036 — Client Trust Boundary

AttendSense shall treat client-side input as untrusted.

Client-side validation may be used to improve the user experience, but required:

- Authentication.
- Authorization.
- Attendance validation.
- Data-integrity validation.
- Dataset ownership validation.
- Security-critical calculation rules.

shall also be enforced in trusted application logic where applicable.

Client-side modification of attendance values, slot weights, eligibility states, user identifiers, or other protected values shall not by itself modify authoritative persisted data or bypass server-side controls.

---

## 10.14 External Processing Service Security and Privacy

### SR-037 — External Attendance-Processing Services

If an external OCR, vision, PDF-processing, storage, or related service receives attendance files or extracted attendance information, the service shall be evaluated before production use for appropriate:

- Security characteristics.
- Privacy characteristics.
- Data-handling practices.
- Data-retention behavior.
- Transmission security.
- Credential-management requirements.
- Suitability for the attendance information being processed.

AttendSense shall avoid transmitting more user information to an external processing service than is necessary for the required attendance-processing operation.

Where technically possible and appropriate, information unrelated to the required attendance extraction operation should not be transmitted to external processing services.

The selection of an external processing service shall not remove AttendSense's requirement for automatic validation and mandatory student confirmation of interpreted attendance information.

---

### SR-038 — External Service Credentials

Credentials used to access external document-processing, storage, OCR, vision, or related services shall remain protected through appropriate server-side secret-management mechanisms.

Such credentials shall not be exposed in browser/client code when they are intended to remain confidential.

---

## 10.15 Dependency Security

### SR-039 — Trusted Dependencies

AttendSense shall use established and actively maintained libraries and frameworks where practical.

Unnecessary third-party dependencies shall be avoided.

Dependencies that handle security-sensitive functionality shall be selected carefully.

Particular attention shall be given to dependencies involved in:

- Authentication.
- File processing.
- Database access.
- Session management.
- PWA functionality.
- External service communication.

---

### SR-040 — Dependency Maintenance

Critical application dependencies shall be kept reasonably updated during development and production maintenance.

Known critical security vulnerabilities affecting production dependencies shall be resolved, mitigated, or otherwise formally assessed and accepted before production deployment.

Dependencies that are abandoned, compromised, or no longer appropriate for secure production use shall be replaced where necessary.

---

## 10.16 Privacy Transparency

### SR-041 — Privacy Information

AttendSense shall provide users with clear information regarding the categories of information processed by the application.

This should include, where applicable:

- Google account information used for authentication.
- Academic configuration.
- Uploaded or shared attendance files.
- Extracted attendance information.
- Confirmed normalized attendance information.
- Attendance calculations.
- Safe Bunk planning information.
- Attendance Recovery projections.
- Future Attendance Simulator scenarios.
- Use of external document-processing services where applicable.

Where original attendance files are treated as temporary processing inputs, the application's privacy information shall communicate this behavior appropriately.

Where attendance information is transmitted to an external processing service, the application's privacy information shall communicate the relevant processing behavior as required by the selected production architecture and applicable requirements.

---

### SR-042 — Authentication Transparency

AttendSense shall clearly distinguish between:

- Google authentication, and
- Official institutional student verification.

Because Phase 1 permits authentication using a valid Google account, AttendSense shall not represent Google authentication as proof of official institutional enrollment.

---

### SR-043 — Confirmed vs Hypothetical Data Transparency

AttendSense shall clearly distinguish between:

- Latest confirmed attendance data.
- Safe Bunk projections.
- Attendance Recovery projections.
- Future Attendance Simulator results.

Hypothetical or projected attendance information shall not be represented to the student as updated official attendance information.

The application shall clearly communicate that attendance-analysis results do not modify confirmed attendance data.

---

## 10.17 Security Failure Principle

### SR-044 — Fail-Safe Behaviour

When a security-sensitive or data-integrity-sensitive operation cannot be safely completed, AttendSense shall prefer denying or stopping the operation rather than bypassing the required control.

Examples include:

- Invalid authentication.
- Expired session.
- Unauthorized user-data request.
- Cross-user data-access attempt.
- Invalid attendance upload.
- Unsafe or unsupported shared-file input.
- Failed attendance validation.
- Invalid calculation input.
- Failed attendance dataset replacement.
- Failure to safely persist confirmed attendance.
- Failure to safely process an external-service request where required.

Where possible, the application shall provide the student with an appropriate recovery action.

A security or processing failure shall not silently convert uncertain information into trusted attendance information.

---

## 10.18 Phase 1 Security and Privacy Principle

AttendSense Phase 1 shall follow the principles of:

**Minimum Required Data → Verified Authentication → Authorization & User Data Isolation → Validated Input → Secure Processing → Student Confirmation → Minimum Necessary Retention**

For attendance data specifically:

**Original PDF/Image = Temporary Processing Input**

**Validated + Student-Confirmed Normalized Attendance = Persisted Latest Confirmed Attendance Dataset**

**New Successfully Confirmed and Persisted Attendance = Replaces Previous Confirmed Attendance**

**Safe Bunk / Recovery / Future Simulation = Hypothetical Analysis That Does Not Modify Confirmed Attendance**

A failed or rejected new upload shall not remove the student's last successfully confirmed attendance dataset.

A shared attendance file shall not bypass the standard authentication, validation, processing, review, confirmation, or retention requirements.

Security and privacy controls shall remain proportional to the information and functionality handled by AttendSense while avoiding unnecessary collection or permanent storage of student information.

# 11. Technology and System Constraints

This section defines the approved Phase 1 technology stack, technical boundaries, and system-level constraints for AttendSense.

The technologies explicitly defined in this section are considered approved Phase 1 technology decisions and shall be followed during implementation planning.

Lower-level implementation technologies that are not yet finalized, particularly attendance document-extraction technologies, shall be evaluated and selected during the Implementation Plan.

---

## 11.1 Phase 1 Technology Stack

AttendSense Phase 1 shall use the following primary technology stack.

| System Area | Approved Technology |
|---|---|
| Application Type | Progressive Web Application (PWA) |
| Frontend Framework | Next.js |
| UI Library | React |
| Programming Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js server-side capabilities and Route Handlers |
| Authentication | Sign in with Google |
| Database | PostgreSQL |
| ORM | Prisma ORM |
| Attendance Calculation Engine | TypeScript-based deterministic calculation logic |
| PDF Attendance Processing | To be finalized during Implementation Planning |
| Image/OCR Processing | To be finalized during Implementation Planning |
| Deployment | Vercel |
| Version Control | Git |
| Source Repository | GitHub |

The approved technologies shall form the foundation of the Phase 1 implementation.

Supporting libraries and services may be introduced during implementation where required, provided that they do not contradict the requirements defined in this PRD.

---

## 11.2 Application Platform

### TC-001 — Progressive Web Application

AttendSense Phase 1 shall be developed as a **Progressive Web Application (PWA)** using Next.js, React, and TypeScript.

The application shall:

- Be accessible through supported web browsers.
- Be installable on supported devices and browsers.
- Provide an app-like experience when launched as an installed PWA.
- Provide a responsive interface suitable for mobile and desktop environments.

A separate native Android or iOS application shall not be required for Phase 1.

---

### TC-002 — Mobile-First Design

AttendSense shall follow a mobile-first implementation approach.

The application shall support responsive operation across:

- Smartphones.
- Tablets.
- Laptops.
- Desktop computers.

The primary attendance workflow shall remain fully usable on smartphones.

---

## 11.3 Frontend Technology

### TC-003 — Next.js and React

The AttendSense frontend shall be implemented using:

- Next.js.
- React.
- TypeScript.

The application shall use the modern Next.js application architecture selected during implementation planning.

The exact:

- Folder structure.
- Component structure.
- Rendering strategy.
- Route organization.
- State-management approach.

shall be defined in the Implementation Plan.

---

### TC-004 — TypeScript

TypeScript shall be used as the primary programming language for the AttendSense application.

Type safety shall be used where practical for:

- Overall attendance data.
- User data.
- Academic configuration.
- Timetable and academic-calendar data.
- Calculation inputs.
- Calculation outputs.
- Validation results.
- Server-client data structures.

Core attendance calculation logic shall use clearly defined types.

---

### TC-005 — Tailwind CSS

Tailwind CSS shall be used as the primary styling technology for the Phase 1 user interface.

The implementation shall use reusable and consistent styling patterns to support the UI/UX requirements defined in Section 8.

The detailed design system, including:

- Colors.
- Typography.
- Spacing.
- Component variants.
- Responsive breakpoints.
- Animation usage.

shall be finalized during UI implementation planning.

---

## 11.4 Backend Architecture

### TC-006 — Next.js Server-Side Architecture

AttendSense shall use the server-side capabilities provided by Next.js for Phase 1 backend functionality.

Server-side responsibilities shall include, where applicable:

- Authentication handling and verification.
- Authorization.
- Protected data access.
- Attendance persistence.
- Attendance-processing coordination.
- Required trusted validation.
- Database operations.
- Secure application operations.

A separate independent backend application shall not be required for Phase 1 unless a technical limitation identified during implementation makes one necessary.

---

### TC-007 — Route Handlers

Where HTTP endpoints are required, AttendSense shall use Next.js Route Handlers or the appropriate supported Next.js server-side mechanism.

The exact API/route structure shall be defined in the Implementation Plan.

The application shall not expose unnecessary public endpoints.

---

### TC-008 — Client Trust Limitation

Client-side information shall not be considered inherently trustworthy.

Client-side validation may improve usability and provide immediate feedback, but security-sensitive and data-integrity-sensitive operations shall be validated through trusted server-side logic where required.

---

## 11.5 Authentication Technology

### TC-009 — Google Authentication

Phase 1 shall use **Sign in with Google** as the user authentication method.

The authentication implementation shall support:

- Google identity verification.
- First-time AttendSense account creation.
- Returning-user recognition.
- Secure authenticated sessions.
- Logout.
- Reauthentication after session loss or expiration.

AttendSense shall not implement a separate username/password authentication system during Phase 1.

---

### TC-010 — Authentication Integration

A suitable authentication implementation compatible with Next.js and Google authentication shall be used.

The exact authentication library and configuration shall be finalized in the Implementation Plan.

The selected solution shall satisfy the authentication and security requirements defined elsewhere in this PRD.

---

### TC-011 — Google Identity Association

Each AttendSense account shall be associated with the corresponding verified Google identity.

A stable identifier obtained through the Google authentication process shall be used to recognize the same user during future authentication attempts.

---

## 11.6 Database Technology

### TC-012 — PostgreSQL

PostgreSQL shall be used as the persistent relational database for AttendSense Phase 1.

The database shall store persistent information required by the application, including where applicable:

- AttendSense user account information.
- Google identity association.
- Academic configuration.
- Latest successfully validated and confirmed normalized attendance dataset.
- Other application metadata required for Phase 1 functionality.

The exact PostgreSQL hosting provider shall be selected during the Implementation Plan.

---

### TC-013 — Prisma ORM

Prisma ORM shall be used as the primary application data-access layer between the AttendSense application and PostgreSQL.

Prisma shall be used for:

- Database schema representation.
- Application-level database access.
- Relationships.
- Database migrations.
- Type-safe data operations where applicable.

The exact Prisma models and relationships shall be defined in the Implementation Plan.

---

## 11.7 Attendance Data Architecture

### TC-014 — Normalized Overall Attendance Model

The database and application architecture shall support the normalized overall attendance representation defined by this PRD.

The latest confirmed attendance dataset shall be capable of representing the information required for Phase 1 attendance analysis, including:

- **Overall Present Slots.**
- **Overall Effective Total Slots.**
- Displayed or Reported Total Slots, where required for normalization or traceability.
- No Attendance or equivalent non-attendance slots, where applicable.
- Calculated Overall Attendance Percentage.
- Relevant validation metadata.
- Information required to associate the dataset with the authenticated student.
- Information required to identify and manage the latest confirmed attendance dataset.

Individual subject-wise attendance percentages shall not form the calculation basis of the Phase 1 attendance dataset.

Course-level or other extracted information may be represented where genuinely required for document interpretation, validation, or traceability, but the attendance calculation engine shall not depend on subject-wise attendance percentages.

The calculation engine shall not depend directly on the original PDF or image layout.

---

### TC-015 — Latest Confirmed Attendance Dataset

Phase 1 shall persist the student's latest successfully validated and confirmed normalized attendance dataset.

The latest confirmed attendance dataset shall remain associated with the student's account across:

- Browser sessions.
- Logout/login cycles.
- PWA reopening.
- PWA reinstallation followed by reauthentication.
- Supported device changes followed by authentication with the same associated Google identity.

A newly submitted attendance dataset shall replace the existing confirmed dataset only after successful:

1. File/input validation.
2. Extraction.
3. Normalization.
4. Automatic validation.
5. Student review.
6. Student confirmation.
7. Persistence.

If any required stage fails, the previously confirmed attendance dataset shall remain unchanged.

Hypothetical Safe Bunk, Attendance Recovery, or Future Attendance Simulator results shall not replace or modify the latest confirmed attendance dataset.

---

## 11.8 Attendance File Input

### TC-016 — Supported Attendance Input

Phase 1 shall accept attendance data through:

- Supported PDF files.
- Supported image files.

Multiple image files shall be supported within one attendance submission where necessary.

Students shall not be required to specify the original attendance-system source or layout of the PDF or image.

Exact:

- Supported image extensions.
- Maximum file size.
- Maximum PDF size.
- Maximum number of images.

shall be finalized during implementation planning and testing.

---

### TC-017 — Temporary Source Files

Original attendance PDF and image files shall be treated as **temporary processing inputs**.

The architecture shall not require permanent storage of original attendance files for normal Phase 1 operation.

The required lifecycle shall be:

**PDF/Image Received**

↓

**File Validation**

↓

**Attendance Extraction**

↓

**Normalization**

↓

**Automatic Validation**

↓

**Student Review**

↓

**Student Confirmation**

↓

**Normalized Attendance Successfully Persisted**

↓

**Original Source File No Longer Required**

↓

**Temporary Source File Removed**

If processing fails, validation fails, or the student rejects the interpreted dataset, temporary source files shall also be removed after they are no longer required for the active processing or error-handling workflow.

The exact temporary file-processing and storage mechanism shall be selected during the Implementation Plan.

---

## 11.9 PDF Attendance Processing

### TC-018 — PDF Extraction Strategy

AttendSense shall support extraction of the attendance information required to determine the student's normalized overall attendance dataset from supported PDF files.

Where a PDF contains usable machine-readable attendance information, direct PDF text or structured-data extraction shall be preferred over unnecessary OCR.

The processing pipeline shall attempt to identify relevant information such as:

- Overall Present Slots.
- Displayed or Reported Total Slots, where available.
- No Attendance or equivalent non-attendance slots, where applicable.
- Reported Overall Attendance Percentage, where available for validation.
- Other information required to reliably determine Overall Effective Total Slots.

Course-level information may be extracted where useful for document interpretation, validation, or traceability, but individual subject-wise attendance percentages shall not form the basis of Phase 1 attendance calculations.

The PDF processor shall ultimately produce normalized attendance information compatible with the common validation pipeline.

---

### TC-019 — PDF Processing Technology

The exact PDF parsing library or processing mechanism shall be selected during the Implementation Plan.

Selection shall consider:

- Compatibility with expected PDF structures.
- Extraction reliability.
- Numerical extraction accuracy.
- Next.js compatibility.
- Deployment compatibility.
- Security and privacy.
- Performance.
- Maintainability.
- Cost.

A PDF-processing failure shall not result in invented or assumed attendance values.

---

## 11.10 Image and OCR Processing

### TC-020 — Image Attendance Extraction

AttendSense shall use an appropriate OCR, document-vision, or equivalent image-processing mechanism to obtain the information required to determine the student's normalized overall attendance dataset from uploaded images.

The processing mechanism shall attempt to identify relevant information such as:

- Overall Present Slots.
- Displayed or Reported Total Slots, where available.
- No Attendance or equivalent non-attendance slots, where applicable.
- Reported Overall Attendance Percentage, where available for validation.
- Other information required to reliably determine and validate Overall Effective Total Slots.

Multiple uploaded images belonging to the same attendance submission shall be capable of being processed together where required.

The processing workflow shall detect or prevent duplicated attendance information from being counted more than once where reasonably possible.

---

### TC-021 — OCR/Vision Technology Selection

The exact OCR or vision technology shall be selected during the Implementation Plan after technical evaluation.

Candidate solutions shall be evaluated using representative attendance images.

Evaluation shall consider:

1. Overall extraction reliability.
2. Numerical recognition accuracy.
3. Ability to identify Overall Present Slots.
4. Ability to identify displayed/reported Total Slots.
5. Ability to identify No Attendance or equivalent values where present.
6. Ability to identify reported overall attendance percentages where useful for validation.
7. Multiple-image handling.
8. Duplicate-information handling.
9. Security and privacy.
10. Processing speed.
11. Integration complexity.
12. Usage limits.
13. Cost.
14. Vercel/Next.js deployment compatibility.

Course names, course codes, theory/practical information, or other document content may also be evaluated where useful for document interpretation or validation, but they shall not be mandatory calculation inputs unless required by the final supported attendance-document structure.

No OCR or vision system shall be assumed to provide perfectly accurate data.

Its output shall therefore remain subject to AttendSense normalization, automatic validation, student review, and student confirmation.

---

### TC-022 — Extraction Responsibility Boundary

The PDF/OCR/vision processing system shall be responsible for extracting and interpreting attendance information required by the approved attendance-processing workflow.

It shall not independently determine:

- Safe Bunk eligibility or results.
- Attendance Recovery requirements.
- Future Attendance Simulator results.
- 75% threshold compliance used for authoritative application decisions.

These responsibilities shall remain with the AttendSense deterministic calculation and validation logic.

---

## 11.11 Attendance Processing Pipeline

### TC-023 — Standard Processing Pipeline

Regardless of input format, AttendSense shall follow the approved attendance-processing pipeline:

**PDF / Image(s)**

↓

**File Validation**

↓

**Attendance Extraction**

↓

**Normalization**

↓

**Automatic Validation**

↓

**Student Review**

↓

**Student Confirmation**

↓

**Persistence of Latest Confirmed Attendance Dataset**

↓

**Attendance Analysis**

Raw extraction results shall not bypass the required normalization, validation, review, and confirmation stages.

---

### TC-024 — Input-Independent Calculation Engine

The attendance calculation engine shall remain independent of the attendance extraction mechanism.

The same normalized overall attendance structure shall be provided to the calculation engine regardless of whether the original attendance information came from:

- PDF, or
- Image.

The calculation engine shall operate on confirmed overall attendance information rather than depending on the structure or layout of the original attendance document.

This separation shall allow the extraction implementation to be modified without redesigning the attendance calculation engine.

---

## 11.12 Attendance Calculation Technology

### TC-025 — TypeScript Calculation Engine

The core attendance calculation engine shall be implemented using deterministic TypeScript logic.

The engine shall implement the formulas, attendance-slot rules, eligibility conditions, and boundary rules defined in Section 6.

The engine shall support:

- Determination of confirmed overall attendance from Overall Present Slots and Overall Effective Total Slots.
- Safe Bunk calculation.
- Attendance Recovery calculation.
- Future Attendance simulation.
- Fixed 75% threshold evaluation.
- Lecture and laboratory attendance-slot weighting.

The defined Phase 1 attendance-slot weights shall remain:

- **Lecture = 1 attendance slot**
- **Laboratory session = 2 attendance slots**

Confirmed overall attendance may be calculated and displayed as supporting application context.

**Current Attendance Calculation shall not exist as a separate calculator or standalone Phase 1 analysis feature.**

---

### TC-026 — No Generative AI for Calculations

Generative AI shall not be used to determine:

- Confirmed overall attendance percentages.
- Safe Bunk eligibility or results.
- Attendance Recovery requirements.
- Future Attendance Simulator percentages or results.
- 75% threshold compliance.
- Attendance-slot mathematical effects.

Attendance calculations shall remain deterministic and mathematically reproducible.

---

### TC-027 — Calculation Isolation

Core attendance formulas shall be implemented separately from:

- UI components.
- Document extraction.
- Database persistence.
- Authentication.
- Timetable presentation.

The calculation engine shall be independently testable using known numerical inputs and expected outputs.

---

## 11.13 Timetable System

### TC-028 — Predefined Timetable Data

AttendSense shall maintain the timetable information required for schedule-aware future attendance analysis.

Students shall not be required to manually create their complete timetable.

The appropriate predefined timetable shall be associated with the student's academic configuration.

The timetable shall provide sufficient information to determine applicable future:

- Lecture occurrences.
- Laboratory-session occurrences.
- Class dates.
- Class times where required.
- Course information required for student-facing schedule presentation.
- Lecture/laboratory classification required for attendance-slot weighting.

---

### TC-029 — Timetable Maintainability

Timetable data shall be maintained separately from core attendance formulas.

Changing timetable information shall not require modification of the mathematical attendance calculation engine.

The exact timetable data-storage and administration mechanism shall be defined in the Implementation Plan.

---

## 11.14 Academic Calendar System

### TC-030 — Predefined Academic Calendar

AttendSense shall maintain the academic-calendar information required for schedule-aware attendance analysis.

The calendar shall provide the information necessary to distinguish:

- Applicable academic working days.
- Holidays.
- Other defined non-working academic days.

Timetable occurrences falling on recognized holidays or other non-working academic days shall not be treated as applicable future attendance opportunities.

---

### TC-031 — Calendar Maintainability

Academic-calendar information shall be maintained separately from core attendance calculation logic.

Updating academic-calendar information shall not require rewriting attendance formulas.

The exact calendar data-storage and update mechanism shall be defined in the Implementation Plan.

---

## 11.15 Future Class Generation

### TC-032 — Timetable and Calendar Integration

AttendSense shall generate applicable future lecture and laboratory occurrences by combining:

- The student's associated predefined timetable.
- The applicable academic calendar.
- The relevant analysis date or date range.

Timetable occurrences falling on holidays or other defined non-working academic days shall be excluded.

Each generated future class shall contain sufficient information for the applicable attendance-analysis feature, including its classification as:

- Lecture, or
- Laboratory session.

For the current date, future-class generation shall exclude timetable occurrences whose scheduled start time has already passed.

---

### TC-033 — Attendance Slot Association

Each applicable future class shall be associated with the defined Phase 1 attendance-slot weight:

- **Lecture = 1 attendance slot**
- **Laboratory session = 2 attendance slots**

Future class occurrences shall represent future attendance decisions applied to the student's overall confirmed attendance values.

They shall not require separate subject-wise attendance percentages to perform Phase 1 attendance calculations.

If AttendSense cannot reliably determine whether a future timetable occurrence represents a lecture or laboratory session, the affected schedule-aware analysis shall not silently assign an attendance-slot weight.

---

## 11.16 PWA Technical Requirements

### TC-034 — PWA Configuration

AttendSense shall include the technical configuration required to operate as a Progressive Web Application on supported platforms.

This shall include appropriate:

- Web application manifest.
- Application name.
- Application icons.
- Display configuration.
- Required PWA metadata.

The exact PWA implementation details shall be defined in the Implementation Plan.

---

### TC-035 — Standalone Experience

When installed on a supported device, AttendSense shall provide an appropriate standalone app-like experience.

PWA installation shall not create:

- A separate AttendSense account.
- Duplicate academic configuration.
- Duplicate confirmed attendance data.

---

### TC-036 — Browser Operation

Core AttendSense functionality shall remain available through supported web browsers without requiring PWA installation.

PWA installation shall remain optional.

---

### TC-037 — Online-Only Phase 1

AttendSense Phase 1 shall require an active internet connection for normal application operation.

Offline application functionality is outside the scope of Phase 1.

Operations requiring network connectivity include, where applicable:

- Google authentication.
- Server-side application operations.
- Persisted user-data access.
- Attendance upload.
- Attendance extraction.
- Database access.
- External processing services.
- Retrieval of server-maintained application data.

If network connectivity is unavailable, AttendSense shall handle the condition gracefully and shall not produce misleading attendance results from incomplete operations.

---

## 11.17 PWA Share-Target Technology

### TC-038 — Share-Target Support

AttendSense shall implement PWA share-target functionality for supported attendance files where the selected platform and browser provide the required capability.

Where successfully supported and registered, an installed AttendSense PWA may appear as a destination in the operating system's share interface for supported attendance files.

Share-target functionality shall remain subject to:

- PWA installation.
- Share-target registration.
- Operating-system support.
- Browser/PWA support.
- Correct supported file-type registration.
- Successful file reception.
- Authentication interaction.
- Technical validation on supported Phase 1 environments.

AttendSense shall not assume or guarantee share-sheet availability on every device, operating system, or browser.

---

### TC-039 — Shared File Processing

Attendance files received through PWA share-target functionality shall enter the same attendance-processing architecture as files selected through the in-application upload workflow.

A shared file shall not bypass:

- Authentication.
- File validation.
- Attendance extraction.
- Normalization.
- Automatic validation.
- Student review.
- Student confirmation.
- Persistence rules.
- Temporary-file retention and cleanup requirements.

If a shared file is received without a valid authenticated session, protected processing shall not proceed until authentication is completed.

Temporary retention through authentication may be implemented only where it can be performed safely and reliably.

If the shared file cannot be safely retained through authentication, the student shall be required to provide the file again.

---

## 11.18 External Services

### TC-040 — Controlled External Dependencies

AttendSense shall avoid unnecessary external service dependencies.

External services may be used where required for approved functionality, including:

- Google authentication.
- PostgreSQL hosting.
- Attendance document processing.
- Application deployment.

Any external service introduced during implementation shall satisfy the applicable:

- Security requirements.
- Privacy requirements.
- Reliability requirements.
- Deployment requirements.
- Cost constraints.

External document-processing services shall receive only the information reasonably required for the intended processing operation.

---

### TC-041 — External Processing Failure

Failure of an external attendance-processing service shall be treated as a processing failure.

Incomplete, uncertain, or unverified extraction output resulting from such a failure shall not become confirmed attendance data or be passed to the authoritative attendance-analysis workflow.

The student's previously confirmed attendance dataset shall remain unaffected.

---

## 11.19 Deployment

### TC-042 — Vercel Deployment

AttendSense Phase 1 shall use **Vercel** as the primary application deployment platform.

The implementation architecture shall remain compatible with the deployment environment and limitations applicable to the selected Vercel configuration.

Production deployment shall use HTTPS.

---

### TC-043 — Environment Configuration

Environment-specific configuration shall be maintained separately from publicly committed source code.

The project shall support appropriate configuration for:

- Local development.
- Testing.
- Production.

Sensitive credentials and secrets shall be managed through secure environment configuration.

---

## 11.20 Version Control and Repository

### TC-044 — Git Version Control

AttendSense source code shall be maintained using **Git**.

Development changes shall be tracked through version control.

---

### TC-045 — GitHub Repository

The AttendSense project shall use **GitHub** as its primary source-code repository.

The repository shall contain appropriate project documentation alongside the implementation.

Sensitive environment variables, credentials, authentication secrets, database credentials, or other private configuration shall not be committed to the public repository.

---

## 11.21 Technology Decisions Deferred to Implementation Plan

The following implementation decisions are intentionally not fixed by the PRD and shall be evaluated during the Implementation Plan:

- Exact Google authentication library.
- PostgreSQL hosting provider.
- PDF parsing library.
- OCR/vision technology.
- Temporary upload-processing mechanism.
- Temporary file-storage mechanism, if required.
- Validation library.
- UI component library, if one is required.
- State-management approach, if additional state management is required.
- Testing framework and testing tools.
- Exact PWA implementation mechanism.
- PWA share-target implementation details.
- Logging and monitoring tools.
- Detailed Next.js project structure.
- Database schema and Prisma models.
- Exact server route structure.

These decisions shall be made according to the approved product requirements rather than changing the product requirements to fit a preferred technology.

---

## 11.22 Technology Selection Priorities

When selecting technologies not explicitly fixed by this PRD, the following priorities shall be considered:

1. **Attendance calculation correctness**
2. **Attendance extraction reliability**
3. **Security and privacy**
4. **Compatibility with the approved technology stack**
5. **Student usability**
6. **Maintainability**
7. **Development feasibility**
8. **Performance**
9. **Deployment compatibility**
10. **Cost**

For attendance extraction specifically, reliable identification of the overall attendance values required by the normalized attendance model shall take priority over convenience of implementation.

---

## 11.23 Approved Phase 1 Technical Foundation

The approved Phase 1 technical foundation is:

**PWA**

↓

**Next.js + React + TypeScript**

↓

**Tailwind CSS**

↓

**Next.js Server-Side Capabilities**

↓

**Sign in with Google**

↓

**PostgreSQL + Prisma ORM**

↓

**PDF/Image Attendance Processing**

↓

**Overall Attendance Extraction + Normalization + Automatic Validation**

↓

**Student Review + Confirmation**

↓

**Latest Confirmed Attendance Dataset**

↓

**Predefined Timetable + Academic Calendar**

↓

**Deterministic TypeScript Attendance Analysis**

↓

**Safe Bunk / Attendance Recovery / Future Attendance Simulator**

↓

**Vercel Deployment**

↓

**Git + GitHub**

The exact document-extraction technologies shall be selected during implementation planning after technical evaluation.

Technology choices made during implementation shall support this architecture and shall not contradict the approved requirements defined in this PRD.

# 12. Future Scope (Post Phase 1)

This section defines features intentionally excluded from Phase 1 but considered valuable for future versions of AttendSense.

Items listed here are **not implementation requirements** for the initial release and shall not influence the Phase 1 architecture beyond maintaining reasonable extensibility.

---

## 12.1 Purpose

Phase 1 focuses on delivering a reliable attendance-analysis application built around:

- Secure Google authentication
- Attendance upload (PDF/Image)
- Automatic extraction and validation
- Student confirmation
- Safe Bunk Calculator
- Attendance Recovery Calculator
- Future Attendance Simulator

Future versions may expand the product without changing these core workflows.

---

## 12.2 Institutional Integration

A future version may support direct integration with college or university attendance systems.

Potential capabilities include:

- Automatic attendance synchronization
- Official attendance import
- Secure institutional login
- Department-specific attendance formats
- Multi-institution support

**Status:** Out of Scope for Phase 1

---

## 12.3 Attendance History

Instead of maintaining only the latest confirmed attendance dataset, future versions may provide historical tracking.

Possible features:

- Previous attendance uploads
- Version history
- Weekly attendance trends
- Monthly attendance reports
- Attendance improvement analytics

**Status:** Out of Scope for Phase 1

---

## 12.4 Smart Notifications

Future versions may provide intelligent reminders such as:

- Low attendance warning
- Recovery reminders
- Upcoming risky attendance situations
- Attendance milestone notifications

Notifications may be delivered through:

- Push notifications
- Email
- In-app reminders

**Status:** Out of Scope for Phase 1

---

## 12.5 Subject-Level Analytics

Phase 1 intentionally performs calculations using **overall attendance only**.

Future versions may introduce deeper analytics including:

- Subject-wise attendance dashboards
- Lecture vs Lab analysis
- Department-wise statistics
- Attendance heatmaps
- Performance trends

These analytics shall remain optional and independent from the Phase 1 calculation model.

**Status:** Out of Scope for Phase 1

---

## 12.6 Multi-Semester Support

Future versions may support:

- Multiple semesters
- Semester switching
- Archived semester records
- Cross-semester attendance comparison

Phase 1 stores only the latest confirmed attendance dataset for the active academic configuration.

**Status:** Out of Scope for Phase 1

---

## 12.7 AI Enhancements

Artificial intelligence may later assist with non-authoritative tasks such as:

- Improving OCR accuracy
- Detecting unusual extraction errors
- Explaining attendance reports
- Natural-language attendance queries
- Personalized attendance insights

AI shall **not** replace deterministic attendance calculations or the mandatory student confirmation workflow.

**Status:** Future Enhancement

---

## 12.8 Faculty & Administrative Portal

A separate institutional portal may later support:

- Faculty dashboards
- Department analytics
- Batch attendance insights
- Administrative reporting
- Institutional attendance visualization

This portal is independent of the student PWA.

**Status:** Future Product Expansion

---

## 12.9 Cross-Platform Expansion

Although Phase 1 is delivered as a Progressive Web Application, future versions may include:

- Native Android application
- Native iOS application
- Desktop application
- Wearable notification support

The PWA shall remain the primary implementation for Phase 1.

**Status:** Future Expansion

---

## 12.10 Future Product Vision

The long-term vision of AttendSense is to evolve from a reliable attendance calculator into a comprehensive student attendance planning platform while preserving the principles established in Phase 1:

- Secure authentication
- Reliable data extraction
- Mandatory student verification
- Deterministic attendance calculations
- Privacy-first data handling
- Student-friendly user experience

All future features shall extend these principles rather than replacing them.
