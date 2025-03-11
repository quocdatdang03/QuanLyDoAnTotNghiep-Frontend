export const isPresentInTemporaryTeamMember = (
  student,
  temporaryTeamMember
) => {
  for (let item of temporaryTeamMember) {
    if (item.studentCode === student.studentCode) return true;
  }
  return false;
};

export const isPresentInChoosenStudentsList = (student, choosenStudents) => {
  for (let item of choosenStudents) {
    if (student.studentCode === item.studentCode) return true;
  }

  return false;
};
