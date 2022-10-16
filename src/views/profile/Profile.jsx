import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import ProfileBody from './ProfileBody'
import ProfileHeader from './ProfileHeader'
import ProfileModal from './ProfileModal'

/* 
  Profile.jsx implements the User Profile boundary class.
  
  The attributes implemented are: 
  1. username within ProfileHeader.jsx, 
  2. totalDistance as profileDetails.TotalDistance within ProfileHeader.jsx, 
  3. totalDuration as profileDetails.TotalTime within ProfileHeader.jsx,
  4. pastRoutes as routes within ProfileBody.jsx,
  5. favouriteRoutes as favouriteRoutes within ProfileBody.jsx

  The key public methods are:
  1. updateProfilePicture() under profileChangeHandler() inside ProfileModal, which updates the user's profile picture
  2. updateUsername() under profileChangeHandler() inside ProfileModal, which updates the user's username
  3. userRoutes() under obtainFavouriteRoutes() and obtainRoutes() inside ProfileBody, which retrieves the list of routes from the user
  4. queryUser() under useProfileDetails() inside ProfileHeader, which retrieves information about the user like distance cycled
  
  @author chayhuixiang
*/

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <MainLayout>
      <ProfileHeader openSettings={() => setShowModal(true)} />
      <ProfileBody className="sm:my-[36px] my-[5px]" />
      <ProfileModal open={showModal} onClose={() => setShowModal(false)} />
    </MainLayout>
  )
}

export default Profile
