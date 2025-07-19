import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MentorSearchPage from "./MentorSearchPage";
import * as api from "../../services/api";
import { vi, expect, it, describe, beforeEach, type Mock } from "vitest";

// Mock window.open
const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);

// Mock the searchMentors API call
vi.mock("../../services/api", () => ({
  searchMentors: vi.fn(),
}));

describe("MentorSearchPage", () => {
  beforeEach(() => {
    // Reset the mock before each test
    (api.searchMentors as Mock).mockReset();
    windowOpenSpy.mockClear(); // Clear mock calls for window.open
  });

  it("should render a search input and a search button", () => {
    render(<MentorSearchPage />);

    const searchInput = screen.getByPlaceholderText(
      /search by skill or topic/i,
    );
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it("should display mentors after a successful search", async () => {
    const mockMentors = [
      {
        id: "1",
        email: "mentor1@example.com",
        expertise: ["React", "Frontend"],
        isMentor: true,
      },
      {
        id: "2",
        email: "mentor2@example.com",
        expertise: ["Node.js", "Backend"],
        isMentor: true,
      },
    ];

    (api.searchMentors as Mock).mockResolvedValue(mockMentors);

    render(<MentorSearchPage />);

    const searchInput = screen.getByPlaceholderText(
      /search by skill or topic/i,
    );
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "React" } });
    fireEvent.click(searchButton);

    // Wait for the loading state to clear
    await waitFor(() => {
      expect(searchButton).not.toHaveTextContent("Searching...");
    });

    await waitFor(() => {
      // Check mentor emails
      expect(screen.getByText(/mentor1@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/mentor2@example.com/i)).toBeInTheDocument();

      // Check expertise values (since labels and values are in separate DOM nodes)
      expect(screen.getByText("React, Frontend")).toBeInTheDocument();
      expect(screen.getByText("Node.js, Backend")).toBeInTheDocument();

      // Check connect buttons
      expect(screen.getAllByRole("button", { name: /connect/i })).toHaveLength(
        2,
      );

      // Test the connect button action
      const connectButton = screen.getAllByRole("button", {
        name: /connect/i,
      })[0];
      fireEvent.click(connectButton);
      expect(window.open).toHaveBeenCalledWith(
        `mailto:${mockMentors[0].email}`,
        "_blank",
      );
    });
  });
});
