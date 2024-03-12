import { useState, useEffect, Suspense } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function FavoriteFetch() {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w400/";

  const [peliculas, setPeliculas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const obtenerFavoritas = async () => {
    const urlBase =
      "https://api.themoviedb.org/3/account/21052849/favorite/movies?language=en-US&sort_by=created_at.asc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzVmOGM0OWJmOWNkNDVkNTQ3Nzc1NGYzN2RjNTVmYyIsInN1YiI6IjY1ZTNmMTdjMmFjNDk5MDE2M2VkZTJkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNHPzA1mI20N0V1YJ_6DtQr-6a8Lle01_9taNLFuOzQ",
      },
    };

    const url = `${urlBase}&page=${page}`;
    const res = await fetch(url, options);
    const data = await res.json();

    setPeliculas([...peliculas, ...data.results]);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    obtenerFavoritas();
  }, [page]);

  const cargarMasPeliculas = () => {
    setPage(page + 1);
  };

  if (!peliculas) {
    return <Loading />;
  }
  return (
    <div>
      <div className="thumbnails mbx4">
        {peliculas &&
          peliculas.map((pelicula) => (
            <ul key={pelicula.id}>
              <li>
                <Suspense fallback={<Loading />}>
                  <Link className="id_link" to={`/movie/${pelicula.id}`}>
                    <img
                      src={`${IMAGE_URL}${pelicula.poster_path}`}
                      alt={pelicula.title}
                    />
                    <p>{pelicula.release_date}</p>
                    <div className="title-front">
                      <p className="title-key">{`${pelicula.title} `}</p>
                      <p>{` - ${pelicula.original_language}`}</p>
                    </div>{" "}
                    <p>{pelicula.overview}</p>
                  </Link>
                </Suspense>
              </li>
            </ul>
          ))}
      </div>
      {page < totalPages && (
        <div className="align-center">
          <button className="btn" onClick={cargarMasPeliculas}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default FavoriteFetch;
