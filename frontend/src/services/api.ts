import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const updateLearningInterests = async (
  userId: string,
  interests: string[],
) => {
  try {
    const response = await api.put(`/api/users/${userId}/learning-interests`, {
      learningInterests: interests,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating learning interests:", error);
    throw error;
  }
};

export const updateProfile = async (
  userId: string,
  expertise: string[],
  isMentor: boolean,
) => {
  try {
    const response = await api.put(`/api/users/${userId}/profile`, {
      expertise,
      isMentor,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const searchMentors = async (skill?: string) => {
  try {
    const response = await api.get(`/api/mentors/search`, {
      params: { skill },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching mentors:", error);
    throw error;
  }
};

// You can add other API functions here
