import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Save an appointment, then transition to Show component
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  //Transition to Status component, delete appointment, then transition to Empty component
  const destroy = function() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  //Show Confirm component before deleting appointment
  const confirm = function() {
    transition(CONFIRM);
  };

  //Show Form component with student and interviewer fields already filled
  const edit = function() {
    transition(EDIT);
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={() => back(SHOW)} onConfirm={destroy} />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && <Error message="Could not books appointment" onClose={() => back(CREATE)} />}
      {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={() => back(SHOW)} />}
    </article>
  );
}
