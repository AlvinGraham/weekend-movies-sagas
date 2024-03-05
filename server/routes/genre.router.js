const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `
    SELECT * FROM "genres";
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500);
    });
});

// get genres for specific movie
router.get('/:id', (req, res) => {
  // set query text and args
  const queryText = `SELECT "genres".id, "genres".name FROM "genres"
  JOIN "movies_genres" ON "genres".id = "movies_genres".genre_id
  WHERE "movies_genres".movie_id = $1;
  `;
  const queryArgs = [req.params.id];

  pool
    .query(queryText, queryArgs)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in server genre/:id GET:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
