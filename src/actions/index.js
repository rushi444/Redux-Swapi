import axios from "axios";
const apiUrl = "https://swapi.co/api/people/";

// we'll need to create 3 different action types here.
// one for fetching, one for success and one for failure

export const FETCHING = "FETCHING";
export const FAILURE = "FAILURE";
export const SUCCESS = "SUCCESS";

// our action creator will be a function that returns a function
// the url to fetch characters from is `https://swapi.co/api/people/`
// remember that now we have controll over our thunk-based action creator

export const fetching = status => {
  return {
    type: FETCHING,
    payload: status
  };
};

export const success = data => {
  return {
    type: SUCCESS,
    payload: data
  };
};

export const failure = msg => {
  return {
    type: FAILURE,
    payload: msg
  };
};

export const fetchData = () => dispatch => {
  dispatch(fetching(true));
  axios
    .get(apiUrl)
    .then(res => {
      dispatch(success(res.data.results));
      dispatch(fetching(false));
    })
    .catch(err => {
      dispatch(failure(err.message));
      dispatch(fetching(false));
    });
};
