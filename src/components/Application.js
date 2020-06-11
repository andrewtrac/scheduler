import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import getAppointmentsForDay  from "helpers/selectors";
import axios from 'axios';
import "components/DayListItem.scss";
import "components/Application.scss";


export default function Application(props) {


const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
});

useEffect(() => {
  setAppointments(getAppointmentsForDay(state , state.day))
}, [state.day])

const setDay = day => setState(prev => ({ ...prev, day }));



Promise.all([
  axios.get('http://localhost:8001/api/days').then((response) => {
    return response.data
  }),
  axios.get('http://localhost:8001/api/appointments').then((response) => {
     return response.data
  }),
]).then((all) => {
  setState(prev => ({ ...prev, days: all[0], appointments: all[1] }));
})

const [dayAppointments, setAppointments] = useState(getAppointmentsForDay(state , 'Monday'))


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
          return (
          <Appointment 
          key={element.id}
          time={element.time}
          interview={element.interview}
          />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}



