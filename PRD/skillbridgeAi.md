**Product Requirements Document (PRD) - SkillBridge AI**

**Product Name:** SkillBridge AI: Dynamic Internal Mentorship & Upskilling Platform

**Version:** 1.0 (Hackathon Prototype) **Date:** July 14, 2025 **Prepared By:** John, Product Manager

### **1\. Product Vision & Goals**

#### **1.1 Product Vision**

To cultivate a vibrant, self-learning ecosystem within Cognizant by seamlessly connecting employees with internal expertise, mentorship opportunities, and targeted micro-learning resources, thereby accelerating individual growth, fostering cross-functional collaboration, and proactively addressing evolving skill gaps across the organization. SkillBridge AI aims to transform passive knowledge into actionable intelligence and human connections, embodying a culture of continuous development and shared success.

#### **1.2 Goals & Objectives**

The primary goals of SkillBridge AI for the Hackathon prototype are to:

1.  **Enhance Knowledge Transfer Efficiency:** Significantly reduce the time employees spend searching for internal expertise or specific technical answers, leveraging AI-driven matching and natural language Q&A.
    
2.  **Boost Employee Engagement & Retention:** Provide a personalized platform for career development and connection, fostering a sense of community and investment in individual growth within Cognizant.
    
3.  **Demonstrate Strategic AI Application:** Showcase the effective and ethical application of Large Language Models (LLMs) (Gemini API) to solve a critical organizational challenge without requiring complex fine-tuning.
    
4.  **Validate Integration Potential:** Build a modular prototype using modern tech stack (React, TypeScript, Tailwind, Prisma, PostgreSQL, Kubernetes) that demonstrates clear potential for seamless integration into existing Cognizant internal portals or platforms.
    
5.  **Cultivate a Learning Culture:** Inspire a proactive approach to upskilling and mentorship by making it intuitive, accessible, and rewarding for all employees.
    

### **2\. Target Audience & User Stories**

#### **2.1 Target Audience**

SkillBridge AI is designed for all Cognizant employees across various roles, experience levels, and departments who are:

*   **Seeking Knowledge:** Looking for quick answers to specific technical or procedural questions.
    
*   **Aspiring to Grow:** Interested in learning new skills, understanding emerging technologies, or advancing their careers.
    
*   **Seeking Mentorship:** Looking for experienced colleagues to guide their professional development.
    
*   **Willing to Share:** Experienced employees keen on contributing their expertise, mentoring others, or answering questions.
    
*   **Team Leads/Managers:** Interested in fostering skill development within their teams and identifying internal expertise.
    

#### **2.2 Key User Stories (High-Level)**

These user stories represent the core functionalities SkillBridge AI will provide.

**As an Employee (Mentee/Learner):**

*   **Story 2.2.1: Find a Mentor based on Skill/Topic**
    
    *   As an employee, I want to search for mentors based on specific skills (e.g., "AI Ethics," "Cloud Security," "React Development") or general topics, so that I can connect with someone who can guide my learning or career.
        
*   **Story 2.2.2: Ask a Quick Knowledge Question**
    
    *   As an employee, I want to ask natural language questions about internal processes, technical concepts, or best practices (e.g., "What is the policy for WFH?", "Explain microservices architecture"), so that I can get immediate, relevant answers without extensive searching.
        
*   **Story 2.2.3: Discover Learning Resources**
    
    *   As an employee, I want the system to suggest relevant internal learning materials or external resources based on my expressed learning interests, so that I can easily find pathways to acquire new skills.
        
*   **Story 2.2.4: Express Learning Interests**
    
    *   As an employee, I want to easily update my profile with skills I want to learn or areas I need guidance in, so that the system can better match me with mentors and resources.
        

**As an Employee (Mentor/Expert):**

*   **Story 2.2.5: Offer Mentorship & Expertise**
    
    *   As an employee, I want to update my profile to indicate my areas of expertise and willingness to mentor or answer questions, so that I can contribute to the growth of others and be easily found by those seeking help.
        
*   **Story 2.2.6: Review Mentorship Requests**
    
    *   As a potential mentor, I want to receive and review requests for mentorship or specific questions, so that I can decide if I have the capacity and relevant expertise to assist.
        

**As an Administrator (Conceptual for Hackathon, could be simplified):**

