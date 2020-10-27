// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
    select: function(cb) {
        orm.selectAll("burgers", (res) => {
            cb(res);
        });
    },
    selectOne: function(condition, cb) {
        orm.selectOne("burgers", condition, (res) => {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    insert: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, (res) => {
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, (res) => {
            cb(res);
        });
    },
    delete: function(cols, vals, cb) {
        orm.deleteOne("burgers", cols, vals, (res) => {
            cb(res);
        });
    }
};

module.exports = burger;