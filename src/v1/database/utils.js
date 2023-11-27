const fs = require("fs");

const saveToDatabase = (DB) => {
    const replacer = (key, value) => {
        if (key === "price") {
            return parseInt(value);
        }
        return value;
    }

    fs.writeFileSync("./src/v1/database/db.json", JSON.stringify(DB, replacer, 2), {
        encoding: "utf-8",
    });
};

module.exports = { saveToDatabase };