*   **Story 2.2.7: Manage Mock Employee Profiles (Hackathon Sim):**
    
    *   As an administrator (or as part of the hackathon setup), I want to be able to input and manage mock employee profiles with dummy skills and availability, so that the AI matching functions have data to work with.
        

### **3\. Features & Functionality**

#### **3.1 High-Level Feature Overview**

SkillBridge AI will provide an intuitive, AI-powered platform for Cognizant employees to:

1.  **Discover and Connect with Internal Expertise:** Facilitate mentorship and direct knowledge sharing.
    
2.  **Access Instant Knowledge & Micro-Learning:** Provide immediate, context-aware answers to internal questions and explain complex concepts.
    
3.  **Manage Profiles & Availability:** Allow users to define their skills, learning interests, and willingness to contribute.
    

#### **3.2 Detailed Feature Breakdown**

This section maps directly to our user stories, detailing the functionality.

##### **3.2.1 Core AI-Powered Matching & Q&A Engine**

*   **Description:** The intelligent core that powers mentor matching and knowledge retrieval.
    
*   **Functionality:**
    
    *   **Semantic Matching:** When a user expresses a learning goal or searches for an expert, the system will use the Gemini API to understand the semantic meaning of the query and match it against the skills/expertise in the mock employee directory.
        
    *   **Natural Language Understanding (NLU):** Process user questions (e.g., "What's the policy on X?", "Explain Y concept") to identify intent and key entities.
        
    *   **Retrieval Augmented Generation (RAG):** For internal Q&A, the system will first retrieve relevant snippets from the mock internal knowledge base. These snippets, along with the user's original question, will be sent to the Gemini API for contextual answer generation. For general knowledge questions (e.g., "Explain microservices"), the Gemini API will generate answers directly.
        
    *   **Fallback Mechanism:** If the AI cannot find a confident answer within the internal knowledge base or identify a suitable expert, it will clearly state this and suggest alternative actions (e.g., "Please rephrase your question" or "Consider reaching out to your team lead").
        
*   **Technical Considerations:**
    
    *   **Backend Responsibility:** All LLM API calls and RAG processing will occur on the backend.
        
    *   **Data Source:** Mock employee\_profiles.json (or similar for mock skills/expertise) and mock knowledge\_base.md/.txt files.
        

##### **3.2.2 User Profile Management (User Story 2.2.4 & 2.2.5)**

*   **Description:** Allows employees to create and manage their profile, showcasing their skills, expertise, and learning interests, as well as their willingness to mentor.
    
*   **Functionality:**
    
    *   **Skill Tags:** Users can add pre-defined (mock list for hackathon) and custom skill tags to their profile.
        
    *   **Expertise Level:** Indicate proficiency (e.g., Beginner, Intermediate, Expert) for each skill.
        
    *   **Learning Interests:** Define skills or topics they wish to learn.
        
    *   **Mentorship Availability:** Toggle their availability for mentorship and define preferred mentorship areas/topics.
        
    *   **Contact Information:** Display simulated internal contact details (e.g., mock email, mock Teams/Slack handle).
        
*   **Technical Considerations:**
    
    *   **Frontend (React/TypeScript/Tailwind):** Dedicated profile page with forms for input.
        
    *   **Backend (Prisma/PostgreSQL):** CRUD operations for user profiles. Prisma schema will define User and Skill models.
        
    *   **User Authentication:** For the hackathon, a simplified mock authentication (e.g., user selects their name from a dropdown) or a single dummy user is sufficient. No real authentication system is expected.
        

##### **3.2.3 Mentor/Expert Search & Connection (User Story 2.2.1)**

*   **Description:** Enables employees to find and initiate contact with relevant internal experts or mentors.
    
*   **Functionality:**
    
    *   **Search Interface:** A prominent search bar where users can type in skills, topics, or specific questions (e.g., "Find an architect with Kubernetes experience," "Who knows about GenAI best practices?").
        
    *   **Search Results:** Display a list of matched "experts" (from mock data) with their relevant skills, expertise level, and simulated contact information.
        
    *   **"Request Mentorship" / "Ask a Question" Button:** Simulated action that, for the hackathon, might simply open an email client with a pre-filled subject or show a "connection initiated" message.
        
