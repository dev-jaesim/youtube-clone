import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { test } from "../../../_actions/user_actions";

function TestPage() {
  const dispatch = useDispatch();
  const [msg, setmsg] = useState("");

  useEffect(() => {
    dispatch(test()).then((response) => setmsg(response.payload.message));
  }, [dispatch]);

  return (
    <div>
      <h1>{msg}</h1>
    </div>
  );
}

export default TestPage;
