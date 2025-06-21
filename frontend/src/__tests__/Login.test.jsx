import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";

test("renders login page and reacts to click", () => {
  render(<Login />);
  const btn = screen.getByText(/Sign in with Google/i);
  expect(btn).toBeInTheDocument();
  fireEvent.click(btn);
});
