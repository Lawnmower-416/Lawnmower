const express = require('express')
const router = express.Router()
const auth = require('../auth')
const MapEditorController = require('../controllers/map-editor-controller')
const TilesetEditorController = require('../controllers/tileset-editor-controller')
const LayerEditorController = require('../controllers/layer-editor-controller')
const PropertyEditorController = require('../controllers/property-editor-controller')
const TagsController = require('../controllers/tags-controller')

// gets all basic info about a map needed for editing
router.get('/map/:mapId', auth.verify, MapEditorController.getMap)
// Handles update a map in the database request
router.put('/map/:mapId', auth.verify, MapEditorController.updateMap)
// Gets all tilesets for the maps
router.get('/map/:mapId/tilesets', auth.verfiy, TilesetEditorController.getTilesetsForById)
// Hanldes update a tileset in the database request
router.put('/map/:mapId/tileset/:tilesetId', auth.verify, TilesetEditorController.updateTileset)

// Layer Routes
router.post('/map/:mapId/layer', auth.verify, LayerEditorController.createLayer)
router.get('map/:mapId/layer/:layerId', auth.verify, LayerEditorController.getLayer)
router.put('/map/:mapId/layer/:layerId', auth.verify, LayerEditorController.updateLayer)
router.delete('/map/:mapId/layer/:layerId', auth.verify, LayerEditorController.deleteLayer)

// Property Routes
router.post('/map/:mapId/layer/:layerId/property', auth.verify, PropertyEditorController.createProperty)
router.get('/map/:mapId/layer/:layerId/property/:propertyId', auth.verify, PropertyEditorController.getProperty)
router.put('/map/:mapId/layer/:layerId/property/:propertyId', auth.verify, PropertyEditorController.updateProperty)
router.delete('/map/:mapId/layer/:layerId/property/:propertyId', auth.verify, PropertyEditorController.deleteProperty)

// Tag Routes
router.get('/tags', auth.verify, TagsController.getTags)
router.post('/tag/:tagId', auth.verify, TagsController.createTag)
router.put('/tag/:tagId', auth.verify, TagsController.updateTag)
// ability to delete tag is for backend admins only
router.delete('/tag/:tagId', auth.verify, TagsController.deleteTag)

// Tileset Routes
router.get('/tileset', auth.verify, TilesetEditorController.getTileset)
router.put('/tileset/:tilesetId/place', auth.verify, TilesetEditorController.placeTiles)
router.put('tileset/:tilesetId', auth.verify, TilesetEditorController.updateMap)
router.get('/tileset/:tilesetId/export/:versionId', auth.verify, TilesetEditorController.export)

module.exports = router