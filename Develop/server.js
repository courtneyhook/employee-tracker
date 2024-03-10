const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

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
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      const choice = response.mainQuestion;
      console.log(choice);
      switch (choice) {
        case "View All Employees":
          console.log("You chose to view all employees.");
          viewEmployees();
          //questionList();
          break;
        case "Add Employee":
          console.log("You chose to add an employee.");
          inquirer
            .prompt([
              {
                type: "input",
                name: "newFirstName",
                message: "What is the employee's first name?",
              },
              {
                type: "input",
                name: "newLastName",
                message: "What is the employee's last name?",
              },
              {
                type: "list",
                name: "newRole",
                message: "What is the employee's role?",
                choices: [
                  "Superintendent",
                  "Principal",
                  "Assistant Principal",
                  "Cafeteria Supervisor",
                  "Secretary Supervisor",
                  "Custodial Supervisor",
                  "Bus Supervisor",
                  "Special Services Supervisor",
                  "Teacher",
                  "Cook",
                  "Secretary",
                  "Day Custodian",
                  "Night Custodian",
                  "Bus Driver",
                  "Resource Teacher",
                  "Gifted",
                  "Payroll",
                  "Substitute Teacher",
                  "Paraprofessional",
                ],
              },
              {
                type: "list",
                name: "newSupervisor",
                message: "Who is the employee's manager?",
                choices: [
                  "Jim Glenn",
                  "Missy Nix",
                  "Nick Golden",
                  "Lacy Wakefield",
                  "Lori Whitaker",
                  "Sheila Robertson",
                  "Sarah Carter",
                  "Denver Dickey",
                  "Les Dysart",
                  "Shawna Tyrrell",
                ],
              },
            ])
            .then((response) => {
              console.log(
                `You have added ${response.newFirstName} ${response.newLastName} to the database.`
              );
            })
            .then(() => {
              questionList();
            });
          break;
        case "Update Employee Role":
          console.log("You chose to update employee role.");
          questionList();
          break;
        case "View All Roles":
          console.log("You chose to view all roles.");
          questionList();
          break;
        case "Add Role":
          console.log("You chose to add a role.");
          questionList();
          break;
        case "View All Departments":
          console.log("You chose to view all departments.");
          viewDepartments();
          questionList();
          break;
        case "Add Department":
          console.log("You chose to add a department.");
          questionList();
          break;
        case "Quit":
          //ends the connection
          console.log("Goodbye.");
          db.end();
          break;
      }
    });
}

//when the user chooses to view a list of employees
function viewEmployees() {
  let employee_list = `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee;`;
  db.query(employee_list, (err, result) => {
    console.log(result[0].id, result[0].name);
  });
}

function viewDepartments() {
  let department_list = `SELECT id AS dept, name AS department_name FROM department`;
  db.query(department_list, (err, result) => {
    console.table("\n\n\nYou are viewing all departments.", result, "\n\n");
    questionList();
  });
}

questionList();
