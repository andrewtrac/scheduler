import React, { useState } from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const listItemClass = classNames({
    interviewers__item: true,
    "interviewers__item--selected": props.selected,
  });

  const imageListItemClass = classNames({
    "interviewers__item-image": true,
    "interviewers__item-image--selected": props.selected,
  });

  return (
    <li className={listItemClass} onClick={props.setInterviewer}>
      <img className={imageListItemClass} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
}
