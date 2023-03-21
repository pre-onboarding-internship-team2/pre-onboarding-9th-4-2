import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";

test("NotFoundPage text test", () => {
  render(<NotFoundPage />);

  const main = screen.getByText("Not Found!");
  expect(main).toBeInTheDocument();
});
