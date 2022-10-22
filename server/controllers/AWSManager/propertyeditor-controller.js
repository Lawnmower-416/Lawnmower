const { findOne } = require("../../models/property-schema");
const Property = require("../../models/property-schema");

module.exports.createProperty = async (req, res) => {
    if (!req.body) return res.status(400).json({ success: false, errorMessage: "Improperly formatted request" });

    const newProperty = new Property(req.body);
    newProperty.save().then(() => {
        return res.status(200).json({ success: true, property: newProperty });
    }).catch(err => res.status(500).json({ success: false, errorMessage: err }));
};

module.exports.deleteProperty = async (req, res) => {
    await Property.findOneAndDelete({ _id: req.params.propertyId }, (err, deletedProperty) => {
        if (err) return res.status(500).json({ success: false, errorMessage: err });
        return res.status(200).json({ success: true, property: deletedProperty });
    });
};

module.exports.getProperty = async (req, res) => {
    await findOne({ _id: req.params.propertyId}, (err, property) => {
        if (err) return res.status(400).json({ success: false, errorMessage: "Property Not Found" });
        return res.status(200).json({ success: true, property: property });
    });
};

module.exports.updateProperty = async (req, res) => {
    await Property.findOneAndUpdate({ _id: req.params.propertyId }, { name: req.body.name, type: req.body.type, value: req.body.value }, { new: true }, (err, property) => {
        if (err) return res.status(500).json({ success: false, errorMessage: err });
        return res.status(200).json({ success: true, property: property });
    });
};