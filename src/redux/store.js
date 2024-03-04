import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_CURRENT_MOVIE', fetchSingleMovie);
  yield takeEvery('FETCH_GENRES', fetchGenres);
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data,
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchGenres() {
  try {
    // Get genres:
    const genreResponse = yield axios.get('/api/genres');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_GENRES',
      payload: genreResponse.data,
    });
  } catch (error) {
    console.log('fetchGenres error:', error);
  }
}

function* fetchSingleMovie() {
  // Get a single movie for the details page
  try {
    // const
  } catch (err) {
    console.error('ERROR in fetchSingleMovie saga:', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
