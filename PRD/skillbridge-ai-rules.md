# SkillBridge AI Project Rules for Cursor AI (Monorepo Workspace)

This document provides the **master context** for the SkillBridge AI monorepo. Please adhere to these guidelines for all code generation, refactoring, and analysis.

### 1. Core Development Workflow: Test-Driven Development (TDD)

**This is the most important rule.** We will implement the project one user story at a time, following a strict TDD cycle. The user stories are defined in `@/PRD/userStory.md`.

For any given feature or user story, the workflow MUST be as follows:

1.  **Clarify the Goal:** Identify the specific user story we are working on.
2.  **Write the Test First:** Before writing any implementation code, create a new test file (e.g., `*.test.tsx` or `*.spec.ts`). Write a comprehensive, failing test that describes the desired functionality. For frontend components, this includes testing for rendering, props, and user interactions.
3.  **Run the Test:** Confirm that the new test fails as expected.
4.  **Write the Implementation:** Write the minimum amount of code required to make the test pass.
5.  **Run All Tests:** Run the full test suite (`npm run test`) to ensure the new code passes and has not broken any existing functionality.
6.  **Refactor (If Necessary):** Clean up the code, improve its structure, and ensure it adheres to our conventions, all while keeping the tests passing.
7.  **Verify and Commit:** Once the story is implemented and all checks pass (`npm run lint`, `npm run test`, `npm run build`), we will consider the story complete and move to the next.

### 2. Overarching Project Structure

This is a monorepo containing two primary workspaces:
-   `./frontend`: A React/TypeScript application for the user interface.
-   `./backend`: A Node.js/Express application for the API and business logic.

**CRITICAL RULE:** When I ask for a change, first determine if it applies to the `frontend` or `backend`. If the request is ambiguous (e.g., "add user profile logic"), **ask for clarification** before proceeding. For example, ask: "Should I implement that on the frontend, backend, or both?"

### 3. Global Information

-   **Product Vision:** To create an AI-powered internal mentorship and upskilling platform.
-   **AI Integration:** The core AI logic, especially calls to the Gemini API, resides exclusively in the `backend` service. The `frontend` consumes the results via API endpoints.
-   **PRD Reference:** The full Product Requirements Document is at `@/PRD/skillbridgeAi.md`. Refer to it for deep context on user stories and features.

---

### 4. Workspace-Specific Rules: `frontend`

**If the request is about UI, components, styling, or client-side interactions, these rules apply.**

-   **Tech Stack:**
    -   **Framework:** React
    -   **Language:** TypeScript
    -   **Styling:** Tailwind CSS. **All styling MUST be done with Tailwind utility classes.** Do not write custom CSS unless it is for base-level theme definitions in `@/frontend/src/index.css`.
-   **File Structure & Architecture:**
    -   **Component-Based:** Build the UI from reusable, self-contained components.
    -   **Feature Slicing:** Organize the codebase by feature domains.
        -   `./frontend/src/features/UserProfile/`: Components, hooks, and logic for user profiles.
        -   `./frontend/src/features/MentorSearch/`: Components and logic for mentor searching.
        -   `./frontend/src/components/common/`: Shared, generic components (e.g., `Button.tsx`, `Card.tsx`).
-   **Color Palette (from Tailwind Theme):**
    -   **Primary Accent:** `indigo-600` (#4F46E5) - For primary buttons, links, and key highlights.
    -   **Secondary Accent:** `teal-500` (#14B8A6) - For secondary actions and visual flair.
    -   **Background:** `gray-50` or `gray-100`.
    -   **Text:** `gray-900` (primary), `gray-600` (secondary).
-   **State Management:** For now, use React's built-in hooks (`useState`, `useContext`). If a more robust solution is needed, ask before implementing.
-   **API Interaction:** All communication with the backend MUST go through a dedicated API client (e.g., using `axios` or `fetch` in a service layer at `./frontend/src/services/api.ts`). Do not embed `fetch` calls directly in components.

---

### 5. Workspace-Specific Rules: `backend`

**If the request is about data, business logic, databases, or external APIs, these rules apply.**

-   **Tech Stack:**
    -   **Framework:** Node.js with Express
    -   **Language:** TypeScript
    -   **ORM:** Prisma
    -   **Database:** PostgreSQL
-   **File Structure & Architecture:**
    -   **Service-Oriented:** Logic is organized into services.
        -   `./backend/src/services/userService.ts`
        -   `./backend/src/services/mentorService.ts`
    -   **Factory Functions:** Use factory functions to create service instances. This promotes modularity and testability.
    -   **Routes:** API endpoints are defined in `./backend/src/routes/`.
    -   **Controllers:** Controllers in `./backend/src/controllers/` handle incoming HTTP requests and call the appropriate services.
-   **API Design:**
    -   Follow RESTful principles for API endpoints.
    -   Use clear and consistent naming conventions (e.g., `GET /api/users`, `POST /api/users`).
    -   All Gemini API calls and RAG (Retrieval-Augmented Generation) logic MUST be handled exclusively within the backend. **Never expose API keys to the frontend.**
-   **Database:**
    -   The Prisma schema is the single source of truth for the database structure. It is located at `./backend/prisma/schema.prisma`.
    -   When asked to add a feature that requires data persistence, the first step is almost always to update the Prisma schema.

### 6. Example Prompts & AI Interaction

> **Good Prompt (Clear Context):**
> "Let's start on User Story 1: Find a Mentor. First, create a failing test for a new component in the `frontend` workspace at `src/features/MentorSearch/components/SearchForm.test.tsx`. The test should check if the form renders an input field and a button."

> **How to Handle Ambiguity:**
> If I say, "Implement the user profile page," you should respond:
> "To implement the user profile page, I will need to make changes to both the frontend and backend.
>
> 1.  **Backend:** Create a new API endpoint (e.g., `/api/users/:id`) to fetch user data.
> 2.  **Frontend:** Create a new component to display the user data fetched from that endpoint.
>
> Does this plan sound correct?"
