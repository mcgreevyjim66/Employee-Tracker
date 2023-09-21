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
        const answer = await 
        inquirer
        .prompt(
            {
            type: "input",
            name: "dept",
            message: "Enter the name of the new department:",
             }       
        )
        const querySQL = `INSERT INTO department (name) VALUES ("${answer.dept}")`;
        const [results] = await db.promise().query(querySQL);

            console.log(`Added department ${answer.dept} to the database!`);

            //console.table(results);
    }

        
    async addRole(db) {
        const answer = await 
        inquirer
        .prompt(
            {
            type: "input",
            name: "role",
            message: "Enter the name of the new role:",
            },
            {  
            type: "input",
            name: "salary",
            message: "Enter the salary of the new role:",
            },
            {  
            type: "input",
            name: "dept",
            message: "Enter the dept of the new role:",
            }
            )



        const querySQL = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.role}"), ("${answer.salary}), ("${answer.dept}")`;
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