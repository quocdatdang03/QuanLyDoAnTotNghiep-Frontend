import { Chip } from "@mui/material";
import { useState } from "react";

const DashboardCardItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-[10px] overflow-hidden text-white shadow-xl pb-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, ${props?.fromColor}, ${props?.toColor})`,
          opacity: isHovered ? 0 : 1,
          zIndex: 0,
        }}
      />
      {/* Hover Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to top right, ${props?.toColor}, ${props?.fromColor})`,
          opacity: isHovered ? 1 : 0,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative p-5 flex flex-col h-full z-10">
        <div className="flex flex-wrap md:flex-nowrap gap-3 items-start justify-between h-full">
          <div className="flex flex-col justify-between h-full gap-1">
            <h2 className="text-[16px] font-bold pb-2">{props?.cardTitle}</h2>
            <p className="text-4xl lg:text-[40px] font-bold">
              {props?.cardNumber}
            </p>
          </div>

          <div className="rounded-[10px] bg-gradient-to-br from-[#0000] to-[#0000004d] p-2">
            {props?.cardIcon}
          </div>
        </div>

        {/* <div className="flex items-center justify-between mt-auto pt-5">
          <p>Tất cả</p>
          <IconButton type="button">
            <FilterAltOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
        </div> */}
        <div className="flex items-center gap-3 mt-2">
          {props?.filterBy?.map((item, index) => (
            <Chip key={index} label={item} size="small" color="error" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCardItem;
