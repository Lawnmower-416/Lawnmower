const auth = require('../auth')
const Map = require('../models/map-schema');
const Tileset = require('../models/tileset-schema');
const User = require('../models/user-schema');
const bcrypt = require('bcryptjs');

loggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: ""
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });

        return res.status(200).json({
            loggedIn: true,
            user: { //send all back except password hash
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                username: loggedInUser.username,
                email: loggedInUser.email,
                joinDate: loggedInUser.joinDate,
                maps: loggedInUser.maps,
                tilesets: loggedInUser.tilesets,
                comments: loggedInUser.comments
            }
        })
    } catch (err) {
        res.json(false);
    }
}

login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ success: false, errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            return res
                .status(401)
                .json({
                    success: false,
                    errorMessage: "Wrong username or password provided."
                })
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            return res
                .status(401)
                .json({
                    success: false,
                    errorMessage: "Wrong username or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        await res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            samesite: "lax"
        }).status(200).json({
            success: true,
            user: existingUser
        });
        next();
    } catch (err) {
        // console.error(err);
        return res.status({ success: false, errorMessage: err});
    }
}

logout = async (req, res, next) => {
    try {
        await res.cookie("token", "", {
            httpOnly: false,
            expires: new Date(0),
            secure: false,
            samesite: "lax"
        }).json({ success: true, message: "Logged Out" });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, errorMessage: err })
    }
}

register = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !username || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ success: false, errorMessage: "Please enter all required fields." });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }

        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Please enter the same password twice."
                })
        }
        
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const existingUserUsername = await User.findOne({ username: username });

        if (existingUserUsername) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt); 

        const newUser = new User({
            firstName, lastName, email, username, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser._id);

        await res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            samesite: "lax"
        }).status(200).json({
            success: true,
            user: savedUser
        });
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errorMessage: err });
    }
}

changePassword = async (req, res, next) => {
    try {
        const { password, passwordVerify } = req.body;
        if (!password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }

        const userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                success: false,
                errorMessage: "You must be logged in to change your password."
            })
        }

        const existingUser = await User.findOne({ _id: userId });

        if (!existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Could not find user to update password."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { passwordHash: passwordHash });

        // LOGIN THE USER
        const token = auth.signToken(updatedUser._id);
        
        await res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            samesite: "lax"
        }).status(200).json({
            success: true,
            user: updatedUser
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({"success": false, "errorMessage":  "Something went wrong"});
    }
}

deleteAccount = async (req, res, next) => {
    try {
        const userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                success: false,
                errorMessage: "You must be logged in to delete your account."
            })
        }

        const existingUser = await User.findOne({ _id: userId });
        if (!existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Could not find account to delete."
                })
        }

        const deletedUser = await User.findOneAndDelete({ _id: userId });

        await res.cookie("token", "", {
            httpOnly: false,
            expires: new Date(0),
            secure: false,
            samesite: "lax"
        }).status(200).json({
            success: true,
            user: deletedUser
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({"success": false, "errorMessage":  "Something went wrong"});
    }
}

MapVerify = async (req, res, next) => {
    const collaborator = auth.verifyUser(req); // Returns the userId
    if (!collaborator) {
        return res.status(401).json({ success: false, errorMessage: "Unauthorized"});
    }
    const response = await Map.findOne({ _id: req.params.mapId, $or: [{owner: collaborator}, {collaborators: collaborator }] });
    if (response) {
        req.userId = collaborator;
        next(); // Pass to the next in pipeline
    }
    else return res.status(401).json({ success: false, errorMessage: "Unauthorized"});
};

TilesetVerify = async (req, res, next) => {
    const collaborator = auth.verifyUser(req); // Returns the userId
    if (!collaborator) {
        return res.status(401).json({ success: false, errorMessage: "Unauthorized"});
    }
    const response = await Tileset.findOne({ _id: req.params.tilesetId, $or: [{owner: collaborator}, {collaborators: collaborator }] });
    console.log("resposne", response);
    if (response) {
        req.userId = collaborator;
        next(); // Pass to the next in pipeline
    }
    else return res.status(401).json({ success: false, errorMessage: "Unauthorized"});
};

module.exports = {
    loggedIn,
    login,
    logout,
    register,
    changePassword,
    deleteAccount,
    MapVerify,
    TilesetVerify
}