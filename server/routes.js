const configs = require('./configs.js')
const axios = require('axios');
const {Router} = require('express')
const router = new Router()
const http = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        "api_key": configs.apiKey
    }
})

function routes({app}) {
    app.use("/v1/api/", router);

    router.get('/movies', async (req, res) => {
        try {
            const response = await http.get('movie/popular');
            if (response.status === 200) {
                res.send(response.data.results.map(x => {
                    return {
                        id: x.id,
                        title: x?.original_title,
                        image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + x?.backdrop_path,
                        description: x?.overview,
                        vote: x?.vote_count,
                        imageList: []
                    }
                })).status(200);
            } else {
                res.send('Network Error').status(403)
            }
        } catch (e) {
            res.send('Network Error').status(403)
        }
    });

    router.get('/movie-images/:movieId', async (req, res) => {
        try {
            const {movieId} = req.params
            if (!movieId) {
                throw new Error('MovieId is required')
            }
            const imageResponse = await http.get(`movie/${movieId}/images`)

            if (imageResponse.status === 200) {
                const {posters} = imageResponse.data;
                res.send(posters.map(x => 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + x.file_path).slice(0, 10)).status(200)
            } else {
                res.send('Network Error').status(403)
            }
        } catch (e) {
            res.send(e).status(403)
        }
    })
}

module.exports = {
    routes
}