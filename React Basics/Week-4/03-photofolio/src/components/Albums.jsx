/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import useAlbumReducer from '../useAlbumReducer';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseInit/';
import { CircularProgress } from '@mui/material';
const Albums = ({ setShowImages }) => {
  // using custom hook to manage the reducer in another file
  const { state, dispatch } = useAlbumReducer();
  // state to show form to add album
  const [showForm, setShowForm] = useState(false);
  // state to manage loading spinner
  const [isLoading, setIsLoading] = useState(true);
  // ref to input
  const albumRef = useRef(null);
  // clicking on add album button shows the form
  const handleAddAlbum = () => {
    setShowForm((prevState) => !prevState);
  };
  // clicking on clear button clears the input field
  const handleClear = () => {
    albumRef.current.value = '';
  };
  // function to create album and save it to database and update the reducer's state
  const handleCreate = async () => {
    const albumName = albumRef.current.value.trim();
    const createdAt = new Date();
    try {
      const docRef = await addDoc(collection(db, 'albums'), {
        albumName,
        createdAt,
      });
      dispatch({
        type: 'ADD_ALBUM',
        payload: { id: docRef.id, albumName, createdAt },
      });
    } catch (error) {
      console.error(error);
    }
  };
  // getting the album from the db REAL-TIME
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'albums'), (result) => {
      const albums = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: 'GET_ALBUMS', payload: { albums } });
      setIsLoading(false);
    });
    // Return a cleanup function to unsubscribe from real-time updates
    return () => unsubscribe();
  }, []);
  return (
    <main>
      {showForm && (
        <div id='album-form_container' className='form_container'>
          <p>Create an Album</p>
          <input
            type='text'
            placeholder='Enter Album name'
            ref={albumRef}
            required
          />
          <button id='clear-btn' type='button' onClick={handleClear}>
            Clear
          </button>
          <button id='create-btn' type='button' onClick={handleCreate}>
            Create
          </button>
        </div>
      )}
      <div id='albums-heading' className='heading'>
        <h1>Your Albums</h1>
        <button
          onClick={handleAddAlbum}
          style={{
            backgroundColor: showForm && '#800e1350',
            color: showForm && '#dd1a24',
            border: showForm && '2px solid #800e13',
          }}
        >
          {!showForm ? 'Add Album' : 'Cancel'}
        </button>
      </div>
      {isLoading ? (
        <div
          style={{
            height: showForm ? 'calc( 100% - 12rem )' : 'calc( 100% - 4rem )',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress sx={{ color: '#7d8cc4ff' }} />
        </div>
      ) : state.albums.length > 0 ? (
        <div
          id='albums-container'
          className='container'
          style={{ height: showForm && 'calc( 100% - 12rem )' }}
        >
          {state.albums.map((album) => {
            return (
              <div
                className='album-item item'
                key={album.id}
                onClick={() => setShowImages(album)}
              >
                <div className='album-icon icon'>
                  <i className='fa-regular fa-images'></i>
                </div>
                <p className='album-name name'>{album.albumName}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <h2 style={{ color: '#f7f7f9ff', marginTop: '2rem' }}>No Albums Yet</h2>
      )}
    </main>
  );
};
export default Albums;
