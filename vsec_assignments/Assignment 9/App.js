import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Input from "./Input";
import Display from "./Display";

function App() {
  const [student, setStudent] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Input setStudent={setStudent} />}
        />

        <Route
          path="/display"
          element={<Display student={student} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
