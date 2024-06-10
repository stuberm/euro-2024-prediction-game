/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6nqxwwxb5lxe9be");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "6nqxwwxb5lxe9be",
    "created": "2024-06-07 09:50:13.245Z",
    "updated": "2024-06-07 12:00:14.479Z",
    "name": "game_users",
    "type": "auth",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id",
    "createRule": "",
    "updateRule": "id = @request.auth.id",
    "deleteRule": "id = @request.auth.id",
    "options": {
      "allowEmailAuth": false,
      "allowOAuth2Auth": false,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 5,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
})
