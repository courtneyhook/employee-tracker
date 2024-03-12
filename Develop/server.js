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
        case "View All Employees": //completed and working
          viewEmployees().then(() => {
            questionList();
          });
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
            });
          break;
        case "Update Employee Role":
          console.log("You chose to update employee role.");
          questionList();
          break;
        case "View All Roles": //completed and working
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
        case "View All Departments": //completed and working
          viewDepartments().then(() => {
            questionList();
          });
          break;
        case "Add Department":
          addDepartment().then(() => {
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

//when the user chooses to view a list of employees
function viewEmployees() {
  let employee_list = `SELECT id AS 'employee id', CONCAT(first_name, ' ', last_name) AS 'employee name' FROM employee;`;
  return new Promise((resolve) => {
    db.query(employee_list, (err, result) => {
      console.table("\n\n", result, "\n\n");
      resolve(questionList);
    });
  });
}

function viewDepartments() {
  let department_list = `SELECT id AS dept, name AS department_name FROM department`;
  return new Promise((resolve) => {
    db.query(department_list, (err, result) => {
      console.table("\n\n", result, "\n\n");
      resolve(questionList);
    });
  });
}

function viewRoles() {
  let role_list = `SELECT title, salary FROM role`;
  return new Promise((resolve) => {
    db.query(role_list, (err, result) => {
      console.table("\n\n", result, "\n\n");
      resolve(questionList);
    });
  });
}

function addRole() {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the new role? \n",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this position? \n",
        },
        {
          type: "list",
          name: "department",
          message: "What department does this position belong to? \n",
          choices: getDepartmentList(),
        },
        {
          type: "list",
          name: "is_manager",
          message: "Is this position a manager? \n",
          choices: ["yes", "no"],
        },
      ])
      .then((response) => {
        let dep;
        let sql1 = `SELECT id AS id FROM department WHERE name = '${response.department}'`;
        console.log(sql1);
        db.query(sql1, (err, result) => {
          console.log(result[0].id);
          dep = result[0].id;
          let yesManager;
          if (response.is_manager === "yes") {
            yesManager = 1;
          } else {
            yesManager = 0;
          }

          let sql = `INSERT INTO role (title, salary, department_id, is_manager) VALUES (?,?,?,?)`;
          let params = [response.title, response.salary, dep, yesManager];
          console.log(params);
          db.query(sql, params, (err, result) => {
            console.log(
              `You have added ${response.title} to the database.\n\n`
            );
            resolve(questionList);
          });
        });
      });
  });
}

function getDepartmentList() {
  //count the number of departments
  let deptNum;
  const deptList = `SELECT COUNT(*) AS total FROM department`;
  db.query(deptList, (err, result) => {
    deptNum = result[0].total;
  });
  //create an empty list
  let deptListNames = [];
  //use a loop to iterate through each department and add it to a list

  db.query(`SELECT name AS dept FROM department`, (err, result) => {
    for (let i = 0; i < deptNum; i++) {
      deptListNames.push(result[i].dept);
    }
  });
  return deptListNames;
}

function addDepartment() {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the new department? \n",
        },
      ])

      .then((response) => {
        let newDept = response.title;
        console.log(newDept);
        let sqldep = `INSERT INTO department (name) VALUES (?)`;
        db.query(sqldep, [newDept], (err, result) => {
          console.log(`You have added ${response.title} to the database.\n\n`);
          resolve(questionList);
        });
      });
  });
}

questionList();
