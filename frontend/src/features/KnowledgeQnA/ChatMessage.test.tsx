import { render, screen } from "@testing-library/react";
import ChatMessage from "./ChatMessage";

describe("ChatMessage", () => {
  it("renders a user message correctly", () => {
    render(<ChatMessage message="Hello, AI!" isUser={true} />);
    const messageElement = screen.getByText("Hello, AI!");
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.parentElement).toHaveClass("justify-end");
    expect(messageElement).toHaveClass("bg-indigo-500");
  });

  it("renders an AI message correctly", () => {
    render(<ChatMessage message="Hello, user!" isUser={false} />);
    const messageElement = screen.getByText("Hello, user!");
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.parentElement).toHaveClass("justify-start");
    expect(messageElement).toHaveClass("bg-gray-300");
  });
});
