//Return an array of all the appoinments for a given day
export function getAppointmentsForDay(state, day) {
  //Find the day that matches the selected day
  const foundDay = state.days.find(d => d.name === day);

  //Check if foundDay exists
  if (!foundDay) {
    return [];
  }

  //Create an array with detailed appointment objects for the foundDay
  const appointments = foundDay.appointments.map(id => state.appointments[id]);

  return appointments;
}

//Return an interview object that includes a detailed interviewer object
export function getInterview(state, interview) {
  //If no interview exists, return null
  if (!interview) {
    return null;
  }

  //Get interviewer ID for this interview
  const interviewerID = interview.interviewer;

  //Get entire interviewer object using ID
  const interviewer = state.interviewers[interviewerID];

  //Return interview including entire interviewer object
  return { ...interview, interviewer };
}

//Return all the interviewers for a given day
export function getInterviewersForDay(state, day) {
  //Find the day that matches the selected day
  const foundDay = state.days.find(d => d.name === day);

  //Check if foundDay exists
  if (!foundDay) {
    return [];
  }

  //Create an array with detailed interviewer objects for the foundDay
  const interviewers = foundDay.interviewers.map(id => state.interviewers[id]);

  return interviewers;
}



