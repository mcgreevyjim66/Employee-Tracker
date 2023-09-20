class Queries {
    constructor(db) {
        this.db = db;
      }
    asnyc viewAllDepartments(db) {
      const querySQL = "SELECT * FROM department";
      await db.query(querySQL, (err, res) => {
        if (err) throw err;
        console.table(res);
        //return;
      });
    }
    viewAllRoles(db) {
        const querySQL = "SELECT * FROM role";
        db.query(querySQL, (err, res) => {
            if (err) throw err;
            console.table(res);

        });
    }
    viewAllEmployees(db) {
        const querySQL = "SELECT * FROM employee";
        db.query(querySQL, (err, res) => {
            if (err) throw err;
            console.table(res);
        });
    }
}

  module.exports = Queries;