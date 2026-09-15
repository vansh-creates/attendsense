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

Unlike Safe Bunk, Future Attendance Simulation shall not be restricted only to the remainder of the current week.

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

After first-time authentication, AttendSense shall require the student to complete the academic configuration necessary to associate the correct predefined timetable and academic calendar with the student's account.

The student shall provide only the required academic information through supported predefined selections wherever possible.

The student shall not be required to manually construct the complete class timetable or academic calendar.

---

### FR-005 — Academic Configuration Persistence

AttendSense shall save the student's completed academic configuration to the authenticated AttendSense account.

Returning students shall not be required to repeat first-time academic configuration while a valid saved configuration exists.

The saved academic configuration shall be restored after successful returning-user authentication where applicable.

---

### FR-006 — Academic Configuration Update

AttendSense shall allow the student to update supported academic configuration when necessary.

When academic configuration is changed:

- The appropriate predefined timetable shall be reassociated with the student's account.
- The appropriate academic calendar shall be reassociated where required.
- Subsequent schedule-aware attendance analysis shall use the updated academic configuration.

The system shall validate supported configuration selections before saving them.

---

## 5.3 Academic Calendar and Timetable

### FR-007 — Academic Calendar Association

AttendSense shall maintain the academic calendar required for Phase 1 attendance planning.

The academic calendar shall identify applicable:

- Academic working days.
- Holidays.
- Other defined non-working academic days.

AttendSense shall use the academic calendar when generating future attendance opportunities.

A timetable occurrence that falls on a recognized holiday or other non-working academic day shall not be treated as an applicable attendance opportunity.

Students shall not be required to manually create or maintain the complete academic calendar.

---

### FR-008 — Class Timetable Association

AttendSense shall maintain predefined class timetables required for Phase 1 attendance analysis.

The applicable timetable shall be associated with the student's saved academic configuration.

The timetable shall provide sufficient information to determine:

- Applicable future class occurrences.
- Class date and time where required.
- Whether an occurrence represents a lecture or laboratory session.
- Other schedule information required for student-facing attendance planning.

Students shall not be required to manually create their complete class timetable.

---

### FR-009 — Attendance Slot Weight

AttendSense shall apply the following Phase 1 attendance-slot weights to future scheduled classes:

- **Lecture = 1 attendance slot**
- **Laboratory session = 2 attendance slots**

The slot weight shall be used consistently by:

- Safe Bunk Calculator.
- Attendance Recovery Calculator.
- Future Attendance Simulator.

For future attendance calculations:

**Attended Lecture**
- Present Slots +1
- Effective Total Slots +1

**Missed Lecture**
- Present Slots +0
- Effective Total Slots +1

**Attended Laboratory Session**
- Present Slots +2
- Effective Total Slots +2

**Missed Laboratory Session**
- Present Slots +0
- Effective Total Slots +2

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
- Other implementation-defined limits required for safe processing.

Invalid files shall not proceed to attendance analysis.

The student shall receive a clear error or retry instruction when the input cannot be processed.

---

### FR-018 — PDF Attendance Extraction

AttendSense shall process supported PDF attendance files to extract the information required to determine the student's overall attendance dataset.

The extraction workflow shall attempt to identify relevant values such as:

- Overall Present Slots.
- Displayed or reported Total Slots, where available.
- No Attendance or equivalent non-attendance slots, where applicable.
- Overall attendance percentage, where available for validation.
- Other values required to reliably determine Overall Effective Total Slots.

The final extraction technology for PDF processing shall be selected after technical evaluation.

The system shall not use unreliable or incomplete extracted information for attendance analysis.

---

### FR-019 — Image Attendance Extraction

AttendSense shall process supported attendance images to extract the information required to determine the student's overall attendance dataset.

The extraction workflow shall attempt to identify relevant values such as:

- Overall Present Slots.
- Displayed or reported Total Slots, where available.
- No Attendance or equivalent non-attendance slots, where applicable.
- Overall attendance percentage, where available for validation.
- Other information required to reliably interpret and validate the attendance data.

Course-level or other information may be extracted when useful for document interpretation or validation, but individual subject-wise attendance percentages shall not form the basis of Phase 1 attendance calculations.

The final OCR/vision technology shall be selected after technical evaluation.

---

### FR-020 — Multiple Image Processing

AttendSense shall support attendance submissions containing multiple images when the complete attendance information cannot be represented in a single image.

For a multi-image submission, the system shall:

1. Treat the selected images as one attendance submission.
2. Process the relevant information contained in each image.
3. Combine complementary attendance information where required.
4. Detect duplicated or overlapping attendance information where reasonably possible.
5. Prevent duplicated information from being counted more than once.
6. Determine whether the complete submission provides sufficient information to derive and validate the required overall attendance values.

If the images cannot be reliably combined into a valid attendance dataset, the system shall stop the processing workflow and request appropriate corrective action from the student.

---

## 5.7 Attendance Normalization and Validation

### FR-021 — Standard Overall Attendance Structure

AttendSense shall normalize successfully extracted attendance information into a standard internal attendance structure.

The normalized structure shall contain the information required for Phase 1 overall attendance analysis, including:

- **Overall Present Slots**
- **Overall Effective Total Slots**
- Displayed or reported Total Slots, where relevant to normalization.
- No Attendance or equivalent non-attendance slots, where applicable.
- Calculated Overall Attendance Percentage.
- Relevant validation metadata required by the implementation.

Individual subject-wise attendance percentages shall not form the calculation basis of Phase 1 attendance analysis.

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

- Overall Present Slots shall not be negative.
- Overall Effective Total Slots shall be greater than zero before percentage calculation.
- Overall Present Slots shall not exceed Overall Effective Total Slots.
- No Attendance slots shall not be negative where present.
- Effective Total Slots shall correctly reflect required No Attendance normalization.
- Calculated overall attendance shall remain between 0% and 100%.
- Related extracted attendance values shall be internally consistent.
- Required values shall be present before attendance analysis is allowed.

Data that fails required validation shall not be accepted as a confirmed attendance dataset.

---

### FR-024 — Independent Overall Attendance Calculation

AttendSense shall independently calculate overall attendance using the normalized confirmed attendance values.

The Phase 1 formula shall be:

**Overall Attendance Percentage = (Overall Present Slots / Overall Effective Total Slots) × 100**

The independently calculated value shall be used as the system's attendance percentage for attendance analysis.

A percentage extracted directly from an uploaded attendance file may be used as a validation or comparison value where available but shall not replace the system's independent calculation.

---

### FR-025 — Attendance Cross-Validation

AttendSense shall perform automatic cross-validation before presenting newly interpreted attendance information for student confirmation.

Cross-validation may include:

- Comparing independently calculated overall attendance with a reported overall percentage where available.
- Verifying that Overall Present Slots do not exceed Overall Effective Total Slots.
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

The review interface shall prominently present relevant interpreted values such as:

- Overall Present Slots.
- Overall Effective Total Slots.
- Displayed/Reported Total Slots where relevant.
- No Attendance slots where relevant.
- Calculated Overall Attendance Percentage.

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

Manual editing of extracted attendance numbers shall not be the standard correction mechanism for Phase 1.

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

- The student's predefined class timetable.
- The applicable academic calendar.
- The relevant date or analysis period.

Timetable occurrences falling on holidays or other defined non-working academic days shall not be treated as applicable future classes. When the relevant analysis period includes the current date, only applicable classes whose scheduled start time has not yet passed shall be generated as future class occurrences.

---

### FR-031 — Future Class Attendance Decisions

Future lecture and laboratory selection shall represent **future attendance decisions**, not separate subject-wise attendance calculations.

Each applicable future class shall carry its defined attendance-slot weight:

- Lecture = **1 attendance slot**
- Laboratory session = **2 attendance slots**

Where applicable, the student shall be able to select one or multiple future classes according to the workflow of the selected analysis feature.

The effect of future attendance decisions shall be applied to the student's overall Present Slots and Effective Total Slots.

---

## 5.10 Confirmed Overall Attendance

### FR-032 — Confirmed Overall Attendance Determination

AttendSense shall calculate the student's current confirmed overall attendance from the latest confirmed attendance dataset using:

**Overall Attendance Percentage = (Overall Present Slots / Overall Effective Total Slots) × 100**

The calculated current attendance may be displayed as supporting contextual information within relevant AttendSense screens and attendance-analysis results.

**Current Attendance Calculation shall not exist as a separate calculator or standalone Phase 1 analysis feature.**

---

## 5.11 Safe Bunk Calculator

### FR-033 — Safe Bunk Eligibility

The Safe Bunk Calculator shall be available when the student's latest confirmed overall attendance is **at or above 75%**.

If the student's confirmed overall attendance is below 75%:

- Safe Bunk analysis shall not proceed.
- AttendSense shall clearly indicate that the student is currently below the required threshold.
- The interface may direct the student toward Attendance Recovery.

---

### FR-034 — Safe Bunk Planning Period

Safe Bunk analysis shall consider applicable scheduled classes beginning from the **current day through the final applicable academic day of the current week**.

AttendSense shall:

- Use the applicable timetable.
- Use the academic calendar.
- Exclude holidays and other non-working academic days.
- Generate the valid upcoming lectures and laboratory sessions within the applicable period.

---

### FR-035 — Safe Bunk Class Selection

Applicable future classes displayed in Safe Bunk shall initially have the status:

**ATTEND**

The student shall be able to change one or multiple applicable future classes from:

**ATTEND → BUNK**

The system shall not impose an arbitrary predefined limit on the number of displayed classes that the student may mark as BUNK.

The calculation itself shall determine whether the complete selected plan remains mathematically safe.

---

### FR-036 — Safe Bunk Calculation

Safe Bunk shall use the student's latest confirmed:

- Overall Present Slots.
- Overall Effective Total Slots.

For each future class in the selected plan:

**ATTENDED LECTURE**
- Present Slots +1
- Effective Total Slots +1

**BUNKED LECTURE**
- Present Slots +0
- Effective Total Slots +1

**ATTENDED LAB**
- Present Slots +2
- Effective Total Slots +2

**BUNKED LAB**
- Present Slots +0
- Effective Total Slots +2

AttendSense shall calculate the projected overall attendance after applying the complete selected plan.

If:

**Projected Overall Attendance >= 75%**

the selected bunk plan shall be classified as mathematically safe.

If:

**Projected Overall Attendance < 75%**

the selected bunk plan shall be classified as unsafe.

The result shall clearly communicate that classes remaining marked as ATTEND are assumed to be attended within the selected plan.

Safe Bunk calculations shall not modify the latest confirmed attendance dataset.

---

## 5.12 Attendance Recovery Calculator

### FR-037 — Attendance Recovery Eligibility

Attendance Recovery Calculator shall be available when the student's latest confirmed overall attendance is **below 75%**.

If confirmed overall attendance is already at or above 75%, AttendSense shall indicate that attendance recovery is not currently required.

---

### FR-038 — Required Recovery Slot Calculation

AttendSense shall calculate the minimum number of additional attendance slots that must be successfully attended for the student's mathematically projected overall attendance to reach at least 75%.

For:

- `P` = Overall Present Slots
- `T` = Overall Effective Total Slots
- `x` = Additional successfully attended attendance slots

AttendSense shall determine the minimum non-negative integer `x` satisfying:

**(P + x) / (T + x) >= 0.75**

The resulting `x` shall represent the minimum number of additional **attendance slots**, not necessarily the number of individual classes.

---

### FR-039 — Recovery Schedule Mapping

After determining the required recovery attendance slots, AttendSense shall map the requirement to applicable future scheduled classes using:

- The predefined class timetable.
- The applicable academic calendar.
- Lecture/laboratory slot weights.

Recovery mapping shall begin with the next applicable future scheduled class.

For recovery purposes:

**Attended Lecture**
- Present Slots +1
- Effective Total Slots +1

**Attended Laboratory Session**
- Present Slots +2
- Effective Total Slots +2

Holidays and other non-working academic days shall not contribute attendance opportunities.

Recovery planning may continue across subsequent academic weeks until sufficient attendance slots have been accumulated.

---

### FR-040 — Recovery Point Determination

Where sufficient timetable and academic-calendar information is available, AttendSense shall determine the earliest projected point at which the student's overall attendance reaches at least 75% by successfully attending the applicable recovery classes.

The recovery result may include:

- Required recovery attendance slots.
- Applicable future lectures/laboratory sessions.
- Projected attendance at the recovery point.
- Earliest projected recovery date where determinable.

If available timetable or academic-calendar data ends before enough future attendance opportunities can be generated:

- AttendSense shall still display the mathematically required recovery-slot count.
- AttendSense shall clearly indicate that the complete recovery schedule or recovery date cannot currently be determined.
- AttendSense shall not invent future class occurrences.

Attendance Recovery calculations shall not modify the latest confirmed attendance dataset.

---

## 5.13 Future Attendance Simulator

### FR-041 — Future Simulator Availability

Future Attendance Simulator shall be available whenever a valid latest confirmed attendance dataset exists.

Its availability shall **not depend on whether the student's confirmed overall attendance is above, equal to, or below 75%**.

---

### FR-042 — Future Simulation Period

Future Attendance Simulator shall allow the student to select an applicable future simulation period within the range supported by available timetable and academic-calendar data.

Unlike Safe Bunk, Future Attendance Simulator shall not be restricted only to the remainder of the current academic week.

AttendSense shall generate applicable scheduled lectures and laboratory sessions within the selected simulation period.

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

Future Attendance Simulator shall use the student's latest confirmed:

- Overall Present Slots.
- Overall Effective Total Slots.

For the hypothetical future scenario:

**Attended Lecture**
- Present Slots +1
- Effective Total Slots +1

**Missed Lecture**
- Present Slots +0
- Effective Total Slots +1

**Attended Laboratory Session**
- Present Slots +2
- Effective Total Slots +2

**Missed Laboratory Session**
- Present Slots +0
- Effective Total Slots +2

AttendSense shall calculate the predicted overall attendance resulting from the complete hypothetical scenario.

The simulator may update the predicted attendance interactively as the student changes ATTEND/BUNK selections.

---

### FR-045 — Future Simulation Result

