import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [backgroundColor, setBackgroundColor] = useState("var(--btn-bg)");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Cambiar el número según la posición de scroll deseada
        setBackgroundColor("var(--btn-bg-2)"); // Cambiar a color negro al hacer scroll
      } else {
        setBackgroundColor("var(--btn-bg)"); // Volver al color por defecto si se vuelve a la posición inicial
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav>
      <div className="container">
        <NavLink
          aria-current="page"
          to="/"
          className="btn"
          style={{
            backgroundColor: backgroundColor,
            transition: "background-color 0.3s",
          }}
        >
          enzofavorite.vercel.app
        </NavLink>
        <NavLink
          to="/tv"
          className="btn"
          style={{
            backgroundColor: backgroundColor,
            transition: "background-color 0.3s",
          }}
        >
          TV
        </NavLink>
        <NavLink
          to="/browse"
          className="btn"
          style={{
            backgroundColor: backgroundColor,
            transition: "background-color 0.3s",
          }}
        >
          browse
        </NavLink>
        <NavLink
          to="/about"
          className="btn"
          style={{
            backgroundColor: backgroundColor,
            transition: "background-color 0.3s",
          }}
        >
          ?
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
