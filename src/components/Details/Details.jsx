import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './Details.css';

export default function Details() {
  const { pageID } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});
  const fetchCurrentMovie = (id) => {
    // get current movie by id
    axios
      .get(`/api/movies/${id}`)
      .then((response) => {
        console.log('fetched current movie:', response.data[0]);
        setCurrentMovie(response.data[0]);
      })
      .catch((err) => {
        console.error('ERROR in client /movies/:id GET route:', err);
      });
  };

  useEffect(() => {
    fetchCurrentMovie(pageID);
  }, []);

  return (
    <div
      className="details-div"
      data-testid="movieDetails">
      <h1>I am the Details Page Div: {pageID}</h1>
      <h2>Result {JSON.stringify(currentMovie)}</h2>
    </div>
  );
}
