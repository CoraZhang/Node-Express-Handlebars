const express = require("express");
const router = express.Router();
const path = require("path");

const burger = require("../models/burger.js");
// require models
function removeSpecials(str) {
    return str.replace(/[^\-.!,&$%?\w\s]/gi, '');
}
//Regex 
// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
    burger.select(data => {
        const hbsObject = {
            burgers: data
        }; // select all burgers and render the whole list
        res.render("index", hbsObject);
    });
});
// Add new burger, pass JSON file
router.post("/api/burgers", (req, res) => {
    burger.insert(["burger_name", "description"], [removeSpecials(req.body.burger_name), removeSpecials(req.body.description)], result => {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});
// Edit devoured / not devoured status
router.put("/api/burgers/:id", (req, res) => {
    const condition = "id = " + req.params.id;
    burger.update({
            devoured: req.body.devoured
        },
        condition,
        result => {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();

        }
    );

});
//  favor/unfavor for selected burger in devoured
router.put("/api/burgers/fav/:id", (req, res) => {
    const condition = "id = " + req.params.id;
    let fav = false;
    if (req.body.favorite == 1) {
        fav = true;
    }
    burger.update({
            favorite: fav
        },
        condition,
        result => {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();

        }
    );

});
// Edit the burgers name and info
router.put("/api/burgers/update/:id", (req, res) => {
    const condition = "id = " + req.params.id;
    burger.update({
            burger_name: removeSpecials(req.body.burger_name),
            description: removeSpecials(req.body.description)
        },
        condition,
        result => {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();

            }
            res.status(200).end();

        }
    );
});
// delete burger
router.delete("/api/burgers/:id", (req, res) => {
    burger.delete("id", req.params.id, (data) => {
        res.json(data);
    });
});
// cannot get
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/error.html"));
});
// cannot update
router.put("*", (req, res) => {
    //console.log(req.body)
    res.sendFile(path.join(__dirname, "../public/error.html"));
})

// Export routes for server.js to use.
module.exports = router;