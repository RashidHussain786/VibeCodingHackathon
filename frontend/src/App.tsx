import React from "react";
import "./App.css";
import UserProfilePage from "./features/UserProfile/UserProfilePage";
import MentorSearchPage from "./features/MentorSearch/MentorSearchPage";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">SkillBridge AI</h1>
          <nav>
            <a
              href="#find-mentor"
              className="text-gray-600 hover:text-indigo-600 px-3 py-2"
            >
              Find a Mentor
            </a>
            <a
              href="#ask-question"
              className="text-gray-600 hover:text-indigo-600 px-3 py-2"
            >
              Ask a Question
            </a>
            <a
              href="#profile"
              className="text-gray-600 hover:text-indigo-600 px-3 py-2"
            >
              Profile
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to SkillBridge AI
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Your dynamic internal mentorship and upskilling platform.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Find a Mentor Section */}
          <section
            id="find-mentor"
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <MentorSearchPage />
          </section>

          {/* Ask a Question Section */}
          <section
            id="ask-question"
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-teal-500 mb-4">
              Ask a Quick Question
            </h3>
            <p className="text-gray-700 mb-4">
              Get immediate, relevant answers to your technical or procedural
              questions.
            </p>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
              Ask a Question
            </button>
          </section>
        </div>

        {/* Profile Section Placeholder */}
        <section
          id="profile"
          className="mt-8 bg-white p-6 rounded-lg shadow-lg"
        >
          <UserProfilePage />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 py-6">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 SkillBridge AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
