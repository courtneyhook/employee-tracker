const inquirer = require("inquirer");
const db = require("./config/connection.js");
<<<<<<< HEAD
=======
const cTable = require("console.table");
>>>>>>> e7bba204df5d0498aa8c746632a9252732972afb

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
          "Quit",
        ],
      },
    ])
    .then((response) => {
      const choice = response.mainQuestion;
      console.log(choice);
      switch (choice) {
        case "View All Employees":
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
async function viewEmployees() {
<<<<<<< HEAD
  const empListQuery = `SELECT CONCAT(first_name, ' ', last_name) AS name, id FROM employee`;
  const empListNames = await db.query(empListQuery);
  console.log(empListNames);
  // const empListResult = empListNames[0].map((employee) => ({
  //   name: employee.name,
  //   value: employee.id,
  // }));
  // return empListResult.forEach((name) => console.log(name.name));
  // //return empListResult;
=======
  const empList = `SELECT CONCAT(first_name, ' ', last_name) AS name, id FROM employee`;
  const employee_list = await db.query(empList);

  const result = employee_list[0].map((employee) => ({
    name: employee.name,
    value: employee.id,
  }));
  return result;
>>>>>>> e7bba204df5d0498aa8c746632a9252732972afb
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

async function getRoleList() {
  //count the number of departments
  const roleList = `SELECT id, title, department_id, is_manager FROM role`;
  const roleListQuery = await db.query(roleList);

  const roleListResults = roleListQuery[0].map((employee) => ({
    id: employee.id,
    name: employee.title,
    dept_id: employee.department_id,
    is_manager: employee.is_manager,
  }));
  return roleListResults;
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

async function getManagerList() {
  const manList = `SELECT CONCAT(first_name, ' ', last_name) AS name, role_id FROM employee LEFT JOIN role ON employee.role_id=role.id WHERE role.is_manager=1`;

  const manListNames = await db.query(manList);

  const manListResults = manListNames[0].map((employees) => ({
    name: employees.name,
    role_id: employees.role_id,
  }));
  return manListResults;
}

function addEmployee() {
  return new Promise(async (resolve) => {
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
          choices: await getRoleList(),
        },
        {
          type: "list",
          name: "newSupervisor",
          message: "Who is the employee's manager?",
          choices: getManagerList(),
        },
      ])
      .then((response) => {
        const empRole = `SELECT id AS id FROM role WHERE title='${response.newRole}'`;
        db.query(empRole, (err, result) => {
          const newEmpRole = result[0].id;
          const manName = `SELECT id AS id FROM employee WHERE CONCAT(first_name, ' ', last_name)='${response.newSupervisor}'`;
          db.query(manName, (err, result) => {
            const newManName = result[0].id;
            const insertEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;
            const empParams = [
              response.newFirstName,
              response.newLastName,
              newEmpRole,
              newManName,
            ];
            db.query(insertEmp, empParams, (err, result) => {
              console.log(
                `You have added ${response.newFirstName} ${response.newLastName} to the database.\n\n`
              );
              resolve(questionList);
            });
          });
        });
      });
  });
}

async function getEmployeeList() {
  const empNameQuery = `SELECT CONCAT(first_name, ' ', last_name) AS name, id FROM employee`;
  const empListNames = await db.query(empNameQuery);

  const result = empListNames[0].map((employee) => ({
    name: employee.name,
    value: employee.id,
  }));
  return result;
}

function updateRole() {
  return new Promise(async (resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Select the employee name you would like to update.\n\n",
          choices: await getEmployeeList(),
        },
        {
          type: "list",
          name: "newRole",
          message: "What is the employee's new role?\n\n",
          choices: await getRoleList(),
        },
        {
          type: "list",
          name: "newSupervisor",
          message: "Who is the employee's manager?\n\n",
          choices: await getManagerList(),
        },
      ])
      .then((response) => {
        console.log(response.employee);
        resolve(questionList);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

//questionList();
viewEmployees();
