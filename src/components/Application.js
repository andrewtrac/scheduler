import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from 'axios';
import "components/DayListItem.scss";
import "components/Application.scss";


export default function Application(props) {


const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});



Promise.all([
  axios.get('http://localhost:8001/api/days').then((response) => {
    return response.data
  }),
  axios.get('http://localhost:8001/api/appointments').then((response) => {
     return response.data
  }),
  axios.get('http://localhost:8001/api/interviewers').then((response) => {
    return (response.data)
  })
]).then((all) => {
  setState(prev => ({ ...prev, days: all[0], appointments: all[1], interviewers: all[2] }));
})

const [dayAppointments, setAppointments] = useState(getAppointmentsForDay(state , 'Monday'))
const [dayInterviewers, setInterviewers] = useState([])

useEffect(() => {
  setInterviewers(getInterviewersForDay(state , state.day))
}, [state.day])

useEffect(() => {
  setAppointments(getAppointmentsForDay(state , state.day))
}, [state.day])

const setDay = day => setState(prev => ({ ...prev, day }));




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
          />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
