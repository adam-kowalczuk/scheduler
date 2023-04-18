import React from "react";

import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const listClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">Day Name</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}

// day-list__item all the time
// day-list__item--selected class name if props.selected is true
// day-list__item--full class name if props.spots is 0.