The Future Attendance Simulator result may display:

- Current confirmed overall attendance.
- Number of future attended attendance slots.
- Number of future missed attendance slots.
- Predicted overall attendance.
- Change from current attendance.
- Position relative to the fixed 75% threshold.
- Selected future attendance scenario.

The result shall clearly indicate that it represents a **hypothetical mathematical projection** and not updated official attendance.

Future Attendance Simulator results shall not modify the latest confirmed attendance dataset.

---

## 5.14 Attendance Threshold

### FR-046 — Fixed 75% Threshold

AttendSense Phase 1 shall use a fixed minimum overall attendance threshold of:

**75%**

The threshold shall:

- Be predefined by the system.
- Not be configurable by students.
- Determine Safe Bunk eligibility when confirmed overall attendance is at or above 75%.
- Determine Attendance Recovery eligibility when confirmed overall attendance is below 75%.
- Determine whether a selected Safe Bunk plan remains mathematically safe.
- Serve as the mathematical target for Attendance Recovery.
- Be shown as contextual information where relevant in Future Attendance Simulation.

Future Attendance Simulator availability shall not depend on the 75% threshold.

---

## 5.15 Result Presentation

### FR-047 — Attendance Analysis Results

AttendSense shall present attendance-analysis results in a clear, understandable, and student-friendly format.

Depending on the selected feature, results may include:

- Current confirmed overall attendance as supporting context.
- Attendance position relative to 75%.
- Safe/unsafe bunk-plan status.
- Projected overall attendance after a Safe Bunk plan.
- Selected future bunk/attend decisions.
- Minimum additional attendance slots required for recovery.
- Applicable future lectures/laboratory sessions contributing to recovery.
- Projected attendance at the recovery point.
- Estimated recovery date where determinable.
- Future attended slots.
- Future missed slots.
- Predicted overall attendance from Future Attendance Simulator.
- Relevant future class dates.
- Lecture/laboratory attendance-slot impact.

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

Repeated analyses shall continue using the same latest confirmed attendance dataset until a newer dataset is successfully processed, reviewed, confirmed, and saved.

---

## 5.16 Attendance Dataset Update

### FR-049 — Attendance Update

AttendSense shall allow the student to provide newer official attendance information when they want subsequent analysis to use updated attendance data.

A newer attendance submission shall pass through the complete required workflow:

**Input → File Validation → Extraction → Normalization → Automatic Validation → Student Review → Student Confirmation → Save**

Only after successful completion of the complete workflow shall the newer dataset become the latest confirmed attendance dataset.

---

### FR-050 — Safe Dataset Replacement

When a newer attendance dataset is successfully processed, validated, reviewed, confirmed, and saved:

- It shall replace the previous latest confirmed attendance dataset.
- Subsequent attendance analyses shall use the newly confirmed dataset.

If the newer dataset:

- Fails file processing.
- Fails extraction.
- Fails normalization.
- Fails required validation.
- Is rejected by the student.
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
- Required Overall Present Slots cannot be determined.
- Required Total/Effective Total Slots cannot be determined.
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
- Unsupported academic configuration.
- Future timetable data unavailable for the requested period.

The system shall clearly communicate the limitation to the student.

Where a mathematical result can still be reliably determined without unavailable schedule information, AttendSense may provide that mathematical result while clearly indicating that the corresponding schedule/date cannot currently be determined.

---

### FR-053 — Calculation Integrity

AttendSense shall perform attendance calculations only using:

- Valid latest confirmed attendance data.
- Defined attendance-slot rules.
- Applicable timetable information.
- Applicable academic-calendar information.
- Fixed 75% threshold.
- Student-selected future attendance decisions where required.

AttendSense shall not use:

- Rejected attendance datasets.
- Unconfirmed newly extracted attendance data.
- Failed newer attendance uploads.
- Hypothetical simulator results as confirmed attendance.
- Previous calculator outputs as updated official attendance.

Generative AI shall not determine final attendance percentages, Safe Bunk eligibility/results, recovery requirements, or Future Attendance Simulation results.

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
- Attendance upload.
- Attendance review.
- Safe Bunk planning.
- Attendance Recovery.
- Future Attendance Simulation.
- Result presentation.

---

### FR-057 — Interactive Attendance Planning

Attendance-planning interfaces shall provide clear interactive controls for applicable future lecture and laboratory selections.

Where ATTEND/BUNK selection is used:

- The current state of each future class shall be visually clear.
- Changing a class state shall be straightforward.
- Lecture and laboratory sessions shall be distinguishable.
- Relevant dates and schedule grouping shall be understandable.
- Result changes shall be presented clearly.

The UI shall prioritize clarity, usability, and efficient student interaction rather than presenting attendance analysis as a basic numerical calculator.

---

## 5.20 Functional Requirement Summary

The Phase 1 functional workflow shall support:

**Google Authentication**  
↓  
**Academic Configuration**  
↓  
**Timetable + Academic Calendar Association**  
↓  
**Attendance PDF/Image Input or Supported PWA Share Target**  
↓  
**File Validation**  
↓  
**Attendance Data Extraction**  
↓  
**Normalization**  
↓  
**No Attendance Handling Where Required**  
↓  
**Automatic Validation**  
↓  
**Student Review**  
↓  
**Student Confirmation**  
↓  
**Latest Confirmed Attendance Dataset Saved**  
↓  
**Overall Present Slots + Effective Total Slots**  
↓  
**Select Analysis Feature**

### Safe Bunk

**Confirmed Attendance >= 75%**  
↓  
**Today → End of Current Academic Week**  
↓  
**Generate Applicable Future Classes**  
↓  
**Default = ATTEND**  
↓  
**Student Selects BUNK Classes**  
↓  
**Lecture = 1 Slot / Lab = 2 Slots**  
↓  
**Projected Overall Attendance**  
↓  
**SAFE / UNSAFE**

### Attendance Recovery

**Confirmed Attendance < 75%**  
↓  
**Calculate Required Recovery Attendance Slots**  
↓  
**Map Required Slots to Timetable + Academic Calendar**  
↓  
**Lecture = 1 Slot / Lab = 2 Slots**  
↓  
**Determine Recovery Path**  
↓  
**Projected Recovery Point / Date Where Determinable**

### Future Attendance Simulator

**Available at Any Confirmed Attendance Percentage**  
↓  
**Select Future Simulation Period**  
↓  
**Generate Applicable Future Classes**  
↓  
**Default = ATTEND**  
↓  
**Student Creates ATTEND/BUNK Scenario**  
↓  
**Lecture = 1 Slot / Lab = 2 Slots**  
↓  
**Predicted Overall Attendance**

All three analysis features shall use the student's **latest confirmed attendance dataset** as their base attendance information.

Calculator and simulation results shall not modify that dataset.

The dataset shall remain active until a newer attendance dataset successfully completes the required processing, validation, student review, confirmation, and saving workflow.

---

# 6. Attendance Calculation Rules

## 6.1 Purpose

This section defines the deterministic mathematical rules used by AttendSense for all Phase 1 attendance calculations.

All attendance-analysis features shall operate on the student's **latest confirmed attendance dataset**.

The calculation engine shall use the student's overall attendance values rather than individual subject-wise attendance percentages.

The primary attendance values shall be:

- **P = Overall Present Slots**
- **E = Overall Effective Total Slots**
- **T = Minimum Attendance Threshold**

For Phase 1:

**T = 75% = 0.75**

The calculation engine shall be used by:

1. Safe Bunk Calculator.
2. Attendance Recovery Calculator.
3. Future Attendance Simulator.

Calculator and simulation results shall never modify the student's latest confirmed attendance dataset.

---

## 6.2 Core Attendance Values

AttendSense Phase 1 shall perform attendance calculations using:

- **P = Overall Present Slots**
- **E = Overall Effective Total Slots**

The following conditions shall be satisfied before attendance calculations proceed:

- `P >= 0`
- `E > 0`
- `P <= E`

Where No Attendance or equivalent non-attendance information is present, the Effective Total Slots value shall already have been normalized according to the attendance-data normalization rules before reaching the calculation engine.

Invalid, incomplete, unconfirmed, or unreliable attendance values shall not be passed to the calculation engine.

---

## 6.3 Effective Total Slots

AttendSense shall use **Effective Total Slots** rather than blindly using the displayed Total Slots value from an uploaded attendance source.

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

Therefore, the attendance calculation shall use:

- **P = 142**
- **E = 167**

and not `188` as the denominator.

If another valid attendance representation already reports:

**Total Slots = 167**

with No Attendance already excluded, AttendSense shall use:

**E = 167**

and shall **not subtract the 21 No Attendance slots again**.

This normalization shall occur before attendance analysis.

---

## 6.4 Confirmed Overall Attendance Percentage

The student's confirmed overall attendance percentage shall be calculated using:

**Overall Attendance % = (P / E) × 100**

### Example

Suppose:

- Present Slots = 142
- Effective Total Slots = 167

Then:

**Overall Attendance = (142 / 167) × 100**

**= 85.03%**

Therefore, the student's confirmed overall attendance is:

**85.03%**

AttendSense shall calculate this percentage independently.

If an uploaded attendance source already displays an overall attendance percentage, that percentage may be used for validation but shall not replace the system's independently calculated value.

Current overall attendance may be displayed as supporting information throughout AttendSense.

**Current Attendance Calculation shall not exist as a separate calculator or standalone Phase 1 feature.**

---

## 6.5 Attendance Threshold Classification

AttendSense shall compare the student's confirmed overall attendance against the fixed Phase 1 threshold:

**75%**

The attendance state shall be classified as:

### At or Above Threshold

If:

**P / E >= 0.75**

the student is considered to be at or above the required attendance threshold.

This makes the student eligible for the **Safe Bunk Calculator**.

### Below Threshold

If:

**P / E < 0.75**

the student is considered below the required attendance threshold.

This makes the student eligible for the **Attendance Recovery Calculator**.

### Exactly 75%

A student whose exact calculated attendance is:

**75%**

shall be considered to satisfy the minimum attendance threshold.

The **Future Attendance Simulator** shall remain available regardless of whether the student's attendance is above, equal to, or below 75%.

---

## 6.6 Attendance Slot Weighting

Future attendance calculations shall operate using attendance slots.

For Phase 1:

| Academic Event | Attendance Slots |
|---|---:|
| Lecture | 1 |
| Laboratory Session | 2 |

Therefore:

### Attended Lecture

**Present Slots +1**

**Effective Total Slots +1**

### Missed Lecture

**Present Slots +0**

**Effective Total Slots +1**

### Attended Laboratory Session

**Present Slots +2**

**Effective Total Slots +2**

### Missed Laboratory Session

**Present Slots +0**

**Effective Total Slots +2**

These slot-weighting rules shall be used consistently by:

- Safe Bunk Calculator.
- Attendance Recovery Calculator.
- Future Attendance Simulator.

---

## 6.7 General Future Attendance Formula

For any future attendance scenario, define:

- `P = Current Overall Present Slots`
- `E = Current Overall Effective Total Slots`
- `A = Future Attendance Slots Successfully Attended`
- `M = Future Attendance Slots Missed`

Then:

**Future Present Slots = P + A**

and:

**Future Effective Total Slots = E + A + M**

Therefore:

**Projected Attendance % = ((P + A) / (E + A + M)) × 100**

This formula forms the mathematical basis of future attendance scenarios.

### Example

Suppose:

- Current Present Slots = 142
- Current Effective Total Slots = 167

The student hypothetically:

- Attends 3 lectures = 3 attended slots
- Attends 1 laboratory session = 2 attended slots
- Misses 2 lectures = 2 missed slots

Therefore:

**A = 5**

**M = 2**

Future Present Slots:

**142 + 5 = 147**

Future Effective Total Slots:

**167 + 5 + 2 = 174**

Projected attendance:

**(147 / 174) × 100 = 84.48%**

Therefore:

**Projected Overall Attendance = 84.48%**

---

# 6.8 Safe Bunk Calculator Rules

## 6.8.1 Eligibility

Safe Bunk Calculator shall operate only when:

**Confirmed Overall Attendance >= 75%**

If:

**Confirmed Overall Attendance < 75%**

Safe Bunk analysis shall not proceed.

AttendSense shall direct the student toward Attendance Recovery where appropriate.

---

## 6.8.2 Safe Bunk Analysis Window

Safe Bunk Calculator shall consider applicable scheduled classes beginning from:

**Current Day**

through:

**Final Applicable Academic Day of the Current Week**

AttendSense shall generate these classes using:

- The student's predefined timetable.
- The applicable academic calendar.

Classes falling on holidays or other defined non-working academic days shall be excluded.

---

## 6.8.3 Default Safe Bunk State

Every applicable future lecture and laboratory session displayed in Safe Bunk shall initially have the state:

**ATTEND**

The student may change one or multiple future classes from:

**ATTEND → BUNK**

There shall be no arbitrary predefined limit on how many displayed classes the student may mark as BUNK.

The complete selected plan shall instead be mathematically evaluated.

---

## 6.8.4 Safe Bunk Calculation

Let:

- `P = Current Present Slots`
- `E = Current Effective Total Slots`
- `A = Slots belonging to displayed future classes remaining ATTEND`
- `B = Slots belonging to displayed future classes selected as BUNK`

Then:

**Projected Present Slots = P + A**

**Projected Effective Total Slots = E + A + B**

Therefore:

**Projected Attendance % = ((P + A) / (E + A + B)) × 100**

---

## 6.8.5 Safe Bunk Decision

If:

**Projected Attendance >= 75%**

the selected bunk plan shall be classified:

**SAFE**

If:

**Projected Attendance < 75%**

the selected bunk plan shall be classified:

**UNSAFE**

The calculation shall evaluate the **complete selected plan**, including both:

- Classes marked ATTEND.
- Classes marked BUNK.

---

## 6.8.6 Safe Bunk Example

Suppose the student's confirmed attendance is:

- Present Slots = 142
- Effective Total Slots = 167

Current attendance:

**(142 / 167) × 100 = 85.03%**

Suppose the remaining applicable classes displayed for the current week are:

