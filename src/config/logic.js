export const isPresentInTemporaryTeamMember = (
  student,
  temporaryTeamMember
) => {
  for (let item of temporaryTeamMember) {
    if (item.studentCode === student.studentCode) return true;
  }
  return false;
};
