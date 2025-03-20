import React from "react";
import { Route, Routes } from "react-router-dom";
import TeamRegister from "./TeamRegister/TeamRegister";
import StudentDocument from "./StudentDocument/StudentDocument";
import NotFound from "../errors/NotFound";
import TeamDetails from "./TeamRegister/TeamDetails";
import ProjectRegister from "./ProjectRegister/ProjectRegister";
import FormEditProject from "./ProjectRegister/FormEditProject";
import FormCreateProgressReport from "./ProgressManager/ProgressReport/FormCreateProgressReport";
import StudentProgressManager from "./ProgressManager/StudentProgressManager";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/project/register" element={<ProjectRegister />} />
      <Route path="/project/edit" element={<FormEditProject />} />
      <Route path="/teams/register" element={<TeamRegister />} />
      <Route path="/teams/details" element={<TeamDetails />} />
      <Route path="/progress/manage" element={<StudentProgressManager />} />
      <Route path="/progress/create" element={<FormCreateProgressReport />} />
      <Route path="/documents" element={<StudentDocument />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;
