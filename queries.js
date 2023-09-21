const inquirer = require('inquirer');


class Queries {
    constructor(db) {
        this.db = db;
      }
    async viewAllDepartments(db) {
     console.log("viewAllDepartments")
      const querySQL = "SELECT id, name FROM department";
      const [results] = await db.promise().query(querySQL);
      console.table(results);
    }
    async viewAllRoles(db) {
        const querySQL = "SELECT * FROM role";
        const [results] = await db.promise().query(querySQL);
        console.table(results);
    }
    async viewAllEmployees(db) {
        const querySQL = "SELECT * FROM employee";
        const [results] = await db.promise().query(querySQL);
        console.table(results);
    }
    async addDepartment(db) {
        inquirer
        .prompt({
            type: "input",
            name: "dept",
            message: "Enter the name of the new department:",
        })
        .then (async (answer) => {
            const querySQL = `INSERT INTO department (name) VALUES ("${answer.dept}")`;
            const [results] = await db.promise().query(querySQL);

            console.log(`Added department ${answer.dept} to the database!`);

            // console.log(answer.debt);
            console.table(results);
        }
        )
    }        
    async addRole(db) {
        const querySQL = "";
        const [results] = await db.promise().query(querySQL);

        console.table(results);
    }
    async addEmployee(db) {
        const querySQL = "";
        const [results] = await db.promise().query(querySQL);

        console.table(results);
    }
    async updateEmployeeRole(db) {
        const querySQL = "";
        const [results] = await db.promise().query(querySQL);

        console.table(results);
    }

}


  module.exports = Queries;