| Class | Type | Status | Slots |
|---|---|---|---:|
| AI | Lecture | BUNK | 1 |
| ML | Lecture | BUNK | 1 |
| DBMS | Laboratory | ATTEND | 2 |
| CN | Lecture | ATTEND | 1 |

Therefore:

**Attended Future Slots = 3**

**Bunked Future Slots = 2**

Projected Present Slots:

**142 + 3 = 145**

Projected Effective Total Slots:

**167 + 3 + 2 = 172**

Projected attendance:

**(145 / 172) × 100 = 84.30%**

Because:

**84.30% >= 75%**

the selected plan is:

**SAFE**

This result assumes the student actually attends the classes that remain marked **ATTEND**.

The calculation does not modify the confirmed attendance dataset.

---

# 6.9 Attendance Recovery Calculator Rules

## 6.9.1 Eligibility

Attendance Recovery Calculator shall operate when:

**Confirmed Overall Attendance < 75%**

If:

**Confirmed Overall Attendance >= 75%**

AttendSense shall indicate that attendance recovery is not currently required.

---

## 6.9.2 Recovery Slot Formula

Let:

- `P = Current Present Slots`
- `E = Current Effective Total Slots`
- `R = Additional Attendance Slots Successfully Attended`

To reach at least 75%:

**(P + R) / (E + R) >= 0.75**

Solving for `R`:

**P + R >= 0.75(E + R)**

**P + R >= 0.75E + 0.75R**

**0.25R >= 0.75E - P**

Therefore:

**R >= (0.75E - P) / 0.25**

The required recovery slots shall therefore be:

**Required Recovery Slots = ceil((0.75E - P) / 0.25)**

with a minimum result of `0`.

The result represents **attendance slots**, not necessarily individual classes.

---

## 6.9.3 Recovery Example

Suppose:

- Present Slots = 120
- Effective Total Slots = 170

Current attendance:

**(120 / 170) × 100 = 70.59%**

Recovery calculation:

**R >= (0.75 × 170 - 120) / 0.25**

**R >= (127.5 - 120) / 0.25**

**R >= 7.5 / 0.25**

**R >= 30**

Therefore:

**Required Recovery Slots = 30**

If the student successfully attends 30 additional attendance slots:

Present Slots:

**120 + 30 = 150**

Effective Total Slots:

**170 + 30 = 200**

Attendance:

**(150 / 200) × 100 = 75.00%**

Therefore, the student must successfully attend at least:

**30 additional attendance slots**

to mathematically reach 75%.

---

## 6.9.4 Recovery Slot-to-Schedule Mapping

The required recovery-slot count shall be mapped to actual future academic classes.

AttendSense shall begin with the next applicable scheduled class and process future classes chronologically.

Each future class contributes:

### Lecture

**+1 Present Slot**

**+1 Effective Total Slot**

### Laboratory Session

**+2 Present Slots**

**+2 Effective Total Slots**

The system shall continue accumulating successfully attended slots until:

**Projected Attendance >= 75%**

The mathematically calculated Required Recovery Slots value represents the minimum number of attendance slots required to reach the 75% threshold.

When this requirement is mapped to actual future classes, the final scheduled recovery contribution may exceed the mathematical minimum because a lecture or laboratory session cannot be partially attended.

For example, if the student mathematically requires 1 additional attendance slot but the next applicable class is a laboratory session worth 2 attendance slots, the complete laboratory session shall be included in the recovery plan.

Therefore, the timetable-based recovery path shall continue until the accumulated attendance-slot contribution is greater than or equal to the mathematically required recovery slots.

---

## 6.9.5 Recovery Example with Lectures and Labs

Suppose the student requires:

**5 Recovery Slots**

and the upcoming schedule is:

| Future Class | Type | Slot Contribution |
|---|---|---:|
| AI | Lecture | 1 |
| ML Lab | Laboratory | 2 |
| DBMS | Lecture | 1 |
| CN | Lecture | 1 |

Accumulated recovery slots:

After AI:

**1 slot**

After ML Lab:

**3 slots**

After DBMS:

**4 slots**

After CN:

**5 slots**

Therefore, the recovery requirement is reached after the CN lecture.

AttendSense may then identify that class/date as the projected recovery point.

---

## 6.9.6 Recovery Across Multiple Weeks

Attendance Recovery shall not be restricted to the current academic week.

If the required recovery slots cannot be accumulated during the current week, AttendSense shall continue through subsequent applicable academic weeks.

The system shall use:

- Timetable data.
- Academic calendar data.
- Lecture/laboratory slot weights.

until the recovery requirement is satisfied or available future academic data ends.

---

## 6.9.7 Insufficient Future Schedule Data

If AttendSense calculates the mathematical recovery requirement but available timetable or academic-calendar information ends before the complete recovery path can be generated:

AttendSense shall still provide:

**Required Recovery Attendance Slots**

but shall clearly state that the complete recovery schedule/date cannot currently be determined.

AttendSense shall not invent future academic occurrences.

---

# 6.10 Future Attendance Simulator Rules

## 6.10.1 Availability

Future Attendance Simulator shall be available whenever a valid latest confirmed attendance dataset exists.

There shall be no eligibility restriction based on the student's attendance percentage.

Therefore, it shall be available when attendance is:

- Above 75%.
- Exactly 75%.
- Below 75%.

---

## 6.10.2 Simulation Period

The student shall select an applicable future simulation period within the range supported by the available:

- Class timetable.
- Academic calendar.

Unlike Safe Bunk Calculator, the Future Attendance Simulator shall not be restricted to the remainder of the current week.

---

## 6.10.3 Default Simulation State

Every applicable future lecture or laboratory session within the selected simulation period shall initially have the state:

**ATTEND**

The student may freely change one or multiple classes between:

**ATTEND**

and:

**BUNK/MISS**

The simulator shall treat these selections purely as hypothetical future attendance decisions.

---

## 6.10.4 Future Simulation Calculation

Let:

- `P = Current Present Slots`
- `E = Current Effective Total Slots`
- `A = Future Attended Slots`
- `M = Future Missed Slots`

Then:

**Simulated Present Slots = P + A**

**Simulated Effective Total Slots = E + A + M**

Therefore:

**Predicted Attendance % = ((P + A) / (E + A + M)) × 100**

---

## 6.10.5 Future Simulation Example

Suppose:

- Present Slots = 120
- Effective Total Slots = 170

Current attendance:

**(120 / 170) × 100 = 70.59%**

The student creates the following hypothetical scenario:

| Future Class | Type | Decision | Slot Impact |
|---|---|---|---:|
| AI | Lecture | ATTEND | 1 |
| ML | Lecture | ATTEND | 1 |
| DBMS Lab | Laboratory | ATTEND | 2 |
| CN | Lecture | MISS | 1 |
| AI Lab | Laboratory | MISS | 2 |

Therefore:

Future attended slots:

**A = 4**

Future missed slots:

**M = 3**

Simulated Present Slots:

**120 + 4 = 124**

Simulated Effective Total Slots:

**170 + 4 + 3 = 177**

Predicted attendance:

**(124 / 177) × 100 = 70.06%**

Therefore:

**Predicted Overall Attendance = 70.06%**

The student can therefore see the mathematical impact of the hypothetical future decisions.

This simulation shall not modify the student's confirmed attendance dataset.

---

# 6.11 Timetable-Aware Calculation

AttendSense shall not invent future academic classes.

When an attendance analysis requires future classes, the system shall generate actual applicable occurrences using the student's predefined timetable.

The timetable shall determine:

- Which classes occur.
- On which academic day they occur.
- Their applicable schedule/time information.
- Whether the class is a lecture or laboratory session.

The timetable shall therefore provide the schedule structure required for attendance planning.

When generating future attendance opportunities for the current date, AttendSense shall include only applicable classes whose scheduled start time has not yet passed. Classes whose scheduled start time has already passed shall not be treated as future attendance opportunities. Future academic dates shall continue to be processed according to the predefined timetable and academic calendar.

---

# 6.12 Academic Calendar-Aware Calculation

The academic calendar shall be applied together with the predefined timetable.

A timetable occurrence shall only become an applicable future attendance opportunity when the corresponding date is an academic working day.

Therefore:

**Timetable Occurrence**  
↓  
**Academic Calendar Check**  
↓  
**Working Academic Day?**

**Yes → Include Class**

**No → Exclude Class**

Holidays and other defined non-working academic days shall not contribute attendance slots.

---

# 6.13 Overall Attendance Calculation Principle

AttendSense Phase 1 shall perform attendance analysis at the **overall attendance level**.

Individual subject-wise attendance percentages shall not form the basis of:

- Safe Bunk calculations.
- Attendance Recovery calculations.
- Future Attendance Simulation calculations.

Future lecture and laboratory selections identify **which future attendance opportunities the student plans to attend or miss**.

Their attendance-slot effects shall then be applied to the student's overall:

- Present Slots.
- Effective Total Slots.

For example, if the student selects an AI lecture as BUNK, AttendSense shall not calculate a separate AI attendance percentage.

Instead, the AI lecture contributes:

**+0 Present Slots**

**+1 Effective Total Slot**

to the overall projected attendance calculation.

Similarly, missing a laboratory session contributes:

**+0 Present Slots**

**+2 Effective Total Slots**

to the overall projected attendance calculation.

---

# 6.14 Multiple Future Class Selection

AttendSense shall allow multiple future lectures and laboratory sessions to participate in an attendance-analysis scenario where supported by the selected feature.

The system shall calculate the **combined slot impact** of all applicable selected future decisions.

For example:

- 2 attended lectures = 2 attended slots.
- 1 attended laboratory = 2 attended slots.
- 2 missed lectures = 2 missed slots.
- 1 missed laboratory = 2 missed slots.

Therefore:

**Total Future Attended Slots = 4**

**Total Future Missed Slots = 4**

These combined slot values shall be applied to the student's overall attendance values.

AttendSense shall not create independent subject-wise attendance calculations for each selected future class.

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

# 6.16 Integer Attendance-Slot Rule

Attendance slots shall be represented as whole units according to the defined Phase 1 weighting:

- Lecture = 1 slot.
- Laboratory = 2 slots.

AttendSense shall not generate fractional attendance-slot results such as:

- 1.5 attendance slots.
- 2.3 attendance slots.
- 4.7 attendance slots.

When determining mathematically required recovery slots, AttendSense shall round upward using the ceiling operation where required.

Future schedule mapping shall then determine which actual combination of lectures and laboratory sessions reaches or exceeds that required slot count.

---

# 6.17 Calculation Boundary Rules

AttendSense shall enforce the following calculation boundaries:

- Overall Present Slots cannot be negative.
- Overall Effective Total Slots must be greater than zero before percentage calculation.
- Overall Present Slots cannot exceed Overall Effective Total Slots.
- Attendance percentage cannot be below 0%.
- Attendance percentage cannot exceed 100%.
- Future attended attendance slots cannot be negative.
- Future missed attendance slots cannot be negative.
- Recovery attendance slots cannot be negative.
- No Attendance normalization shall not produce a negative Effective Total Slots value.
- Calculations shall not proceed using unconfirmed attendance data.
- Calculations shall not proceed using rejected attendance data.
- Failed newer attendance uploads shall not replace valid confirmed attendance data.
- Calculator or simulator results shall not become confirmed attendance data.

---

# 6.18 Latest Confirmed Dataset Rule

Every attendance-analysis calculation shall begin from the student's:

**Latest Confirmed Attendance Dataset**

Suppose a student uploads and confirms:

- Present Slots = 142
- Effective Total Slots = 167

The student may then perform:

**Safe Bunk Analysis**

followed by:

**Future Attendance Simulation**

followed by:

**Another Safe Bunk Analysis**

All calculations shall continue to begin from:

- **P = 142**
- **E = 167**

unless the student successfully uploads, processes, validates, reviews, confirms, and saves newer attendance information.

A hypothetical result shall never become the starting attendance dataset for another calculation.

---

# 6.19 New Attendance Dataset Replacement Rule

When the student provides newer official attendance information, the newer dataset shall not immediately replace the existing confirmed dataset.

Replacement shall occur only after successful completion of:

**Input**  
↓  
**File Validation**  
↓  
**Extraction**  
↓  
**Normalization**  
↓  
**Automatic Validation**  
↓  
**Student Review**  
↓  
**Student Confirmation**  
↓  
**Successful Save**

Only then shall:

**New Confirmed Dataset → Replace Previous Confirmed Dataset**

If the newer dataset fails any required stage or is rejected by the student:

**Previous Confirmed Dataset → Remains Active**

---

# 6.20 Deterministic Calculation Requirement

All final attendance calculations shall be deterministic.

For identical:

- Confirmed Present Slots.
- Confirmed Effective Total Slots.
- Attendance threshold.
- Timetable information.
- Academic calendar information.
- Lecture/laboratory slot weights.
- Selected future attendance decisions.

AttendSense shall produce the same mathematical result.

Generative AI shall not determine:

- Overall attendance percentages.
- Safe Bunk eligibility.
- Safe/unsafe bunk results.
- Required recovery slots.
- Recovery threshold achievement.
- Future Attendance Simulation percentages.

AI/OCR/vision or document-processing technologies may assist with extracting attendance information from uploaded documents, but the final attendance calculations shall be performed using deterministic mathematical logic.

---

# 6.21 Calculation Result Classification

AttendSense shall distinguish between four different concepts:

### Confirmed Overall Attendance

The student's attendance calculated from the latest confirmed attendance dataset.

This represents the base attendance information used by AttendSense.

### Safe Bunk Result

A mathematical projection showing whether the student's selected future bunk plan keeps projected overall attendance at or above 75%.

### Attendance Recovery Result

A mathematical calculation identifying the minimum additional attendance slots required to reach at least 75%, together with schedule-aware recovery information where determinable.

### Future Attendance Simulation

A hypothetical mathematical projection showing the attendance outcome of the student's selected future ATTEND/BUNK scenario.

Safe Bunk, Attendance Recovery, and Future Attendance Simulation results shall not be treated as updated official attendance.

---

# 6.22 Calculation Rules Summary

The Phase 1 attendance calculation model shall be:

**Latest Confirmed Attendance Dataset**

**P = Overall Present Slots**

