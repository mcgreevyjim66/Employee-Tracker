const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const Queries = require('./queries');



const PORT = process.env.PORT || 3001;


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'rootuserpassword',
    database: 'employee_tracker_db'
  },
 
  console.log(`Connected to the employee_tracker_db database.`),
);

const queries = new Queries(db);

//db.connect((err) => {
 // if (err) throw err;
 // console.log("Connected to the database!");
  // start the application
  ///promptUser();
//});

promptUser();
//start employee tracker CMS
function promptUser() {
  inquirer
      .prompt({
          type: "list",
          name: "selection",
          message: "Please use the arrows key to select the query to perform:",
          choices: [
              "View all departments",
              "View all roles",
              "View all employees",
              "Add a department",
              "Add a role",
              "Add an employee",
              "Add a Manager",
              "Update an employee role",
              "View Employees by Manager",
              "View Employees by Department",
              "Delete Departments | Roles | Employees",
              "View the total utilized budget of a department",
              "Return",
          ],
      })
      .then((selectedQuery) => {
          switch (selectedQuery.selection) {
              case "View all departments":
                 // viewAllDepartments();
                 queries.viewAllDepartments(db);
                 // restart the application
                 console.log("calling reprompt")
                 rePromptUser();
                  break;
              case "View all roles":
                queries.viewAllRoles(db);
                break;
              case "View all employees":
                queries.viewAllEmployees(db);
                break;
              case "Return":
                  db.end();
                  //console.log("Goodbye!");
                  break;
          }
      });
}

// re prompt the user
function rePromptUser(){
  console.log("re prompt user");
  promptUser();
}
// function to view all departments
function viewAllDepartments() {
  const querySQL = "SELECT * FROM department";
  db.query(querySQL, (err, res) => {
      if (err) throw err;
      console.table(res);
      // restart the application
      promptUser();
  });
}


