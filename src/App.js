import "./App.css";
import { Container } from "react-bootstrap";
import { MainNavBar } from "./Components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RankItems } from "./Components/RankItems";
import { fetchMoviesWithPageNumber } from "./rtk/Slices/MoviesSlice";
import { MoviesList } from "./Components/MoviesList";

function App() {
  const storedItems = useSelector((state) => state.Movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesWithPageNumber(1));
  }, []);

  return (
    <>
      <MainNavBar />
      <Container>
        <span id="GoUp"></span>
        <Routes>
          <Route
            path="/"
            element={
              <div className="row">
                <MoviesList />
              </div>
            }
          ></Route>
          <Route
            path="/RankItems"
            element={<RankItems movies={storedItems} />}
          ></Route>
        </Routes>
        <a href="#GoUp" className="GoUp-circle">
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {"{"}" "{"}"}
              <path
                d="M12 6V18M12 6L7 11M12 6L17 11"
                stroke="#ffffff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {"{"}" "{"}"}
            </g>
          </svg>
        </a>
      </Container>
    </>
  );
}

export default App;
