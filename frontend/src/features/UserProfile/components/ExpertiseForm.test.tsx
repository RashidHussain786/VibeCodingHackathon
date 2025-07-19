import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ExpertiseForm from "./ExpertiseForm";

describe("ExpertiseForm", () => {
  const initialExpertise = ["React", "Node.js"];
  const initialIsMentor = false;
  const mockOnSave = vi.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
  });

  it("renders correctly with initial props", () => {
    render(
      <ExpertiseForm
        initialExpertise={initialExpertise}
        initialIsMentor={initialIsMentor}
        onSave={mockOnSave}
      />,
    );

    expect(screen.getByText("Expertise & Mentorship")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Add new expertise (e.g., React, Node.js)"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Available for Mentorship")).not.toBeChecked();
    expect(
      screen.getByRole("button", { name: /Save Profile/i }),
    ).toBeInTheDocument();
  });

  it("allows adding new expertise", () => {
    render(
      <ExpertiseForm
        initialExpertise={initialExpertise}
        initialIsMentor={initialIsMentor}
        onSave={mockOnSave}
      />,
    );

    const input = screen.getByPlaceholderText(
      "Add new expertise (e.g., React, Node.js)",
    );
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "TypeScript" } });
    fireEvent.click(addButton);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("allows toggling mentorship status", () => {
    render(
      <ExpertiseForm
        initialExpertise={initialExpertise}
        initialIsMentor={initialIsMentor}
        onSave={mockOnSave}
      />,
    );

    const checkbox = screen.getByLabelText("Available for Mentorship");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("calls onSave with updated data when Save Profile is clicked", () => {
    render(
      <ExpertiseForm
        initialExpertise={initialExpertise}
        initialIsMentor={initialIsMentor}
        onSave={mockOnSave}
      />,
    );

    const expertiseInput = screen.getByPlaceholderText(
      "Add new expertise (e.g., React, Node.js)",
    );
    const addExpertiseButton = screen.getByRole("button", { name: /Add/i });
    const checkbox = screen.getByLabelText("Available for Mentorship");
    const saveButton = screen.getByRole("button", { name: /Save Profile/i });

    fireEvent.change(expertiseInput, { target: { value: "Vue.js" } });
    fireEvent.click(addExpertiseButton);
    fireEvent.click(checkbox);
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(
      ["React", "Node.js", "Vue.js"],
      true,
    );
  });

  it("allows removing an expertise", () => {
    render(
      <ExpertiseForm
        initialExpertise={initialExpertise}
        initialIsMentor={initialIsMentor}
        onSave={mockOnSave}
      />,
    );

    const reactExpertise = screen.getByText("React");
    const removeReactButton = within(reactExpertise).getByRole("button", {
      name: /×/i,
    });
    fireEvent.click(removeReactButton);

    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });
});
