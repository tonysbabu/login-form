import React from "react";
import { render } from "@testing-library/react";
import LoadingIndicator from "../../LoadingIndicator";

it("renders without correctly", () => {
  const { getByTestId } = render(<LoadingIndicator show={true} />);
  expect(getByTestId("loading-indicator")).toBeTruthy();
});
