import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AvatarImage from "../assets/AvatarImage.png"

const useProfilePhoto = () => {
  const storage = getStorage();
  const photoUrl = useSelector(state => state.auth.photoUrl);
  const [profileSrc, setProfileSrc] = useState(AvatarImage);

  useEffect(() => {
    const updateProfileImage = async () => {
      if (photoUrl) {
        try {
          const url = await getDownloadURL(ref(storage, photoUrl));
          setProfileSrc(url);
        } catch (error) {
          console.log(error);
        }
      } else {
        setProfileSrc(AvatarImage);
      }
    }
    updateProfileImage();
  },[photoUrl]);

  return profileSrc;
}

export default useProfilePhoto
