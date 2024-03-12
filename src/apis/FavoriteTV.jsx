import { useState, useEffect, Suspense } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function FavoriteTV() {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w400/";

  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const obtenerSeriesFavoritas = async () => {
    const urlBase =
      "https://api.themoviedb.org/3/account/21052849/favorite/tv?language=en-US&sort_by=created_at.asc";
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

    setSeries([...series, ...data.results]);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    obtenerSeriesFavoritas();
  }, [page]);

  const cargarMasPeliculas = () => {
    setPage(page + 1);
  };

  if (!series) {
    return <Loading />;
  }
  return (
    <div>
      <div className="thumbnails mbx4">
        {series &&
          series.map((tv) => (
            <ul key={tv.id}>
              <Suspense fallback={<Loading />}>
                <li>
                  <Link className="id_link" to={`/tv/${tv.id}`}>
                    <img src={`${IMAGE_URL}${tv.poster_path}`} alt={tv.title} />
                    <p>{tv.first_air_date}</p>
                    <div className="title-front">
                      <p className="title-key">{`${tv.name} `}</p>
                      <p>{` - ${tv.original_language}`}</p>
                    </div>{" "}
                    <p>{tv.overview}</p>
                  </Link>
                </li>
              </Suspense>
            </ul>
          ))}
      </div>
      {page < totalPages && (
        <div className="align-center">
          <button className="btn" onClick={cargarMasPeliculas}>
            Load More{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default FavoriteTV;
