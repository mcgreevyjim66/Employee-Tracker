// import inquirer package
const inquirer = require('inquirer');


//define exportable class to run all of the selected queries, db instance passed in from server.js
class Queries {
    constructor(db) {
        this.db = db;
      }
    // define each of the selected queries as an async function, build the query, prompt the user for any inout and display the results
    async viewAllDepartments(db) {
        console.log("viewAllDepartments");
        const querySQL = "SELECT id, name FROM department";
        try {
            const [results] = await db.promise().query(querySQL);
            console.table(results);
        } catch (error) {
            console.error('SQL error: ', error);
        }
    }
    // view table of all the available roles
    async viewAllRoles(db) {
        const querySQL = "SELECT role.title, role.id, department.name, role.department_id, role.salary from role join department on role.department_id = department.id";
        try {
            const [results] = await db.promise().query(querySQL);
            console.table(results);
        } catch (error) {
            console.error('SQL error: ', error);
        }

    }
    //view table of all the employees and their managers
    async viewAllEmployees(db) {
        const querySQL = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id;
        `;
        try {
            const [results] = await db.promise().query(querySQL);
            console.table(results);
        } catch (error) {
            console.error('SQL error: ', error);
        }

    }
    // add a new department to the table
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
        try {
            const [results] = await db.promise().query(querySQL);
            console.log(`Added department ${answer.dept} to the database!`);
        } catch (error) {
            console.error('SQL error: ', error);
        }

    }

    // add a new role to the table
    async addRole(db) {
        const query = "SELECT * FROM department";
        const [resDepartments] = await db.promise().query(query);


        const answer = await 
        inquirer
        .prompt([
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
                type: "list",
                name: "department",
                message: "Select the department for the new role:",
                choices: resDepartments.map(
                   
                    (department) => ({ name: department.name, value: department.id })
                ),
            }
            ]
            )

        const querySQL = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.role}", "${answer.salary}", "${answer.department}")`;
        
        try {
            const [results] = await db.promise().query(querySQL);
            console.log(`Role "${answer.role}" updated successfully!`);
        } catch (error) {
            console.error('SQL error: ', error);
        }

    }
// Function to add an employee to the table
   async addEmployee(db) {
    // Retrieve list of roles from the database
        const [roleResults] = await this.db.promise().query("SELECT id, title FROM role");
        
        const roles = await roleResults.map(({ id, title }) => (
            {
            name: title,
            value: id,
        }));
        //console.log("await roles map" + roles)
        //console.log("await roles map" + JSON.stringify(roles, null, 2));

        // Retrieve list of employees from the database to use as managers
       const [empResults] = await db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
       //console.table("empResults: " + JSON.stringify(empResults, null, 2))
       const managers = await empResults.map(({ id, name }) => ({
                    name,
                    value: id,
                }));

    const answers = await inquirer
            .prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter the employee's first name:",
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter the employee's last name:",
                        },
                        {
                            type: "list",
                            name: "roleId",
                            message: "Select the employee role:",
                            choices: roles,
                        },
                        {
                            type: "list",
                            name: "managerId",
                            message: "Select the employee manager:",
                            choices: [
                                { name: "None", value: null },
                                ...managers,
                            ],
                        },
                    ])
    const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const values = [
        answers.firstName,
        answers.lastName,
        answers.roleId,
        answers.managerId,
    ];
   
   const [results] = await db.promise().query(sql, values);

   console.log(`Employee  ${answers.firstName}  ${answers.lastName}  added to table!!`)


    
}

// function to update an employee role
async updateEmployeeRole() {
    const queryEmployees =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id";
    const queryRoles = "SELECT * FROM role";
    const [resEmployees] = await this.db.promise().query(queryEmployees);
    const [resRoles] = await this.db.promise().query(queryRoles);
    const answers = await inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to update:",
                        choices: resEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Select the new role:",
                        choices: resRoles.map((role) => role.title),
                    },
                ]);
                const employee = await resEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` ===
                            answers.employee
                    );
                const role = await resRoles.find(
                        (role) => role.title === answers.role
                    );
                const query =
                        "UPDATE employee SET role_id = ? WHERE id = ?";
                const [resEmpUpdate] = await this.db.promise().query(query, [role.id, employee.id]);
                console.log(`Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                            );

}

}

// export the Queries class
  module.exports = Queries;