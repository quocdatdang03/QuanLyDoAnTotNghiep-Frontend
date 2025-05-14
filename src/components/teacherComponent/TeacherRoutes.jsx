import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../errors/NotFound";
import { TeacherDocument } from "./TeacherDocument/TeacherDocument";
import InstructorDivision from "./InstructorDivision/InstructorDivision";
import { useSelector } from "react-redux";
import Forbidden from "../errors/Forbidden";
import InstructorDivisionResult from "./InstructorDivision/InstructorDivisionResult";
import StudentManager from "./StudentManager/StudentManager";
import ProjectManager from "./ProjectManager/ProjectManager";
import FormCreateProgressReview from "./ProgressManager/ProgressReview/FormCreateProgressReview";
import TeacherProgressManager from "./ProgressManager/TeacherProgressManager";
import StageManager from "./StageManager/StageManager";
import TeacherProgressManagerDetail from "./ProgressManager/TeacherProgressManagerDetail";
import FormEditStage from "./StageManager/FormEditStage";
import FormUpdateProgressReview from "./ProgressManager/ProgressReview/FormUpdateProgressReview";
import TeacherNotification from "./Notification/TeacherNotification";
import InstructorProjectSummary from "./InstructorProjectSummary/InstructorProjectSummary";

const TeacherRoutes = () => {
  const { authReducer } = useSelector((store) => store);

  return (
    <Routes>
      <Route path="/notifications" element={<TeacherNotification />} />
      <Route path="/projects" element={<ProjectManager />} />
      <Route path="/students" element={<StudentManager />} />
      <Route path="/progress/manage" element={<TeacherProgressManager />} />
      <Route
        path="/progress/detail/project/:projectId"
        element={<TeacherProgressManagerDetail />}
      />
      <Route
        path="/progress/:progressReportId/project/:projectId/review/create"
        element={<FormCreateProgressReview />}
      />
      <Route
        path="/progress/:progressReportId/project/:projectId/review/:progressReviewId/update"
        element={<FormUpdateProgressReview />}
      />
      <Route path="/stages" element={<StageManager />} />
      <Route path="/stages/edit/:stageId" element={<FormEditStage />} />
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
      <Route
        path="/instructors/results"
        element={
          authReducer.user?.userDetails.isLeader ? (
            <InstructorDivisionResult />
          ) : (
            <Forbidden />
          )
        }
      />
      <Route
        path="/projects/summary"
        element={
          authReducer.user?.userDetails.isLeader ? (
            <InstructorProjectSummary />
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
