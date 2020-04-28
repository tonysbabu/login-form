import React from "React";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Login from "../../Login";
import axiosMock from "axios";

afterEach(cleanup);

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

jest.mock("axios");

it("renders without crashing", () => {
  render(<Login />);
});

it("changes username and password", () => {
  const { getByTestId } = render(<Login />);
  fireEvent.change(getByTestId("username"), { target: { value: "tony" } });
  fireEvent.change(getByTestId("password"), { target: { value: "password" } });
  expect(getByTestId("username").value).toBe("tony");
  expect(getByTestId("password").value).toBe("password");
});

it("validates form correctly", () => {
  const { getByTestId, getByText } = render(<Login />);
  axiosMock.get.mockResolvedValueOnce({
    data: { response: "success" }
  });

  fireEvent.change(getByTestId("username"), { target: { value: "tony" } });
  fireEvent.change(getByTestId("password"), { target: { value: "password" } });
  fireEvent.click(getByText("Login"));
  expect(getByTestId("username-error").innerHTML).toBe("Not a valid email");
  expect(getByTestId("password-error").innerHTML).toBe(
    "Password should contain one uppercase"
  );

  fireEvent.change(getByTestId("username"), { target: { value: "" } });
  fireEvent.change(getByTestId("password"), { target: { value: "" } });
  fireEvent.click(getByText("Login"));
  expect(getByTestId("username-error").innerHTML).toBe("Username is required");
  expect(getByTestId("password-error").innerHTML).toBe("Password is required");

  fireEvent.change(getByTestId("username"), {
    target: { value: "tonysbabu@gmail.com" }
  });
  fireEvent.change(getByTestId("password"), { target: { value: "Password" } });
  fireEvent.click(getByText("Login"));

  expect(getByTestId("username-error").innerHTML).toBe("");
  expect(getByTestId("password-error").innerHTML).toBe("");
});

it("triggers api call on after validating form fields and clicking on Login", async () => {
  const { getByTestId, getByText } = render(<Login />);

  axiosMock.get.mockResolvedValueOnce({
    data: { response: "success" }
  });

  fireEvent.change(getByTestId("username"), {
    target: { value: "tonysbabu@gmail.com" }
  });
  fireEvent.change(getByTestId("password"), { target: { value: "Password" } });
  fireEvent.click(getByText("Login"));
  const url = "http://www.mocky.io/v2/5d9d9219310000153650e30b";
  expect(axiosMock.get).toHaveBeenCalledWith(url);
});
