import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../errors/NotFound";
import { ProjectManager } from "./ProjectManager/ProjectManager";
import { StudentManager } from "./StudentManager/StudentManager";
import ProgressManager from "../studentComponent/ProgressManager/ProgressManager";
import { TeacherDocument } from "./TeacherDocument/TeacherDocument";
import { TeacherAnnouncement } from "./Announcement/TeacherAnnouncement";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/announcements" element={<TeacherAnnouncement />} />
      <Route path="/projects" element={<ProjectManager />} />
      <Route path="/students" element={<StudentManager />} />
      <Route path="/progresses" element={<ProgressManager />} />
      <Route path="/documents" element={<TeacherDocument />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TeacherRoutes;
