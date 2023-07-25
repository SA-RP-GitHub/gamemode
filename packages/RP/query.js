const mysql = require("./mysql");

class MiscSingleton {
    dbquery(query) {
        return new Promise((r, j) => mysql.query(query, null, (err, data) => {
            if (err) {
                this.log.error(query);
                return j(err);
            }
            r(data);
        }))
    }

    async query(query) {
        const data = await this.dbquery(query);
        return data;
    }
}
const miscSingleton = new MiscSingleton();
module.exports = miscSingleton;