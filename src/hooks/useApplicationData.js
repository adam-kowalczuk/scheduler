import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //Set default state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Populate app with data from database
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

  // Update the number of open appointment spots per day
  const updateSpots = (state, appointments) => {
    //Find the day
    const dayObj = state.days.find(d => d.name === state.day);

    //Count the number of spots available for given day
    let spots = 0;
    for (let id of dayObj.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }

    //Create a new day with updated spots
    const day = { ...dayObj, spots };
    //Return an updated days array
    return state.days.map(d => d.name === state.day ? day : d);
  };

  //Sets current day
  const setDay = (day) => setState({ ...state, day });

  //Book an interview, store it in database, and decrease the number of open appointment spots for the day
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Update (decrease) the spots available on a given day and return updated days array
    const days = updateSpots(state, appointments);

    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days });
      });
  };

  //Cancel an interview, remove it from database, and increase the number of open appointment spots for the day
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Update (increase) the spots available on a given day and return updated days array
    const days = updateSpots(state, appointments);

    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};