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
        playing: false,
      };
    case "FETCH_ALBUM_INFO":
      return {
        ...state,
        albumInfo: {
          ...action.payload,
          tracksList: action.payload.tracks.data.map((track) => track.preview),
        },
        loading: {
          ...state.loading,
          albumInfo: false,
        },
      };
    case "SELECT_SONG":
      return {
        ...state,
        selectedSong: state.albumInfo.tracks.data.filter(
          (track) => track.id === action.payload
        ),
      };
    case "TOGGLE_PLAY":
      return {
        ...state,
        playing: !state.playing,
      };
    default:
      return state;
  }
}
