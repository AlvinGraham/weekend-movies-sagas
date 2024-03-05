import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
import Details from '../Details/Details';

function App() {
  return (
    <div className="App">
      <h1>Movies for Nerds who Love Movies!</h1>
      <Router>
        <Route
          path="/"
          exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:pageID">
          <Details />
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}

export default App;
