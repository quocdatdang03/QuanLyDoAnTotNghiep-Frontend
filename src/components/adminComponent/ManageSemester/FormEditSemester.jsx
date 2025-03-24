import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { formSemesterValidation } from "./validation/formSemesterValidation";
import { updateSemesterAction } from "../../../redux/Semester/Action";
import toast from "react-hot-toast";

const FormEditSemester = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { semesterReducer, schoolYearReducer } = useSelector((store) => store);
  const isSemesterLoading = semesterReducer.isLoading;

  // handle create school year:
  const formik = useFormik({
    enableReinitialize: true, // Cho phép Formik cập nhật initialValues khi prop thay đổi
    validationSchema: formSemesterValidation,
    initialValues: {
      semesterName: semesterReducer.semester?.semesterName || "",
      schoolYearId: semesterReducer.semester?.schoolYear.schoolYearId || "",
      isCurrent: semesterReducer.semester?.isCurrent || false,
    },
    onSubmit: (values) => {
      const requestData = {
        semesterId: semesterReducer.semester?.semesterId,
        semesterData: {
          ...values,
        },
        navigate,
        isSemesterLoading,
        toast,
      };

      console.log(values);
      dispatch(updateSemesterAction(requestData));
    },
  });

  return (
    <>
      <div className="mb-5">
        <Button
          variant="outlined"
          color="info"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/manage-semester")}
        >
          Quay lại
        </Button>
      </div>
      <Paper className="p-5">
        <h2 className="text-center uppercase text-xl font-bold">
          Chỉnh sửa học kỳ
        </h2>
        <div>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label
                htmlFor="semesterName"
                className="block mb-2 text-sm font-medium"
              >
                Học kỳ
              </label>
              <TextField
                label="Nhập học kỳ"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="number"
                name="semesterName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.semesterName}
                error={
                  formik.errors.semesterName &&
                  Boolean(formik.errors.semesterName)
                }
                helperText={
                  formik.errors.semesterName && formik.errors.semesterName
                }
              />
            </div>
            <div>
              <label
                htmlFor="schoolYearId"
                className="block mb-2 text-sm font-medium"
              >
                Chọn năm học
              </label>
              <FormControl
                fullWidth
                error={Boolean(
                  formik.errors.schoolYearId && formik.touched.schoolYearId
                )}
              >
                <InputLabel>Năm học</InputLabel>
                <Select
                  value={formik.values.schoolYearId}
                  label="Năm học"
                  name="schoolYearId"
                  onChange={formik.handleChange}
                >
                  {schoolYearReducer.schoolYears?.map((item) => {
                    return (
                      <MenuItem
                        key={item.schoolYearId}
                        value={item.schoolYearId}
                      >
                        {item.schoolYearName}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.errors.schoolYearId && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.schoolYearId}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox />}
                name="isCurrent"
                checked={formik.values.isCurrent}
                onChange={formik.handleChange}
                label="Là học kỳ hiện tại"
                className="select-none"
              />
            </div>
            <Button
              fullWidth
              variant="contained"
              sx={{ paddingY: 1 }}
              type="submit"
              // loading={isDelayedLoading}
            >
              Cập nhật
            </Button>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default FormEditSemester;
