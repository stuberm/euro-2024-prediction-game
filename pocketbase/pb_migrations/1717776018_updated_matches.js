/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mfsvmyvl3z0jfoh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xkvwlsr9",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Group A",
        "Group B",
        "Group C",
        "Group D",
        "Group E",
        "Group F"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mfsvmyvl3z0jfoh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xkvwlsr9",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Group A",
        "Group B"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
