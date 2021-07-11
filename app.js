const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "movie.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(5000, () => {
      console.log("Server Running at http://localhost:5000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

// Get Books API
app.post("/movie/setRecord", async (request, response) => {
  const { movieTitle, directorName } = this.body;
  const setMovieQuery = `
  INSERT INTO
  movie(movie_title,director_name)
  VALUES('${movieTitle}','${directorName}')
  ;`;
  const movieArray = await db.run(setMovieQuery);
  response.send("One Movie Added");
});

app.get("/movie/getRecord", async (request, response) => {
  const getMovieQuery = `
    SELECT movie_title,director_name
    FROM 
    movie
    ;`;
  const movieArray = await db.all(getMovieQuery);
  response.send(movieArray);
});
