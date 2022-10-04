import React from 'react';
import Cog from "../../assets/Cog.svg"
import AvatarImage from '../../assets/AvatarImage.png';
import ProfileHeaderImg from "../../assets/ProfileHeader.png";
import AvatarIcon from "../../components/AvatarIcon";


const profileHeader = () => {
    
    return (
        <div className="header justify-center">

            <div className="HeaderImage">
                <img className = "w-screen h-60 object-cover" src={ProfileHeaderImg}/>
            </div>

            <div className="userInfo">

                <div className="userImage flex justify-center -mt-20">
                    <AvatarIcon 
                        src={AvatarImage} 
                        size="40" 
                        borderWidth="8" 
                        borderColour="white"/>
                </div>

                <div className="userName flex items-center justify-center m-4 text-2xl font-medium ">
                    <div className="pr-2 font-medium">@Chay002</div>
                    <img className="w-6 h-6" src={Cog}/>
                </div>

                <div className="userStats flex justify-center">
                    <div className="flex border-light-gray border-2 rounded-full">
                        <div className="distCycled flex-col justify-center items-center w-40 my-2  px-3 border-light-gray border-r-[1px]">
                            <div className="stats text-xl flex justify-center font-medium">100 KM</div>
                            <div className="type flex justify-center text-xs text-light-gray">distance travelled</div>
                        </div>
                        <div className="durationCycled flex-col justify-center items-center w-40 my-2  px-3 border-light-gray border-l-[1px]">
                            <div className="stats text-xl flex justify-center font-medium">100 MINS</div>
                            <div className="type flex justify-center text-xs text-light-gray">duration cycled</div>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default profileHeader
