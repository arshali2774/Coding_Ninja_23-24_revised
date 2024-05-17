import { useEffect, useRef, useState } from 'react';
import useImageReducer from '../useImageReducer';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebaseInit';
import { CircularProgress, Modal } from '@mui/material';
/* eslint-disable react/prop-types */
const Images = ({ setShowImages, showImages }) => {
  // custom hook to manage the reducer in seprate file
  const { state, dispatch } = useImageReducer();
  // getting the id of the album which we clicked on
  const id = showImages.id;
  // state to manage loading spinner
  const [isLoading, setIsLoading] = useState(true);
  // this state helps in editing, deleting. by storing the image which has been clicked on
  const [selectedImage, setSelectedImage] = useState(null);
  // state to manage open and close confirm delete modal
  const [openModal, setOpenModal] = useState(false);
  // state to open and close carousel
  const [openCarousel, setOpenCarousel] = useState(false);
  // state to toggle form display
  const [showForm, setShowForm] = useState(false);
  // this state stores the index of the image in state.images array, which is displayed in carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  // this state helps in search feature by storing the search term
  const [searchTerm, setSearchTerm] = useState('');
  // ref to first input: image name
  const inputNameRef = useRef(null);
  // ref to second input: image url
  const inputUrlRef = useRef(null);
  // clearing the input field
  const handleClear = () => {
    inputNameRef.current.value = '';
    inputUrlRef.current.value = '';
  };
  // adding the image to db and reducer's state
  // here the image is being added as a sub doc to the selected album,
  // now this "images" is collection it self but as a sub doc
  // this images collection stores all the images in that album.
  const handleCreate = async () => {
    const imageName = inputNameRef.current.value;
    const imageUrl = inputUrlRef.current.value;
    try {
      const docRef = await addDoc(collection(db, 'albums', id, 'images'), {
        imageName,
        imageUrl,
      });
      dispatch({
        type: 'ADD_IMAGE',
        payload: { id: docRef.id, imageName, imageUrl },
      });
    } catch (error) {
      console.error(error);
    }
  };
  // updating the image name and/or image url
  // here we are passing the album id and image id.
  // so basically we are updating some image in some album.
  const handleUpdate = async (image) => {
    const imageName = inputNameRef.current.value;
    const imageUrl = inputUrlRef.current.value;
    try {
      await updateDoc(doc(db, 'albums', id, 'images', image.id), {
        imageName,
        imageUrl,
      });
      dispatch({
        type: 'UPDATE_IMAGE',
        payload: { id: image.id, imageName, imageUrl },
      });
    } catch (error) {
      console.error(error);
    }
  };
  // getting the images in REAL-TIME
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'albums', id, 'images'),
      (result) => {
        const images = result.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: 'GET_IMAGES', payload: { images } });
        setIsLoading(false);
      }
    );

    // Return a cleanup function to unsubscribe from real-time updates
    return () => unsubscribe();
  }, []);
  // when clicked on edit icon in the image div, form is displayed and selectedImage state is updated with the details of selected image.
  const handleEdit = (image) => {
    setShowForm(true);
    setSelectedImage(image);
  };
  // when clicked in bin icon, a confirm modal is displayed and selectedImage is updated with the data of the image to be deleted
  const handleRemove = (image) => {
    setOpenModal(true);
    setSelectedImage(image);
  };
  // when clicked on add Image removing data from selectedImage state and displaying the form
  const handleAddImage = () => {
    setSelectedImage(null);
    setShowForm((prevState) => !prevState);
  };
  // when clicking on yes button in confirm modal deletes the image.
  const handleDelete = async (image) => {
    try {
      await deleteDoc(doc(db, 'albums', id, 'images', image.id));
      dispatch({
        type: 'DELETE_IMAGE',
        payload: { id: image.id },
      });
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  // when clicked on an image, carousel is opened and selectedImage is updated with the image data that was clicked on.
  // also we find the index of the image in the reducer's state array and set the current idx to that.
  //  lets say there are 5 images then these will be the array indexes.[0,1,2,3,4].
  // so we are comparing the imageId in state with the id of the image that was clicked on to find the index.
  const handleImageClick = (image) => {
    setOpenCarousel(true);
    setSelectedImage(image);
    const idx = state.images.findIndex((img) => img.id === image.id);
    setCurrentIndex(idx);
  };
  // when clicking on right arrow icon we get the nextIndex by calculating it from the currentIndex and making sure it does not goes out of bounds and loops through the array.
  // we are updating the currentIndex to nextIndex.
  // then we are finding the image at the nextIndex and updating selectedImage data to that image which eventually will show the next image in the carousel.
  const handleRight = () => {
    const nextIndex = (currentIndex + 1) % state.images.length;
    setCurrentIndex(nextIndex);
    const findImg = state.images[nextIndex];
    setSelectedImage(findImg);
  };
  // same concept here but in reverse.
  const handleLeft = () => {
    const nextIndex =
      currentIndex === 0 ? state.images.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
    const findImg = state.images[nextIndex];
    setSelectedImage(findImg);
  };
  // Define a debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  // Define a debounced search function
  const debouncedSearch = debounce((term) => {
    dispatch({ type: 'SEARCH', payload: { searchTerm: term } });
  }, 300);
  // Update the debounced search function whenever searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);
  // Handle input change
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };
  //we are using debounce becoz it is the correct way to implement the search feature.
  // instead of creating our own debounce function we could have used lodash debounce function.
  return (
    <main>
      <Modal
        open={openModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div id='modal_div'>
          <h2>{`Do you want to delete ${selectedImage?.imageName} image?`}</h2>
          <div id='btn_div'>
            <button
              type='button'
              className='btn_modal btn-no'
              onClick={() => setOpenModal(false)}
            >
              No
            </button>
            <button
              type='button'
              className='btn_modal btn-yes'
              onClick={() => handleDelete(selectedImage)}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={openCarousel}>
        <div id='carousel'>
          <button id='close-carousel' onClick={() => setOpenCarousel(false)}>
            <i className='fa-solid fa-circle-xmark'></i>
          </button>
          <div id='carousel_div'>
            <button className='carousel-btn btn-left' onClick={handleLeft}>
              <i className='fa-solid fa-caret-left'></i>
            </button>
            <img
              src={selectedImage?.imageUrl}
              alt={selectedImage?.imageName}
              width={'600px'}
              height={'400px'}
            />
            <button className='carousel-btn btn-right' onClick={handleRight}>
              <i className='fa-solid fa-caret-right'></i>
            </button>
          </div>
        </div>
      </Modal>
      {showForm && (
        <div id='album-form_container' className='form_container'>
          <p>
            {!selectedImage
              ? 'Add an Image'
              : `Update Image ${selectedImage.imageName}`}
          </p>
          <input
            type='text'
            placeholder='Enter Image Name'
            required
            ref={inputNameRef}
            defaultValue={selectedImage?.imageName}
          />
          <input
            type='url'
            placeholder='Enter Image Url'
            required
            style={{ marginTop: '1rem' }}
            ref={inputUrlRef}
            defaultValue={selectedImage?.imageUrl}
          />
          <button id='clear-btn' type='button' onClick={handleClear}>
            Clear
          </button>
          {!selectedImage ? (
            <button id='create-btn' type='button' onClick={handleCreate}>
              Add
            </button>
          ) : (
            <button
              id='update-btn'
              type='button'
              onClick={() => handleUpdate(selectedImage)}
            >
              Update
            </button>
          )}
        </div>
      )}
      <div id='images-heading' className='heading'>
        <button id='back' onClick={() => setShowImages(false)}>
          <i className='fa-solid fa-circle-arrow-left'></i>
        </button>
        {!isLoading && (
          <h1 style={{ marginLeft: state.allImages.length > 0 && '10rem' }}>
            {state.allImages.length > 0
              ? `Images in ${showImages.albumName}`
              : `No Images found in ${showImages.albumName}`}
          </h1>
        )}
        <div id='tools'>
          {state.allImages.length > 0 && (
            <input
              type='text'
              placeholder='search images'
              onChange={handleInputChange}
            />
          )}
          <button
            onClick={handleAddImage}
            style={{
              backgroundColor: showForm && '#800e1350',
              color: showForm && '#dd1a24',
              border: showForm && '2px solid #800e13',
            }}
          >
            {' '}
            {!showForm ? 'Add Image' : 'Cancel'}
          </button>
        </div>
      </div>
      {!isLoading ? (
        <div
          id='images-container'
          className='container'
          style={{ height: showForm && 'calc( 100% - 17rem )' }}
        >
          {state.images.map((image) => (
            <div className='image-item item' key={image.id}>
              <button
                type='button'
                className='image-item_btn edit-btn'
                onClick={() => handleEdit(image)}
              >
                <i className='fa-solid fa-pen'></i>
              </button>
              <button
                type='button'
                className='image-item_btn remove-btn'
                onClick={() => handleRemove(image)}
              >
                <i className='fa-solid fa-trash-can'></i>
              </button>
              <div
                className='image-icon icon'
                onClick={() => handleImageClick(image)}
              >
                <img src={image.imageUrl} alt={image.imageName} />
              </div>
              <p className='image-name name'>{image.imageName}</p>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </main>
  );
};
export default Images;
