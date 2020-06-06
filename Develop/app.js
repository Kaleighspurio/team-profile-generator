const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the Manager's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    },
    {
        type: "list",
        name: "addrole",
        message: "What role would you like to add next?",
        choices: ["Engineer", "Intern", "I do not want to add another employee"]
    }
]
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineer's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineer's email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's github username?"
    },
    {
        type: "list",
        name: "addrole",
        message: "What role would you like to add next?",
        choices: ["Engineer", "Intern", "I do not want to add another employee"]
    }
]

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
    },
    {
        type: "input",
        name: "school",
        message: "Where does the intern go to school?"
    },
    {
        type: "list",
        name: "addrole",
        message: "What role would you like to add next?",
        choices: ["Engineer", "Intern", "I do not want to add another employee"]
    }
]

// This starts the inquirer to prompt about the manager.  After answering the manager question the checkRoleToAdd function runs to check whether the user would like to add other employees. It creates a new manager using the manager class, pushes it to the teamMember array and then runs the next function to inquire about the additional employee.
const startInquirer = () => {
    inquirer.prompt(managerQuestions).then((answers) => {
        console.log(answers);
        checkRoleToAdd(answers);
        const NewManager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        );
        pushToArray(NewManager);
    });
}

startInquirer();

render(teamMembers);

// This runs the inquirer questions for the Engineer role, creates a new engineer with the information provided, pushes it to the teamMember array and then checks whether the user wants to add more employees, then runs the next function if they choose to add another employee.
const addEngineer = () => {
    inquirer.prompt(engineerQuestions).then((answers) => {
        console.log(answers);
        checkRoleToAdd(answers);
        const NewEngineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        )
        pushToArray(NewEngineer);
    });
}

// This runs the inquirer questions for the intern role, creates a new intern using the intern class, pushes the new intern to the teamMembers array and then checks whether the user wants to add more employees.
const addIntern = () => {
    inquirer.prompt(internQuestions).then((answers) => {
        console.log(answers);
        
        const NewIntern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
        )
        pushToArray(NewIntern);
        checkRoleToAdd(answers);
    });
}

// This function is called at the end of each inquirer .then to check run the appropriate add function, or just stop things.
const checkRoleToAdd = (answers) => {
    if (answers.addrole === "Engineer"){
        addEngineer();
    } else if (answers.addrole === "Intern"){
        addIntern();
    } else {
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
}

// function that pushes the info to teamMembers array
const pushToArray = (answers) => {
    teamMembers.push(answers);
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!




// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
