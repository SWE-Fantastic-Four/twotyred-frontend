import React from "react";
import Cog from "../../assets/cog.svg";
import AvatarImage from "../../assets/AvatarImage.png";
import ProfileHeaderImg from "../../assets/ProfileHeader.png";
import AvatarIcon from "../../components/AvatarIcon";
import { getAuth } from "firebase/auth";

const ProfileHeader = ({ openSettings }) => {
  const auth = getAuth();
  const username = auth.currentUser.displayName;

  return (
    <div className="header justify-center">
      <div className="HeaderImage">
        <img className="w-screen h-60 object-cover" src={ProfileHeaderImg} />
      </div>
      <div className="userInfo">
        <div className="userImage flex justify-center -mt-20">
          <AvatarIcon
            src={AvatarImage}
            borderColour="white"
            className="border-0"
            size="[139px]"
          />
        </div>

        <div className="userName flex items-center justify-center m-4 text-2xl font-medium ">
          <div className="pr-2 font-medium">@{username}</div>
          <img className="w-6 h-6 cursor-pointer" src={Cog} onClick={openSettings} />
        </div>

        <div className="userStats flex justify-center">
          <div className="flex border-dark-gray border rounded-full">
            <div className="distCycled flex-col justify-center items-center w-40 my-2  px-3 border-dark-gray border-r-[1px]">
              <div className="stats text-xl flex justify-center font-medium">
                100 KM
              </div>
              <div className="type flex justify-center text-xs text-dark-gray">
                distance travelled
              </div>
            </div>
            <div className="durationCycled flex-col justify-center items-center w-40 my-2  px-3 border-dark-gray">
              <div className="stats text-xl flex justify-center font-medium">
                100 MINS
              </div>
              <div className="type flex justify-center text-xs text-dark-gray">
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
