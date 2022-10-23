const databaseManager = require("./AWSManager/mapeditor-controller");

module.exports.getMap = async (req, res) => {
    const id = req.params.mapId;
    const userId = req.body.userId;

    let map = databaseManager.getMap(id);

    if(!map) {
        return res.status(400).json({
            success: false,
            errorMessage: "Map not found"
        });
    }

    if(!map.public) {
        if(map.owner != userId && !map.collaborators.includes(userId)) {
            return res.status(403).json({
                success: false,
                errorMessage: "You do not have permission to view this map."
            });
        }
    }

    return res.status(200).json({
        success: true,
        map: map
    });
}

module.exports.updateMap = async (req, res) => {
    const id = req.params.mapId;
    const userId = req.body.userId;
    const newMap = req.body.map;

    let map = databaseManager.getMap(id);

    if(!map) {
        return res.status(400).json({
            success: false,
            errorMessage: "Map not found"
        });
    }

    if(map.owner != userId && !map.collaborators.includes(userId)) {
        return res.status(403).json({
            success: false,
            errorMessage: "You do not have permission to view this map."
        });
    }

    let updatedMap = databaseManager.updateMap(newMap);
    if(!updatedMap) {
        return res.status(400).json({
            success: false,
            errorMessage: "Unable to update map"
        });
    } else {
        return res.status(200).json({
            success: true,
            map: updatedMap
        });
    }
}