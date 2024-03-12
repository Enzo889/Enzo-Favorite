import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container">
        <Link className="btn" to="/browse">
          browse
        </Link>
        <Link className="btn" to="/about">
          about
        </Link>
        <Link className="btn" to="mailto:enzobustamante895@gmail.com">
          gmail
        </Link>
        <Link className="btn" target="_blank" to="https://github.com/Enzo889">
          Github
        </Link>
        <Link
          className="btn"
          target="_blank"
          to="https://www.linkedin.com/in/enzo-bustamante-1401121b3/"
        >
          Linkedin
        </Link>
        <p>
          Copyright © 2024{" "}
          <Link className="underline" to="#">
            Enzo Bustamante
          </Link>
          . All screenshots o poster © of their respective owners.{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
