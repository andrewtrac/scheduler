import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

// Promise.ALl axios requests for accessing the database for days, appointments, and interviewers

  useEffect(() => {
    Promise.all([
      axios.get("/api/days").then((response) => {
        return response.data;
      }),
      axios.get("/api/appointments").then((response) => {
        return response.data;
      }),
      axios.get("/api/interviewers").then((response) => {
        return response.data;
      }),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0],
        appointments: all[1],
        interviewers: all[2],
      }));
    });
  }, []);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));


  //"Counter" for counting spots within each day - used in both bookInterview and cancelInterviews functions 

  const appointmentCount = (id, inputAppointments) => {
    let daysArray = [];
    let count = 0;

    state.days.forEach((day) => {
      if (day.appointments.includes(id)) {
        daysArray = day.appointments;
      }
    });

    for (let dayElement of daysArray) {
      if (!inputAppointments[dayElement].interview) {
        count++;
      }
    }
    return count;
  };

  // Book interviews - used in 'save' function within Appointment.js

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: appointmentCount(id, appointments) };
      }
      return day;
    });

    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        setState((state) => ({
          ...state,
          appointments,
          days,
        }));
      });
  }

    // Cancel interviews - used in 'deleteInterview' function within Appointment.js


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: appointmentCount(id, appointments) };
      }
      return day;
    });

    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then((response) => {
        setState((state) => ({
          ...state,
          appointments,
          days,
        }));
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
