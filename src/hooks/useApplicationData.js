import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //State of scheduler
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Send multiple GET requests to database on initial load for days, appointments and interviewers and update state
  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Set appointment day 
  const setDay = (day) => setState({ ...state, day });

  //Book an interview and store in database
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Find the day where the appointment is booked
    const foundDay = state.days.find((day) => day.appointments.includes[id]);
    //Return the number of open spots that match the number of null interviews per day
    const days = state.days.map((day) => {
      if (day.name === foundDay.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots-- };
      } else {
        return day;
      }
    });

    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments: appointments, days });
      });
  };

  //Cancel an interview and remove from database
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments: appointments });
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}