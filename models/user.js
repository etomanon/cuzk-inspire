const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    email: String,
    googleid: String,
    freeToken: String,
    hits: Number,
    dateToken: Date,
    format: {
        type: String,
        default: 'GeoJSON',
        enum: ['CSV', 'DGN', 'DXF', 'ESRI Shapefile', 'GeoJSON', 'GML', 'GPKG', 'GML']
    },
    srs: {
        type: String,
        default: 'EPSG:3857',
        enum: ['EPSG:4326', 'EPSG:3857', 'EPSG:5514']
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User