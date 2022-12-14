import React from "react";
import { useInput } from "../hooks/useInput";
import MoviesList from "../commons/MoviesList";
import urlMaker from "../hooks/urlMaker";
import { useNavigate } from "react-router";

const Home = ({ movies, series }) => {
  const search = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieMatch = movies.filter(
      (movie) =>
        movie.original_title.toLowerCase() === search.value.toLowerCase()
    );
    const serieMatch = series.filter(
      (serie) =>
        serie.original_name.toLowerCase() === search.value.toLowerCase()
    );
    const movieUrl = urlMaker(search.value);

    if (movieMatch[0]) navigate(`/movies/${movieUrl}`);
    if (serieMatch[0]) navigate(`/series/${movieUrl}`);
    if (!movieMatch[0] && !serieMatch[0])
      alert("Lo sentimos. No se han encontrado resultados.");
  };

  return (
    <main
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/823503.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <section>
        <div
          style={{
            backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg")`,
            backgroundSize: "cover",
          }}
        >
          <div className="ml-4 has-text-primary-light">
            <h1>Bienvenidos.</h1>
            <h2>
              Millones de películas y programas de televisión por descubrir.
              Explora ahora.
            </h2>
            <div>
              <div className="mr-6">
                <form onSubmit={handleSubmit}>
                  <input
                    {...search}
                    className="input my-3"
                    type="text"
                    placeholder="Buscar una pelicula, programa de television....."
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="ml-4 mr-4 mb-4 "
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/823503.jpg")`,
            backgroundSize: "cover",
          }}
        >
          <MoviesList movies={movies} series={series} />
        </div>
      </section>
    </main>
  );
};

export default Home;
