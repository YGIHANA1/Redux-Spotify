export default function (state = {}, action) {
  switch (action.type) {
    case "FETCH_ALBUMS":
      return {
        ...state,
        albums: action.payload,
        loading: {
          ...state.loading,
          albums: false,
          albumInfo: true,
          artistInfo: true,
        },
        albumInfo: null,
      };
    case "FETCH_ALBUM_INFO":
      return {
        ...state,
        albumInfo: {
          ...action.payload,
        },
        tracksList: action.payload.tracks.data.map((track) => track),
        loading: {
          ...state.loading,
          albumInfo: false,
        },
      };
    case "SELECT_SONG":
      return {
        ...state,
        selectedSong: state.tracksList.filter(
          (track) => track.id === action.payload
        ),
        playing: true,
      };
    case "TOGGLE_PLAY":
      return {
        ...state,
        playing: !state.playing,
      };
    case "LIKE_SONG":
      return {
        ...state,
        likedSongs:
          state.likedSongs.indexOf(action.payload) !== -1
            ? [...state.likedSongs.filter((like) => like !== action.payload)]
            : [...state.likedSongs, action.payload],
      };
    case "FETCH_ARTIST":
      return {
        ...state,
        loading: {
          ...state.loading,
          artistInfo: false,
        },
        tracksList: action.payload.topSongs.data.map((track) => track),
        artistInfo: action.payload,
      };
    default:
      return state;
  }
}
