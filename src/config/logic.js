export const isPresentInTemporaryTeamMember = (
  student,
  temporaryTeamMember
) => {
  for (let item of temporaryTeamMember) {
    if (item.studentCode === student.studentCode) return true;
  }
  return false;
};

export const isStudentPresentInList = (student, studentList) => {
  for (let item of studentList) {
    if (student.studentCode === item.studentCode) return true;
  }

  return false;
};
