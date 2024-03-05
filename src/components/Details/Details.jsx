import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Details.css';

export default function Details() {
  const { pageID } = useParams();
  const history = useHistory();

  const genreList = useSelector((store) => store.genres);
  const [currentMovie, setCurrentMovie] = useState({});
  const [currentGenres, setCurrentGenres] = useState([]);

  const fetchCurrentMovie = (id) => {
    // get current movie by id
    axios
      .get(`/api/movies/${id}`)
      .then((response) => {
        console.log('fetched current movie:', response.data[0]);
        setCurrentMovie(response.data[0]);

        // get genres
        axios
          .get(`/api/genres/${id}`)
          .then((genreResponse) => {
            console.log('fetched genres:');
            console.table(genreResponse.data);
            setCurrentGenres(genreResponse.data);
          })
          .catch((err) => {
            console.error('ERROR in client GET genres/:id route:', err);
          });
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
      <h1>{currentMovie.title}</h1>
      <img
        src={currentMovie.poster}
        alt={currentMovie.title}
      />
      <p>{currentMovie.description}</p>
      <h3>GENRES:</h3>
      <ul>
        {currentGenres.map((genre) => {
          return <li key={genre.id}>{genre.name}</li>;
        })}
      </ul>
      <button
        type="button"
        data-testid="toList"
        onClick={() => {
          history.push('/');
        }}>
        Back to Movie List
      </button>
    </div>
  );
}
