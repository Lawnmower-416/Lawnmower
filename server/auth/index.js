const jwt = require("jsonwebtoken");
const Map = require("../models/map-schema");
const Tileset = require("../models/tileset-schema");

function authManager() {
    verify = (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized"
            });
        }
    }

    verifyUser = (req) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return null;
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            return decodedToken.userId;
        } catch (err) {
            return null;
        }
    }

    signToken = (userId) => {
        return jwt.sign({
            userId: userId
        }, process.env.JWT_SECRET);
    }

    verifyByType = async (type, req, res) => {
        // Check to see if the user performing the change is a collaborator
        const collaborator = this.verifyUser(req); // Returns the userId
        if (!collaborator) return res.status(401).json({ success: false, errorMessage: "Unauthorized"})
        if (type === "map") {
            const response = await Map.findOne({ _id: req.params.mapId, owner: collaborator });
            if (response.status === 200) next(); // Pass to the next in pipeline
            else return res.status(401).json({ success: false, errorMessage: "Unauthorized"});
        } else if (type === "tileset") {
            const response = await Tileset.findOne({ _id: req.params.mapId, owner: collaborator });
            if (response.status === 200) next(); // Pass to the next in pipeline
            else return res.status(401).json({ success: false, errorMessage: "Unauthorized"});
        }
    }

    Map = (req, res) => {
        verify = (req, res) => {
            return verifyByType('map', req, res);
        };
    };

    Tileset = (req, res) => {
        verify = (req, res) => {
            return verifyByType('tileset', req, res);
        };
    };

    return this;
}

const auth = authManager();
module.exports = auth;