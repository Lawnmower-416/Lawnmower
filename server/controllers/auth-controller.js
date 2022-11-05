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
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });

        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                username: loggedInUser.username,
                email: loggedInUser.email,
                joinDate: loggedInUser.joinDate
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

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                username: existingUser.username,
                email: existingUser.email              
            }
        })

    } catch (err) {
        // console.error(err);
        return res.status({ success: false, errorMessage: err});
    }
}

logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: true
        }).json({ success: true, message: "Logged Out" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, errorMessage: err })
    }
}

register = async (req, res) => {
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
                    errorMessage: "An account with this username address already exists."
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
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                username: savedUser.username,
                email: savedUser.email              
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errorMessage: err });
    }
}

changePassword = async (req, res) => {
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
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteAccount = async (req, res) => {
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

        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                firstName: deletedUser.firstName,
                lastName: deletedUser.lastName,
                username: deletedUser.username,
                email: deletedUser.email
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
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