*   **Technical Considerations:**
    
    *   **Frontend (React/TypeScript/Tailwind):** Search component, results display, and "connect" buttons.
        
    *   **Backend (Prisma/PostgreSQL + Gemini API):** Queries the database for mock profiles, uses Gemini API for semantic matching, and returns structured results to the frontend.
        

##### **3.2.4 Internal Knowledge Q&A Interface (User Story 2.2.2 & 2.2.3)**

*   **Description:** A chat-like interface for employees to ask questions and receive instant, AI-generated answers based on internal mock knowledge or general LLM knowledge.
    
*   **Functionality:**
    
    *   **Chat Input:** Text area for users to type their questions.
        
    *   **AI Responses:** Display AI-generated answers. For RAG-driven answers, cite the source from the mock knowledge base if possible (e.g., "Source: Mock Travel Policy V2.0").
        
    *   **Follow-up Questions:** Support for conversational flow where the user can ask clarifying questions.
        
    *   **Resource Suggestions:** If the answer is complex or requires further reading, the AI can suggest related internal mock documents or conceptual learning resources (pre-defined for hackathon).
        
*   **Technical Considerations:**
    
    *   **Frontend (React/TypeScript/Tailwind):** Responsive chat UI, potentially with markdown rendering for AI responses.
        
    *   **Backend (Gemini API):** Handles prompt construction, API calls to Gemini, and parsing of responses. Manages the RAG process.
        
    *   **Session Management:** Simple session tracking (e.g., in-memory for hackathon) to maintain conversation context.
        

#### **3.3 Non-Functional Requirements**

*   **Performance:**
    
    *   AI response times should be under 5 seconds for most queries.
        
    *   UI responsiveness should be fluid.
        
*   **Scalability (Future State Focus):**
    
    *   The architecture (Kubernetes, microservices approach with separate FE/BE) is chosen to support future scalability under high user load and expanded data.
        
    *   LLM API usage scales with demand (handled by Gemini API).
        
*   **Security (Hackathon Scope):**
    
    *   Focus on basic security practices (e.g., input sanitization).
        
    *   **Crucially, no real sensitive data will be used.** Mock data only.
        
    *   API keys must be secured (e.g., environment variables, not hardcoded).
        
*   **Usability & User Experience:**
    
    *   Intuitive, clean, and consistent UI/UX.
        
    *   Minimal cognitive load for users.
        
    *   Clear feedback on system actions (e.g., "Thinking...", "Searching...").
        
*   **Reliability:**
    
    *   Graceful handling of LLM API errors or network issues.
        

### **4\. Technical Architecture Overview (Updated with Architectural Patterns)**

This section outlines the high-level architecture based on your chosen stack and preferred architectural patterns. We'll detail this further in a separate Architecture Document, but here's the overview for the PRD.

#### **4.1 Overall Architecture**

SkillBridge AI will follow a **Client-Server (Service-Oriented)** architecture, with a distinct separation between the frontend user interface and a robust backend service. Both components will be containerized using Docker and designed for orchestrated deployment on a Kubernetes cluster.

*   **Frontend Workspace:** Dedicated repository for the React/TypeScript/Tailwind application.
    
*   **Backend Workspace:** Dedicated repository for the Node.js/Express application using Prisma and PostgreSQL.
    

Code snippet

graph TD

    A\[Employee Browser\] -->|HTTP/S| B(Frontend Service - React/TS/Tailwind)

    B -->|HTTP/S API Calls| C(Backend Service - Node.js/Express/Prisma)

    C -->|Database Calls| D(PostgreSQL Database)

    C -->|API Calls| E(Gemini LLM API)

    subgraph Kubernetes Cluster

        B

        C

        D

    end

    E -- External API --> F\[Google Gemini Platform\]

#### **4.2 Definitive Tech Stack Selections & Architectural Patterns**

*   **Frontend:**
    
    *   **Framework:** React
        
    *   **Language:** TypeScript
        
    *   **Styling:** Tailwind CSS
        
    *   **Package Manager:** npm/yarn
        
    *   **Architectural Patterns:**
        
        *   **Component Architecture:** The UI will be built as a tree of reusable, self-contained components (e.g., atomic design principles). This promotes reusability, maintainability, and scalability.
            
        *   **Feature Architecture (Domain/Feature Slicing):** The codebase will be organized by feature domains (e.g., features/UserProfile, features/MentorSearch, features/KnowledgeQnA). Each feature will encapsulate its own components, hooks, and related logic, minimizing dependencies between features and simplifying development.
            
