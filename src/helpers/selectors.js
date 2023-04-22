//Return an array of all the appoinments for a given day
export function getAppointmentsForDay(state, day) {
  //Find the day that matches the selected day
  const foundDay = state.days.find(d => d.name === day)

  //Check if foundDay exists
  if (!foundDay) {
    return [];
  }

  //Create an array with detailed interviewer objects for the foundDay
  const appointments = foundDay.appointments.map(id => state.appointments[id]);

  return appointments;
}

//Return an interview object that includes a detailed interviewer object
export function getInterview(state, interview) {
  //If no interview exists, return null
  if (!interview) {
    return null;
  }

  //Create an array of interviewer objects
  const interviewers = Object.values(state.interviewers);
  let revisedInterview;

  //Loop through interviewers array to find a match with interviewer id from interview, then replace id with interviewer object
  for (const interviewer of interviewers) {
    if (interview.interviewer === interviewer.id) {
      revisedInterview = { ...interview, interviewer: interviewer };
    }
  }

  return revisedInterview;
}

//Return all the interviewers for a given day
export function getInterviewersForDay(state, day) {
  //Find the day that matches the selected day
  const foundDay = state.days.find(d => d.name === day)

  //Check if foundDay exists
  if (!foundDay) {
    return [];
  }

  //Create an array with detailed interviewer objects for the foundDay
  const interviewers = foundDay.interviewers.map(id => state.interviewers[id]);

  return interviewers;
}



