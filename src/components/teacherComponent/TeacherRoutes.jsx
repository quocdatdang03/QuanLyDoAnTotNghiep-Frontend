import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../errors/NotFound";
import { ProjectManager } from "./ProjectManager/ProjectManager";
import { StudentManager } from "./StudentManager/StudentManager";
import ProgressManager from "../studentComponent/ProgressManager/ProgressManager";
import { TeacherDocument } from "./TeacherDocument/TeacherDocument";
import { TeacherAnnouncement } from "./Announcement/TeacherAnnouncement";
import InstructorDivision from "./InstructorDivision/InstructorDivision";
import { useSelector } from "react-redux";
import Forbidden from "../errors/Forbidden";

const TeacherRoutes = () => {
  const { authReducer } = useSelector((store) => store);

  return (
    <Routes>
      <Route path="/announcements" element={<TeacherAnnouncement />} />
      <Route path="/projects" element={<ProjectManager />} />
      <Route path="/students" element={<StudentManager />} />
      <Route path="/progresses" element={<ProgressManager />} />
      <Route path="/documents" element={<TeacherDocument />} />
      <Route
        path="/instructors"
        element={
          authReducer.user?.userDetails.isLeader ? (
            <InstructorDivision />
          ) : (
            <Forbidden />
          )
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TeacherRoutes;
