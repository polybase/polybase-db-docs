---
slug: /collections
sidebar_position: 5
---

# Collections


Collections are the main construct in Spacetime for storing and retrieving data. They are equivilent to a database table.

You can create a collection in our [explorer](https://explorer.testnet.spacetime.is).


## Collection Definition

Collections are defined using JSON, the following provides an example:

```json
{
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      }
    },
  },
  "indexes": ["name", ]
}
```


### Schema

The schema defines the structure of data that can be stored in the collection. The schema definition may look familiar, that's because it uses [JSON Schema](https://json-schema.org/) syntax.


### Indexes

Indexes are a list of fields in addition to the documents `id` field that should be indexed. You need to ensure that all fields that are included in a `where` or `sort` clause are included in the indexes.


## Collection Definition Schema

The *Collection Definition* (as described above) also has a schema that describes the properties that can be added to a collection's definition.

As new features are added to Spacetime, the collection definition schema will be updated to allow additional properties. 

You can view the current collection definition schema at:

https://testnet.spacetime.is/v0/data/$collections/$collections