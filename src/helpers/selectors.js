export function getAppointmentsForDay(state, day) {
  //Days array
  const days = state.days;

  //Check if days array is empty 
  if (!days.length) {
    return [];
  }

  //Appointments array
  const appointments = Object.values(state.appointments);

  //Create an array of day's scheduled appointment ids 
  let dayAppointments = [];
  for (const d of days) {
    if (d.name === day) {
      dayAppointments = [...d.appointments];
      break;
    }
  }

  //Create an array with all of day's scheduled appointments
  const selectedAppointments = appointments.filter(appointment => dayAppointments.includes(appointment.id));

  return selectedAppointments;
}

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




