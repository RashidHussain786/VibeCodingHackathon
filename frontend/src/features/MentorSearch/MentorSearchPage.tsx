import React, { useState } from "react";
import { searchMentors } from "../../services/api";

interface Mentor {
  id: string;
  email: string;
  expertise: string[];
  isMentor: boolean;
}

const MentorSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await searchMentors(searchQuery);
      setMentors(data);
      console.log("Mentors state after update:", data); // Add this line
    } catch (err) {
      setError("Failed to fetch mentors. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find a Mentor</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex items-center border-b border-indigo-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search by skill or topic (e.g., React, Cloud, Leadership)"
            aria-label="Search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {mentors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {mentor.email}
              </h2>
              <p className="text-gray-600 mb-2">
                Expertise:{" "}
                <span className="font-medium">
                  {mentor.expertise.join(", ") || "N/A"}
                </span>
              </p>
              <p className="text-gray-600 mb-4">
                Mentorship Available:{" "}
                <span className="font-medium">
                  {mentor.isMentor ? "Yes" : "No"}
                </span>
              </p>
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => window.open(`mailto:${mentor.email}`, "_blank")}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      )}

      {mentors.length === 0 && !loading && !error && searchQuery && (
        <p className="text-gray-600">No mentors found for "{searchQuery}".</p>
      )}

      {mentors.length === 0 && !loading && !error && !searchQuery && (
        <p className="text-gray-600">
          Start by searching for a skill or topic to find mentors.
        </p>
      )}
    </div>
  );
};

export default MentorSearchPage;
