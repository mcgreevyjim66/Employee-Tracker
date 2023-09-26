// import inquirer package
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
// import queries files
const Queries = require('./queries');


// set port for server
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


//console.log("before db.connect")
db.connect((err) => {
//  console.log("in db.connect")
  if (err) throw err;
  console.log("Connected to the database!");
 // start the application
  promptUser();
});

const queries = new Queries(db);


//start employee tracker CMS prompting the user for input
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
              "Update an employee role",
               "Return",
          ],
      })
      .then((selectedQuery) => {
        // call the function related to the activity the user selected
          switch (selectedQuery.selection) {
              case "View all departments":
                 //viewAllDepartments();
                 queries.viewAllDepartments(db).then((results) =>{
                 rePromptUser();
                 });
                 break;
              case "View all roles":
                queries.viewAllRoles(db).then((results) =>{
                rePromptUser();
                });
    
                break;
              case "View all employees":
                queries.viewAllEmployees(db).then((results) =>{
                  rePromptUser();
                });
                break;
              case "Add a department":
                queries.addDepartment(db).then((results) =>{
                  rePromptUser();
                });           
                break;
              case "Add a role":
                queries.addRole(db).then((results) =>{
                    rePromptUser();
                });           
                 break;
              case "Add an employee":
              queries.addEmployee(db).then((results) =>{
                  rePromptUser();
              });           
              break;
              case "Update an employee role":
                queries.updateEmployeeRole(db).then((results) =>{
                    rePromptUser();
                });           
                break;
              case "Return":
                  db.end();
                  break;
          }
      });
}

// re prompt the user
function rePromptUser(){
  //console.log("re prompt user");
  promptUser();
}


