import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./details.css";

function MovieDetails() {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState(null);
  const [director, setDirector] = useState(null);
  const [screenplay, setScreenplay] = useState(null);
  const [photography, setPhoto] = useState(null);

  const getMovieDetails = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=9c5f8c49bf9cd45d5477754f37dc55fc`;
      const res = await fetch(url);
      const data = await res.json();

      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching serie details:", error);
    }
  };

  const getTrailerDetails = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=9c5f8c49bf9cd45d5477754f37dc55fc`;
      const res = await fetch(url);
      const data = await res.json();
      const firstKey = data.results[0];

      setTrailer(firstKey);
    } catch (error) {
      console.error("Error fetching serie details:", error);
    }
  };

  const getCast = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=9c5f8c49bf9cd45d5477754f37dc55fc`;
      const res = await fetch(url);
      const data = await res.json();

      const director = data.crew.find((member) => member.job === "Director");
      const screenplay = data.crew.find(
        (member) => member.job === "Screenplay"
      );
      const photography = data.crew.find(
        (member) => member.job === "Director of Photography"
      );

      const actorsWithPhotos = data.cast.filter(
        (actor) => actor.profile_path !== null
      );

      setCast(actorsWithPhotos);
      setDirector(director);
      setScreenplay(screenplay);
      setPhoto(photography);
    } catch (error) {
      console.error("Error fetching serie details:", error);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getTrailerDetails();
    getCast();
  }, [id]); // Agregar 'id' como dependencia para que se actualice al cambiar

  if (!movieDetails || !trailer || !cast) {
    return <Loading />;
  }

  const formatToDollars = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  return (
    <>
      <div className="container-details">
        <div className="backdrop-img">
          <img
            src={`${IMAGE_URL}${movieDetails.backdrop_path}`}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="hero">
          <div className="hero-title">
            <h1>{movieDetails.title}</h1>
            <h1>({movieDetails.release_date.substring(0, 4)})</h1>
          </div>
          <img
            src={`${IMAGE_URL}${movieDetails.poster_path}`}
            alt={movieDetails.title}
            loading="lazy"
          />
        </div>
        <div className="details">
          <p>
            <b>Director:</b> {director ? director.name : "N/A"}
          </p>
          <p>
            <b>Screenplay: </b>
            {screenplay ? screenplay.name : "N/A"}
          </p>
          <p>
            <b>Director of Photography:</b>{" "}
            {photography ? photography.name : "N/A"}
          </p>
          <p>
            <b>Genres:</b>{" "}
            {movieDetails.genres.map((genre) => `${genre.name}`).join(", ")}
          </p>
          <p>
            <b>Release Date:</b> {movieDetails.release_date}
          </p>

          <p>
            {" "}
            <b>Sponken Languages: </b>{" "}
            {movieDetails.spoken_languages
              .map((language) => language.english_name)
              .join(", ")}
          </p>
          <Link
            target="_blank"
            to={`https://www.youtube.com/watch?v=${trailer.key}`}
            className="link"
          >
            {" "}
            <b>Watch Trailer</b>{" "}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
          <p>
            <b>Budget: </b>
            {movieDetails.budget ? formatToDollars(movieDetails.budget) : "N/A"}
          </p>
          <p>
            <b>Revenue: </b>
            {movieDetails.revenue
              ? formatToDollars(movieDetails.revenue)
              : "N/A"}
          </p>
          <p className="overview">Overview</p>
          <p className="tag">{movieDetails.tagline}</p>
          <p>{movieDetails.overview}</p>
        </div>
      </div>
      <div className="cast">
        <h2>Cast</h2>
        <ul>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={"auto"}
            scrollbar={{ draggable: true }}
            navigation={true}
            pagination={{ clickable: true }}
            loop={true}
            keyboard={true}
            lazy={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
          >
            {cast.map((actor) => (
              <li key={actor.id}>
                <SwiperSlide className="SwiperSlide">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    loading="lazy"
                  />
                  <p>{actor.name}</p>
                  <p>{actor.character}</p>
                </SwiperSlide>
              </li>
            ))}
          </Swiper>
        </ul>
      </div>
      {/* Mostrar más detalles como el reparto, género, calificaciones, etc. */}
    </>
  );
}

export default MovieDetails;
