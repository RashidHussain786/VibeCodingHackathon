import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LearningInterestsForm from "./LearningInterestsForm";

describe("LearningInterestsForm", () => {
  const initialInterests = ["Reading", "Coding"];
  const mockOnSave = vi.fn();

  it("renders correctly with initial interests", () => {
    render(
      <LearningInterestsForm
        initialInterests={initialInterests}
        onSave={mockOnSave}
      />,
    );

    expect(screen.getByText("Learning Interests")).toBeInTheDocument();
    expect(screen.getByText("Reading")).toBeInTheDocument();
    expect(screen.getByText("Coding")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add new interest")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Save Interests/i }),
    ).toBeInTheDocument();
  });

  it("allows adding a new interest", () => {
    render(
      <LearningInterestsForm
        initialInterests={initialInterests}
        onSave={mockOnSave}
      />,
    );

    const input = screen.getByPlaceholderText("Add new interest");
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "Writing" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Writing")).toBeInTheDocument();
    expect(input).toHaveValue(""); // Input should clear after adding
  });

  it("calls onSave with updated interests when Save button is clicked", () => {
    render(
      <LearningInterestsForm
        initialInterests={initialInterests}
        onSave={mockOnSave}
      />,
    );

    const input = screen.getByPlaceholderText("Add new interest");
    const addButton = screen.getByRole("button", { name: /Add/i });
    const saveButton = screen.getByRole("button", { name: /Save Interests/i });

    fireEvent.change(input, { target: { value: "Writing" } });
    fireEvent.click(addButton);

    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(["Reading", "Coding", "Writing"]);
  });

  it("allows removing an interest", () => {
    render(
      <LearningInterestsForm
        initialInterests={initialInterests}
        onSave={mockOnSave}
      />,
    );

    const readingInterest = screen.getByText("Reading");
    const removeReadingButton = within(readingInterest).getByRole("button", {
      name: /×/i,
    });
    fireEvent.click(removeReadingButton);

    expect(screen.queryByText("Reading")).not.toBeInTheDocument();
    expect(screen.getByText("Coding")).toBeInTheDocument();
  });
});
