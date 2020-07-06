import {
  GET_STREAM,
  GET_STREAMS,
  ADD_STREAM,
  DELETE_STREAM,
  SET_LOADING,
  CLEAR_STREAMS,
  SET_CURRENT,
  CLEAR_CURRENT,
  STREAM_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      console.log("set loading true");
      return {
        ...state,
        loading: true,
      };
    case GET_STREAM:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case GET_STREAMS:
      return {
        ...state,
        streams: action.payload,
        loading: false,
      };
    case ADD_STREAM:
      return {
        ...state,
        streams: [action.payload, ...state.streams],
        current: action.payload,
        loading: false,
      };
    case DELETE_STREAM:
      return {
        ...state,
        streams: state.streams.filter(
          (stream) => stream._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_STREAMS:
      return {
        ...state,
        streams: null,
        error: null,
        current: null,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false,
      };
    case STREAM_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return { ...state, loading: false };
  }
};
