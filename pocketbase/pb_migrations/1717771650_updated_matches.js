/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mfsvmyvl3z0jfoh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vji1yqsc",
    "name": "played",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mfsvmyvl3z0jfoh")

  // remove
  collection.schema.removeField("vji1yqsc")

  return dao.saveCollection(collection)
})
