import React from "react";
import { useSelector } from "react-redux";
import Cog from "../../assets/cog.svg";
import ProfileHeaderImg from "../../assets/ProfileHeader.png";
import AvatarIcon from "../../components/AvatarIcon";
import useProfileDetails from "../../hooks/useProfileDetails";
import useProfilePhoto from "../../hooks/useProfilePhoto";

const ProfileHeader = ({ openSettings }) => {
  const username = useSelector(state => state.auth.displayName);
  const profilePhoto = useProfilePhoto();
  const profileDetails = useProfileDetails();

  return (
    <div className="header justify-center">
      <div className="HeaderImage">
        {/* w-screen */}
        <img className="w-full sm:h-[221px] h-[103px] object-cover" src={ProfileHeaderImg} />
      </div>
      <div className="userInfo">
        <div className="userImage flex justify-center sm:-mt-20 -mt-[70px]">
          <AvatarIcon
            src={profilePhoto}
            className="sm:h-[139px] sm:w-[139px] w-[109px] h-[109px]"
          />
        </div>

        <div className="userName flex items-center justify-center sm:mt-[13px] sm:mb-[18.5px] my-[7px] sm:text-[25px] text-[22.8px] font-medium ">
          <div className="sm:pr-2 pr-[3px] font-medium">@{username}</div>
          <img className="w-6 h-6 cursor-pointer" src={Cog} onClick={openSettings} />
        </div>

        <div className="userStats flex justify-center">
          <div className="flex border-dark-gray border rounded-full py-[10px] sm:w-[340px] w-[257px]">
            <div className="distCycled flex flex-col justify-center font-medium items-center w-1/2 border-dark-gray border-r-[1px]">
              <div className="stats sm:text-[25px] text-[18.9px] flex justify-center sm:leading-[29px] leading-[22px] min-w-max">
                {profileDetails === null ? 0 : profileDetails.TotalDistance} KM
              </div>
              <div className="type flex justify-center sm:text-[12px] text-[9px] text-dark-gray sm:leading-[14px] leading-[11px]">
                distance travelled
              </div>
            </div>
            <div className="durationCycled flex flex-col justify-center font-medium items-center w-1/2 border-dark-gray">
              <div className="stats sm:text-[25px] text-[18.9px] flex justify-center sm:leading-[29px] leading-[22px] min-w-max">
                {profileDetails === null ? 0 : profileDetails.TotalTime} MINS
              </div>
              <div className="type flex justify-center sm:text-[12px] text-[9px] text-dark-gray sm:leading-[14px] leading-[11px]">
                duration cycled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
