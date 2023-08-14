import "./App.css";
import { Container, Row } from "react-bootstrap";
import { MainNavBar } from "./Components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RankItems } from "./Components/RankItems";
import { fetchMovies, fetchMoviesWithPageNumber } from "./rtk/Slices/MoviesSlice";
import axios from "axios";
import { IMG_W500 } from "./Utilies";
import { Movie } from "./Components/Movie";
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
        <Routes>
          <Route
            path="/"
            element={<div className="row"><MoviesList/></div>}></Route>
          <Route
            path="/RankItems"
            element={<RankItems movies={storedItems} />}
          ></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
