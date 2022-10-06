import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import AvatarIcon from '../../components/AvatarIcon'
import AvatarImage from "../../assets/AvatarImage.png"
import { updateProfile, getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useProfilePhoto from '../../hooks/useProfilePhoto'

const ProfileModal = ({ open, onClose }) => {
  const auth = getAuth();
  const storage = getStorage();
  
  const [username, setUsername] = useState(auth.currentUser.displayName);
  const [editingPhoto, setEditingPhoto] = useState(false);

  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const updateProfileImage = async () => {
      const photoUrl = auth.currentUser.photoURL;
      if (photoUrl) {
        const url = await getDownloadURL(ref(storage, photoUrl));
        setImageSrc(url);
      }
    }
    updateProfileImage();
  }, [])
  
  
  const profileChangeHandler = async() => {
    try {
      const storageRef = ref(storage, "images/" + image.name);
      const response = await uploadBytes(storageRef, image);
      const uploadedPhotoURL = response.metadata.fullPath;
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: uploadedPhotoURL
      });
      setUsername("");
      onClose();
    } catch (error) {
      // Redirect to 404 page
      console.error(error.message);
    }
  }

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageSrc(URL.createObjectURL(file));
    }
  }

  const handleRemove = () => {
    setImage(null);
  }

  return (
    <Transition appear show={open} as={Fragment} >
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-75" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white p-[32px] shadow-lg w-[504px]">
              <div className="relative flex flex-col items-center">
                {editingPhoto && <ChevronLeftIcon className="absolute top-0 left-0 stroke-2 text-dark-gray cursor-pointer" height={28} width={28} onClick={() => setEditingPhoto(false)}/>}
                <XMarkIcon className="absolute top-0 right-0 stroke-2 text-dark-gray cursor-pointer" height={28} width={28} onClick={onClose} />
                <Dialog.Title className="font-medium text-[25px] leading-[28px]" >Edit Profile</Dialog.Title>
                <AvatarIcon src={imageSrc === null ? AvatarImage : imageSrc} size="[139px]" className="border-0 mt-[24px]" editPhoto={!editingPhoto ? () => setEditingPhoto(true) : null} />
                {editingPhoto ? 
                  <>
                    <SecondaryButton className="mt-[50px]" onClick={handleRemove}>Remove Current Photo</SecondaryButton>
                    <PrimaryButton className="mt-[18px]" onClick={() => hiddenFileInput.current.click()}>Upload Photo</PrimaryButton>
                    <input type="file" accept="image/*" className="hidden" ref={hiddenFileInput} onChange={handleUpload}/>
                  </>:
                  <>
                    <div className="mt-[18px] w-full font-medium text-[15px]">
                      <p>Username</p>
                      <input type="text" className="w-full h-[33px] py-[8px] pl-[16px] mt-[10px] border-gray border rounded-[4px]" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex justify-between w-full mt-[18px]">
                      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                      <PrimaryButton onClick={profileChangeHandler}>Make Changes</PrimaryButton>
                    </div>
                  </>
                  }
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ProfileModal
