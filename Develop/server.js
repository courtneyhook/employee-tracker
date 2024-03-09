const inquirer = require("inquirer");

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
        break;
      case "Add Employees":
        console.log("You chose to add an employee.");
        break;
      case "Update Employee Role":
        console.log("You chose to update employee role.");
        break;
      case "View All Roles":
        console.log("You chose to view all roles.");
        break;
      case "Add Role":
        console.log("You chose to add a role.");
        break;
      case "View All Departments":
        console.log("You chose to view all departments.");
        break;
      case "Add Department":
        console.log("You chose to add a department.");
        break;
      case "Quit":
        console.log("You chose to quit.");
        break;
    }
  });
