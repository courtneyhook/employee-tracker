const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localHost",
  user: "root",
  password: "Jasmine07!",
  database: "company_db",
});

function questionList() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainQuestion",
        message: "\n\nWhat would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Update Employee Managers",
          "View Employees by Manager",
          "View Employees by Department",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "View Total Budget",
          "Quit\n\n",
        ],
      },
    ])
    .then((response) => {
      const choice = response.mainQuestion;
      console.log(choice);
      switch (choice) {
        case "View All Employees":
          console.log("You chose to view all Employees.");
          getEmployeeList().then(() => {
            questionList();
          });
          break;
        case "Add Employee":
          console.log("You chose to add an employee.");
          addEmployee().then(() => {
            questionList();
          });
          break;
        case "Update Employee Role":
          console.log("You chose to update employee role.");
          updateRole().then(() => {
            questionList();
          });
          break;
        case "View All Roles":
          console.log("You chose to view all roles.");
          viewRoles().then(() => {
            questionList();
          });
          break;
        case "Add Role":
          console.log("You chose to add a role.");
          addRole().then(() => {
            questionList();
          });
          break;
        case "View All Departments":
          console.log("You chose to view all departments.");
          viewDepartments().then(() => {
            questionList();
          });
          break;
        case "Add Department":
          console.log("You chose to add a department.");
          addDepartment().then(() => {
            questionList();
          });
          break;
        case "Update Employee Managers":
          console.log("You chose to update employee manager.");
          updateEmployeeManager().then(() => {
            questionList();
          });
          break;
        case "View Employees by Manager":
          console.log("You chose to view employees by manager.");
          viewEmployeeByManager().then(() => {
            questionList();
          });
          break;
        case "View Employees by Department":
          console.log("You chose to view employees by department.");
          viewEmployeeByDepartment().then(() => {
            questionList();
          });
          break;
        case "Delete Department":
          console.log("You chose to delete a department.");
          deleteDepartment().then(() => {
            questionList();
          });
          break;
        case "Delete Role":
          console.log("You chose to delete a role.");
          deleteRole().then(() => {
            questionList();
          });
          break;
        case "Delete Employee":
          console.log("You chose to delete an employee.");
          deleteEmployee().then(() => {
            questionList();
          });
          break;
        case "View Total Budget":
          console.log("You chose to view the budget.");
          viewBudget().then(() => {
            questionList();
          });
          break;
        case "Quit":
          //ends the connection
          console.log("Goodbye.");
          db.end();
          break;
      }
    });
}

//functions that will return tables of info and will not require user input
function getEmployeeList() {}

function viewRoles() {}

function viewDepartments() {}

//functions that will return tables of info based on certain criteria

function viewEmployeeByManager() {}

function viewEmployeeByDepartment() {}

//functions that add new employees, roles, departments

function addEmployee() {}

function addRole() {}

function addDepartment() {}

//functions that update information

function updateRole() {}

function updateEmployeeManager() {}

//functions that delete info

function deleteEmployee() {}

function deleteRole() {}

function deleteDepartment() {}

//functions that calculate

function viewBudget() {}

questionList();