*   **Backend:**
    
    *   **Language/Framework:** Node.js with Express
        
    *   **ORM:** Prisma
        
    *   **Database:** PostgreSQL
        
    *   **Containerization:** Docker
        
    *   **Orchestration:** Kubernetes (for deployment environment)
        
    *   **Architectural Pattern:**
        
        *   **Factory Function Architecture (for Services/Modules):** Backend services and modules (e.g., userService, mentorService, knowledgeService) will be implemented using factory functions. This approach promotes modularity, testability, dependency injection, and easier mocking, leading to a more robust and maintainable codebase. It emphasizes creating instances of service objects rather than tightly coupled classes or singletons.
            
*   **AI Integration:**
    
    *   **LLM Provider:** Google Gemini API
        
*   **Database Host:** PostgreSQL instance (can be local or cloud-hosted for hackathon)
    

#### **4.3 Color Theme & UI/UX Principles**

To embody the "Vibe Coding" aspect and create a pleasant, empowering user experience, SkillBridge AI will adhere to the following design principles and color palette:

*   **UI/UX Principles:**
    
    *   **Clarity & Simplicity:** Clean layouts, intuitive navigation, and minimal clutter.
        
    *   **Accessibility:** Adherence to WCAG guidelines (where feasible for hackathon scope) to ensure usability for all.
        
    *   **Responsiveness:** Optimized for various screen sizes (desktop focus for hackathon).
        
    *   **Guidance & Feedback:** Clear prompts, loading indicators, and informative error messages.
        
    *   **Modern & Approachable:** A sleek, professional, yet friendly aesthetic.
        
