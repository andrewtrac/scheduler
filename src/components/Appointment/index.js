import React from 'react'
import Header from 'components/Appointment/Header'
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'
import useVisualMode from 'hooks/useVisualMode'
import 'components/Appointment/styles.scss'
import Form from './Form'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment (props) {

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

    return (
    <article className="appointment">
        <Header 
           time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}}/>}
        {mode === SHOW && 
          (<Show
           student={props.interview.student}
           interviewer={props.interview.interviewer.name}
        />)}
        {mode === CREATE && 
          < Form
            interviewers={props.interviewers}
            name={''}
            onSave={''}
            onCancel={() => {back()}}
        /> }
    </article>
    )
}

      






{/*

export default function Appointment (props) {

    return (
    <article className="appointment">
        <Header 
        time={props.time}
        />
        {props.interview ? 
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        /> : <Empty />}
    </article>
    )
}

*/}