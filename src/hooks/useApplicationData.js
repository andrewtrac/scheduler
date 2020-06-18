import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function useApplicationData() {

  useEffect(() => { 
    Promise.all([
      axios.get('/api/days').then((response) => {
        return response.data
      }),
      axios.get('/api/appointments').then((response) => {
         return response.data
      }),
      axios.get('/api/interviewers').then((response) => {
        return (response.data)
      })
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0], appointments: all[1], interviewers: all[2] }));
    })
    }, [])


    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
      });

    const setDay = day => setState(prev => ({ ...prev, day }));


    function bookInterview(id, interview) {
    
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };


        let daysArray = []
     const  appointmentCount = () => {
       let count = 0

      state.days.forEach(day => {
        if (day.appointments.includes(id)) {
          daysArray = day.appointments
        }
      })

      for(let dayElement of daysArray) {
        if(!appointments[dayElement].interview) {
          count ++
        }
      }
      return count
    }

    const days = state.days.map(day => {
      if(day.appointments.includes(id)) {
          return {...day, spots: appointmentCount() }  
        }
        return day
      })

        return axios.put(`/api/appointments/${id}`, {interview: interview}).then(() => {
          setState(state => ({
            ...state,
            appointments,
            days
          })) 
        })
    }

    function cancelInterview(id) { 

        const appointment = {
          ...state.appointments[id],
          interview: null
        };
            
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        let daysArray = []

        const  appointmentCount = () => {
          let count = 0
   
         state.days.forEach(day => {
           if (day.appointments.includes(id)) {
             daysArray = day.appointments
           }
         })
   
         for(let dayElement of daysArray) {
           if(!appointments[dayElement].interview) {
             count ++
           }
         }
         return count
       }
  
         const days = state.days.map(day => {
           if(day.appointments.includes(id)) {
               return {...day, spots: appointmentCount() }  
             }
             return day
           })

        return axios.delete(`/api/appointments/${id}`, {interview: null}).then((response) => {
          setState(state => ({
            ...state,
            appointments,
            days
          }))})}

      return {
        state, 
        setDay,
        bookInterview,
        cancelInterview
      }

}
