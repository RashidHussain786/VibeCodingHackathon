import React, { useState } from "react";

interface LearningInterestsFormProps {
  initialInterests: string[];
  onSave: (interests: string[]) => void;
}

const LearningInterestsForm: React.FC<LearningInterestsFormProps> = ({
  initialInterests,
  onSave,
}) => {
  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [newInterest, setNewInterest] = useState<string>("");

  const handleAddInterest = () => {
    if (newInterest.trim() !== "" && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  const handleSave = () => {
    onSave(interests);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Learning Interests
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {interests.map((interest) => (
          <span
            key={interest}
            className="flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {interest}
            <button
              onClick={() => handleRemoveInterest(interest)}
              className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Add new interest"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          onClick={handleAddInterest}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>
      <button
        onClick={handleSave}
        className="w-full px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Save Interests
      </button>
    </div>
  );
};

export default LearningInterestsForm;
