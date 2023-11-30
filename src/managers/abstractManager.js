const database = require("../../database");

class AbstractManager {
    database;
    constructor() {
        this.database = database;
    }
}

module.exports = AbstractManager;