import React from "react";
import "./App.css";

function Display({ student }) {
  return (
    <div className="page">
      <div className="card">
        <h1>Student Details</h1>

        {student ? (
          <div className="details">
            <p>
              <strong>Name:</strong> {student.name}
            </p>

            <p>
              <strong>Age:</strong> {student.age}
            </p>

            <p>
              <strong>Course:</strong> {student.course}
            </p>

            <p>
              <strong>Email:</strong> {student.email}
            </p>
          </div>
        ) : (
          <p>No student information available.</p>
        )}
      </div>
    </div>
  );
}

export default Display;
