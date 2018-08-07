const axios = require('axios');
const fs = require('fs-extra');

const utils = require("../helpers/utils");
const cuzk = require("../config/cuzk");

exports.adminUnitsAllPost = (req, res) => {
    let apiKey = req.body.apiKey;
    let adminUnit = req.body.adminUnit;
    let srsName = req.body.srs || "EPSG:4326";
    let format = req.body.format || "GeoJSON";
    let output = cuzk.formats.find(el => {
        if (el.name.toLowerCase() === format.toLowerCase()) {
            return el.output;
        }
    });
    output = output.output;
    let srs = cuzk.srsNames.find(el => {
        if (el.name === srsName) {
            return el.name
        }
    });
    srs = srs.name;
    let url;
    let errorPath = __dirname + '/../temp/error' + apiKey + '.txt';
    if (adminUnit === undefined) {
        return utils.downloadError(res, errorPath,
            'adminUnit must be specified');
    }
    let adminUnitName;
    let adminUnitCode;
    utils.adminUnitExists(res, adminUnit, errorPath)
        .then((adminUnitObject) => {
            adminUnitName = adminUnitObject.name;
            adminUnitCode = adminUnitObject.code;
            url = `${cuzk.buildings.url}${adminUnitCode}.zip`;
            axios({
                url: encodeURI(url),
                responseType: 'arraybuffer',
                type: "GET"
            })
                .then(response => {
                    let data = response.data;
                    let path = __dirname + "/../temp/download" + apiKey;
                    let originalPath = path + '.zip';
                    let target = __dirname + "/../temp/folder" + apiKey;
                    let resultPath = path + '.' + output;
                    return fs.writeFile(originalPath, data, err => {
                        if (err) {
                            return utils.downloadError(res, errorPath,
                                err.message);
                        }
                        parseEntry = (entry) => {
                            let ogr = utils.ogr(
                                target + '/' + entry.fileName,
                                'EPSG:5514',
                                srs,
                                format);

                            return utils.ogrExec(
                                res,
                                ogr,
                                errorPath,
                                resultPath,
                                `${adminUnitName}_${adminUnitCode}_build`,
                                output,
                                [
                                    { path: originalPath },
                                    { path: resultPath },
                                    { path: path, folder: true },
                                    { path: target, folder: true }
                                ]);
                        };

                        return utils.parseZip(res, originalPath, target,
                            parseEntry);

                    });
                })
                .catch(err => {
                    return utils.downloadError(res, errorPath, err.message);
                })
        })
        .catch(err => {
            return utils.downloadError(res, errorPath, err.message);
        })
}
