import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import ProfileHeader from './ProfileHeader'
import ProfileModal from './ProfileModal'

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <MainLayout>
      <ProfileHeader openSettings={() => setShowModal(true)} />
      <ProfileModal open={showModal} onClose={() => setShowModal(false)} />
    </MainLayout>
  )
}

export default Profile
