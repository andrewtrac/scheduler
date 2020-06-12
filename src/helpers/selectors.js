import react from 'react'


const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

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



