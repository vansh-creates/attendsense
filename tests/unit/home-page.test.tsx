import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "../../app/page";

describe("AttendSense foundation shell", () => {
  it("renders the product name", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "AttendSense" }),
    ).toBeInTheDocument();
  });
});
