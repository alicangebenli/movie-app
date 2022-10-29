import Card from "../../components/Card";
import React, {useEffect, useState} from "react";
import MovieModel from "../../models/Movie";
import {getFavoriteAsync} from "../../features/movieSlice";
import {useAppDispatch, useAppSelector} from "../../state/store";

interface Props {}

export const FavoritePage: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.movie.Favorites);
    useEffect(() => {
        if (favorites.length === 0) {
            dispatch(getFavoriteAsync());
        }
    }, [])

    return (
        <>
            <div className="card-list">
                {favorites.length > 0 && favorites.map((movie: MovieModel) =>
                    <Card
                        {...movie}
                        key={movie.id}
                    />
                )}
            </div>
        </>
    );
}