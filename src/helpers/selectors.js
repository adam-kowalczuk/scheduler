export function getAppointmentsForDay(state, day) {
  //Days array
  const days = state.days;

  //Check if days array is empty 
  if (!days.length) {
    return days;
  }

  //Appointments array
  const appointments = Object.values(state.appointments);

  //Create an array of day's scheduled appointment ids 
  let dayApps = [];
  for (const dayObj of days) {
    if (dayObj.name === day) {
      dayApps = dayObj.appointments;
      break;
    }
  }

  //Create an array with all of day's scheduled appointments
  const appsArray = appointments.filter((app) => dayApps.includes(app.id));

  return appsArray;
}