**E = Overall Effective Total Slots**

↓

**Confirmed Attendance = (P / E) × 100**

↓

**Fixed Threshold = 75%**

↓

### Safe Bunk

**Attendance >= 75%**

↓

**Generate Current-Day → End-of-Week Applicable Classes**

↓

**Lecture = 1 Slot / Lab = 2 Slots**

↓

**Default ATTEND + Student BUNK Selections**

↓

**Projected Attendance**

↓

**Projected Attendance >= 75% → SAFE**

**Projected Attendance < 75% → UNSAFE**

---

### Attendance Recovery

**Attendance < 75%**

↓

**Required Recovery Slots = ceil((0.75E - P) / 0.25)**

↓

**Map Required Slots to Future Timetable**

↓

**Lecture = 1 Slot / Lab = 2 Slots**

↓

**Determine Earliest Recovery Point Where Possible**

↓

**Projected Attendance >= 75%**

---

### Future Attendance Simulator

**Available at Any Confirmed Attendance Percentage**

↓

**Select Future Simulation Period**

↓

**Generate Applicable Future Classes**

↓

**Default ATTEND + Student ATTEND/BUNK Decisions**

↓

**Calculate Future Attended Slots + Future Missed Slots**

↓

**Predicted Attendance = ((P + A) / (E + A + M)) × 100**

---

All calculations shall operate on **overall attendance**, use deterministic mathematical logic, respect the defined lecture/laboratory slot weights, use timetable and academic-calendar information where future classes are required, and preserve the latest confirmed attendance dataset until validly replaced.

# 7. Attendance Data and Validation Requirements

## 7.1 Purpose

This section defines how AttendSense shall accept, process, extract, normalize, validate, review, confirm, and persist student-provided attendance information before that information becomes eligible for attendance analysis.

The primary objective is to ensure that Safe Bunk Calculator, Attendance Recovery Calculator, and Future Attendance Simulator operate only on attendance information that has been processed and confirmed with sufficient reliability.

AttendSense shall prioritize **attendance-data correctness over producing a calculation result**.

The required attendance-data pipeline shall be:

**Attendance Input**  
↓  
**File Validation**  
↓  
**Extraction**  
↓  
**Normalization**  
↓  
**Automatic Validation**  
↓  
**Student Review**  
↓  
**Student Confirmation**  
↓  
**Successful Save**  
↓  
**Latest Confirmed Attendance Dataset**  
↓  
**Eligible for Attendance Analysis**

Failure at any required stage shall prevent the newly submitted dataset from replacing the student's existing confirmed attendance dataset.

---

## 7.2 Supported Attendance Input

AttendSense Phase 1 shall accept attendance information through:

- A supported PDF file.
- One supported image.
- Multiple supported images where the complete attendance information spans more than one image.

Attendance files may be provided through:

1. The in-application attendance input workflow.
2. Supported PWA share-target functionality where technically available and successfully validated.

Students shall not be required to manually identify the original attendance source, website, application, or layout before submitting a supported attendance file.

Acceptance shall depend on whether AttendSense can reliably obtain the attendance information required for normalization and validation.

---

## 7.3 Required Attendance Information

The primary attendance values required by the Phase 1 calculation engine shall be:

- **Overall Present Slots**
- **Overall Effective Total Slots**

Depending on the submitted attendance representation, AttendSense may also need to identify:

- Displayed or reported Total Slots.
- No Attendance slots.
- Equivalent non-attendance slots.
- Overall attendance percentage, where available.
- Other values necessary to determine or validate the overall attendance dataset.

The system may extract additional information when useful for document interpretation or validation.

However:

**Individual subject-wise attendance percentages shall not form the basis of Phase 1 attendance calculations.**

Future lecture and laboratory information shall come from the applicable timetable and academic calendar rather than from subject-wise attendance percentages.

---

## 7.4 Attendance Data Source Independence

Different attendance representations may expose the same attendance information differently.

For example:

### Representation A

The submitted attendance information may display:

- Present Slots = 142
- Total Slots = 188
- No Attendance Slots = 21

In this representation:

**Effective Total Slots = 188 - 21 = 167**

### Representation B

Another attendance representation may already display:

- Present Slots = 142
- Total Slots = 167

with No Attendance already excluded.

In this case:

**Effective Total Slots = 167**

and AttendSense shall not subtract the No Attendance value again.

The system shall therefore interpret the meaning of available attendance values rather than blindly assume that every displayed Total Slots value has the same meaning.

---

## 7.5 PDF Processing

When the student provides attendance information through a supported PDF:

1. AttendSense shall validate the PDF before extraction begins.
2. The system shall attempt to obtain the attendance information required for the overall attendance dataset.
3. Where reliable machine-readable text or structured information is available, the implementation should prefer reliable direct extraction where appropriate.
4. The extracted information shall be converted into the normalized overall attendance structure.
5. The normalized dataset shall proceed to automatic validation.

The extraction workflow shall attempt to identify values such as:

- Overall Present Slots.
- Displayed or reported Total Slots.
- No Attendance or equivalent non-attendance slots, where applicable.
- Overall attendance percentage, where available for validation.
- Other values required to determine Overall Effective Total Slots reliably.

If the required information cannot be extracted reliably, AttendSense shall not generate attendance-analysis results from that extraction.

The student shall instead receive an appropriate processing failure or re-upload instruction.

---

## 7.6 Image Processing

When the student provides attendance information through one or more supported images, AttendSense shall use the selected image-processing/OCR/vision mechanism to obtain the required attendance information.

The extraction workflow shall attempt to identify values such as:

- Overall Present Slots.
- Displayed or reported Total Slots.
- No Attendance or equivalent non-attendance slots, where applicable.
- Overall attendance percentage, where available for validation.
- Other information required to determine and validate Overall Effective Total Slots.

The processing system shall account, where reasonably possible, for variations such as:

- Image dimensions.
- Device screen size.
- Screenshot dimensions.
- Cropping.
- Text positioning.
- Resolution.
- Layout differences.

AttendSense shall not be required to accept an image when the information required for reliable attendance interpretation is unreadable, missing, excessively cropped, or otherwise unusable.

If reliable processing cannot be completed, the student shall be asked to provide clearer or more complete attendance information.

---

## 7.7 Multiple Image Processing

AttendSense shall support multiple images as part of a single attendance submission when the complete attendance information spans more than one image.

All selected images belonging to that submission shall be treated as parts of one attendance-input operation.

The system shall:

1. Validate every submitted image.
2. Process the relevant attendance information contained in each image.
3. Identify complementary attendance information across the images.
4. Detect overlapping or repeated information where reasonably possible.
5. Prevent duplicated attendance information from being counted more than once.
6. Combine the required information into one normalized overall attendance dataset.
7. Determine whether the combined information is sufficient for reliable validation.

The objective of multi-image processing shall be to construct **one reliable overall attendance dataset**, not independent subject-wise attendance datasets.

If the images cannot be reliably combined, the submission shall not replace an existing confirmed dataset.

---

## 7.8 Duplicate and Overlapping Information Detection

AttendSense shall attempt to identify duplicated or overlapping attendance information within a multi-image attendance submission.

Duplicated information shall not be counted multiple times merely because it appears in more than one submitted image.

Detection may use relevant extracted information such as:

- Identical attendance values.
- Repeated headings.
- Repeated rows.
- Overlapping page/screenshot sections.
- Repeated overall attendance summaries.
- Other document characteristics available to the selected extraction implementation.

Where two pieces of extracted information clearly represent the same attendance information, they shall be treated as duplicated rather than additive.

If conflicting overlapping information cannot be resolved reliably, AttendSense shall not silently choose one value.

The affected submission shall instead fail the required validation or processing workflow.

---

# 7.9 Attendance Data Normalization

## 7.9.1 Standard Internal Attendance Structure

Regardless of whether attendance information originates from a PDF, one image, or multiple images, the successfully interpreted data shall be normalized into a consistent internal structure.

The normalized Phase 1 attendance dataset shall contain the information required for overall attendance analysis, including:

- **Overall Present Slots**
- **Overall Effective Total Slots**
- Displayed/Reported Total Slots, where relevant.
- No Attendance or equivalent non-attendance slots, where applicable.
- Independently Calculated Overall Attendance Percentage.
- Relevant validation metadata required by the implementation.

Raw PDF/image content shall not be passed directly to the attendance calculation engine.

---

## 7.9.2 No Attendance Normalization

Where the displayed Total Slots includes No Attendance or equivalent non-attendance slots:

**Effective Total Slots = Displayed Total Slots - No Attendance Slots**

### Example

If:

**Displayed Total Slots = 188**

and:

**No Attendance Slots = 21**

then:

**Effective Total Slots = 167**

Attendance calculations shall use `167`, not `188`.

If the submitted attendance representation already provides a valid total with No Attendance excluded:

**Effective Total Slots = Reported Total Slots**

No second subtraction shall occur.

---

## 7.9.3 No Double Subtraction

AttendSense shall prevent No Attendance slots from being subtracted more than once.

The normalization workflow shall determine whether:

1. The displayed total includes No Attendance slots, or
2. The displayed total already excludes No Attendance slots.

Only the first case shall require subtraction.

If the system cannot reliably determine which interpretation applies, the newly submitted dataset shall not proceed to confirmation as valid attendance data.

---

# 7.10 Automatic Attendance Validation

## 7.10.1 Core Value Validation

Before student confirmation, AttendSense shall automatically validate the normalized attendance dataset.

Validation shall include:

- `Overall Present Slots >= 0`
- `Overall Effective Total Slots > 0`
- `Overall Present Slots <= Overall Effective Total Slots`
- `No Attendance Slots >= 0`, where applicable.
- Calculated attendance percentage must be within `0%–100%`.
- Required attendance values must be present.
- Normalized values must be internally consistent.

A dataset that fails required validation shall not become a confirmed attendance dataset.

---

## 7.10.2 Independent Attendance Percentage Validation

AttendSense shall independently calculate:

**Overall Attendance Percentage = (Overall Present Slots / Overall Effective Total Slots) × 100**

The independently calculated value shall be used by AttendSense for attendance analysis.

If the uploaded attendance information also provides an overall attendance percentage, AttendSense may compare the reported percentage with its independently calculated percentage.

Small differences attributable only to legitimate display rounding may be accepted.

Material inconsistencies shall trigger further validation or processing failure rather than being silently ignored.

---

## 7.10.3 Effective Total Validation

Where No Attendance normalization has been applied, AttendSense shall validate that:

**Effective Total Slots = Displayed Total Slots - No Attendance Slots**

where applicable.

The resulting Effective Total Slots shall:

- Not be negative.
- Not be zero when attendance percentage calculation is required.
- Not be lower than Present Slots.

---

## 7.10.4 Multi-Image Validation

For multiple-image submissions, AttendSense shall validate that:

- Required attendance information was not omitted because of missing screenshots.
- Overlapping information was not counted more than once.
- Conflicting values have not been silently merged.
- The combined submission provides sufficient information to determine the required overall attendance values reliably.

---

# 7.11 Extraction Reliability

Attendance extraction shall be treated as an **input-processing mechanism**, not as an unquestionable source of truth.

AttendSense shall not intentionally:

- Guess unreadable attendance numbers.
- Invent missing attendance values.
- Replace uncertain values with assumed values.
- Ignore significant inconsistencies.
- Count duplicated information more than once.
- Produce attendance-analysis results from unreliable extracted data.

If reliable extraction cannot be achieved, the new attendance submission shall stop before confirmation.

The student shall receive an appropriate corrective action such as providing:

- A clearer image.
- A more complete screenshot.
- Missing additional images.
- A valid PDF.
- Another supported attendance input.

---

# 7.12 Student Review

## 7.12.1 Mandatory Review Screen

After extraction, normalization, and automatic validation succeed, AttendSense shall present the interpreted attendance dataset to the student for mandatory review.

The review screen shall prominently display relevant values such as:

- **Overall Present Slots**
- **Overall Effective Total Slots**
- Displayed/Reported Total Slots, where relevant.
- No Attendance Slots, where relevant.
- Independently Calculated Overall Attendance Percentage.

The interface shall clearly communicate that the student must verify whether AttendSense has interpreted the submitted attendance information correctly.

---

## 7.12.2 Review Purpose

Student review exists as an additional reliability layer because even a technically successful document-processing operation may potentially misinterpret information.

The review step shall allow the student to answer:

**"Has AttendSense correctly interpreted the attendance information I provided?"**

The student shall not be asked to approve or verify the mathematical formulas used by the calculation engine.

---

# 7.13 Student Confirmation

The student shall explicitly confirm the interpreted attendance dataset before the new dataset becomes eligible for attendance analysis.

The required workflow shall be:

**Attendance Input**  
↓  
**File Validation**  
↓  
**Extraction**  
↓  
**Normalization**  
↓  
**Automatic Validation**  
↓  
**Student Review**  
↓  
**Student Confirmation**

### If Confirmed

The system shall attempt to save the confirmed attendance dataset.

After successful saving:

**New Dataset → Latest Confirmed Attendance Dataset**

The dataset shall then become available to:

- Safe Bunk Calculator.
- Attendance Recovery Calculator.
- Future Attendance Simulator.

### If Rejected

The newly interpreted dataset shall:

- Not become confirmed attendance data.
- Not be used by the calculation engine.
- Not replace a previous confirmed attendance dataset.

The student shall be allowed to provide attendance information again.

---

# 7.14 Incorrect Extraction Handling

If the student identifies incorrect attendance information during the review stage, the student shall be able to reject the interpreted dataset.

Examples may include:

- Incorrect Present Slots.
- Incorrect Total Slots.
- Incorrect No Attendance interpretation.
- Incorrect Effective Total Slots.
- Missing information.
- Duplicated information.
- Incorrectly combined multiple images.

Phase 1 shall not rely on manual modification of extracted attendance counts as the normal correction mechanism.

Instead, the student shall provide attendance information again so that the extraction and validation workflow can be repeated.

---

# 7.15 Missing or Incomplete Attendance Information

AttendSense shall not proceed with confirmation of a new attendance dataset when information required for reliable overall attendance calculation cannot be determined.

Examples include:

