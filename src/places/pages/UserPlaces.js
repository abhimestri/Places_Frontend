import React ,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
const UserPlaces = () => {
  const [loadedPlaces,  setLoadedPlaces] = useState();
  const [toggle,  setToggle] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`)
        setLoadedPlaces(responseData.places)
      } catch (err) {}
    }
    fetchPlaces();
  },[sendRequest,toggle, userId])
  
  const deletePlace = (deletedId) => {
    setLoadedPlaces(prevPlaces => {
      prevPlaces.filter(place => place.id !== deletedId)
    })
    if(toggle){
      setToggle(false)
    }else{
      setToggle(true)
    }
  }

  return <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading &&
      <div>
        <LoadingSpinner asOverlay/>
      </div>
    }
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={deletePlace} />}
  </React.Fragment>;
};

export default UserPlaces;
