const router = require('express').Router();
const Movie = require('../models/Movie')

router.get('/movies', (req, res, next) => {
    // res.send('hello')
    Movie.find()
        .then(moviesFromDB => {
            console.log(moviesFromDB)
            res.render('movies/indexMovies', { moviesList: moviesFromDB })
        })
        .catch(err => next(err))
});

router.get('/movies/add', (req, res, next) => {
    res.render('movies/addFormMovies')
});

router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
        .then(movieFromDB => {
            console.log(movieFromDB)
            res.render('movies/detailsMovies', { movie: moviesFromDB })
        })
        .catch(err => next(err))
});

router.post('/movies', (req, res, next) => {
    const { title, genre, plot, cast } = req.body


Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
})
    .then(createdMovie => {
        console.log(createdMovie)

        res.redirect(`/movies/${createdMovie._id}`)
    })
});

module.exports = router;