- Missing Overall Present Slots.
- Missing Total/Effective Total information.
- Required No Attendance information is missing.
- No Attendance interpretation cannot be determined reliably.
- Partially visible required values.
- Excessively cropped image.
- Missing image from a multi-image submission.
- Incomplete PDF extraction.
- Contradictory extracted values.
- Required attendance values cannot be interpreted reliably.

AttendSense shall clearly communicate that the attendance submission could not be reliably processed.

---

# 7.16 Invalid Upload Handling

AttendSense shall reject files that cannot be accepted by the supported attendance-input workflow.

Examples may include:

- Unsupported file type.
- Corrupted file.
- Empty file.
- Unreadable image.
- Invalid PDF.
- Unsupported image format.
- File exceeding configured technical limits.
- Excessive image count.
- File containing no identifiable attendance information.

The UI shall display a clear error and allow the student to provide attendance information again.

Exact:

- File-size limits.
- Supported image extensions.
- Maximum image count.
- Processing limits.

shall be finalized during technical implementation/evaluation according to the selected document-processing architecture.

---

# 7.17 Latest Confirmed Attendance Dataset

After a student successfully confirms an attendance dataset and the system successfully saves it, that dataset shall become:

**Latest Confirmed Attendance Dataset**

The latest confirmed attendance dataset shall remain the active attendance source for:

- Safe Bunk Calculator.
- Attendance Recovery Calculator.
- Future Attendance Simulator.

The student shall not be required to upload attendance again merely because they want to use another analysis feature.

---

## 7.17.1 Dataset Reuse Example

Suppose the latest confirmed dataset is:

- Present Slots = 142
- Effective Total Slots = 167

The student performs:

**Safe Bunk Calculator**

The calculator starts from:

**142 / 167**

The student then opens:

**Future Attendance Simulator**

The simulator shall again start from:

**142 / 167**

The Safe Bunk result shall not become the Future Simulator's starting attendance.

The same rule shall apply across all analysis features.

---

# 7.18 Attendance Data Update

Students shall be able to provide newer attendance information whenever they want future analyses to use newer official attendance data.

Providing newer attendance data shall begin a new processing workflow.

The new attendance data shall not immediately replace the current latest confirmed attendance dataset.

Instead, the new dataset must complete:

**Input**  
↓  
**File Validation**  
↓  
**Extraction**  
↓  
**Normalization**  
↓  
**Automatic Validation**  
↓  
**Student Review**  
↓  
**Student Confirmation**  
↓  
**Successful Save**

Only after successful completion shall it replace the previous confirmed dataset.

---

# 7.19 Safe Dataset Replacement

Suppose the student currently has:

**Dataset A — Confirmed**

and then provides:

**Dataset B — New Upload**

Dataset A shall remain active while Dataset B is being processed.

### If Dataset B succeeds

**Dataset B → Latest Confirmed Dataset**

**Dataset A → Replaced**

### If Dataset B fails

Because of:

- Extraction failure.
- Validation failure.
- Incomplete information.
- Student rejection.
- Save failure.
- Other required processing failure.

then:

**Dataset A → Remains Latest Confirmed Dataset**

Dataset B shall not replace it.

---

# 7.20 Attendance Data Freshness

AttendSense shall not claim that persisted attendance information is automatically synchronized with an external official attendance system.

The latest confirmed attendance dataset represents:

> The latest attendance information successfully provided and confirmed by the student within AttendSense.

AttendSense shall therefore allow the student to update attendance whenever they want calculations based on newer official attendance information.

The application may display contextual information indicating when the confirmed dataset was last updated.

AttendSense shall not automatically modify the confirmed dataset based on:

- Safe Bunk plans.
- Recovery plans.
- Future Attendance Simulations.
- Assumed attendance.
- Passage of calendar time.

Only a newly processed and confirmed attendance submission shall replace it.

---

# 7.21 Timetable and Attendance Data Separation

Uploaded attendance data and future timetable information shall serve different purposes.

### Uploaded Attendance Data

Provides the base confirmed values:

- Overall Present Slots.
- Overall Effective Total Slots.

### Timetable

Provides future academic occurrences such as:

- Lecture occurrences.
- Laboratory occurrences.
- Dates/times where applicable.
- Lecture/laboratory classification.

### Academic Calendar

Determines whether a timetable occurrence is valid on a particular date.

Therefore:

**Confirmed Attendance Dataset**  
+
**Timetable**  
+
**Academic Calendar**  
+
**Attendance Slot Weights**

shall form the inputs required for schedule-aware future attendance analysis.

AttendSense shall not attempt to associate independent subject-wise attendance percentages with timetable entries for Phase 1 calculations.

---

# 7.22 Lecture and Laboratory Classification

The predefined timetable shall identify whether each applicable future academic event is:

- A Lecture, or
- A Laboratory Session.

The classification shall determine the attendance-slot weight:

**Lecture = 1 Attendance Slot**

**Laboratory Session = 2 Attendance Slots**

This classification shall be used for future attendance analysis and shall not depend on separate subject-wise attendance percentages extracted from the uploaded attendance document.

---

# 7.23 Processing Feedback

AttendSense shall provide clear interface feedback during attendance-data processing.

Relevant states may include:

- File selected.
- Uploading.
- File validation.
- Processing.
- Extracting attendance information.
- Normalizing attendance information.
- Validating attendance information.
- Preparing review.
- Ready for student review.
- Confirmation in progress.
- Attendance saved successfully.
- Processing failed.
- Validation failed.
- Save failed.

The student shall not be left with an apparently inactive interface while processing is occurring.

---

# 7.24 Validation Failure Handling

If a new attendance dataset fails required validation, AttendSense shall:

1. Prevent the dataset from becoming confirmed attendance data.
2. Prevent the dataset from being used by the attendance calculation engine.
3. Clearly communicate that the attendance information could not be reliably verified.
4. Avoid presenting Safe Bunk, Recovery, or Future Simulator results from that invalid dataset.
5. Allow the student to provide attendance information again.
6. Preserve the previous confirmed attendance dataset where one exists.

AttendSense shall prioritize reliability over producing a result from uncertain data.

---

# 7.25 Save Failure Handling

Student confirmation alone shall not replace the existing latest confirmed attendance dataset unless the newly confirmed dataset is also successfully saved.

If:

**Student Confirmation = Successful**

but:

**Dataset Save = Failed**

then the previously saved confirmed attendance dataset shall remain active.

AttendSense shall notify the student that the newly confirmed data could not be saved successfully.

The new dataset shall not be treated as the persisted latest confirmed attendance dataset until saving succeeds.

---

# 7.26 Raw Attendance File Handling

Raw uploaded PDF/image files shall be treated separately from the normalized attendance dataset used by the calculation engine.

The calculation engine shall operate on:

**Validated + Confirmed + Saved Normalized Attendance Data**

and not directly on raw uploaded document content.

The exact storage duration, temporary-processing behavior, and deletion policy for raw uploaded attendance files shall be determined during technical architecture and security evaluation.

AttendSense shall avoid retaining raw attendance files longer than necessary unless retention is specifically required by the selected architecture.

---

# 7.27 Extraction Technology Principle

The PRD shall not lock a specific OCR, computer-vision, or PDF-parsing technology before technical evaluation.

The selected technology or combination of technologies must demonstrate sufficient reliability for the supported Phase 1 attendance inputs.

Technical evaluation shall consider factors such as:

- Extraction accuracy.
- PDF compatibility.
- Image-layout compatibility.
- Multi-image processing capability.
- No Attendance detection capability.
- Structured-data extraction capability.
- Processing latency.
- Cost.
- Privacy implications.
- Security.
- Development complexity.
- PWA/backend compatibility.

Regardless of the selected extraction technology, the mandatory validation and student-confirmation workflow shall remain in place.

---

# 7.28 Mandatory Student Confirmation Principle

Student confirmation shall remain mandatory even if technical testing demonstrates very high attendance-extraction accuracy.

This requirement exists because even a small extraction error may materially affect attendance calculations.

Therefore:

**High Extraction Accuracy ≠ Removal of Student Confirmation**

The final Phase 1 workflow shall retain:

**Automatic Processing + Automatic Validation + Student Review + Student Confirmation**

before newly submitted attendance data becomes eligible for analysis.

---

# 7.29 No Assumed Attendance Updates

AttendSense shall not infer that a future class was actually attended or missed merely because:

- The student marked it ATTEND in Safe Bunk.
- The student marked it BUNK in Safe Bunk.
- It appeared in a recovery plan.
- It was marked ATTEND in Future Simulator.
- It was marked BUNK/MISS in Future Simulator.
- The scheduled date has passed.

These selections are planning or simulation inputs only.

They shall not update:

- Confirmed Present Slots.
- Confirmed Effective Total Slots.
- The latest confirmed attendance dataset.

Officially updated attendance values shall only enter AttendSense through a newly processed and confirmed attendance submission.

---

# 7.30 Final Attendance Data Processing Rule

A newly submitted attendance dataset shall become eligible for attendance analysis only after successfully completing all required stages:

**Supported Attendance Input**  
↓  
**File Validation**  
↓  
**Successful Attendance Extraction**  
↓  
**Attendance Data Normalization**  
↓  
**No Attendance Handling Where Required**  
↓  
**Automatic Validation**  
↓  
**Student Review**  
↓  
**Student Confirmation**  
↓  
**Successful Save**  
↓  
**Latest Confirmed Attendance Dataset**  
↓  
**Eligible for Attendance Analysis**

Failure at any mandatory stage shall prevent the new dataset from replacing the student's existing latest confirmed attendance dataset.

The previous confirmed attendance dataset shall remain active whenever a newer submission fails before successful replacement.

Safe Bunk Calculator, Attendance Recovery Calculator, and Future Attendance Simulator shall operate only from the active latest confirmed attendance dataset.

# 8. UI/UX and PWA Requirements

## 8.1 UI/UX Objective

AttendSense shall provide a **modern, attractive, interactive, intuitive, and student-focused user experience**.

The application shall not feel like a basic attendance-percentage calculator.

The visual and interaction design shall make attendance planning easy to understand while preserving the reliability requirements defined elsewhere in this PRD.

The interface shall prioritize:

- Simplicity.
- Fast navigation.
- Clear visual hierarchy.
- Modern visual design.
- Interactive attendance planning.
- Minimal unnecessary steps.
- Mobile usability.
- Visual consistency.
- Immediate interaction feedback.
- Clear distinction between confirmed and hypothetical attendance.
- Easy interpretation of attendance-analysis results.
- Student-friendly language.

The interface shall avoid unnecessary complexity while making the three primary attendance-analysis capabilities easy to discover and use:

1. Safe Bunk Calculator.
2. Attendance Recovery Calculator.
3. Future Attendance Simulator.

---

## 8.2 Mobile-First Design

AttendSense shall follow a **mobile-first design approach**.

The primary UX shall be designed around students using AttendSense from a smartphone, particularly as an installed PWA.

The application shall also remain fully usable on:

- Smartphones.
- Tablets.
- Laptops.
- Desktop computers.

Layouts, navigation, cards, buttons, upload controls, schedule interfaces, attendance-selection controls, forms, dialogs, and result views shall adapt appropriately to different screen sizes.

The desktop experience shall not simply stretch the mobile interface unnecessarily.

Larger displays may use additional horizontal space to improve readability and information organization while preserving the same functionality.

---

## 8.3 Design Quality Principle

AttendSense shall aim for a polished product-level experience rather than a purely functional academic project interface.

The design shall use a coherent system for:

- Typography.
- Spacing.
- Cards.
- Surfaces.
- Icons.
- Buttons.
- Forms.
- Status indicators.
- Progress states.
- Dialogs.
- Navigation.
- Interactive timetable elements.
- Result presentation.

Visual effects, motion, gradients, depth, or other contemporary design techniques may be used where they improve the experience.

Such visual treatments shall not reduce:

- Readability.
- Accessibility.
- Performance.
- Clarity.
- Interaction reliability.

The interface shall prioritize **usefulness first and visual polish second**, while aiming to achieve both.

---

## 8.4 Primary Screens and Views

The Phase 1 application shall include the functionality represented by the following primary screens or views:

1. **Welcome / Authentication**
2. **First-Time Academic Setup**
3. **Student Dashboard**
4. **Attendance Upload / Update**
5. **Attendance Processing**
6. **Attendance Review and Confirmation**
7. **Safe Bunk Calculator**
8. **Attendance Recovery Calculator**
9. **Future Attendance Simulator**
10. **Attendance Analysis Result Views**
11. **Profile / Academic Settings**

These functions may be combined into fewer screens, drawers, sheets, dialogs, tabs, or contextual views where doing so improves usability.

**Current Attendance Calculation shall not exist as a separate calculator or standalone primary screen.**

The student's current confirmed overall attendance may instead be displayed as contextual information where useful.

---

## 8.5 Authentication Experience

### 8.5.1 Welcome and Sign-In Screen

When authentication is required, AttendSense shall provide a clean and focused authentication experience.

The primary authentication action shall be:

**Continue with Google**

The authentication interface should avoid unnecessary fields or account-creation forms because Phase 1 account identity shall be based on Google authentication.

The screen may include:

- AttendSense branding.
- A concise product description.
- Google authentication action.
- Appropriate privacy/security messaging.
- Loading and error feedback.

### 8.5.2 Authentication States

The authentication interface shall clearly communicate states such as:

- Ready to sign in.
- Authentication in progress.
- Authentication successful.
- Authentication failed.
- Session unavailable.
- Retry available.

Returning users with a valid authenticated session shall not unnecessarily be shown the login interface.

### 8.5.3 Returning User Experience

When a valid session exists:

**Open AttendSense → Restore Account → Dashboard**

When no valid session exists:

**Open AttendSense → Continue with Google → Restore/Create Account → Dashboard or First-Time Setup**

A returning user who authenticates using the same Google identity shall receive the existing AttendSense account and persisted application data.

---

## 8.6 First-Time Academic Setup

A first-time authenticated student shall be guided through the academic configuration required to associate the correct timetable and academic calendar.

The setup interface shall:

