import { Dialog, Transition } from '@headlessui/react'
import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getAuth, updateProfile } from 'firebase/auth'
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage"
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarImage from "../../assets/AvatarImage.png"
import AvatarIcon from '../../components/AvatarIcon'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import { urls } from '../../constants/constants'
import useProfilePhoto from '../../hooks/useProfilePhoto'
import { updateDisplayName, updateProfilePhoto } from '../../store/auth'

const ProfileModal = ({ open, onClose }) => {
  const auth = getAuth();
  const storage = getStorage();
  
  const dispatch = useDispatch();
  const storeUsername = useSelector(state => state.auth.displayName);
  const [username, setUsername] = useState("");
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [image, setImage] = useState(null);

  const storeProfileSrc = useProfilePhoto();
  const [imageSrc, setImageSrc] = useState("");
  
  const hiddenFileInput = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    setUsername(storeUsername);
  },[storeUsername]);

  useEffect(() => {
    setImageSrc(storeProfileSrc);
  },[storeProfileSrc]);

  const profileChangeHandler = async() => {
    try {
      const photoUrl = auth.currentUser.photoURL;
      // delete current profile pic if it exists
      if (photoUrl) {
        const desertRef = ref(storage, photoUrl);
        await deleteObject(desertRef);
      }
    } catch (error) {
      updateProfile(auth.currentUser, {
        photoURL: ""
      });
    }

    try {

      // update username on firestore side first
      if (storeUsername !== username) {
        const response = await fetch(urls.backend + "/users/update/username", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            oldUsername: storeUsername,
            newUsername: username
          })
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        dispatch(updateDisplayName(username));
      }

      // upload new profile pic if it exists
      if (image) {
        const storageRef = ref(storage, "images/" + image.name);
        let response = await uploadBytes(storageRef, image);
        const uploadedPhotoURL = response.metadata.fullPath;
        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: uploadedPhotoURL
        });
        dispatch(updateProfilePhoto(uploadedPhotoURL));

        response = await fetch(urls.backend + "/users/update/photo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            photoUrl: uploadedPhotoURL
          })
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

      } else {
        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: ""
        });
        dispatch(updateProfilePhoto(""));

        const response = await fetch(urls.backend + "/users/update/photo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            photoUrl: ""
          })
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
      }
      onClose();
    } catch (error) {
      // TODO: error handling
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
    setImageSrc(null);
    setImage(null);
  }

  return (
    <Transition appear show={open} as={Fragment} >
      <Dialog onClose={onClose} className="relative z-50" initialFocus={titleRef}>
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
            <Dialog.Panel className="bg-white sm:p-[32px] pt-[11px] pl-[17px] pr-[13px] pb-[18px] shadow-lg w-[504px]">
              <div className="relative flex flex-col items-center">
                {editingPhoto && <ChevronLeftIcon className="absolute top-0 left-0 stroke-2 text-dark-gray cursor-pointer sm:w-[28px] w-[20px]" onClick={() => setEditingPhoto(false)}/>}
                <XMarkIcon className="absolute top-0 right-0 stroke-2 text-dark-gray cursor-pointer sm:w-[28px] w-[20px]" onClick={onClose} />
                <Dialog.Title className="font-medium sm:text-[25px] text-[22px] sm:leading-[28px] leading-[26px]" ref={titleRef}>Edit Profile</Dialog.Title>
                <AvatarIcon src={imageSrc === null ? AvatarImage : imageSrc} className="sm:mt-[24px] mt-[15px] sm:h-[139px] sm:w-[139px] w-[96px] h-[96px]" editPhoto={!editingPhoto ? () => setEditingPhoto(true) : null} />
                {editingPhoto ? 
                  <>
                    <SecondaryButton className="sm:mt-[50px] mt-[52px]" onClick={handleRemove}>Remove Current Photo</SecondaryButton>
                    <PrimaryButton className="mt-[18px]" onClick={() => hiddenFileInput.current.click()}>Upload Photo</PrimaryButton>
                    <input type="file" accept="image/*" className="hidden" ref={hiddenFileInput} onChange={handleUpload}/>
                  </>:
                  <>
                    <div className="sm:mt-[18px] mt-[10px] w-full font-medium text-[15px]">
                      <p>Username</p>
                      <input type="text" className="w-full h-[33px] py-[8px] pl-[16px] mt-[10px] border-gray border rounded-[4px]" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex justify-between w-full sm:mt-[18px] mt-[28px]">
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
