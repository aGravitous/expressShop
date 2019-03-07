const express = require("express");
const router = new express.Router()
const items = require("../fakeDb");
const ExpressError = require("../expressError")

// Returns array of objects. Objects are items by name
// and price.
router.get("", function(req, res, next){
    try {
        return res.json({response: items});
    } catch(err) {
        return next(err);
    }
});

// Add object to fakeDb if json with keys of name and price
// are sent as json. Returns json of submitted object on success.
router.post("", function(req, res, next){
    try {
        if (typeof (req.body.name) !== "string" || typeof (req.body.price !== "number")){
            throw new ExpressError("Please enter string for name and integer for price.", 400)
        }
        let item = req.body;
        items.push(item);
        return res.json({item})
    } catch(err) {
        return next(err);
    }
});

// Search for item by url parameter name. Returns name and price
// object.
router.get("/:name", function(req, res, next){
    try {
        let currItem = req.params.name;

        let foundItem = items.find(function(item){
            return currItem === item.name;
        })
        if (foundItem === undefined){
            throw new ExpressError("No such item in list.", 404)
        }

        return res.json(foundItem);
    } catch(err) {
        return next(err);
    }
});

// Allows user to change name, price, or both of item with name
// of url parameter. Returns modified object.
router.patch("/:name", function(req, res, next){
    try {
        let currItem = req.params.name;

        let foundItem = items.find(function(item){
            return currItem === item.name;
        })
        if (foundItem === undefined){
            throw new ExpressError("No such item in list.", 404)
        }

        let newItemVals = req.body;
        let keys = Object.keys(newItemVals);

        if (keys.length === 2){
            foundItem.name = newItemVals.name;
            foundItem.price = newItemVals.price;

        } else if (keys.includes("name")) {
            foundItem.name = newItemVals.name;
        } else {
            foundItem.price = newItemVals.price;
        }

        return res.json(foundItem)
    } catch(err) {
        return next(err);
    }
});

// Removes object with url parameter name, returns success message.
router.delete("/:name", function(req, res, next){
    try {
        let currItem = req.params.name;
        let foundItem = items.find(function(item){
            return currItem === item.name;
        })
        if (foundItem === undefined){
            throw new ExpressError("No such item in list.", 404)
        }

        for (let i = 0; i < items.length; i++){
            if (items[i].name === currItem){
                items.splice(i, 1);
            }
        }

        return res.json(
            {message: `${currItem} deleted.`}
        )
    } catch(err) {
        return next(err);
    }
});

module.exports = router;