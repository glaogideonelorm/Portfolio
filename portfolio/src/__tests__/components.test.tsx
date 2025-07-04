import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import components to test
import ThemeToggle from "@/components/ui/ThemeToggle";
import DevModeToggle from "@/components/ui/DevModeToggle";

describe("UI Components", () => {
  describe("ThemeToggle", () => {
    it("should render theme toggle button", () => {
      render(<ThemeToggle />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should have accessible name", () => {
      render(<ThemeToggle />);
      const button = screen.getByRole("button");
      expect(button).toHaveAccessibleName();
    });
  });

  describe("DevModeToggle", () => {
    it("should render dev mode toggle button", () => {
      render(<DevModeToggle />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should have accessible name", () => {
      render(<DevModeToggle />);
      const button = screen.getByRole("button");
      expect(button).toHaveAccessibleName();
    });
  });
});

describe("Accessibility", () => {
  it("should have proper ARIA labels", () => {
    render(
      <div>
        <ThemeToggle />
        <DevModeToggle />
      </div>
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAccessibleName();
    });
  });
});
