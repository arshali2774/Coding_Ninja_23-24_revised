import { useReducer } from 'react';

function imageReducer(state, action) {
  switch (action.type) {
    case 'ADD_IMAGE': {
      const existingImage = state.images.find(
        (image) => image.id === action.payload.id
      );
      if (!existingImage) {
        return {
          allImages: [
            {
              id: action.payload.id,
              imageName: action.payload.imageName,
              imageUrl: action.payload.imageUrl,
            },
            ...state.allImages,
          ],
          images: [
            {
              id: action.payload.id,
              imageName: action.payload.imageName,
              imageUrl: action.payload.imageUrl,
            },
            ...state.images, // Add the existing albums after the new album
          ],
        };
      } else {
        return state; // Album with the same ID already exists, no need to add it again
      }
    }
    case 'GET_IMAGES': {
      return {
        allImages: action.payload.images,
        images: action.payload.images,
      };
    }
    case 'UPDATE_IMAGE': {
      return {
        allImages: state.allImages.map((image) => {
          if (image.id === action.payload.id) {
            // Update the image if it matches the ID
            return {
              ...image,
              imageName: action.payload.imageName,
              imageUrl: action.payload.imageUrl,
            };
          }
          return image; // Leave other images unchanged
        }),
        images: state.images.map((image) => {
          if (image.id === action.payload.id) {
            // Update the image if it matches the ID
            return {
              ...image,
              imageName: action.payload.imageName,
              imageUrl: action.payload.imageUrl,
            };
          }
          return image; // Leave other images unchanged
        }),
      };
    }
    case 'DELETE_IMAGE': {
      return {
        allImages: state.allImages.filter(
          (image) => image.id !== action.payload.id
        ),
        images: state.images.filter((image) => image.id !== action.payload.id),
      };
    }
    case 'SEARCH': {
      const searchTerm = action.payload.searchTerm.toLowerCase();
      // If search term is empty, restore all images from the original unfiltered array
      if (searchTerm.trim() === '') {
        return {
          ...state,
          images: state.allImages,
        };
      }
      // Otherwise, filter images based on the search term
      return {
        ...state,
        images: state.allImages.filter((image) => {
          // Check if image name or any other relevant property contains the search term
          return image.imageName.toLowerCase().includes(searchTerm);
          // You can add additional conditions here if needed
        }),
      };
    }
    default: {
      return state;
    }
  }
}

export default function useImageReducer() {
  const [state, dispatch] = useReducer(imageReducer, {
    images: [],
    allImages: [],
  });
  return { state, dispatch };
}
