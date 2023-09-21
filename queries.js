const prompter = require('./server');

class Queries {
    constructor(db) {
        this.db = db;
      }
    async viewAllDepartments(db) {
     console.log("viewAllDepartments")
      const querySQL = "SELECT * FROM department";
      
     // const results = await db.promise().query(querySQL);
      const results = await db.query(querySQL);
      console.table(results);
    
      //connection.end();
      
      //await db.query(querySQL, (err, res) => {
      // if (err) throw err;
     //   console.table(res);
     //   return;
     // }
     // );
    }
    viewAllRoles(db) {
        const querySQL = "SELECT * FROM role";
        db.query(querySQL, (err, res) => {
            if (err) throw err;
            console.table(res);
            prompter.promptUser();

        });
    }
    viewAllEmployees(db) {
        const querySQL = "SELECT * FROM employee";
        db.query(querySQL, (err, res) => {
            if (err) throw err;
            console.table(res);
            process.exit(0)
        });
    }
}

  module.exports = Queries;