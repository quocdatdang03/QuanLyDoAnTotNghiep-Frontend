import React from "react";
import { useDispatch, useSelector } from "react-redux";
import userImageDefault from "../../assets/images/default-avatar.png";
import { Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import FormUpdateProfile from "./FormUpdateProfile";

const Profile = () => {
  const { authReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-12 w-[90%] lg:w-[80%] xl:w-[60%] py-10">
          <div className="col-span-12 md:col-span-4 flex flex-col items-center justify-center gap-y-5 bg-blue-300 py-10 md:py-20">
            <img
              className="w-20 h-20 rounded-full object-cover object-center"
              src={authReducer.user?.image || userImageDefault}
              alt="user image"
            />
            <div className="text-center">
              <div className="space-y-1">
                <h1>Dang Quoc Dat</h1>
                <p>21115053120309</p>
              </div>
              <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                startIcon={<BorderColorIcon />}
                onClick={() => navigate("/user/profile/update")}
              >
                Cập nhật thông tin
              </Button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 bg-gray-200 p-5">
            <Routes>
              <Route path="" element={<ProfileDetails />} />
              <Route path="/update" element={<FormUpdateProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
