const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminUnitSchema = new Schema({
    name: { types: String, required: true },
    code: { types: String, required: true, unique: true },
    districtName: { types: String, required: true },
    districtCode: { types: String, required: true },
    regionName: { types: String, required: true },
    regionCode: { types: String, required: true }
}, { typeKey: 'types' })

adminUnitSchema.virtual('name_lower').get(function () {
    return this.name.toLowerCase().trim();
});

adminUnitSchema.index({
    name: 1,
    code: 1,
    districtName: 1,
    districtCode: 1,
    regionName: 1,
    regionCode: 1,
});

const AdminUnit = mongoose.model('admin_unit', adminUnitSchema)

module.exports = AdminUnit