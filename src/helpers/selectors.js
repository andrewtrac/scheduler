import react from 'react'

export default function getAppointmentsForDay (state, day) {

  let dayAppointments;
  let appointmentsOutput = []

  for (let dayKey of state.days) {
      if (dayKey.name === day) {
      dayAppointments = dayKey.appointments
    }
  }
  for(let appointmentID in state.appointments) {
      if (dayAppointments && dayAppointments.includes(Number(appointmentID))) {
          appointmentsOutput.push(state.appointments[appointmentID])
      } 
  }
  return appointmentsOutput
}


  



