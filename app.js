// include the packages
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
// here we will push obj

function init() {
    function createManager() {
        console.log("Let's build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the name of your Manager?"
                //validate user input here
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the I.D of your Manager?"
                //validate user input here
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the email of your Manager?"
                //validate user input here
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the office number of your Manager?"
                //validate user input here
            },
        ]).then((answers) => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager);
            teamMembers.push(manager); // this pushes the obj -> array (teamMembers)
            console.log(teamMembers);
            render(teamMembers); // this returns the created HTML
            console.log(render(teamMembers));

            function writeToFile(teamMembers) {
                fs.writeFile('team.html', render(teamMembers), (err) => err ? console.log(err) : console.log('no errors found'));
            
            }
            writeToFile(teamMembers);

        }).catch((error) => console.log(error));
    }
    createManager();
}

init();


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