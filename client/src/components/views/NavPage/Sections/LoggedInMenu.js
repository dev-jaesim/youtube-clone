import React from "react";
import { useSelector } from "react-redux";

function LoggedInMenu() {
  let listLength = 0;
  const videoState = useSelector((state) => state.video);
  if (videoState.list) {
    listLength = videoState.list.length;
  }

  return (
    <div>
      <h1>{listLength}</h1>
    </div>
  );
}

export default LoggedInMenu;
