import React from "react";
import axios from "axios";

function TestPage() {
  axios.get("/api/users/test").then((response) => {
    console.log(response.data);
  });
  return (
    <div>
      <h1>Hello from Test Page</h1>
    </div>
  );
}

export default TestPage;
