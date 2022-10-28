import React from 'react';
import style from './style.module.scss'
import '../styles/_global.scss';
import {Layout} from "../components/Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "../pages/Home";
import {MoviePage} from "../pages/Movie";
import {FavoritePage} from "../pages/Favorite";

function MainContainer() {
    return (
        <div className={style.mainContainer}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/movie/:id" element={<MoviePage/>}/>
                        <Route path="/favorites" element={<FavoritePage/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default MainContainer;
