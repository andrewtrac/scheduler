import react from 'react'


function getAppointmentsForDay (state, day) {

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

// Interate through appointment interview 
// Check and see if the id corresponds with interviewers
// Append on to the output object 

function getInterview (state, interview) {

  if (interview) {
    let id = interview.interviewer.toString()
    
      if(state.interviewers[id]) {
        interview.interviewer = state.interviewers[id]
      }
  
  } else  {
    return null
  }

  return interview
}

function getInterviewersForDay (state, day) {

  let dayInterviewers;
  let interviewersOutput = []

  for (let dayKey of state.days) {
      if (dayKey.name === day) {
      dayInterviewers = dayKey.interviewers
    }
  }
  for(let interviewerID in state.interviewers) {
      if (dayInterviewers && dayInterviewers.includes(Number(interviewerID))) {
         interviewersOutput.push(state.interviewers[interviewerID])
      } 
  }
  return interviewersOutput
}




export { getAppointmentsForDay , getInterview, getInterviewersForDay }



