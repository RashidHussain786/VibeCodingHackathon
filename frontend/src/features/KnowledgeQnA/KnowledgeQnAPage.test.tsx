import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import KnowledgeQnAPage from "./KnowledgeQnAPage";
import * as api from "../../services/api";

// Mock the API service
vi.mock("../../services/api");

describe("KnowledgeQnAPage", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders a chat input and a message display area", () => {
    render(<KnowledgeQnAPage />);

    expect(
      screen.getByPlaceholderText(/Type your message.../i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("chat-messages")).toBeInTheDocument();
  });

  it("sends a user message and displays AI response", async () => {
    const mockAskQuestion = vi.spyOn(api, "askQuestion").mockResolvedValueOnce({
      answer: "This is a mock AI response.",
    });

    render(<KnowledgeQnAPage />);

    const inputElement = screen.getByPlaceholderText(/Type your message.../i);
    const sendButton = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(inputElement, { target: { value: "Hello AI" } });
    fireEvent.click(sendButton);

    // Expect user message to be displayed
    expect(screen.getByText("Hello AI")).toBeInTheDocument();

    // Expect API call to be made
    expect(mockAskQuestion).toHaveBeenCalledTimes(1);
    expect(mockAskQuestion).toHaveBeenCalledWith("Hello AI");

    // Wait for AI response to appear
    await waitFor(() => {
      expect(
        screen.getByText("This is a mock AI response."),
      ).toBeInTheDocument();
    });
  });
});