- Use predefined selectable options wherever possible.
- Minimize manual text entry.
- Clearly explain each required choice.
- Show progress where multiple setup steps exist.
- Prevent continuation when mandatory information is missing.
- Confirm successful setup.
- Associate the appropriate timetable and academic calendar after completion.

The setup shall be short, focused, and student-friendly.

Students shall not be required to manually construct their full timetable or academic calendar.

---

## 8.7 Student Dashboard

### 8.7.1 Dashboard Purpose

The dashboard shall be the primary starting point after authentication and academic setup.

It shall provide quick access to:

- **Safe Bunk Calculator**
- **Attendance Recovery Calculator**
- **Future Attendance Simulator**
- **Upload Attendance**
- **Update Attendance**
- Relevant profile/academic settings.

### 8.7.2 Latest Confirmed Attendance Context

If a latest confirmed attendance dataset exists, the dashboard may display contextual information such as:

- Confirmed overall attendance percentage.
- Overall Present Slots.
- Overall Effective Total Slots.
- Position relative to the 75% threshold.
- Last attendance update time/date where available.

This contextual display shall **not be presented as a separate Current Attendance Calculator**.

### 8.7.3 No Attendance Dataset State

If no latest confirmed attendance dataset exists, the dashboard shall clearly communicate that attendance information is required before analysis can begin.

The primary action should guide the student toward:

**Upload Attendance**

The three analysis features may remain visible to demonstrate application functionality, but they shall clearly indicate that confirmed attendance information is required before they can be used.

### 8.7.4 Calculator Eligibility States

Safe Bunk and Attendance Recovery may remain visible regardless of current eligibility.

#### When Overall Attendance >= 75%

The dashboard may indicate:

**Safe Bunk Calculator — Available**

**Attendance Recovery — Recovery Not Required**

#### When Overall Attendance < 75%

The dashboard may indicate:

**Safe Bunk Calculator — Currently Unavailable**

**Attendance Recovery — Available**

#### Future Attendance Simulator

Future Attendance Simulator shall remain available at **any confirmed attendance percentage**.

Unavailable states shall explain **why** the feature is not currently applicable rather than merely disabling it without explanation.

---

## 8.8 Attendance Upload Experience

The attendance upload interface shall provide clear input options for:

- **Image**
- **PDF**

For image input, students shall be able to select:

- One supported image.
- Multiple supported images where required.

For PDF input, the device/browser's supported file picker shall be used.

The interface shall clearly show:

- Selected file(s).
- File type.
- Number of images selected where relevant.
- Ability to remove incorrectly selected files before submission.
- Primary action to begin processing.

Students shall not be required to specify whether the attendance file originated from a particular website, mobile application, or other attendance interface.

---

## 8.9 PWA Share-Target Experience

Where supported and successfully validated, an installed AttendSense PWA may appear in the operating system's share interface for supported attendance images and PDFs.

The intended user experience shall be:

**Attendance Image/PDF in Another App**  
↓  
**Share**  
↓  
**Select AttendSense**  
↓  
**AttendSense Opens**  
↓  
**Authentication Check**  
↓  
**Attendance Processing Workflow**

If the user has a valid authenticated session, the received file should proceed directly toward the attendance-processing workflow.

If authentication is required, AttendSense shall guide the student through Google authentication before protected processing continues.

If the shared file cannot safely survive the authentication transition, the interface shall clearly ask the student to provide the file again.

AttendSense shall not display UI language implying that share-sheet availability is guaranteed on every device.

The UX may include guidance such as:

**Install AttendSense for supported share-to-app functionality.**

only where technically appropriate.

---

## 8.10 Attendance Processing Experience

After an attendance file is submitted, AttendSense shall provide visible progress feedback.

The interface may communicate stages such as:

**Uploading**  
↓  
**Reading Attendance Data**  
↓  
**Extracting Attendance Information**  
↓  
**Normalizing Data**  
↓  
**Validating Attendance**  
↓  
**Preparing Review**

The student shall not be presented with an apparently frozen interface while processing is occurring.

Where practical, processing feedback should communicate meaningful progress rather than displaying an indefinite spinner without context.

---

## 8.11 Attendance Review and Confirmation UI

After extraction, normalization, and automatic validation succeed, AttendSense shall present the interpreted attendance dataset for mandatory student review.

The review view shall prominently display relevant information such as:

- **Overall Present Slots**
- **Overall Effective Total Slots**
- Displayed/Reported Total Slots, where relevant.
- No Attendance Slots, where relevant.
- Independently Calculated Overall Attendance Percentage.

The review screen shall **not primarily present subject-wise attendance percentages as the basis of calculation**.

The interface shall clearly explain:

**Please verify that AttendSense has interpreted your attendance information correctly before continuing.**

Primary actions shall include:

- **Confirm Attendance**
- **Reject / Upload Again**

Confirmation shall be visually treated as an important action because the confirmed dataset becomes the application's base attendance data.

---

## 8.12 Attendance Confirmation Success

After successful student confirmation and successful saving:

AttendSense shall clearly communicate that the attendance information has been saved successfully.

The UI may then provide direct actions such as:

- **Safe Bunk Calculator**
- **Attendance Recovery**
- **Future Attendance Simulator**
- **Go to Dashboard**

Feature availability shall continue to follow the eligibility rules defined elsewhere in this PRD.

---

## 8.13 Rejected Extraction Experience

If the student rejects the interpreted attendance data:

- The new dataset shall not be represented as saved.
- The previous confirmed dataset shall remain available where one exists.
- The student shall receive a clear path to provide attendance data again.

The interface shall avoid implying that rejection deletes or invalidates the previously confirmed dataset.

---

## 8.14 Safe Bunk Calculator UI

### 8.14.1 Safe Bunk Entry State

When the student opens Safe Bunk Calculator, the interface shall first verify eligibility.

If confirmed overall attendance is below 75%, the UI shall explain that Safe Bunk is not currently applicable and may provide an action such as:

**View Attendance Recovery**

If confirmed attendance is at or above 75%, Safe Bunk planning shall proceed.

### 8.14.2 Safe Bunk Schedule Interface

Safe Bunk shall present applicable classes from:

**Current Day → Final Applicable Academic Day of the Current Week**

Classes shall be grouped in an easy-to-scan schedule format, preferably by date/day.

For example:

**Wednesday**

- AI — Lecture
- ML — Lecture
- DBMS — Lab

**Thursday**

- CN — Lecture
- Web Development — Lab

Each class shall clearly indicate whether it is:

- Lecture.
- Laboratory session.

The UI may also communicate the relevant slot impact:

- Lecture → 1 slot.
- Lab → 2 slots.

### 8.14.3 Default Safe Bunk State

Every displayed class shall initially be:

**ATTEND**

The student shall be able to change a class to:

**BUNK**

The interaction should be fast and visually obvious.

Suitable UI patterns may include:

- Segmented ATTEND/BUNK controls.
- Toggle-style selection.
- Interactive schedule cards.
- Other clearly understandable state controls.

The exact visual component may be determined during UI implementation.

### 8.14.4 Safe Bunk Live Summary

The interface should provide a clear summary of the current plan.

Relevant information may include:

- Current confirmed attendance.
- Selected attended slots.
- Selected bunked slots.
- Projected overall attendance.
- Position relative to 75%.

Where performance permits, projected results should update interactively as the student changes ATTEND/BUNK selections.

### 8.14.5 Safe Bunk Result

The result shall primarily answer:

**Is this selected bunk plan safe?**

Example safe result:

**SAFE**

**Your selected plan keeps your projected overall attendance at or above 75%.**

Example unsafe result:

**UNSAFE**

**This plan would reduce your projected overall attendance below 75%.**

Supporting information may include:

- Current confirmed attendance.
- Projected attendance.
- Selected bunked classes.
- Selected attended classes.
- Total attended/bunked slot impact.
- Relevant dates.

The result shall clearly explain that classes left as **ATTEND** are assumed to be attended.

AttendSense shall not use the old generic result pattern:

**"You can miss X classes."**

as the primary Safe Bunk model.

Safe Bunk evaluates the student's **specific selected plan**.

---

## 8.15 Attendance Recovery Calculator UI

### 8.15.1 Recovery Entry State

Attendance Recovery shall be applicable when confirmed overall attendance is below 75%.

If the student's attendance is already at or above 75%, the interface shall clearly state:

**Attendance recovery is not currently required.**

The UI may provide a direct action toward Safe Bunk instead.

### 8.15.2 Recovery Requirement Presentation

The primary recovery result shall prominently communicate:

**Required Recovery Attendance Slots**

For example:

**You need to attend 30 additional attendance slots to mathematically reach 75%.**

The UI shall use the term **attendance slots** rather than incorrectly presenting the value as a fixed number of individual classes.

### 8.15.3 Recovery Schedule View

Where sufficient timetable and calendar data exists, AttendSense shall map recovery slots to actual future classes.

The recovery schedule should present information chronologically and may show:

- Date.
- Day.
- Class name.
- Lecture/Lab classification.
- Slot contribution.
- Running recovery progress.

For example:

**12 / 30 Recovery Slots Completed in Plan**

Laboratory sessions shall visibly contribute **2 slots**.

Lectures shall visibly contribute **1 slot**.

### 8.15.4 Recovery Result

The recovery result may include:

- Current confirmed attendance.
- Required 75% threshold.
- Required recovery slots.
- Upcoming classes contributing to recovery.
- Projected attendance at the recovery point.
- Earliest projected recovery date, where determinable.

The UI shall clearly communicate:

**This recovery projection assumes that the listed future attendance opportunities are successfully attended.**

If the complete recovery date cannot be determined because sufficient future timetable/calendar information is unavailable, the UI shall show the mathematical recovery-slot requirement while explaining that the complete date cannot currently be projected.

---

## 8.16 Future Attendance Simulator UI

### 8.16.1 Simulator Availability

Future Attendance Simulator shall remain available whenever a latest confirmed attendance dataset exists.

The interface shall not restrict usage based on whether attendance is:

- Above 75%.
- Exactly 75%.
- Below 75%.

### 8.16.2 Future Period Selection

The simulator shall allow the student to choose an applicable future period within the available timetable/calendar range.

Possible interaction patterns may include:

- This Week.
- Next Week.
- Custom future date/range.

The final interaction pattern may be refined during UI implementation.

Unlike Safe Bunk, the simulator shall not be limited only to the remainder of the current week.

### 8.16.3 Simulation Schedule

Applicable future lectures and labs shall be shown in a schedule-oriented interface.

Every class shall initially be:

**ATTEND**

The student shall be able to change any applicable class between:

- **ATTEND**
- **BUNK/MISS**

The interface shall visually distinguish lectures from laboratories and may show their slot weights.

### 8.16.4 Interactive Simulation Result

Where technically practical, the Future Attendance Simulator shall update the projected attendance dynamically as the student modifies the scenario.

A persistent or easily accessible simulation summary may show:

- Current confirmed attendance.
- Future attended slots.
- Future missed slots.
- Predicted overall attendance.
- Difference from current attendance.
- Position relative to 75%.

This shall allow the student to experiment with multiple hypothetical scenarios without repeatedly navigating between separate input and result screens.

### 8.16.5 Hypothetical Result Labeling

Future Simulator results shall be clearly identified as:

**Hypothetical / Predicted**

and shall not visually resemble newly saved official attendance.

The UI shall communicate that:

**Simulation results do not modify your confirmed attendance data.**

---

## 8.17 Confirmed vs Projected Data Visualization

AttendSense shall clearly distinguish among:

### Confirmed Attendance

Attendance derived from the latest confirmed attendance dataset.

### Safe Bunk Projection

Projected attendance after the student's selected Safe Bunk plan.

### Recovery Projection

Projected attendance resulting from successfully attending the calculated recovery path.

### Future Simulation

Hypothetical attendance resulting from the selected future scenario.

The interface shall not use ambiguous labels that could cause a projected value to be mistaken for updated official attendance.

---

## 8.18 Attendance Status Visualization

AttendSense shall visually distinguish important attendance states such as:

- Above the required threshold.
- Exactly at the required threshold.
- Near the required threshold.
- Below the required threshold.
- Safe Bunk plan safe.
- Safe Bunk plan unsafe.
- Recovery required.
- Recovery target reached in projection.
- Hypothetical simulation above/below 75%.

Status communication shall not rely exclusively on color.

The UI shall also use appropriate:

- Text labels.
- Icons.
- Status badges.
- Supporting descriptions.

---

## 8.19 Latest Attendance Dataset Visibility

Where useful, AttendSense should make it easy for the student to understand which attendance information is currently being used for calculations.

The interface may display:

- Last attendance update date/time.
- Current Present Slots.
- Current Effective Total Slots.
- Current confirmed attendance percentage.

The application should provide an obvious:

**Update Attendance**

action.

Using a calculator shall not visually imply that the latest confirmed attendance dataset has changed.

---

## 8.20 Loading States

AttendSense shall provide meaningful loading/progress indicators for operations that are not instantaneous.

Examples include:

- Google authentication.
- File upload.
- File reception through a supported share target.
- Attendance extraction.
- Attendance normalization.
- Attendance validation.
- Attendance saving.
- Timetable/calendar processing.
- Schedule generation.
- Attendance calculation.

Controls that could create duplicate requests shall be appropriately disabled or guarded while the operation is in progress.

---

## 8.21 Empty States

AttendSense shall provide informative empty states rather than blank interfaces.

Examples include:

### No Confirmed Attendance

**Upload attendance to start using AttendSense analysis tools.**

### No Applicable Safe Bunk Classes

The interface shall explain that no applicable classes remain in the current week's supported schedule.

### No Future Classes in Selected Simulation Range

The interface shall guide the student to select another valid period.

### Recovery Schedule Cannot Be Fully Determined

The interface shall still show the mathematical recovery requirement where available and explain the schedule limitation.

---

## 8.22 Success States

Successful operations shall provide clear confirmation without unnecessarily interrupting the workflow.

Examples include:

- Signed in successfully.
- Academic setup completed.
- Attendance file received.
- Attendance processed successfully.
- Attendance confirmed and saved.
- Attendance updated successfully.
- Safe Bunk analysis completed.
- Recovery calculation completed.
- Future simulation updated.

