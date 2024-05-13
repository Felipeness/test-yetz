import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import "@testing-library/jest-dom";

vi.mock("../../store/useSearchStore", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    input: "",
    error: "",
    setInput: vi.fn(),
    setError: vi.fn(),
    validateInput: vi.fn(),
  })),
}));

describe("SearchBar", () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(
      screen.getByPlaceholderText("Digite o nome do planeta ou população...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });
});
