import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import ProfileHeader from './ProfileHeader'
import ProfileModal from './ProfileModal'
import ProfileBody from './ProfileBody'

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
