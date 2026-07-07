# AttendSense Product Requirements Document

## 1. Product Overview

Product Name: AttendSense

AttendSense is an AI-powered attendance risk analysis and survival planning web application for college and university students.

The application helps students understand their subject-wise attendance risk and make better decisions about attending or missing future lectures.

Instead of only displaying attendance percentages, AttendSense calculates attendance risk, predicts future attendance scenarios, and provides personalised attendance recommendations.

---

## 2. Problem Statement

College students often know their current attendance percentage but do not clearly understand:

- How many lectures they must attend to reach the required attendance percentage.
- How many lectures they can safely miss.
- What will happen if they skip upcoming lectures.
- Which subjects currently have the highest attendance risk.
- Which subjects they should prioritise.

Traditional attendance trackers only display percentages.

AttendSense converts attendance data into actionable recommendations.

---

## 3. Target Users

Primary users:

- College students
- University students
- Engineering students
- Students studying under minimum attendance requirements

Initial target:

Indian college and university students.

---

## 4. Core Product Goal

The main goal of AttendSense is to answer:

"What should I do next to keep my attendance safe?"

The application should not behave only as an attendance calculator.

It should behave as an attendance decision-support system.

---

## 5. MVP Features

### 5.1 User Authentication

Users should be able to:

- Sign up
- Log in
- Log out

Each user should only access their own attendance data.

---

### 5.2 Semester Management

Users should be able to:

- Create a semester
- Enter semester name
- Set minimum required attendance percentage

Example:

Semester: Semester 4
Minimum Attendance: 75%

---

### 5.3 Subject Management

Users should be able to:

- Add subjects
- Edit subjects
- Delete subjects

Each subject should contain:

- Subject name
- Subject code (optional)
- Total lectures
- Attended lectures

Example:

Subject Name: Database Management Systems
Subject Code: DBMS
Total Lectures: 50
Attended Lectures: 36

---

### 5.4 Attendance Dashboard

The dashboard should display:

- Overall attendance overview
- Total subjects
- Safe subjects
- At-risk subjects
- Critical subjects

Each subject should display:

- Subject name
- Current attendance percentage
- Risk status
- Total lectures
- Attended lectures
- Attendance recommendation

---

### 5.5 Attendance Risk Classification

Subjects should be classified into three categories.

SAFE:
Attendance is 80% or higher.

CAUTION:
Attendance is between minimum required attendance and 79.99%.

CRITICAL:
Attendance is below the minimum required attendance.

The minimum attendance requirement should be configurable by the user.

---

### 5.6 Attendance Calculation Engine

The application must calculate:

- Current attendance percentage
- Lectures required to reach minimum attendance
- Lectures that can safely be missed
- Attendance after missing future lectures
- Attendance after attending future lectures

All attendance mathematics must be handled using deterministic calculations.

AI must NOT calculate attendance mathematics.

---

### 5.7 Attendance Scenario Simulator

Users should be able to simulate scenarios.

Examples:

"What happens if I miss the next 2 lectures?"

"What happens if I attend the next 5 lectures?"

The system should calculate and display the predicted attendance percentage.

---

### 5.8 AI Attendance Advisor

The application should include an AI Attendance Advisor.

The AI should receive calculated attendance data.

The AI should NOT perform attendance calculations.

The AI should explain the calculated data and provide recommendations.

Example AI response:

"DBMS is currently your highest-risk subject at 72%. Based on the attendance calculation, you need to attend the next 6 lectures to reach 75%. Prioritise DBMS and avoid missing upcoming lectures."

The AI should provide:

- Risk explanation
- Subject prioritisation
- Attendance recommendations
- Simple weekly attendance strategy

---

### 5.9 Attendance Survival Plan

The application should generate a prioritised attendance plan.

Example:

Priority 1: DBMS
Attend next 6 lectures.

Priority 2: DAA
Avoid missing more than 2 lectures.

Priority 3: Mathematics
Attendance is currently safe.

The plan should use deterministic attendance calculations and AI-generated explanations.

---

## 6. User Flow

1. User opens AttendSense.
2. User creates an account or logs in.
3. User creates a semester.
4. User sets the minimum attendance requirement.
5. User adds subjects.
6. User enters total and attended lectures.
7. AttendSense calculates attendance data.
8. Dashboard displays attendance risk.
9. User opens a subject.
10. User runs attendance scenarios.
11. User asks the AI Attendance Advisor for recommendations.
12. AttendSense generates an Attendance Survival Plan.

---

## 7. Technical Requirements

Frontend:
- Next.js
- TypeScript
- Tailwind CSS

Backend:
- Next.js server-side functionality and API routes

Database:
- Supabase PostgreSQL

Authentication:
- Supabase Authentication

AI:
- Gemini API or another suitable LLM API

Deployment:
- Vercel

Version Control:
- Git
- GitHub

---

## 8. Proposed Data Model

User

- id
- email
- created_at

Semester

- id
- user_id
- name
- minimum_attendance
- created_at

Subject

- id
- semester_id
- name
- code
- total_lectures
- attended_lectures
- created_at
- updated_at

---

## 9. Core Attendance Rules

Current attendance:

attended lectures / total lectures * 100

The application must prevent:

- Attended lectures greater than total lectures
- Negative lecture values
- Invalid attendance percentages

Attendance calculations must be implemented as reusable utility functions.

The calculation logic should be independently testable.

---

## 10. AI Safety and Reliability Rules

AI must not calculate attendance percentages.

AI must receive pre-calculated structured attendance data.

AI should only:

- Explain attendance risk
- Prioritise subjects
- Generate recommendations
- Create simple attendance strategies

The application should work even if the AI API is unavailable.

Core attendance calculations must not depend on AI.

---

## 11. UI Requirements

The UI should be:

- Modern
- Minimal
- Student friendly
- Responsive
- Easy to understand

Dashboard cards should clearly show:

SAFE
CAUTION
CRITICAL

Avoid unnecessary animations.

Prioritise usability over visual complexity.

---

## 12. MVP Success Criteria

The MVP is successful when:

- A user can create an account.
- A user can create a semester.
- A user can add subjects.
- Attendance percentages are correctly calculated.
- Subjects are correctly classified by risk.
- Users can simulate future attendance scenarios.
- AI can explain attendance risk.
- A survival plan can be generated.
- The application is deployed.
- The source code is available on GitHub.

---

## 13. Out of Scope for Version 1

Do NOT build:

- College ERP integration
- Automatic biometric attendance syncing
- Facial recognition
- Mobile application
- Parent dashboard
- Faculty dashboard
- Push notifications
- Complex machine learning models
- Timetable integration

These features may be considered in future versions.

---

## 14. Product Philosophy

AttendSense should answer:

"What should I do next?"

Every feature should help students make better attendance decisions.

Avoid adding features that do not directly support this goal.