import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { items } from "../../Data/Items";


export const MAX_PAGE_NUM = 500;
export const fetchMoviesWithPageNumber = createAsyncThunk(
  "MovieReducer/fetchMoviesWithPageNumber",
  async (PageNum,{getState}) => {
    console.log(getState().Movies);
    const url =
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${PageNum}&sort_by=popularity.desc`;
    const options = {
      method: "GET",
      params: {
        term: "bojack",
        country: "uk",
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjk5ODYyZTNjZmZjYzM5NGFjMGVlYjE3NjBiOTk3MiIsInN1YiI6IjY0ZGEzYjhkZDEwMGI2MDBlMjZhZmEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gAcViCYcQqWM0eBiqea9kX7yWKCotq1ceckY1Dbea5I",
        accept: "application/json",
      },
    };
    const response = await fetch(url, options)
    const data = await response.json();
    
    console.log(data);
    return data;
  }
);
export const fetchMoviesNextPage = createAsyncThunk(
  "MovieReducer/fetchMoviesNextPage",
  async (action,{getState}) => {
    console.log(getState().Movies.page);
    const moviesData = getState().Movies;
    let nextPage = (moviesData.page + 1) > MAX_PAGE_NUM ? MAX_PAGE_NUM : moviesData.page + 1;

    const url =
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nextPage}&sort_by=popularity.desc`;
    const options = {
      method: "GET",
      params: {
        term: "bojack",
        country: "uk",
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjk5ODYyZTNjZmZjYzM5NGFjMGVlYjE3NjBiOTk3MiIsInN1YiI6IjY0ZGEzYjhkZDEwMGI2MDBlMjZhZmEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gAcViCYcQqWM0eBiqea9kX7yWKCotq1ceckY1Dbea5I",
        accept: "application/json",
      },
    };
    const response = await fetch(url, options)
    const data = await response.json();
    
    console.log(data);
    return data;
  }
);
export const fetchMoviesPreviosPage = createAsyncThunk(
  "MovieReducer/fetchMoviesPreviosPage",
  async (action,{getState}) => {
    const moviesData = getState().Movies;
    let previosPage = (moviesData.page - 1) < 0 ? 1 : moviesData.page - 1;
    const url =
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${previosPage}&sort_by=popularity.desc`;
    const options = {
      method: "GET",
      params: {
        term: "bojack",
        country: "uk",
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjk5ODYyZTNjZmZjYzM5NGFjMGVlYjE3NjBiOTk3MiIsInN1YiI6IjY0ZGEzYjhkZDEwMGI2MDBlMjZhZmEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gAcViCYcQqWM0eBiqea9kX7yWKCotq1ceckY1Dbea5I",
        accept: "application/json",
      },
    };
    const response = await fetch(url, options)
    const data = await response.json();
    
    console.log(data);
    return data;
  }
);

const MovieSlice = createSlice({
  initialState: {},
  name: "MovieReducer",
  reducers: {
    getAllMovies: (state, action) => {
      let allMovies = [...items.filter((m) => m.ItemType === action.payload)];
      return allMovies;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesWithPageNumber.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchMoviesNextPage.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchMoviesPreviosPage.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { getAllMovies } = MovieSlice.actions;
export default MovieSlice.reducer;
