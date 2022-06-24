import { render, screen } from "@testing-library/react";
import React from "react";
import { Footer } from "./Footer";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Footer component", () => {
  const { location } = window;
  beforeAll(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { href: "" };
  });

  afterAll((): void => {
    window.location = location;
  });
  it("should render copyright", () => {
    render(<Footer />);
    const element = screen.getByText("hellomuthu23");
    expect(element).toBeInTheDocument();
  });
});
