### **Detailed User Stories (Epics) for SkillBridge AI**

Here's a more detailed breakdown of the high-level user stories from our PRD (Section 2.2):

#### **Epic 1: Find a Mentor based on Skill/Topic**

*   **As an employee, I want to search for mentors based on specific skills or general topics, so that I can connect with someone who can guide my learning or career.**
    
*   **Detailed Description:** This Epic focuses on the core ability for any employee to discover and initiate contact with internal experts who can serve as mentors.
    
    *   **Search Functionality:** Users can type keywords (e.g., "Kubernetes," "Project Management," "AI Ethics," "Financial Services Cloud Migration") into a prominent search bar. The system should use AI (Gemini API for semantic understanding) to match these keywords against the skill sets and expertise areas listed in the mock employee profiles.
        
    *   **Filtered Results:** Search results should display relevant mock employee profiles, highlighting the matched skills. Users should be able to see the mock mentor's name, department, expertise level, and simulated contact information.
        
    *   **Initiate Connection (Mock):** A clear call-to-action (e.g., "Request Mentorship," "Connect") should be present, which, for the hackathon, simulates sending an email or Teams message (e.g., by opening a mailto: link or showing a confirmation message).
        
    *   **Profile Integration:** The search capability relies directly on the data maintained in the mock User Profile (Epic 4 & 5).
        

#### **Epic 2: Ask a Quick Knowledge Question**

*   **As an employee, I want to ask natural language questions about internal processes, technical concepts, or best practices, so that I can get immediate, relevant answers without extensive searching.**
    
*   **Detailed Description:** This Epic enables employees to get instant answers to common questions, acting as a smart internal FAQ and knowledge base.
    
    *   **Natural Language Input:** Users type questions in a conversational chat interface (e.g., "What's our policy for annual leave?", "How do I configure my VPN for remote access?", "Can you explain serverless computing?").
        
    *   **AI-Powered Retrieval & Generation:** The backend will perform RAG, searching a small, curated mock internal knowledge base (e.g., dummy policy documents, IT FAQs) for relevant information. The retrieved context, along with the question, will be sent to the Gemini API to generate a concise, human-readable answer. For general technical concepts, Gemini will use its broader knowledge base.
        
    *   **Source Citation (Mock):** If an answer is derived from the mock internal knowledge base, the system should indicate the source (e.g., "Based on Mock HR Policy V1.2").
        
    *   **Follow-Up Questions:** The chat interface should allow for a basic conversational flow, where the AI can respond to follow-up questions within the current context.
        

#### **Epic 3: Discover Learning Resources**

*   **As an employee, I want the system to suggest relevant internal learning materials or external resources based on my expressed learning interests, so that I can easily find pathways to acquire new skills.**
    
*   **Detailed Description:** This Epic provides personalized recommendations for learning and skill development.
    
    *   **Interest-Based Suggestions:** Based on the "Learning Interests" specified in the user's mock profile (Epic 4), the system will display a curated list of _mock_ internal training links, external course suggestions (e.g., Coursera, Udemy links), or relevant articles. These suggestions will be pre-defined for the hackathon.
        
    *   **AI-Enhanced Curation (Conceptual):** The Gemini API could conceptually be used (in a more advanced version, or hinted at in hackathon demo) to understand the nuances of a learning interest and surface highly relevant content categories. For the hackathon, this might be simulated by simple keyword matching for predefined resources.
        
    *   **Resource Categories:** Learning resources could be categorized (e.g., "Courses," "Articles," "Videos," "Internal Docs").
        

#### **Epic 4: Express Learning Interests (Part of User Profile)**

*   **As an employee, I want to easily update my profile with skills I want to learn or areas I need guidance in, so that the system can better match me with mentors and resources.**
    
*   **Detailed Description:** This Epic focuses on the "learner" aspect of the user profile.
    
    *   **Learning Interests Section:** A dedicated section within the user's mock profile where they can add skills or topics they are interested in learning. This could be a free-text input or selecting from a pre-defined list of dummy skills.
        
    *   **Impact on Matching:** These interests directly influence the recommendations from "Discover Learning Resources" (Epic 3) and help the system match potential mentors from "Find a Mentor" (Epic 1).
        

#### **Epic 5: Offer Mentorship & Expertise (Part of User Profile)**

*   **As an employee, I want to update my profile to indicate my areas of expertise and willingness to mentor or answer questions, so that I can contribute to the growth of others and be easily found by those seeking help.**
    
*   **Detailed Description:** This Epic focuses on the "mentor/expert" aspect of the user profile.
    
    *   **Expertise Section:** A section in the user's mock profile where they can list their areas of expertise/skills, potentially with an associated "Expertise Level" (e.g., Beginner, Intermediate, Expert - for hackathon, these can be simple dropdowns).
        
    *   **Mentorship Availability Toggle:** A simple toggle (e.g., "Available for Mentorship: Yes/No") and a field to briefly describe preferred mentorship topics or capacity.
        
    *   **Visibility for Search:** Information provided here makes the mock user discoverable by others in "Find a Mentor" (Epic 1).
        

#### **Epic 6: Review Mentorship Requests (Simplified for Hackathon)**

*   **As a potential mentor, I want to receive and review requests for mentorship or specific questions, so that I can decide if I have the capacity and relevant expertise to assist.**
    
*   **Detailed Description:** This Epic simulates the process of a mentor receiving requests.
    
    *   **Simulated Notification:** For the hackathon, this would likely be a simple UI notification or a mock "inbox" showing a list of simulated, predefined mentorship requests.
        
    *   **Basic Acknowledgment:** The mentor can "accept" or "decline" a mock request, which, for the hackathon, simply changes its status in the UI and doesn't trigger any real external communication. The primary goal is to show the workflow.
        

#### **Epic 7: Manage Mock Employee Profiles (Hackathon Simulation)**

*   **As an administrator (or as part of the hackathon setup), I want to be able to input and manage mock employee profiles with dummy skills and availability, so that the AI matching functions have data to work with.**
    
*   **Detailed Description:** This Epic is crucial for the hackathon's demo setup.
    
    *   **Simple Admin Interface (Optional/Manual):** A very basic interface or a simple script/tool to populate and manage the employee\_profiles.json (or PostgreSQL data via Prisma seeding) and knowledge\_base.md files with dummy data. This might be a manual process for the hackathon.
        
    *   **Data Structure:** Define a clear JSON/CSV structure for mock employee profiles (Name, Department, Skills, Learning Interests, Mentorship Availability, Contact Info).
        
    *   **Data Population:** Ensure sufficient dummy data exists for effective demonstration of AI matching and Q&A.