import { createSlice } from "@reduxjs/toolkit";

const SelectMovieSlice = createSlice({
  initialState: [],
  name: "SelectMovieReducer",
  reducers: {
    AddSelectedMoive: (state, action) => {
      let isFoundMovie = false;
      state.forEach((element) => {
        if (!isFoundMovie && element.id === action.payload.id) {
          console.log("the movie is already selected");
          isFoundMovie = true;
        }
      });
      if (!isFoundMovie) {
        let movie = { ...action.payload, ranking: 0 };
        console.log(movie);
        state.push(movie);
      }
    },
    RemoveSelectedMovie: (state, action) => {
        return state.filter((s) => s.id !== action.payload.id);
    },
    ClearSelectedMovies: (state) => {
        return [];
    },
    ResetAllMovies: (state) => {
        let allmovies = state;
        const transformedCollection = allmovies.map((movie)=> {
           return {...movie,ranking:0}
        });
        console.log(transformedCollection);
        return transformedCollection;
    },
    updateMovies: (state, action) => {
      let allupdatedmovies = [...action.payload];
      allupdatedmovies.forEach((updateM) => {
        state.forEach((m, moiveId) => {
          if (m.id === updateM.id) {
            state[moiveId] = updateM;
          }
        });
      });
      console.log(state[0]);
    },
  },
  extraReducers: (builder) => {},
});

export const {
    AddSelectedMoive,
    RemoveSelectedMovie,
    ClearSelectedMovies,
    updateMovies,
    ResetAllMovies,
} = SelectMovieSlice.actions;
export default SelectMovieSlice.reducer;

