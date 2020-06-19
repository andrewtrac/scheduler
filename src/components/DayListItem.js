import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (spotsObject) => {
    if (!spotsObject) {
      return `no spots remaining`;
    } else if (spotsObject === 1) {
      return `${spotsObject} spot remaining`;
    } else {
      return `${spotsObject} spots remaining`;
    }
  };

  return (
    <li
      className={dayClass}
      data-testid="day"
      onClick={() => props.setDay(props.name)}
    >
      <h2>{props.name}</h2>
      <h5>{formatSpots(props.spots)}</h5>
    </li>
  );
}
