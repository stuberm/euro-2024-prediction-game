/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6nqxwwxb5lxe9be")

  collection.listRule = "id = @request.auth.id"
  collection.viewRule = "id = @request.auth.id"
  collection.updateRule = "id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6nqxwwxb5lxe9be")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})
