const axios = require('axios');
const fs = require('fs-extra');

const utils = require("../helpers/utils");
const cuzk = require("../config/cuzk");
const AdminUnit = require('../models/adminUnit');

exports.adminUnitsIndexGet = (req, res) => {
    res.status(200).json({
        message: 'not implemented'
    })
}

exports.adminUnitsIndexPost = (req, res) => {
    AdminUnit.find({ code: req.body.code })
        .then(adminUnit => {
            if (adminUnit.length === 0) {
                const adminUnit = new AdminUnit({
                    name: req.body.name,
                    code: req.body.code,
                    districtName: req.body.districtName,
                    districtCode: req.body.districtCode,
                    regionName: req.body.regionName,
                    regionCode: req.body.regionCode
                })
                return adminUnit.save()
                    .then(result => {
                        return res.status(200).json({
                            message: 'Admin unit created'
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: 'Wrong data input'
                        })
                    })
            }
            return res.status(409).json({
                message: 'Admin unit already exists'
            })

        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}

exports.adminUnitsCodesPost = (req, res) => {
    AdminUnit.updateMany({ districtName: req.body.name },
        { $set: { districtCode: req.body.code } }).exec();

    return res.status(200).json({
        message: 'Admin unit updated'
    })

}

const sortName = (a, b) => {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

const getLevel = (el, level) => {
    return {
        name: el,
        level
    }
}

exports.adminUnitsNameGet = (req, res) => {
    let name = req.params.name.trim();
    let reg = '^' + name;
    let regObj = new RegExp(reg, 'ig');
    Promise.all([
        AdminUnit.distinct('name', { name: regObj }),
        AdminUnit.distinct('districtName', { districtName: regObj }),
        AdminUnit.distinct('regionName', { regionName: regObj })
    ])
        .then(results => {
            results[0] = results[0].map(el => getLevel(el, 'Town'));
            results[1] = results[1].map(el => getLevel(el, 'District'));
            results[2] = results[2].map(el => getLevel(el, 'Region'));
            let adminUnit = [].concat(...results);
            if (adminUnit.length === 0) {
                return res.status(200).json({ adminUnits: [] })
            }
            adminUnit.sort(sortName);
            adminUnit = adminUnit.slice(0, 5);
            return res.status(200).json({ adminUnits: adminUnit })

        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}


exports.adminUnitsNameTownGet = (req, res) => {
    let name = req.params.name.trim();
    let reg = '^' + name;
    let searchObject;
    if (!isNaN(name)) {
        searchObject = { code: new RegExp(reg, 'ig') }
    }
    else {
        searchObject = { name: new RegExp(reg, 'ig') }
    }
    AdminUnit.find(searchObject, { 'name': 1, 'code': 1 })
        .then(adminUnits => {
            if (adminUnits.length === 0) {
                return res.status(200).json({ adminUnits: [] })
            }
            adminUnits.sort(sortName);
            adminUnits = adminUnits.slice(0, 5);
            return res.status(200).json({ adminUnits })

        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}

exports.adminUnitsAllPost = (req, res) => {
    let apiKey = req.body.apiKey;
    let adminUnit = req.body.adminUnit;
    let level = req.body.level;
    let srsName = req.body.srs || "EPSG:4326";
    let lowerAdmin = req.body.lowerAdmin || false;
    let format = req.body.format || "GeoJSON";
    let errorPath = __dirname + '/../temp/error' + apiKey + '.txt';
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
    if (adminUnit === undefined) {
        return utils.downloadError(res, errorPath,
            'adminUnit must be specified');
    }
    let adminUnitName;
    let adminUnitCode;
    utils.adminUnitExists(res, adminUnit, errorPath, level)
        .then((adminUnitObject) => {
            adminUnitName = adminUnitObject.name;
            adminUnitCode = adminUnitObject.code;
            if (lowerAdmin && level !== 'Obec') {
                level = cuzk.natLevel[cuzk.natLevel
                    .findIndex(el => el.name === level) + 1].name;
                url = `${cuzk.adminUnits.url}&STOREDQUERY_ID=GetLowerUnitsById&UPPER_UNIT_ID=${adminUnitCode}&NAT_LEVEL=${level}`;
            }
            else {
                url = `${cuzk.adminUnits.url}&STOREDQUERY_ID=GetUnitById&UNIT_ID=${adminUnitCode}&NAT_LEVEL=${level}`;
            }
            axios({
                url: encodeURI(url),
                responseType: 'arraybuffer',
                type: "GET"
            })
                .then(response => {
                    let data = response.data.toString('utf8');
                    let path = __dirname + "/../temp/download" + apiKey;
                    let originalPath = path + '.gml';
                    let resultPath = path + '.' + output;
                    return fs.writeFile(originalPath, data, err => {
                        if (err) {
                            return utils.downloadError(res, errorPath,
                                err.message);
                        }

                        let ogr = utils.ogr(originalPath, 'EPSG:4326',
                            srs, format);

                        return utils.ogrExec(
                            res,
                            ogr,
                            errorPath,
                            resultPath,
                            `${adminUnitName}_${adminUnitCode}_admin`,
                            output,
                            [
                                { path: originalPath },
                                { path: resultPath },
                                { path: path + '.gfs' },
                            ]);
                    });
                })
                .catch(err => {
                    return utils.downloadError(res, errorPath, err.message);
                })
        })


}

exports.adminUnitsCzePost = (req, res) => {
    return res.redirect(
        encodeURI('http://services.cuzk.cz/gml/inspire/au/epsg-5514/1.zip'));
}

exports.adminUnitsListPost = (req, res) => {
    AdminUnit.find({}, { '_id': 0, '__v': 0 })
        .then(function (adminUnits) {
            let path = __dirname + "/../temp/list" + req.body.apiKey;
            let resultPath = path + '.json';
            fs.writeFile(resultPath, JSON.stringify(adminUnits), err => {
                if (err) {
                    return utils.downloadError(res, errorPath, err.message);
                }
                return res.download(resultPath, 'Administrative units.json',
                    err => {
                        if (err) {
                            return utils.downloadError(res, errorPath,
                                err.message);
                        }
                        fs.unlink(resultPath);
                    });

            });
        })
        .catch(err => {
            return utils.downloadError(res, errorPath, err.message);
        })
}