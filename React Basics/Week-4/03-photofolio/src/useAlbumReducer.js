import { useReducer } from 'react';

function albumReducer(state, action) {
  switch (action.type) {
    case 'ADD_ALBUM': {
      const existingAlbum = state.albums.find(
        (album) => album.id === action.payload.id
      );
      if (!existingAlbum) {
        return {
          albums: [
            { id: action.payload.id, albumName: action.payload.albumName },
            ...state.albums, // Add the existing albums after the new album
          ],
        };
      } else {
        return state; // Album with the same ID already exists, no need to add it again
      }
    }
    case 'GET_ALBUMS': {
      const sortedAlbums = action.payload.albums.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      return { albums: sortedAlbums };
    }
  }
}

export default function useAlbumReducer() {
  const [state, dispatch] = useReducer(albumReducer, {
    albums: [],
  });
  return { state, dispatch };
}
