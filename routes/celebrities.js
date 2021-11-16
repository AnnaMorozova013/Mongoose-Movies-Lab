const router = require('express').Router();
const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
    // res.send('hello')
    Celebrity.find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render('celebrities/index', { celebritiesList: celebritiesFromDB })
        })
        .catch(err => next(err))
});

router.get('/celebrities/add', (req, res, next) => {
    res.render('celebrities/addForm')
});

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id
    Celebrity.findById(id)
        .then(celebrityFromDB => {
            console.log(celebrityFromDB)
            res.render('celebrities/details', { celebrity: celebrityFromDB })
        })
        .catch(err => next(err))
});

router.post('/celebrities', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    })
        .then(createdCelebrity => {
            console.log(createdCelebrity)

            res.redirect(`/celebrities/${createdCelebrity._id}`)
        })
});

router.get('/celebrities/edit/:id', (req, res, next) => {
    const id = req.params.id

    Celebrity.findById(id)
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)

            res.render('celebrities/editForm', { celebrity: celebritiesFromDB })
        })
        .catch(err => next(err))
});

router.post('/celebrities/edit/:id', (req, res, next) => {
    const id = req.params.id

    const { name, occupation, catchPhrase } = req.body

    Celebrity.findByIdAndUpdate(id, {
        name,
        occupation,
        catchPhrase
    }, { new: true })
        .then(updatedCelebrity => {
            console.log(updatedCelebrity)
            res.redirect(`/celebrities/${updatedCelebrity._id}`)
        })
        .catch(err => next(err))
});

router.get('/celebrities/delete/:id', (req, res, next) => {
    const id = req.params.id
    Celebrity.findByIdAndDelete(id)
        .then(() => {
            // redirect to the list
            res.redirect('/celebrities')
        })
        .catch(err => {
            next(err)
        })
});

module.exports = router;