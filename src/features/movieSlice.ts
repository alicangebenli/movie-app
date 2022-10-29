import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMovieImageListById, getMovies} from "../services/MovieService";
import localforage from "localforage";
import MovieModel from "../models/Movie";

const initialState:{
    Movies:MovieModel[],
    Favorites:MovieModel[],
    ShowedMovieImageList:{id:number,list:[]}
} = {
    Movies: [],
    Favorites: [],
    ShowedMovieImageList: {
        id:0,
        list:[]
    },
}
export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        addFavorite: (state, action:PayloadAction<MovieModel>) => {
            state.Favorites.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMoviesAsync.fulfilled, (state, action:PayloadAction<MovieModel[]>) => {
            if(action.payload) {
                state.Movies = action.payload;
            }
        });
        builder.addCase(getMovieImageListByIdAsync.fulfilled, (state, action) => {
            if(action.payload) {
                state.ShowedMovieImageList = action.payload;
            }
        });
        builder.addCase(getFavoriteAsync.fulfilled, (state, action) => {
            // @ts-ignore
            state.Favorites = action.payload;
        });
    }
});
export const getMoviesAsync = createAsyncThunk(
    'movie/getMoviesAsync',
    async (arg, {dispatch}) => {
        return await getMovies();
    }
)
export const getMovieImageListByIdAsync = createAsyncThunk(
    'movie/getMovieImageListAsyncById',
    async (arg:number, {}) => {
        const list = await getMovieImageListById(arg);
        return  {
            id:arg,
            list
        }
    }
)

export const getFavoriteAsync = createAsyncThunk(
    'movie/getFavoriteAsync',
    async () => {
        return await localforage.getItem('favorites');
    }
)

export const addFavoriteAsync = (movie:MovieModel) => async (dispatch:any) => {
    let favoritesResponse = await localforage.getItem('favorites');
    if (!favoritesResponse || !Array.isArray(favoritesResponse)) {
        favoritesResponse = []
    }
    if (Array.isArray(favoritesResponse) && favoritesResponse.filter((x:MovieModel) => x.id === movie.id).length === 0) {
        favoritesResponse.push(movie)
        await localforage.setItem('favorites', favoritesResponse);
        dispatch(addFavorite(movie))
        return favoritesResponse;
    }
};

export const {addFavorite} = movieSlice.actions;
export default movieSlice.reducer;
