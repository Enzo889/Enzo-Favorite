import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import About from "./pages/About";
import Footer from "./components/Footer";
import SeriesFav from "./pages/SeriesFav";
import Page404 from "./pages/Page404";
import SerieDetails from "./components/SerieDetails";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv" element={<SeriesFav />} />
          <Route path="/tv/:id" element={<SerieDetails />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
