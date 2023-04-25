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

    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments: appointments });
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

  //Send multiple GET requests to database for days, appointments and interviewers info
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}