*   **Color Theme (Tailwind CSS Palette Examples):**
    
    *   **Primary Accent:** indigo-600 (A deep, professional indigo for key actions, buttons, and highlights - #4F46E5)
        
    *   **Secondary Accent:** teal-500 (A fresh, inviting teal for interactive elements, highlights, and growth-related visuals - #14B8A6)
        
    *   **Background (Light):** gray-50 or gray-100 (Soft, clean background for main content areas - #F9FAFB or #F3F4F6)
        
    *   **Text (Primary):** gray-900 (Dark, readable text for headings and main content - #111827)
        
    *   **Text (Secondary/Muted):** gray-500 or gray-600 (Lighter text for descriptions, subheadings, and less prominent information - #6B7280 or #4B5563)
        
    *   **Success/Affirmation:** green-500 (For positive feedback, e.g., "mentor found" - #22C55E)
        
    *   **Warning/Error:** red-500 (For alerts or errors - #EF4444)
        
*   _Rationale:_ This palette combines professional trustworthiness (indigo, grays) with a sense of innovation and support (teal), creating a balanced and inviting "vibe." Tailwind CSS makes implementing these exact shades straightforward.
    

### **5\. Scope & Deliverables (Hackathon Focus)**

#### **5.1 In-Scope for Hackathon Prototype**

The hackathon prototype will focus on demonstrating the core value proposition of SkillBridge AI. The following functionalities are **expected deliverables**:

*   **User Profile (Simplified):**
    
    *   Ability for a _single dummy user_ (or selecting from a small predefined list of mock users for demo purposes) to "log in" and view/edit their _mock_ profile (skills, learning interests, mentorship availability).
        
    *   **No actual user registration/login system will be built.**
        
*   **AI-Powered Mentor/Expert Search:**
    
    *   A functional search interface where users can input queries for skills or expertise.
        
    *   Display of matched _mock_ experts (from a static JSON/CSV file of dummy employee profiles), including their simulated contact info and relevant skills.
        
    *   The backend will correctly use the Gemini API to semantically match queries to mock profiles.
        
*   **AI-Powered Internal Knowledge Q&A:**
    
    *   A basic chat interface allowing users to ask questions.
        
    *   The backend will correctly implement the RAG pattern:
        
        *   Searching a _small, static mock internal knowledge base_ (e.g., 2-3 Markdown files with dummy policies/concepts).
            
        *   Sending relevant context along with the user's question to the Gemini API.
            
        *   Displaying the AI's generated answer, with a simple indication of source if applicable (e.g., "Source: Mock Policy A").
            
*   **Basic UI/UX:**
    
    *   Clean and intuitive interface built with React, TypeScript, and Tailwind CSS, adhering to the defined color theme.
        
    *   Responsive design primarily for desktop browsers.
        
*   **Containerized Frontend & Backend:**
    
    *   Separate Dockerfiles for both frontend and backend.
        
    *   Demonstration of local Docker Compose setup (or similar, if Kubernetes cluster not available during demo) showing the two services communicating.
        
    *   _If time permits/environment allows:_ Basic Kubernetes deployment YAMLs for the two services.
        

#### **5.2 Out-of-Scope for Hackathon Prototype**

To ensure feasibility within the hackathon timeframe, the following are **explicitly out of scope**:

*   **Full-Fledged User Management:** No real user registration, authentication (except mock login for demo), or password management.
    
*   **Complex Database Relationships:** Simple data models for users and skills.
    
*   **Real-time Chat:** Messaging directly within the app (simulated "contact" actions only).
    
*   **Comprehensive Internal Knowledge Base Integration:** No live integration with actual company intranets, SharePoint, or other live document repositories. All knowledge data will be mock/static.
    
*   **Advanced AI Features:** No fine-tuning of LLMs, no complex prompt engineering beyond the core RAG pattern, no deep learning model training.
    
*   **Robust Error Handling/Logging:** Basic error handling for demo purposes only.
    
*   **Internationalization (i18n) / Localization (l10n).**
    
*   **Extensive Unit/Integration Testing.**
    
*   **Production-Ready Deployment Automation:** Kubernetes setup will be basic for demonstration.
    

### **6\. Future Considerations**

This section outlines potential enhancements and long-term vision for SkillBridge AI beyond the hackathon prototype. These features are out of scope for the current hackathon but represent strategic growth opportunities.

#### **6.1 Short-Term Enhancements (Post-Hackathon)**

1.  **Expanded Mock Data Integration:** Integrate with more diverse mock internal documents (e.g., specific project reports, code documentation snippets, internal training modules) to enrich the RAG knowledge base.
    
2.  **Basic Analytics & Reporting:**
    
    *   Track popular search queries and answered questions to identify knowledge gaps.
        
    *   Monitor mentorship connection rates and feedback (simulated).
        
    *   Identify trending skills being sought or offered.
        
3.  **User Feedback Mechanism:** Allow users to rate the quality of AI answers or mentor suggestions to continuously improve the system.
    
4.  **Improved Contact Flows:** Integrate more robustly with internal communication tools (e.g., Microsoft Teams/Slack APIs for direct messaging, calendar integration for scheduling).
    

#### **6.2 Long-Term Strategic Vision**

1.  **Integration with HR/L&D Systems:**
    
    *   Seamless integration with actual Cognizant HR systems for real employee profiles, skills data, and organizational hierarchies (with strict privacy and consent controls).
        
    *   Connect with Learning & Development (L&D) platforms to suggest formal courses or training based on identified skill gaps or user interests.
        
2.  **Proactive Skill Gap Identification:**
    
    *   Leverage AI to analyze project requirements, industry trends, and employee development plans to proactively identify emerging skill gaps within departments or the entire organization.
        
    *   Recommend targeted upskilling initiatives or internal mobility opportunities.
        
3.  **Personalized Learning Paths:**
    
    *   Generate dynamic, AI-curated learning paths tailored to an individual's role, career aspirations, and current skill set, integrating internal and external resources.
        
4.  **Community-Driven Content Creation:**
    
    *   Allow verified experts to contribute directly to a community-curated knowledge base, with AI moderation and content quality checks.
        
5.  **Multi-Modal Interaction:**
    
    *   Voice-activated Q&A capabilities.
        
    *   Integration with video conferencing tools for real-time AI assistance during meetings (e.g., identifying experts, pulling relevant documents).
        
6.  **Gamification & Recognition:**
    
    *   Implement points, badges, and leaderboards for knowledge sharing, mentorship, and continuous learning to incentivize participation and recognition.
        
7.  **Advanced Mentorship Program Management:**
    
    *   Tools for formal mentorship program enrollment, progress tracking, and structured feedback for both mentors and mentees.
        
8.  **Ethical AI & Data Governance:**
    
    *   Implement robust data privacy, anonymization, and consent frameworks as the system scales to handle real employee data.
        
    *   Ensure fairness and transparency in AI matching algorithms.