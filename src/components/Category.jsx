import Loading from "./Loading";
import "./category.css";
import { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";

function Category() {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w400/";

  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSeries, setPageSeries] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPagesSeries, setTotalPagesSeries] = useState(1);
  const [search, setSearch] = useState("");
  const [moviesCategory, setMoviesCategory] = useState([]);
  const [seriesCategory, setSeriesCategory] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //category
  const allCategories = [
    ...moviesCategory.filter(
      (movie) => !seriesCategory.find((serie) => serie.name === movie.name)
    ),
    ...seriesCategory,
  ];
  const tvCategory = async () => {
    const url = "https://api.themoviedb.org/3/genre/tv/list";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzVmOGM0OWJmOWNkNDVkNTQ3Nzc1NGYzN2RjNTVmYyIsInN1YiI6IjY1ZTNmMTdjMmFjNDk5MDE2M2VkZTJkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNHPzA1mI20N0V1YJ_6DtQr-6a8Lle01_9taNLFuOzQ",
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();
    setSeriesCategory(data.genres);
  };

  const movieCategory = async () => {
    const url = "https://api.themoviedb.org/3/genre/movie/list";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzVmOGM0OWJmOWNkNDVkNTQ3Nzc1NGYzN2RjNTVmYyIsInN1YiI6IjY1ZTNmMTdjMmFjNDk5MDE2M2VkZTJkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNHPzA1mI20N0V1YJ_6DtQr-6a8Lle01_9taNLFuOzQ",
      },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    setMoviesCategory(data.genres);
  };

  useEffect(() => {
    tvCategory();
    movieCategory();
  }, []);

  const handleGenreClick = (genreId, categoryName) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null);
      setSelectedCategory(null);
    } else {
      setSelectedGenre(genreId);
      setSelectedCategory(categoryName);
    }
  };

  //category
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

    const url = `${urlBase}&page=${pageSeries}`;
    const res = await fetch(url, options);
    const data = await res.json();

    setSeries([...series, ...data.results]);
    setTotalPagesSeries(data.total_pages);
  };

  useEffect(() => {
    obtenerFavoritas();
    obtenerSeriesFavoritas();
  }, [page, pageSeries]);

  const cargarMasPeliculas = () => {
    setPage(page + 1);
    setPageSeries(pageSeries + 1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredPeliculas = peliculas.filter((pelicula) => {
    if (selectedGenre) {
      return (
        pelicula.genre_ids.includes(selectedGenre) &&
        (pelicula.title.toLowerCase().includes(search.toLowerCase()) ||
          pelicula.original_language
            .toLowerCase()
            .includes(search.toLowerCase()))
      );
    } else {
      return (
        pelicula.title.toLowerCase().includes(search.toLowerCase()) ||
        pelicula.original_language.toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  const filteredSeries = series.filter((serie) => {
    if (selectedGenre) {
      return (
        serie.genre_ids.includes(selectedGenre) &&
        (serie.name.toLowerCase().includes(search.toLowerCase()) ||
          serie.original_language.toLowerCase().includes(search.toLowerCase()))
      );
    } else {
      return (
        serie.name.toLowerCase().includes(search.toLowerCase()) ||
        serie.original_language.toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  return (
    <>
      <Suspense fallback={<Loading />}>
        <fieldset className="search-options">
          <div className="search-bar">
            <input
              type="search"
              className="btn"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
          </div>
          {allCategories &&
            allCategories.map((genre) => (
              <button
                className={`btn ${
                  selectedCategory === genre.name ? "selected" : ""
                }`}
                key={genre.id}
                onClick={() => handleGenreClick(genre.id, genre.name)}
              >
                {genre.name}
              </button>
            ))}
        </fieldset>
      </Suspense>

      <div>
        <div className="thumbnails mbx4">
          <Suspense fallback={<Loading />}>
            {filteredPeliculas &&
              filteredPeliculas.map((pelicula) => (
                <ul key={pelicula.id}>
                  <Link className="id_link" to={`/movie/${pelicula.id}`}>
                    <li>
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
                    </li>
                  </Link>
                </ul>
              ))}
            {filteredSeries &&
              filteredSeries.map((tv) => (
                <ul key={tv.id}>
                  <Link className="id_link" to={`/tv/${tv.id}`}>
                    <li>
                      <img
                        src={`${IMAGE_URL}${tv.poster_path}`}
                        alt={tv.title}
                      />
                      <p>{tv.first_air_date}</p>
                      <div className="title-front">
                        <p className="title-key">{`${tv.name} `}</p>
                        <p>{` - ${tv.original_language}`}</p>
                      </div>
                      <p>{tv.overview}</p>
                    </li>
                  </Link>
                </ul>
              ))}
          </Suspense>
        </div>
        {[page, pageSeries] < [totalPages, totalPagesSeries] && (
          <div className="align-center">
            <button className="btn" onClick={cargarMasPeliculas}>
              Load More{" "}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Category;
