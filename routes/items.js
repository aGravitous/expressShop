const express = require("express");
const router = new express.Router()
const items = require("../fakeDb");
const ExpressError = require("../expressError")

router.get("", function(req, res, next){
    try {
        return res.json({response: items});
    } catch(err) {
        return next(err);
    }
});

router.post("", function(req, res, next){
    try {
        let item = req.body;
        items.push(item);
        return res.json({item})
    } catch(err) {
        return next(err);
    }
});

router.get("/:name", function(req, res, next){
    try {
        let currItem = req.params.name;

        let foundItem = items.find(function(item){
            console.log(item);
            return currItem === item.name;
        })
        
        return res.json(foundItem)
    } catch(err) {
        return next(err);
    }
});

router.patch("/:name", function(req, res, next){
    try {

    } catch(err) {
        return next(err);
    }
});

router.delete("/:name", function(req, res, next){
    try {

    } catch(err) {
        return next(err);
    }
});

module.exports = router;