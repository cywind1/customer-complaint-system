// Link component is used to create links between different pages in the application. It allows you to create links between different pages in your application without having to reload the entire page each time.
import { Link } from "react-router-dom";

const DashHeader = () => {
  const content = (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="dash/">
          <h1 className="dash-header__title">Complaints</h1>
        </Link>
        <nav className="dash-header__nav"></nav>
      </div>
    </header>
  );
  return content;
};

export default DashHeader;
