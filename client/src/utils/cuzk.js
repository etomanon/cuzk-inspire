export default {
    srs: [
        {name: "EPSG:4326"},
        {name: "EPSG:3857"},
        {name: "EPSG:5514"},
        {name: "EPSG:4258"}
    ],
    formats: [
        { name: "ESRI Shapefile", output: 'zip' },
        { name: "GeoJSON", output: 'geojson' },
        { name: "GML", output: 'gml' },
        { name: "KML", output: 'kml' }
    ]
}