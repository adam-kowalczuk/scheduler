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
  // const updateSpots = (id) => {
  //   //Find the day where the appointment is booked
  //   const foundDay = state.days.find((day) => day.appointments.includes(id));
  //   //Increase or decrease the number of open appointment spots by 1 for every null interview
  //   const days = state.days.map((day) => {
  //     if (day.name === foundDay.name) {
  //       if (state.appointments[id].interview === null) {
  //         return { ...day, spots: day.spots - 1 };
  //       } else {
  //         return { ...day, spots: day.spots + 1 };
  //       }
  //     } else {
  //       return { ...day };
  //     }
  //   });

  //   return days;
  // };

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

    const foundDay = state.days.find((day) => day.appointments.includes(id));
    //Increase or decrease the number of open appointment spots by 1 for every null interview
    const days = state.days.map((day) => {
      if (day.name === foundDay.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return { ...day };
      }
    });

    //Update (decrease) the spots available on given day
    // const days = updateSpots(id);

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

    const foundDay = state.days.find((day) => day.appointments.includes(id));
    //Increase or decrease the number of open appointment spots by 1 for every null interview
    const days = state.days.map((day) => {
      if (day.name === foundDay.name && state.appointments[id].interview !== null) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return { ...day };
      }
    });

    //Update (increase) the spots available on a given
    // const days = updateSpots(id);

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