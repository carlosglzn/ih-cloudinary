const Movie = require('./../models/Movie.model')

// GET - /

exports.listMovies = async (req, res) => {

    Movie.find({})
        .then(peliculasEncontradas => {
            res.render("movie-views/movies-list", {
                movies: peliculasEncontradas
            })
        })
        .catch(e => console.log(e))

        /*

        try {

            const peliculasEncontradas = await Movie.find({})
            res.render('movie-views/movie-list', {
                movies: peliculasEncontradas
            })

        } catch(e) {
            console.log(e )
        }
            

        */
}


// GET - /create

exports.createMovie = async (req, res) => {
    
    res.render('movie-views/movie-create')

}


// POST - /create

exports.processMovie = async (req, res) => {

    const { title, description } = req.body

    Movie.create({
         title, 
         description, 
         imageUrl: req.file.path
        })
        .then((peliculaCreada) => {
            console.log(peliculaCreada)
            res.redirect('/movies')
        })
        .catch((e) => {
            console.log("Hubo un error creando una película", e)
        })

}

// GET - /:id/edit

exports.editMovie = async (req, res) => {

    const { id } = req.params

    Movie.findById(id)
        .then((peliculaPorEditar) => {
            res.render('movie-views/movie-edit', peliculaPorEditar)
        })
        .catch((e) => {
            console.log(e)
        })

}

// POST - /:id/edit

exports.updateMovie = async (req, res) => {

    const { id } = req.params
    const { title, description, existingImage } = req.body

    let imageUrl

    if (req.file) {
        imageUrl = req.file.path
    } else {
        imageUrl = existingImage
    }

    Movie.findByIdAndUpdate(id, { title, description, imageUrl }, {new: true} )
        .then(() => {
            res.redirect('/movies')
        })
        .catch((e) => {
            console.log(e)
        })
}