Success feedback should be concise and contextual.

---

## 8.23 Error States

Error messages shall:

- Clearly identify the problem.
- Use understandable student-facing language.
- Avoid unnecessary technical implementation details.
- Explain what the student can do next.
- Preserve previously confirmed data where appropriate.

Examples include:

- Unsupported file.
- File too large.
- Corrupted file.
- Attendance could not be extracted reliably.
- Attendance validation failed.
- Missing or incomplete attendance information.
- Attendance could not be saved.
- Missing academic configuration.
- Timetable information unavailable.
- Academic calendar information unavailable.
- Authentication failed.
- Network unavailable.
- Share-target input could not be restored after authentication.
- Calculation could not be completed.

Where recovery is possible, the interface shall provide an obvious retry or corrective action.

---

## 8.24 Navigation

AttendSense navigation shall remain simple and consistent.

The primary navigation structure may include areas such as:

- **Home**
- **Attendance**
- **Analysis**
- **Profile / Settings**

Within Analysis, students shall be able to access:

- Safe Bunk.
- Attendance Recovery.
- Future Simulator.

The exact navigation pattern may vary by screen size.

For example:

- Mobile may use bottom navigation, compact navigation, or another mobile-appropriate pattern.
- Larger screens may use a sidebar or expanded navigation.

The underlying information architecture shall remain consistent.

---

## 8.25 Interaction Design

Interactive controls shall:

- Provide immediate visible feedback.
- Clearly indicate selected states.
- Clearly distinguish enabled and disabled states.
- Have sufficiently large touch targets.
- Use understandable labels.
- Prevent accidental duplicate submissions.
- Minimize unnecessary interaction steps.
- Remain usable on touch and pointer-based devices.

ATTEND/BUNK controls shall be particularly clear because they directly affect projected attendance results.

Animations and transitions may be used to:

- Reinforce state changes.
- Improve orientation.
- Make calculations feel responsive.
- Improve visual polish.

Animations shall not interfere with usability or performance.

---

## 8.26 Accessibility

AttendSense shall follow appropriate web accessibility principles.

The interface shall provide:

- Readable text sizes.
- Adequate contrast.
- Clearly labeled controls.
- Semantic form labels.
- Keyboard-accessible essential functionality where appropriate.
- Visible focus states.
- Alternatives to color-only status communication.
- Understandable error messages.
- Appropriate accessible names for interactive icons.
- Responsive text/layout behavior.

Interactive attendance controls shall remain understandable without relying solely on visual styling.

---

## 8.27 PWA Experience

AttendSense Phase 1 shall be implemented as a Progressive Web Application.

On supported platforms and browsers, the student shall be able to install AttendSense.

When installed, the PWA should provide an app-like experience including:

- Application icon.
- Application name.
- Standalone launch experience.
- Mobile-first responsive interface.
- Appropriate install metadata.
- Supported share-target functionality where technically available.

Installation shall remain optional.

The core AttendSense application shall remain usable through a supported browser without installation.

---

## 8.28 PWA Installation Experience

Where browser/platform support allows, AttendSense may provide a clear but non-intrusive installation option.

The UI shall not block normal browser usage merely because the student has not installed the PWA.

Installation messaging may explain relevant benefits such as:

- App-like launch experience.
- Home-screen/application-list access.
- Supported share-to-AttendSense functionality where available.

The UI shall not guarantee functionality that depends on unsupported platform/browser capabilities.

---

## 8.29 PWA Share-Target Limitation Communication

AttendSense shall not communicate that installing the PWA guarantees appearance in every operating system share sheet.

Share-target availability depends on supported:

- Operating systems.
- Browsers.
- PWA installation behavior.
- Share-target registration.
- File-type handling.

If technical evaluation determines supported configurations, the UI/documentation may provide platform-specific guidance.

---

## 8.30 PWA Authentication Behavior

PWA installation shall not create a separate account.

When a valid authentication session exists:

**Open Installed PWA → Dashboard**

When the session is unavailable:

**Open Installed PWA → Google Authentication → Existing Account Restored**

Reinstalling the PWA shall not itself create a new AttendSense account.

Authentication with the same Google identity shall restore the account's persisted data where available.

---

## 8.31 Online-Only Experience

AttendSense Phase 1 shall require network connectivity for normal operation.

Offline functionality shall not be presented as a Phase 1 capability.

When the required network connection is unavailable, the application shall display a clear connectivity state.

The UI shall avoid presenting calculations or data-processing actions as successfully completed when required backend communication did not occur.

Where possible, the application shall provide an obvious retry action after connectivity is restored.

---

## 8.32 Responsive Schedule Design

Safe Bunk, Recovery, and Future Simulator may involve multiple future classes across multiple dates.

The schedule interface shall remain usable even when many classes are displayed.

The design should support:

- Grouping by date/day.
- Clear lecture/lab identification.
- Scannable class information.
- Easy ATTEND/BUNK interaction where applicable.
- Clear slot contribution.
- Efficient scrolling.
- Persistent or easily accessible calculation summary where useful.

On larger screens, the interface may use additional space to improve schedule visibility while preserving mobile-first interaction principles.

---

## 8.33 Result Presentation Principle

Attendance results shall prioritize the **answer first**, followed by supporting details.

### Safe Bunk

Primary result:

**SAFE / UNSAFE**

Supporting data:

- Projected attendance.
- Selected plan.
- Slot impact.
- Current confirmed attendance.

### Attendance Recovery

Primary result:

**Required Recovery Slots**

Supporting data:

- Projected recovery date.
- Recovery schedule.
- Current attendance.
- Target attendance.

### Future Attendance Simulator

Primary result:

**Predicted Overall Attendance**

Supporting data:

- Current attendance.
- Attended slots.
- Missed slots.
- Change in attendance.
- Position relative to 75%.

Students shall not be required to interpret raw formulas to understand these results.

---

## 8.34 UI Consistency

AttendSense shall maintain a consistent design system across all application areas.

Reusable patterns should be used for:

- Buttons.
- Cards.
- Forms.
- Inputs.
- File selection.
- Dialogs.
- Bottom sheets where applicable.
- Schedule cards.
- ATTEND/BUNK controls.
- Status indicators.
- Progress indicators.
- Notifications.
- Navigation.
- Loading states.
- Error states.
- Result cards.

Typography, spacing, iconography, component behavior, and interaction patterns shall remain consistent throughout the application.

---

## 8.35 User Control and Reversibility

Where appropriate, the student shall be able to safely reverse non-destructive interface actions.

Examples include:

- Remove a selected upload before processing.
- Reject extracted attendance before confirmation.
- Change an ATTEND selection to BUNK.
- Change a BUNK selection back to ATTEND.
- Reset a Future Attendance Simulation.
- Modify a Safe Bunk plan.
- Return from an analysis to the dashboard.

Hypothetical attendance selections shall remain reversible because they do not modify confirmed attendance data.

---

## 8.36 Avoiding Misleading Attendance Information

The interface shall not visually imply that:

- A Safe Bunk projection has updated official attendance.
- A Recovery projection represents attendance already earned.
- A Future Simulation represents official attendance.
- Passage of time automatically updates confirmed attendance.
- Classes marked ATTEND have actually been attended.
- Classes marked BUNK have actually been missed.

Projected results shall use appropriate language such as:

- **Projected**
- **Predicted**
- **Hypothetical**
- **Assuming you attend...**

where necessary.

---

## 8.37 UI/UX Success Principle

A student should be able to understand the primary AttendSense workflow without requiring technical instructions.

The core experience shall be:

**Open AttendSense**  
↓  
**Authenticate if Required**  
↓  
**Complete Academic Setup if Required**  
↓  
**Use Existing Confirmed Attendance or Upload/Update Attendance**  
↓  
**Processing and Validation**  
↓  
**Review and Confirm Attendance**  
↓  
**Select Analysis Feature**  
↓  
**Interact with Feature-Specific Planning Interface**  
↓  
**Receive Clear Result**

The design shall make the distinction between the three analysis questions immediately understandable:

### Safe Bunk

**"Can I safely follow this bunk plan and remain at or above 75%?"**

### Attendance Recovery

**"What do I need to attend to recover to 75%?"**

### Future Attendance Simulator

**"What happens to my attendance if this future scenario occurs?"**

AttendSense shall aim to make these workflows feel like a cohesive, polished student product rather than three unrelated calculators.

# 9. Non-Functional Requirements

This section defines the quality, performance, reliability, data-integrity, usability, compatibility, maintainability, scalability, accessibility, and testability requirements for AttendSense Phase 1.

Non-functional requirements shall apply across the complete AttendSense workflow, including:

**Authentication → Academic Configuration → Attendance Input → Processing → Validation → Confirmation → Persistence → Attendance Analysis**

The system shall prioritize correctness and reliability where these qualities conflict with speed or visual presentation.

---

## 9.1 Performance

### NFR-001 — Application Responsiveness

AttendSense shall provide a responsive user experience during normal application usage.

Routine interactions such as:

- Navigation.
- Opening analysis interfaces.
- Changing ATTEND/BUNK selections.
- Selecting future simulation periods.
- Viewing previously persisted information.
- Opening profile or academic settings.
- Updating calculator selections.

should respond without unnecessary perceptible delay.

Operations that require backend processing shall provide appropriate feedback rather than making the application appear unresponsive.

---

### NFR-002 — Attendance Calculation Performance

Deterministic attendance calculations shall be performed efficiently.

Once all required validated inputs are available, calculations for:

- Confirmed overall attendance determination.
- Safe Bunk analysis.
- Attendance Recovery.
- Future Attendance Simulation.
- 75% threshold evaluation.

should complete without unnecessary processing delay.

Interactive Safe Bunk and Future Attendance Simulator calculations should update promptly after ATTEND/BUNK selections where technically practical.

Calculation speed shall not take priority over calculation correctness.

---

### NFR-003 — Attendance File Processing Feedback

Attendance extraction from PDFs or images may require more time than deterministic attendance calculations.

Whenever processing is not effectively instantaneous, AttendSense shall provide visible progress or processing feedback.

Where appropriate, feedback may communicate stages such as:

- Uploading.
- Reading input.
- Extracting attendance information.
- Normalizing attendance data.
- Validating attendance.
- Preparing student review.

The application shall not appear frozen while attendance processing is occurring.

---

### NFR-004 — Reasonable Processing Performance

Attendance file processing shall be designed to avoid unnecessary processing latency.

Performance shall be evaluated using representative Phase 1:

- PDF attendance files.
- Single-image attendance submissions.
- Multi-image attendance submissions.

No fixed processing-time guarantee shall be defined until the selected PDF/OCR/vision technology has been technically evaluated.

Extraction reliability shall take priority over achieving an artificially low processing time.

---

## 9.2 Reliability

### NFR-005 — Deterministic Calculation Reliability

Identical validated calculation inputs shall produce identical attendance-analysis results.

The calculation engine shall follow the mathematical rules defined in Section 6.

Attendance calculations shall remain deterministic and reproducible.

Generative AI or probabilistic language-model output shall not determine:

- Attendance percentages.
- Safe Bunk safety.
- Recovery requirements.
- Future attendance predictions.
- 75% threshold compliance.

---

### NFR-006 — Attendance Extraction Reliability

Attendance extraction shall be treated as potentially fallible.

Extracted attendance information shall not automatically become trusted calculation data.

All newly submitted attendance information shall remain subject to the required:

**Extraction → Normalization → Automatic Validation → Student Review → Student Confirmation → Successful Save**

workflow.

High extraction accuracy shall not eliminate mandatory student confirmation.

---

### NFR-007 — Safe Failure Behaviour

If AttendSense cannot reliably determine the information required for a new attendance dataset, the system shall fail safely.

It shall not:

- Guess missing attendance values.
- Invent unreadable values.
- Silently resolve material contradictions without a reliable basis.
- Generate attendance-analysis results from uncertain new attendance data.
- Replace a previously confirmed dataset with invalid or incomplete information.

The student shall instead receive an appropriate corrective action.

---

### NFR-008 — Failure Isolation

Failure of one operation should not unnecessarily make the complete application unusable.

For example:

- Attendance extraction failure should allow another upload.
- Authentication failure should allow retry.
- Invalid attendance input should allow correction or re-upload.
- Calculation failure should allow recalculation.
- Share-target failure should not prevent normal in-application upload.
- Failure of a new attendance submission should not invalidate the previous confirmed dataset.

Where practical, the student shall be able to recover without restarting the complete application workflow.

---

## 9.3 Data Integrity

### NFR-009 — Attendance Dataset Integrity

Attendance data shall remain consistent while moving through:

**Extraction → Normalization → Automatic Validation → Student Review → Student Confirmation → Persistence → Calculation**

Raw extracted information shall not be treated as equivalent to confirmed attendance data.

Only successfully confirmed and saved normalized attendance data shall become the latest confirmed attendance dataset.

---

### NFR-010 — Confirmed Dataset Protection

The student's latest confirmed attendance dataset shall remain unchanged until a newer dataset successfully completes all required replacement stages.

A newer submission shall not replace the existing dataset merely because it has been:

- Uploaded.
- Extracted.
- Normalized.
- Automatically validated.
- Displayed for review.

Replacement shall occur only after required student confirmation and successful persistence.

---

### NFR-011 — Failed Update Preservation

If a newer attendance submission:

- Fails upload.
- Fails extraction.
- Fails normalization.
- Fails validation.
- Is rejected by the student.
- Fails persistence.

the previously confirmed attendance dataset shall remain active and unchanged.

---

### NFR-012 — Hypothetical Data Isolation

Safe Bunk, Attendance Recovery, and Future Attendance Simulator outputs shall not modify confirmed attendance data.

The system shall maintain a clear logical separation between:

- Confirmed attendance data.
- Temporary analysis inputs.
- Calculated requirements.
- Projected attendance.
- Hypothetical simulation results.

Passage of time shall not automatically convert a planned future ATTEND/BUNK decision into confirmed attendance.

---

### NFR-013 — Calculation Precision

AttendSense shall maintain sufficient internal numerical precision to ensure that display rounding does not incorrectly affect threshold decisions.

