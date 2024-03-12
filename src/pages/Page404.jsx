import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="not-found">
      <div className="error">
        <p className="error-main">Error</p>
        <p>404</p>
      </div>
      <p className="not-page">Page Not Found</p>
      <p className="return-wrapper">
        Click to
        <Link className="return" to={"/"}>
          Return
        </Link>
      </p>
    </div>
  );
}

export default Page404;
