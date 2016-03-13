# tf2-inventory-parser

TF2 inventory parser.

```
$ npm install tf2-inventory-parser
```

``` javascript
"use strict";
const inventoryParser = require("tf2-inventory-parser");

inventoryParser.getInventory("m0nty_tv", function(err, inventory) {
	if(err) throw err;

	inventory.map(function(item) {
		return item.name;
	}).forEach(function(item) {
		console.log(item);
	});
});
```

```
$ node test.js
Strange Specialized Killstreak Third Degree
Strange Natascha
Strange Southern Hospitality
Strange Dalokohs Bar
Strange Killstreak Festive Flare Gun
Strange Winger
Bill's Hat
```
