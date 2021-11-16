const mongoose = require('mongoose')
const Celebrity = require('./models/Celebrity')

// open up connection to mongo

mongoose.connect('')

const celebrities = [
    {
        name: 'Quentin Tarantino',
        occupation: 'Movie director',
        catchPhrase: 'When people ask me if I went to film school I tell them: "no, I went to films."'
    },

    {
        name: 'Leo Tolstoy',
        occupation: 'Author',
        catchPhrase: 'If you want to be happy, be.'
    },

    {
        name: 'Maria Sharapova',
        occupation: 'Tennis player',
        catchPhrase: 'I do not worry about what my opponent is doing.'
    }
]

Celebrity.insertMany(celebrities)
    .then(celebrities => {

        console.log(`Success! - ${celebrities.length} were added to the database`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))