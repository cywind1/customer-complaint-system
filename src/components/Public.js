import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap"> Customer Service Journey </span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Our online customer complaint system allows you to make complaints
          efficiently. Our staffs will handle them within 3 working days.
        </p>
        <Link to="/login" id="login">
          Login Account
        </Link>
      </main>
      <footer>
        <address className="public__addr">
          Professional Customer Service
          <br />
          Fun Street 11 <br />
          Cologne 50676, Germany <br />
          <a href="tel:+49 555 55555">(555) 555-5555</a>
        </address>
      </footer>
    </section>
  );
  return content;
};
export default Public;
