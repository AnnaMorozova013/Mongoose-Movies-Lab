const router = require('express').Router();
const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')

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
    // res.send('hello')
    Celebrity.find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render('movies/addFormMovies', { celebritiesList: celebritiesFromDB })
        })
        .catch(err => next(err))
});

router.get('/movies/add', (req, res, next) => {
    res.render('movies/addFormMovies')
});

router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
        .then(moviesFromDB => {
            console.log(moviesFromDB)
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
            res.redirect('/movies/')
        })
});

router.get('/movies/edit/:id', (req, res, next) => {
    const id = req.params.id

    Movie.findById(id)
        .then(moviesFromDB => {
            console.log(moviesFromDB)

            res.render('movies/editFormMovies', { movie: moviesFromDB })
        })
        .catch(err => next(err))
});

router.post('/movies/edit/:id', (req, res, next) => {
    const id = req.params.id

    const { title, genre, plot, cast } = req.body

    Movie.findByIdAndUpdate(id, {
        title,
        genre,
        plot,
        cast
    }, { new: true })
        .then(updatedMovie => {
            console.log(updatedMovie)
            res.redirect('/movies')
        })
        .catch(err => next(err))
});


router.get('/movies/edit/:id', (req, res, next) => {
    // res.send('hello')
    Celebrity.find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render('movies/editFormMovies', { celebritiesList: celebritiesFromDB })
        })
        .catch(err => next(err))
});

router.get('/movies/edit/:id', (req, res, next) => {
    res.render('movies/editFormMovies')
});


router.get('/movies/delete/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findByIdAndDelete(id)
        .then(() => {
            // redirect to the list
            res.redirect('/movies')
        })
        .catch(err => {
            next(err)
        })
});

module.exports = router;