//import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from 'hooks/useApplicationData'
import axios from 'axios';
import "components/DayListItem.scss";
import "components/Application.scss";


export default function Application(props) {

const { state, setState, setDay, bookInterview, cancelInterview } = useApplicationData()

const [dayAppointments, setAppointments] = useState(getAppointmentsForDay(state , 'Monday'))
const [dayInterviewers, setInterviewers] = useState([])


useEffect(() => {
  setInterviewers(prev => (getInterviewersForDay(state , state.day)))
}, [state])

useEffect(() => {
  setAppointments(prev => (getAppointmentsForDay(state , state.day)))
}, [state])




  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days} 
          day={state.day}
          setDay={setDay} 
          state={state}
          />
        </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">

        { dayAppointments.map((element) => {

          const interview = getInterview(state, element.interview);

          return (
          <Appointment 
          key={element.id}
          id={element.id}
          time={element.time}
          interview={interview}
          interviewers={dayInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
