import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { urls } from '../constants/constants';

const useProfileDetails = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const username = useSelector(state => state.auth.displayName);

  useEffect(() => {
    const fetchUserDetails = async() => {
      try {
        const response = await fetch(urls.backend + `/users/query/${username}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText)
        }
        const userData = await response.json();
        setProfileDetails(userData);
      } catch (error) {
        console.error(error.message);
      }
    }
    if (username) {
      fetchUserDetails();
    }
  },[username]);

  return profileDetails;
}

export default useProfileDetails;
