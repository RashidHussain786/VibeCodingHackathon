import React, { useState } from "react";

interface ExpertiseFormProps {
  initialExpertise: string[];
  initialIsMentor: boolean;
  onSave: (expertise: string[], isMentor: boolean) => void;
}

const ExpertiseForm: React.FC<ExpertiseFormProps> = ({
  initialExpertise,
  initialIsMentor,
  onSave,
}) => {
  const [expertise, setExpertise] = useState<string[]>(initialExpertise);
  const [newExpertise, setNewExpertise] = useState<string>("");
  const [isMentor, setIsMentor] = useState<boolean>(initialIsMentor);

  const handleAddExpertise = () => {
    if (
      newExpertise.trim() !== "" &&
      !expertise.includes(newExpertise.trim())
    ) {
      setExpertise([...expertise, newExpertise.trim()]);
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (expertiseToRemove: string) => {
    setExpertise(expertise.filter((exp) => exp !== expertiseToRemove));
  };

  const handleSave = () => {
    onSave(expertise, isMentor);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Expertise & Mentorship
      </h2>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {expertise.map((exp) => (
          <span
            key={exp}
            className="flex items-center bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {exp}
            <button
              onClick={() => handleRemoveExpertise(exp)}
              className="ml-2 text-teal-600 hover:text-teal-800 focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={newExpertise}
          onChange={(e) => setNewExpertise(e.target.value)}
          placeholder="Add new expertise (e.g., React, Node.js)"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <button
          onClick={handleAddExpertise}
          className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-r-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>

      {/* Is Mentor Toggle */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="isMentorToggle"
          checked={isMentor}
          onChange={(e) => setIsMentor(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="isMentorToggle"
          className="ml-2 block text-sm text-gray-900"
        >
          Available for Mentorship
        </label>
      </div>

      <button
        onClick={handleSave}
        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save Profile
      </button>
    </div>
  );
};

export default ExpertiseForm;
