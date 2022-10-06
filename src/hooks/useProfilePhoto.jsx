import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { getStorage, getDownloadURL, ref } from 'firebase/storage'
import AvatarImage from "../assets/AvatarImage.png"

const useProfilePhoto = () => {
  const auth = getAuth;
  const storage = getStorage();
  
  const [imageSrc, setImageSrc] = useState(AvatarImage)

  useEffect(() => {
    const updateProfileImage = async () => {
      const photoUrl = auth.currentUser.photoURL;
      if (photoUrl) {
        const url = await getDownloadURL(ref(storage, photoUrl));
        setImageSrc(url);
      }
    }
    updateProfileImage();
  },[auth.currentUser.photoURL]);

  return imageSrc;
}

export default useProfilePhoto
