import React from "react";
import { Route, Routes } from "react-router-dom";
import InstructorRegister from "./InstructorRegister/InstructorRegister";
import TeamRegister from "./TeamRegister/TeamRegister";
import ProgressManager from "./ProgressManager/ProgressManager";
import StudentDocument from "./StudentDocument/StudentDocument";
import NotFound from "../errors/NotFound";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/instructors/register" element={<InstructorRegister />} />
      <Route path="/teams/register" element={<TeamRegister />} />
      <Route path="/progress/manage" element={<ProgressManager />} />
      <Route path="/documents" element={<StudentDocument />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;
