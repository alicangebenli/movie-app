import React, {useEffect, useState} from "react";
import Carousel from "../../components/Carousel";
import style from './style.module.scss';
import './ovverride.scss';
import {useParams} from "react-router-dom";
import {addFavoriteAsync, getMovieImageListByIdAsync, getMoviesAsync} from "../../features/movieSlice";
import MovieModel from "../../models/Movie";
import {useAppSelector, useAppDispatch} from "../../state/store";
import Button from "../../components/Button";

export const MoviePage: React.FC = ({}) => {
    const dispatch = useAppDispatch();
    let {id} = useParams();
    const movieId = parseInt(id || '0');
    const state = useAppSelector((state) => state.movie);
    /*States*/
    const [pageLoading, setPageLoading] = useState(true)
    const [imageLoading, setImageLoading] = useState(true);
    const [movie, setMovie] = useState<MovieModel>()
    const [imageList, setImageList] = useState<[]>([]);
    /*Hooks*/
    useEffect(() => {
        if (state.Movies && Array.isArray(state.Movies)) {
            const data = (state.Movies || []).find((x: MovieModel) => x.id === movieId);
            if (data) {
                setMovie(data);
                setPageLoading(false);
            } else {
                dispatch(getMoviesAsync())
            }

            const isImage = state.ShowedMovieImageList && state.ShowedMovieImageList.id === movieId;
            if (isImage) {
                setImageList(state.ShowedMovieImageList.list);
                setImageLoading(false);
            }else {
                dispatch(getMovieImageListByIdAsync(movieId))
            }
        }
    }, [state])
    /*Methods*/
    const addFavorite = (movie: MovieModel) => {
        dispatch(addFavoriteAsync(movie))
    }
    return (
        <>
            {!pageLoading && movie && (<div className={style.moviePage}>
                <div className={style.carousel}>
                    {!imageLoading ?
                        (<Carousel imageList={imageList || []}/>) :
                        (<div>Yükleniyor</div>)
                    }
                </div>
                <div className={style.information}>
                    <div>
                        <span>Title</span>
                        <p>{movie.title}</p>
                    </div>
                    <div>
                        <span>Vote</span>
                        <p>{movie.vote}</p>
                    </div>
                    <div>
                        <span>Description</span>
                        <p>{movie.description}</p>
                    </div>
                    <div>
                        <Button onClick={() => {
                            addFavorite(movie)
                        }} text="Add Favorite"/>
                    </div>
                </div>
            </div>)}
        </>
    );
}