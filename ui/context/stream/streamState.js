import React, { useReducer } from "react";
import axios from "axios";
import StreamContext from "./streamContext";
import streamReducer from "./streamReducer";
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

const StreamState = (props) => {
  const initialState = {
    streams: [],
    current: null,
    error: null,
    loading: false,
  };

  const backendUrl = true
    ? "http://localhost:5000"
    : "https://ouropayments.herokuapp.com";

  const [state, dispatch] = useReducer(streamReducer, initialState);

  // Get Stream
  const getStream = async (id) => {
    try {
      // setLoading();
      const res = await axios.get(backendUrl + `/api/streams/${id}`);

      dispatch({
        type: GET_STREAM,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: STREAM_ERROR,
        payload: err.response,
      });
    }
  };

  // Get Streams
  const getStreams = async () => {
    try {
      // setLoading();
      const res = await axios.get(backendUrl + "/get-streams");

      console.log(res);

      dispatch({
        type: GET_STREAMS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: STREAM_ERROR,
        payload: err.response,
      });
    }
  };

  // Add Stream
  const addStream = async (stream) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // setLoading();
      const res = await axios.post(
        backendUrl + "/create-stream-test",
        stream,
        config
      );

      dispatch({
        type: ADD_STREAM,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: STREAM_ERROR,
        payload: err,
      });
    }
  };

  // Delete STREAM
  const deleteStream = async (id) => {
    try {
      setLoading();
      await axios.delete(backendUrl + `/api/streams/delete/${id}`);
      dispatch({
        type: DELETE_STREAM,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: STREAM_ERROR,
        payload: err.response,
      });
    }
  };

  // Clear Streams
  const clearStreams = () => {
    dispatch({ type: CLEAR_STREAMS });
  };

  // Set Current stream
  const setCurrent = (stream) => {
    dispatch({ type: SET_CURRENT, payload: stream });
  };

  // Clear Current Stream
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <StreamContext.Provider
      value={{
        streams: state.streams,
        current: state.current,
        error: state.error,
        loading: state.loading,
        getStream,
        getStreams,
        addStream,
        deleteStream,
        clearStreams,
        setCurrent,
        clearCurrent,
        setLoading,
      }}
    >
      {props.children}
    </StreamContext.Provider>
  );
};

export default StreamState;
