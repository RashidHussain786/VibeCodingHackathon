import { render, screen, fireEvent } from "@testing-library/react";
import ChatInput from "./ChatInput";

describe("ChatInput", () => {
  it("renders an input field and a send button", () => {
    render(<ChatInput onSendMessage={() => {}} />);
    expect(
      screen.getByPlaceholderText(/Type your message.../i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  it("calls onSendMessage with the input value when send button is clicked", () => {
    const mockOnSendMessage = vi.fn();
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const inputElement = screen.getByPlaceholderText(/Type your message.../i);
    fireEvent.change(inputElement, { target: { value: "Hello AI" } });
    fireEvent.click(screen.getByRole("button", { name: /Send/i }));

    expect(mockOnSendMessage).toHaveBeenCalledTimes(1);
    expect(mockOnSendMessage).toHaveBeenCalledWith("Hello AI");
    expect(inputElement).toHaveValue(""); // Input should be cleared after sending
  });

  it("calls onSendMessage with the input value when Enter key is pressed", () => {
    const mockOnSendMessage = vi.fn();
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const inputElement = screen.getByPlaceholderText(/Type your message.../i);
    fireEvent.change(inputElement, { target: { value: "Another question" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });

    expect(mockOnSendMessage).toHaveBeenCalledTimes(1);
    expect(mockOnSendMessage).toHaveBeenCalledWith("Another question");
    expect(inputElement).toHaveValue(""); // Input should be cleared after sending
  });
});
