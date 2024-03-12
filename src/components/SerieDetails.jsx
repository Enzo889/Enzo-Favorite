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

function SerieDetails() {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

  const { id } = useParams();
  const [serieDetails, setSerieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState(null);

  const getSerieDetails = async () => {
    try {
      const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=9c5f8c49bf9cd45d5477754f37dc55fc`;
      const res = await fetch(url);
      const data = await res.json();

      setSerieDetails(data);
    } catch (error) {
      console.error("Error fetching serie details:", error);
    }
  };

  const getTrailerDetails = async () => {
    try {
      const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=9c5f8c49bf9cd45d5477754f37dc55fc`;
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
      const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=9c5f8c49bf9cd45d5477754f37dc55fc`;
      const res = await fetch(url);
      const data = await res.json();
      const actorsWithPhotos = data.cast.filter(
        (actor) => actor.profile_path !== null
      );

      setCast(actorsWithPhotos);
    } catch (error) {
      console.error("Error fetching serie details:", error);
    }
  };

  useEffect(() => {
    getSerieDetails();
    getTrailerDetails();
    getCast();
  }, [id]); // Agregar 'id' como dependencia para que se actualice al cambiar

  if (!serieDetails || !trailer || !cast) {
    return <Loading />;
  }

  return (
    <>
      <div className="container-details">
        <div className="backdrop-img">
          <img
            src={`${IMAGE_URL}${serieDetails.backdrop_path}`}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="hero">
          <div className="hero-title">
            <h1>{serieDetails.name}</h1>
            <h1>({serieDetails.first_air_date.substring(0, 4)})</h1>
          </div>
          <img
            src={`${IMAGE_URL}${serieDetails.poster_path}`}
            alt={serieDetails.name}
            loading="lazy"
          />
        </div>
        <div className="details">
          {serieDetails.created_by && (
            <p>
              <b>Created by: </b>
              {serieDetails.created_by
                .map((creator) => creator.name)
                .join(", ")}
            </p>
          )}
          <p>
            <b>Genres: </b>
            {serieDetails.genres.map((genre) => `${genre.name}`).join(", ")}
          </p>
          <p>
            <b>First Air:</b> {serieDetails.first_air_date}
          </p>

          <p>
            {" "}
            <b>Sponken Languages: </b>
            {serieDetails.spoken_languages
              .map((language) => language.english_name)
              .join(", ")}
          </p>
          <Link
            target="_blank"
            to={`https://www.youtube.com/watch?v=${trailer.key}`}
            className="link"
          >
            {" "}
            <b>Watch Trailer </b>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
          <p>
            <b>Status: </b>
            {serieDetails.status}
          </p>
          <p className="overview">Overview</p>
          <p className="tag">{serieDetails.tagline}</p>
          <p>{serieDetails.overview}</p>
          <div className="network">
            <p>
              <b>Network:</b>
            </p>
            <img
              alt={serieDetails.networks.map((network) => network.name)}
              src={`${IMAGE_URL}${serieDetails.networks.map(
                (logo) => logo.logo_path
              )}`}
            />
          </div>
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

export default SerieDetails;
