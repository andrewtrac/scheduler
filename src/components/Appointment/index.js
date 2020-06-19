import React, { useState } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // Save by taking in a new student name and interviewer. Passes in to Form component through onSave.

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  }

  // Delete appointment. Passes in to Confirm component.

  function deleteInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
      {/*Shows the time on the header of each appointment spot*/}

      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}

      {/*Status modes for saving and deleting*/}

      {mode === SAVING && <Status text={"Saving"} />}
      {mode === DELETING && <Status text={"Deleting"} />}

      {/*Confirm screen to confirm deletions */}

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => {
            back();
          }}
          onConfirm={() => {
            deleteInterview();
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {
            back();
          }}
        />
      )}

      {/*Form component for selecting an interviewer and entering name*/}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          onCancel={() => {
            back();
          }}
        />
      )}

      {/*Error Handling for when you are unable to save or delete an appointment */}

      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save appointment."}
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete appointment."}
          onClose={() => {
            back();
          }}
        />
      )}

      {/*Showing the booked appointment */}

      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
    </article>
  );
}
