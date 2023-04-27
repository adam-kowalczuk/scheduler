import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    /* 1. Renders the form */
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    /* 2. Check if the student name input is empty */
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    /* 1. Renders the form with initial student name*/
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    /* 2. Check if student name input has student name */
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} student={undefined} />
    );
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
    /* 4. Check that the student name error is displayed and that the save button has not been clicked*/
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} student="Lydia Miller-Jones" />
    );
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
    /* 4. Check that the select interviewer error is displayed and that the save button has not been clicked*/
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
    /* 4. See error that a student name must be entered into input */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    /* 5. Enter student name in input */
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    /* 6. Click the save button */
    fireEvent.click(getByText("Save"));
    /* 7. Check that the error no longer shows up */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    /* 8. Check that the save button was clicked and the interview info successfully submitted */
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    /* 1. Create the mock onCancel function */
    const onCancel = jest.fn();
    /* 2. Render the Form with interviewers, the onSave mock function, the onCancel mock function passed, and a student name */
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
    /* 4. Enter student name into input field */
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    /* 5. Click the cancel button */
    fireEvent.click(getByText("Cancel"));
    /* 6. Resets input field */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    /* 7. Check if the input field is empty */
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    /* 8. Check if the cancel button has been clicked once */
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});