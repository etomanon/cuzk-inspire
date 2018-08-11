const extract = require('extract-zip');
const ogr2ogr = require('ogr2ogr');
const fs = require('fs-extra');
const uuid = require('uuid')

const cipher = require('../helpers/cipher')

const AdminUnit = require('../models/adminUnit');
const User = require('../models/user');

const utils = {
    downloadError: (res, errorPath, message) => {
        return fs.writeFile(
            errorPath,
            message,
            err => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    })
                }
                return res.download(errorPath, "error.txt",
                    err => {
                        fs.unlink(errorPath);
                        if (err) {
                            return res.status(500).json({
                                error: err.message
                            })
                        }
                    })
            })
    },
    parseZip: (res, originalPath, target, parseEntry) => {
        return extract(originalPath, { dir: target, onEntry: parseEntry },
            (err) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    })
                }
            })
    },
    ogr: (target, sourceSrs, targetSrs, format) => {
        return ogr2ogr(target)
            .skipfailures()
            .timeout(180000)
            .project(targetSrs, sourceSrs)
            .format(format)
    },
    ogrExec: (res, ogr, errorPath, resultPath, adminUnit, output,
        removePaths) => {
        return ogr.exec((err, data) => {
            if (err) {
                utils.removeTempFiles(removePaths);
                return utils.downloadError(res, errorPath, err.message);
            }

            if (!Buffer.isBuffer(data)) {
                data = JSON.stringify(data);
            }
            fs.writeFile(resultPath, data, err => {
                if (err) {
                    utils.removeTempFiles(removePaths);
                    return utils.downloadError(res, errorPath, err.message);
                }
                return res.download(resultPath, adminUnit + '.' + output,
                    err => {
                        utils.removeTempFiles(removePaths);
                        if (err) {
                            return utils.downloadError(res, errorPath,
                                err.message);
                        }
                    });

            })

        })

    },
    adminUnitExists: (res, adminUnit, errorPath, level) => {
        return new Promise((resolve) => {
            if (!level || level === 'Obec') {
                utils.townExists(res, adminUnit, errorPath, resolve)
            }
            if (level === 'Okres') {
                utils.districtExists(res, adminUnit, errorPath, resolve)
            }
            if (level === 'Kraj') {
                utils.regionExists(res, adminUnit, errorPath, resolve)
            }
        })
    },

    townExists: (res, adminUnit, errorPath, resolve) => {
        AdminUnit.findOne({ $or: [{ code: adminUnit }, { name: adminUnit }] })
            .then(adminUnitObject => {
                if (!adminUnitObject) {
                    return utils.downloadError(res, errorPath,
                        `Administrative unit does not exist: ${adminUnit}`);
                }
                resolve(adminUnitObject);
            })
            .catch(err => {
                return utils.downloadError(res, errorPath, err.message);
            })
    },
    districtExists: (res, adminUnit, errorPath, resolve) => {
        AdminUnit.findOne({
            $or:
                [{ districtCode: adminUnit }, { districtName: adminUnit }]
        })
            .then(adminUnitObject => {
                if (!adminUnitObject) {
                    return utils.regionExists(res, adminUnit, errorPath, resolve);
                }
                adminUnitObject.name = adminUnitObject.districtName;
                adminUnitObject.code = adminUnitObject.districtCode;
                resolve(adminUnitObject);
            })
            .catch(err => {
                return utils.downloadError(res, errorPath, err.message);
            })
    },
    regionExists: (res, adminUnit, errorPath, resolve) => {
        return AdminUnit.findOne({
            $or:
                [{ regionCode: adminUnit }, { regionName: adminUnit }]
        })
            .then(adminUnitObject => {
                if (!adminUnitObject) {
                    return utils.downloadError(res, errorPath,
                        `Administrative unit does not exist: ${adminUnit}`);
                }
                adminUnitObject.name = adminUnitObject.regionName;
                adminUnitObject.code = adminUnitObject.regionCode;
                resolve(adminUnitObject);
            })
            .catch(err => {
                return utils.downloadError(res, errorPath, err.message);
            })
    },
    removeTempFiles: (removePaths) => {
        removePaths.forEach(el => {
            if (el.folder) {
                fs.remove(el.path);
            }
            else {
                fs.unlink(el.path);
            }
        })
    },
    createToken: (resolve, reject) => {
        if (resolve && reject) {
            return utils.checkToken(resolve, reject);
        }
        return new Promise((resolve, reject) => {
            return utils.checkToken(resolve, reject);
        })
    },
    checkToken: (resolve, reject) => {
        const token = uuid.v4();
        const freeToken = cipher.encrypt(token);
        User.findOne({ freeToken })
            .then(userObject => {
                if (userObject) {
                    return utils.createToken(resolve, reject);
                }
                resolve(freeToken);
            })
            .catch(err => {
                reject(err);
            })
    }
}

module.exports = utils;