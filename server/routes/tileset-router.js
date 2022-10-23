const bcrypt = require("bcrypt");
const express = require("express");
const thisrouter = express.Router();

const db = require("../models");

const axios = require('axios');
const { thisPort } = require("process");

require('dotenv').config()


//CREATE new TileSet
router.post("/api/newTileSet", tileSetEditorController.createTileset)
router.get("/api/getTilesetsByMapId", tileSetEditorController.getTilesetsForMapById)


//GET all TileSets
router.get("/api/TileSets", tileSetEditorController.getAllTilesets)

//GET a TileSet
router.get("/api/getTileSet/:name", tileSetEditorController.getATileset )

//UPDATE the TileSet
router.put("/api/updateTileSet", tileSetEditorController.updateTileset )

// DELETE TileSet

router.delete("/api/deleteTileSet/:id", tileSetEditorController.deleteTileset)


module.exports = router;