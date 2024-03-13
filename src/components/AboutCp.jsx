import { Link } from "react-router-dom";
import "./aboutcp.css";

function AboutCp() {
  return (
    <article>
      <p className="about-title">My Favorite Films and Series</p>
      <div className="body">
        <p>
          Welcome to my website, a platform dedicated to sharing my favorite
          series and movies, created with the
          <Link
            className="link"
            target="_blank"
            to={"https://developer.themoviedb.org/docs/getting-started"}
          >
            {" "}
            TMDb API{" "}
          </Link>
          and inspired by the site
          <Link
            className="link"
            target="_blank"
            to={"https://www.hoverstat.es/"}
          >
            {" "}
            Hoverstat.es.{" "}
          </Link>
          I have developed this site to practice my knowledge of API
          integration.
        </p>
        <p>
          This space showcases my passion for film and television, offering a
          user-friendly experience. The integrated API provides easy access to a
          wealth of information, allowing you to explore a wide range of
          content, from blockbusters to classics. Each entry is carefully
          selected with detailed information.
        </p>
        <p>
          Whether you are looking for recommendations or simply enjoy
          discovering new movies and series, this site aims to be an informative
          and entertaining resource.
        </p>
        <p>
          Thank you for visiting and enjoy exploring movies and series on my
          TMDb API-enabled website.
        </p>
      </div>

      <div className="website">
        <div className="navbar">
          <div className="dots">
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
          </div>
          <div className="address-bar">
            <span>enzofavorite.vercel.app</span>
            <div className="loading"></div>
          </div>
        </div>
        <div className="page-container">
          <iframe src="/" width="100%" height="600"></iframe>
        </div>
      </div>
    </article>
  );
}

export default AboutCp;
