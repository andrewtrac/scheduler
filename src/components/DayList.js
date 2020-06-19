import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const dayArray = props.days.map((day, i) => {
    return (
      <DayListItem
        key={i}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <>{dayArray}</>;
}
