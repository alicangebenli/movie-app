import Card from "../../components/Card";
import React, {useEffect} from "react";
import MovieModel from "../../models/Movie";
import Link from "../../components/Link";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {getMoviesAsync} from "../../features/movieSlice";

export const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const movies = useAppSelector((state) => state.movie.Movies);

    useEffect(() => {
        if(movies.length===0) {
            dispatch(getMoviesAsync())
        }
    }, [])
    return (
        <>
            <div className="card-list">
                {movies && movies.length > 0 && movies.map((movie: MovieModel) =>
                    <Link url={"movie/" + movie.id}  key={movie.id + 'link'}>
                        <Card
                            {...movie}
                        />
                    </Link>
                )}
            </div>
        </>
    );
}