import React from "react";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const { authReducer } = useSelector((store) => store);
  const userInfo = authReducer.user;

  return (
    <>
      <div className="border-b border-gray-400 pb-1">
        <h1 className="font-semibold text-gray-600">Thông tin cá nhân</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-5 mt-4">
        <p>
          <b className="pr-2">Email:</b>
          <span>{userInfo?.email}</span>
        </p>
        <p>
          <b className="pr-2">Ngày sinh:</b>
          <span>
            {new Date(userInfo?.dateOfBirth).toLocaleDateString("en-GB")}
          </span>
        </p>
        <p>
          <b className="pr-2">Số điện thoại:</b>
          <span>{userInfo?.phoneNumber}</span>
        </p>
        <p>
          <b className="pr-2">Giới tính:</b>
          <span>{userInfo?.gender ? "Nam" : "Nữ"}</span>
        </p>
        <p>
          <b className="pr-2">Địa chỉ:</b>
          <span>{userInfo?.address}</span>
        </p>
        <p>
          <b className="pr-2">Chức vụ:</b>
          <span>
            {userInfo?.roles[0].roleName === "STUDENT"
              ? "Sinh viên"
              : "Giảng viên"}
          </span>
        </p>
      </div>
    </>
  );
};

export default ProfileDetails;
