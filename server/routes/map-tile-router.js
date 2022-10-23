const express = require('express')
const router = express.Router()
const auth = require('../auth')
const MapEditorController = require('../controllers/map-editor-controller')
const TilesetEditorController = require('../controllers/tileset-editor-controller')
const LayerEditorController = require('../controllers/layer-editor-controller')
const PropertyEditorController = require('../controllers/property-editor-controller')
const TagsController = require('../controllers/tags-editor-controller')

// gets all basic info about a map needed for editing
router.get('/map/:mapId', auth.MapVerify.verify, MapEditorController.getMap)
// Handles update a map in the database request
router.put('/map/:mapId', auth.MapVerify.verify, MapEditorController.updateMap)
// Gets all tilesets for the maps
router.get('/map/:mapId/tilesets', auth.TilesetVerify.verify, TilesetEditorController.getTilesetsForMapById)
// Hanldes update a tileset in the database request
router.put('/map/:mapId/tileset/:tilesetId', auth.TilesetVerify.verify, TilesetEditorController.updateTileset)

// Layer Routes
router.post('/map/:mapId/layer', auth.MapVerify.verify, LayerEditorController.createLayer)
router.get('map/:mapId/layer/:layerId', auth.MapVerify.verify, LayerEditorController.getLayer)
router.put('/map/:mapId/layer/:layerId', auth.MapVerify.verify, LayerEditorController.updateLayer)
router.delete('/map/:mapId/layer/:layerId', auth.MapVerify.verify, LayerEditorController.deleteLayer)

// Property Routes
router.post('/map/:mapId/layer/:layerId/property', auth.MapVerify.verify, PropertyEditorController.createProperty)
router.get('/map/:mapId/layer/:layerId/property/:propertyId', auth.MapVerify.verify, PropertyEditorController.getProperty)
router.put('/map/:mapId/layer/:layerId/property/:propertyId', auth.MapVerify.verify, PropertyEditorController.updateProperty)
router.delete('/map/:mapId/layer/:layerId/property/:propertyId', auth.MapVerify.verify, PropertyEditorController.deleteProperty)

// Tag Routes
router.get('/tags', auth.verify, TagsController.getTag)
router.post('/tag/:tagId', auth.verify, TagsController.createTag)
router.put('/tag/:tagId', auth.verify, TagsController.updateTag)
// ability to delete tag is for backend admins only
router.delete('/tag/:tagId', auth.verify, TagsController.deleteTag)

// Tileset Routes
router.get('/tileset', auth.TilesetVerify.verify, TilesetEditorController.getTileset)
router.put('/tileset/:tilesetId/place', auth.TilesetVerify.verify, TilesetEditorController.placeTiles)
router.put('tileset/:tilesetId', auth.TilesetVerify.verify, TilesetEditorController.updateMap)
router.get('/tileset/:tilesetId/export/:versionId', auth.TilesetVerify.verify, TilesetEditorController.export)

module.exports = router