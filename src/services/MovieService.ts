// @ts-ignore
import axios from "axios";
import MovieModel from "../models/Movie";

axios.defaults.baseURL = 'http://localhost:3000';

export async function getMovies(): Promise<Array<MovieModel>> {
    const movies = await axios.get('/v1/api/movies');
    if (movies.status < 400) {
        return movies.data;
    }
    return [] as MovieModel[]
}

export async function getMovieImageListById(movieId: number): Promise<[]> {
    const movie = await axios.get(`/v1/api/movie-images/${movieId}`)
    if (movie.status < 400) {
        return movie.data;
    }
    return []
}