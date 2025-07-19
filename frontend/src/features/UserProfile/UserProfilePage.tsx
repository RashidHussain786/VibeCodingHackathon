import React, { useState, useEffect } from "react";
import LearningInterestsForm from "./components/LearningInterestsForm";
import ExpertiseForm from "./components/ExpertiseForm";
import { updateLearningInterests, updateProfile } from "../../services/api";

const MOCK_USER_ID = "4a044f85-5f43-431f-9cf4-1a940d98be15"; // Replace with actual user ID from auth context

const UserProfilePage: React.FC = () => {
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [userExpertise, setUserExpertise] = useState<string[]>([]);
  const [isMentor, setIsMentor] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, you'd fetch initial user interests and expertise here
  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      // This should ideally fetch from the backend
      setUserInterests(["Initial Interest 1", "Initial Interest 2"]);
      setUserExpertise(["Initial Expertise 1", "Initial Expertise 2"]);
      setIsMentor(false);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveInterests = async (interests: string[]) => {
    try {
      setLoading(true);
      setError(null);
      await updateLearningInterests(MOCK_USER_ID, interests);
      setUserInterests(interests);
      alert("Learning interests updated successfully!");
    } catch (err) {
      setError("Failed to update learning interests.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExpertise = async (
    expertise: string[],
    mentorStatus: boolean,
  ) => {
    try {
      setLoading(true);
      setError(null);
      await updateProfile(MOCK_USER_ID, expertise, mentorStatus);
      setUserExpertise(expertise);
      setIsMentor(mentorStatus);
      alert("Expertise and mentorship status updated successfully!");
    } catch (err) {
      setError("Failed to update expertise and mentorship status.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading user profile...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>
      <LearningInterestsForm
        initialInterests={userInterests}
        onSave={handleSaveInterests}
      />
      <ExpertiseForm
        initialExpertise={userExpertise}
        initialIsMentor={isMentor}
        onSave={handleSaveExpertise}
      />
    </div>
  );
};

export default UserProfilePage;
