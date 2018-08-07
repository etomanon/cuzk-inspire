const cuzk = {
    adminUnits: {
        url: "http://services.cuzk.cz/wfs/inspire-au-wfs.asp?service=wfs&version=2.0.0&request=GetFeature&typeNames=au:AdministrativeUnit&srsName=EPSG:4326"
    },
    buildings: {
        url: "http://services.cuzk.cz/gml/inspire/bu/epsg-5514/"
    },
    srsNames: [
        { name: "EPSG:4326" },
        { name: "EPSG:3857" },
        { name: "EPSG:5514" },
        { name: "EPSG:4258" }
    ],
    natLevel: [
        { name: "Stát" },
        { name: "Kraj" },
        { name: "Okres" },
        { name: "Obec" }
    ],
    // https://github.com/wavded/ogr2ogr/blob/master/modules/drivers.json
    formats: [
        { name: "ESRI Shapefile", output: 'zip' },
        { name: "GeoJSON", output: 'geojson' },
        { name: "GML", output: 'gml' },
        { name: "KML", output: 'kml' }
    ]
};

module.exports = cuzk;
// data model
// http://services.cuzk.cz/doc/inspire-au-data.pdf
// list stored queries
// http://services.cuzk.cz/wfs/inspire-au-wfs.asp?service=wfs&version=2.0.0&request=ListStoredQueries
// describe stored query
// http://services.cuzk.cz/wfs/inspire-au-wfs.asp?service=wfs&version=2.0.0&request=DescribeStoredQueries&storedQuery_Id=GetLowerUnits
// get single admin unit
// http://services.cuzk.cz/wfs/inspire-au-wfs.asp?service=wfs&version=2.0.0&request=GetFeature&STOREDQUERY_ID=GetUnitByName&UNIT_NAME=Hlavní město Praha&NAT_LEVEL=Kraj
// get lower admin units
// http://services.cuzk.cz/wfs/inspire-au-wfs.asp?service=wfs&version=2.0.0&request=GetFeature&STOREDQUERY_ID=GetLowerUnitsByName&UPPER_UNIT_NAME=Cheb&NAT_LEVEL=Obec
// http://services.cuzk.cz/wfs/inspire-au-wfs.asp?service=wfs&version=2.0.0&request=GetFeature&STOREDQUERY_ID=GetLowerUnitsByName&UPPER_UNIT_NAME=Česká republika&NAT_LEVEL=Kraj