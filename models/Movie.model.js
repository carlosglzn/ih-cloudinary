// 1. IMPORTACION

const mongoose = require('mongoose');
const Schema   = mongoose.Schema

// 2. SCHEMA

const movieSchema = new Schema(
    {
        title: String,
        description: String,
        imageUrl: String
    },
    {
        timestamps: true
    }
)

// 3. MODELO

const Movie = mongoose.model("Movie", movieSchema)

// 4. EXPORTACION

module.exports = Movie
