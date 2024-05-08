import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
test("renders learn react link abc", () => {
  render(<App />);
  const linkElement = screen.getByText(/most viewed/i);
  expect(linkElement).toBeInTheDocument();
});
