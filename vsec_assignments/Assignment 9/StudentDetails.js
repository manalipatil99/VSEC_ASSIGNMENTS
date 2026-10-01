import React, { useState } from "react";
import "./StudentDetails.css";

function StudentDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1>Student Information</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter your course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="student-info">
          <h2>Student Details</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Course:</strong> {course}</p>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;