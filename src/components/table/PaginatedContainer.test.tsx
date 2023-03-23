import { render, screen } from "@testing-library/react";
import PaginatedContainer from "./PaginatedContainer";

test("pagination button increase", () => {
  render(<PaginatedContainer />);
  const button = screen.getByTestId(1);
  const style = window.getComputedStyle(button);
  expect(style.color).toBe("red");
});

test("pagination button disabled", () => {
  render(<PaginatedContainer />);
  const leftButton = screen.getByTestId("pagination-button__left");
  expect(leftButton).toBeDisabled();
});
