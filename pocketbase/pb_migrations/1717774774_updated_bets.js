/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5muct0ev5ryx9bw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0jx48mgj",
    "name": "points",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5muct0ev5ryx9bw")

  // remove
  collection.schema.removeField("0jx48mgj")

  return dao.saveCollection(collection)
})
