import { configureStore } from "@reduxjs/toolkit";
import MoviesSlice from "./Slices/MoviesSlice";
import SelectedMoviesSlice from "./Slices/SelectedMoviesSlice";


const Store = configureStore({
    reducer:{
        Movies:MoviesSlice,
        SelectedMovies:SelectedMoviesSlice
    }
});


export default Store;