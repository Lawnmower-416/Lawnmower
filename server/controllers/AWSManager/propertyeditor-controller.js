const { findOne } = require("../../models/property-schema");
const Property = require("../../models/property-schema");

module.exports.createProperty = async (req, res) => {
    if (!req.body) return null;

    const newProperty = new Property(req.body);
    newProperty.save().then(() => {
        return newProperty;
    }).catch(err => {return null;});
};

module.exports.deleteProperty = async (req, res) => {
    await Property.findOneAndDelete({ _id: req.params.propertyId }, (err, deletedProperty) => {
        if (err) return null;
        return deletedProperty;
    });
};

module.exports.getProperty = async (req, res) => {
    await findOne({ _id: req.params.propertyId}, (err, property) => {
        if (err) return null;
        return property;
    });
};

module.exports.updateProperty = async (req, res) => {
    await Property.findOneAndUpdate({ _id: req.params.propertyId }, { name: req.body.name, type: req.body.type, value: req.body.value }, { new: true }, (err, property) => {
        if (err) return null;
        return property;
    });
};