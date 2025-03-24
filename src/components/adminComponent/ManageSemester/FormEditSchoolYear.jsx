import { Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { formSchoolYearValidation } from "./validation/formSchoolYearValidation";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { updateSchoolYearAction } from "../../../redux/SchoolYear/Action";
import toast from "react-hot-toast";

const FormEditSchoolYear = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schoolYearReducer } = useSelector((store) => store);
  const isSchoolYearLoading = schoolYearReducer.isLoading;
  const [isDelayedLoading, setIsDelayedLoading] = useState(false);

  // handle create school year:
  const formik = useFormik({
    enableReinitialize: true, // Cho phép Formik cập nhật initialValues khi prop thay đổi
    validationSchema: formSchoolYearValidation,
    initialValues: {
      startYear: schoolYearReducer.schoolYear?.startYear || "",
      endYear: schoolYearReducer.schoolYear?.endYear || "",
    },
    onSubmit: (values) => {
      const requestData = {
        schoolYearId: schoolYearReducer.schoolYear?.schoolYearId,
        schoolYearData: {
          startYear: values.startYear,
          endYear: values.endYear,
        },
        navigate,
        toast,
      };
      dispatch(updateSchoolYearAction(requestData));
    },
  });

  // handle loading:
  useEffect(() => {
    if (isSchoolYearLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isSchoolYearLoading]);

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
        <h2 className="text-center uppercase text-xl font-bold mb-5">
          Chỉnh sửa năm học
        </h2>
        <div>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="startYear"
                  className="block mb-2 text-sm font-medium"
                >
                  Năm bắt đầu
                </label>
                <TextField
                  label="Nhập năm bắt đầu (e.g. 2024)"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="number"
                  name="startYear"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startYear}
                  error={
                    formik.errors.startYear && Boolean(formik.errors.startYear)
                  }
                  helperText={
                    formik.errors.startYear && formik.errors.startYear
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="endYear"
                  className="block mb-2 text-sm font-medium"
                >
                  Năm kết thúc
                </label>
                <TextField
                  label="Nhập kết thúc (e.g. 2025)"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="number"
                  name="endYear"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endYear}
                  error={
                    formik.errors.endYear && Boolean(formik.errors.endYear)
                  }
                  helperText={formik.errors.endYear && formik.errors.endYear}
                />
              </div>
            </div>
            <Button
              fullWidth
              variant="contained"
              sx={{ paddingY: 1 }}
              type="submit"
              loading={isDelayedLoading}
            >
              Cập nhật
            </Button>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default FormEditSchoolYear;