Threshold comparisons shall use the calculation rules defined in Section 6.

Displayed percentages may be rounded for readability, but rounded display values shall not replace the underlying calculation values used for eligibility or safety decisions.

---

### NFR-014 — Timetable and Calendar Integrity

Schedule-aware attendance analysis shall use the timetable and academic calendar associated with the student's current academic configuration.

AttendSense shall not silently substitute unrelated:

- Timetables.
- Academic calendars.
- Class occurrences.
- Academic configurations.

when the required scheduling information is unavailable.

---

### NFR-015 — Attendance Slot Integrity

Attendance-slot weighting shall be applied consistently throughout the application.

Phase 1 shall use:

- **Lecture = 1 attendance slot**
- **Laboratory session = 2 attendance slots**

The same weighting rules shall apply consistently to:

- Safe Bunk.
- Attendance Recovery.
- Future Attendance Simulator.

---

## 9.4 Usability

### NFR-016 — Ease of Use

AttendSense shall be usable by students without requiring technical knowledge or understanding of attendance formulas.

The application shall minimize:

- Manual attendance calculations.
- Unnecessary text entry.
- Unnecessary navigation.
- Repeated data entry.
- Technical terminology.

---

### NFR-017 — Clear Communication

User-facing messages shall use clear and student-understandable language.

Internal implementation details, exceptions, stack traces, or unnecessary system terminology shall not be exposed through normal user-facing interfaces.

Messages shall clearly explain:

1. What happened.
2. What the student needs to know.
3. What action can be taken next where applicable.

---

### NFR-018 — Result Understandability

Attendance-analysis results shall communicate the primary answer before supporting information.

Students shall be able to distinguish among:

- Confirmed overall attendance.
- Safe Bunk SAFE/UNSAFE result.
- Attendance Recovery requirement.
- Projected recovery information.
- Hypothetical Future Attendance Simulation.
- Supporting timetable information.

Projected or hypothetical information shall not appear to be updated official attendance.

---

### NFR-019 — Interaction Feedback

Interactive controls shall provide visible feedback when their state changes.

This is particularly important for:

- ATTEND/BUNK selections.
- File selection.
- Upload actions.
- Authentication actions.
- Simulation period selection.
- Retry actions.
- Confirmation actions.

Students should be able to understand the current application state without guessing whether an interaction was registered.

---

## 9.5 Responsive Design

### NFR-020 — Mobile-First Experience

AttendSense shall use a mobile-first responsive design.

The primary experience shall be optimized for smartphone usage while remaining fully usable on supported:

- Smartphones.
- Tablets.
- Laptops.
- Desktop computers.

---

### NFR-021 — Screen Adaptation

Layouts shall adapt appropriately to available screen dimensions.

Normal mobile usage shall not require unnecessary horizontal scrolling.

Important controls, schedule information, attendance states, and results shall remain readable and usable on smaller supported screens.

---

### NFR-022 — Schedule Responsiveness

Schedule-oriented interfaces used by Safe Bunk, Recovery, and Future Simulator shall remain usable across supported screen sizes.

Schedule information shall remain sufficiently scannable when multiple:

- Dates.
- Lectures.
- Laboratory sessions.
- ATTEND/BUNK controls.

are displayed.

---

## 9.6 PWA Quality Requirements

### NFR-023 — PWA Installability

AttendSense shall satisfy the technical requirements necessary for PWA installation on supported browsers and platforms.

The installed application shall include appropriate PWA identity information such as:

- Application name.
- Application icon.
- Web app manifest information.
- Required installation metadata.

Installation support shall remain dependent on applicable platform/browser capabilities.

---

### NFR-024 — Optional Installation

PWA installation shall not be mandatory for normal Phase 1 usage.

Students shall be able to access the core AttendSense application through a supported browser without installing the PWA.

Functionality explicitly dependent on PWA installation, such as supported share-target integration, may require installation.

---

### NFR-025 — App-Like Installed Experience

When launched as an installed PWA on a supported platform, AttendSense shall provide an appropriate standalone app-like experience.

Installation shall not create:

- A separate AttendSense account.
- Duplicate academic configuration.
- Duplicate confirmed attendance data.

---

### NFR-026 — Share-Target Quality

Where PWA share-target functionality is supported and enabled, file reception shall integrate with the standard attendance-processing workflow.

Share-target functionality shall not bypass:

- Authentication requirements.
- File validation.
- Extraction.
- Normalization.
- Automatic validation.
- Student review.
- Student confirmation.

Failure or lack of support for PWA share-target functionality shall not prevent the standard in-application attendance upload workflow from being used.

---

## 9.7 Compatibility

### NFR-027 — Browser Compatibility

AttendSense shall support current mainstream browsers appropriate to the target student population.

Priority shall be given to reliable operation on modern Chromium-based browsers.

Reasonable compatibility with other modern browsers should be maintained where the required AttendSense functionality is supported.

Browser-specific capabilities shall not be assumed to exist universally.

---

### NFR-028 — PWA Platform Compatibility

PWA capabilities may vary between:

- Browsers.
- Operating systems.
- Installed-PWA environments.
- Device types.

AttendSense shall degrade gracefully when an optional PWA capability is unavailable.

Lack of share-target support, for example, shall not prevent browser-based attendance upload and analysis.

---

### NFR-029 — File Compatibility

Attendance processing shall support the PDF and image formats formally approved for Phase 1.

Unsupported or unreadable formats shall be rejected gracefully with a clear student-facing message.

Exact supported extensions, size limits, and multi-image limits may be finalized during implementation planning and technical testing.

---

## 9.8 Accessibility

### NFR-030 — Web Accessibility

AttendSense shall follow appropriate web accessibility practices.

The application shall provide:

- Readable typography.
- Sufficient visual contrast.
- Clearly labeled controls.
- Meaningful form labels.
- Visible focus states.
- Keyboard-accessible essential functionality where appropriate.
- Adequate touch-target sizes.
- Understandable error feedback.
- Attendance status communication that does not depend exclusively on color.

---

### NFR-031 — Accessible Attendance States

Important attendance states shall be communicated using more than visual color differences.

Examples include:

- SAFE.
- UNSAFE.
- Recovery Required.
- Recovery Not Required.
- Above 75%.
- Below 75%.
- Projected.
- Hypothetical.

Text, icons, labels, or other accessible indicators shall supplement color where appropriate.

---

## 9.9 Availability, Connectivity, and Error Recovery

### NFR-032 — Online-Only Phase 1

AttendSense Phase 1 shall require network connectivity for normal operation.

Full offline functionality shall not be required.

The application shall not imply that an operation has been successfully completed when required backend communication could not occur.

---

### NFR-033 — Connectivity Failure Handling

When network connectivity is unavailable or interrupted, AttendSense shall provide an understandable connectivity state.

Where appropriate, the application shall:

- Preserve safe local interaction state where technically practical.
- Avoid displaying false success.
- Provide a retry action.
- Preserve the previously confirmed server-side attendance dataset.

---

### NFR-034 — Graceful Error Handling

Unexpected application errors shall be handled gracefully where possible.

The application shall avoid:

- Blank screens.
- Permanently loading interfaces.
- Silent failures.
- Misleading success states.

The student shall receive an understandable error state and appropriate recovery action where available.

---

### NFR-035 — Retry Capability

Recoverable operations should support retry without requiring the student to restart the complete application workflow.

Examples include:

- Google authentication.
- Attendance upload.
- Attendance extraction.
- Attendance processing.
- Saving confirmed attendance.
- Schedule loading.
- Attendance recalculation.

Retrying an operation shall not unintentionally duplicate confirmed attendance data.

---

## 9.10 Maintainability

### NFR-036 — Modular Implementation

AttendSense shall maintain clear separation of responsibilities among major application areas including:

- Authentication.
- Academic configuration.
- Attendance input.
- PDF/image extraction.
- Attendance normalization.
- Attendance validation.
- Attendance persistence.
- Attendance calculation engine.
- Timetable/calendar processing.
- PWA functionality.
- User interface.

Changes to one major module should minimize unnecessary impact on unrelated modules.

---

### NFR-037 — Calculation Engine Separation

The deterministic attendance calculation engine shall remain logically separate from:

- Document extraction.
- User-interface components.
- Authentication.
- Database persistence.
- Timetable presentation.

This separation shall allow attendance formulas to be tested and maintained independently.

---

### NFR-038 — Reusable Components

Repeated UI patterns and application logic should use reusable components, utilities, or modules where appropriate.

Examples may include:

- ATTEND/BUNK controls.
- Schedule cards.
- Attendance status indicators.
- Result presentation.
- Loading states.
- Error states.
- Attendance-slot utilities.

This shall reduce duplication and improve consistency.

---

### NFR-039 — Configuration Separation

Academic calendars, timetables, supported academic configurations, and similar periodically maintained information should remain separated from unrelated core calculation logic where practical.

Updating academic scheduling information should not require rewriting attendance formulas.

---

## 9.11 Scalability and Extensibility

### NFR-040 — Extensible Academic Configuration

The application architecture shall avoid unnecessary hard-coding that permanently couples AttendSense to one timetable or academic configuration.

Supported academic configurations, timetable associations, and calendar associations should be maintainable without redesigning the core calculation engine.

---

### NFR-041 — Input-Independent Calculation Engine

The calculation engine shall remain independent of the method used to obtain attendance information.

Whether the source is:

- PDF.
- Single image.
- Multiple images.

the calculation engine shall receive the same approved normalized attendance structure.

---

### NFR-042 — Extraction Technology Replaceability

The architecture should allow the selected PDF/OCR/vision processing technology to be modified or replaced without requiring redesign of the attendance calculation engine.

Document-processing technology shall be responsible for obtaining attendance information.

Deterministic attendance logic shall remain responsible for attendance calculations.

---

### NFR-043 — Future Extension Readiness

Phase 1 implementation should avoid architectural decisions that unnecessarily prevent future extension of:

- Supported academic configurations.
- Attendance input formats.
- Timetables.
- Academic calendars.
- PWA capabilities.
- Attendance-analysis functionality.

This requirement shall not require implementation of those future capabilities during Phase 1.

---

## 9.12 Testability

### NFR-044 — Calculation Testability

Core attendance formulas shall be independently testable without requiring the complete user interface or document-processing workflow.

Tests shall cover important scenarios including:

- Attendance above 75%.
- Attendance exactly at 75%.
- Attendance below 75%.
- Effective Total Slots equal to zero or otherwise invalid.
- Safe Bunk safe boundary.
- Safe Bunk unsafe boundary.
- Lecture ATTEND/BUNK effects.
- Laboratory ATTEND/BUNK effects.
- Recovery-slot boundaries.
- Recovery across multiple weeks.
- Future attendance scenarios.
- Rounding boundaries.
- 75% threshold boundaries.

---

### NFR-045 — Attendance Normalization Testability

Normalization rules shall be independently testable.

Tests shall include scenarios such as:

- Total Slots with No Attendance included.
- Total Slots with No Attendance already excluded.
- No Attendance equal to zero.
- Invalid negative No Attendance values.
- Effective Total Slots calculation.
- Missing required values.
- Contradictory extracted values.

---

### NFR-046 — Attendance Validation Testability

Attendance validation rules shall be testable independently where practical.

Tests shall include:

- Valid overall attendance data.
- Present Slots greater than Effective Total Slots.
- Negative Present Slots.
- Invalid Effective Total Slots.
- Attendance percentage outside the valid range.
- Extracted percentage mismatch.
- Duplicate/overlapping multi-image information.
- Missing required attendance values.
- Unresolved conflicting attendance information.

---

### NFR-047 — Schedule Processing Testability

Timetable and academic-calendar processing shall be testable independently from the UI.

Tests should cover:

- Normal academic working days.
- Holidays.
- Other non-working days.
- Lecture occurrences.
- Laboratory occurrences.
- End-of-current-week Safe Bunk boundaries.
- Multi-week Recovery scheduling.
- Future Simulator date/range boundaries.
- Missing timetable/calendar information.

---

### NFR-048 — Dataset Replacement Testability

Tests shall verify that the previous confirmed attendance dataset remains unchanged when a newer attendance submission:

- Fails extraction.
- Fails normalization.
- Fails validation.
- Is rejected during student review.
- Fails persistence.

Tests shall also verify that successful replacement occurs only after the newer dataset has completed all required confirmation and persistence stages.

---

### NFR-049 — Hypothetical State Isolation Testability

Tests shall verify that:

- Safe Bunk selections do not modify confirmed attendance.
- Recovery projections do not modify confirmed attendance.
- Future Simulator selections do not modify confirmed attendance.
- Passage of a simulated future date does not modify confirmed attendance.
- Reopening an analysis begins from the applicable latest confirmed attendance dataset unless intentionally restoring temporary UI state.

---

## 9.13 Observability and Operational Quality

### NFR-050 — Operational Error Visibility

The implementation should provide sufficient technical visibility for developers to diagnose application failures without exposing sensitive technical details to students.

Operational diagnostics may include appropriate logging of:

- Processing failures.
- Validation failures.
- Server errors.
- External service failures.
- Unexpected calculation failures.

Sensitive authentication or attendance information shall not be unnecessarily included in diagnostic logs.

Detailed security and logging requirements shall remain governed by Section 10.

---

### NFR-051 — External Dependency Failure

Failure of an external dependency shall not result in fabricated or unverified attendance results.

Where an external service required for attendance extraction becomes unavailable:

- The processing operation shall fail safely.
- The student shall receive an appropriate error.
- The previous confirmed attendance dataset shall remain unchanged.
- The student may retry when the required service becomes available.

---

## 9.14 Non-Functional Quality Principle

AttendSense shall prioritize:

**Accuracy → Reliability → Data Integrity → Usability → Performance → Visual Polish**

This priority does not mean that performance or visual quality are unimportant.

It means that AttendSense shall never intentionally sacrifice attendance correctness or confirmed-data integrity merely to:

- Produce a faster result.
- Avoid displaying an error.
- Create a smoother-looking interaction.
- Produce a result when required information is uncertain.

When AttendSense cannot reliably determine the information required for an attendance calculation, it shall communicate the limitation rather than produce a potentially misleading result.

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
