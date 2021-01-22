// include the packages
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const util = require("util");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const fileWriter = fs.writeFile;

const teamMembers = [];
// here we will push obj

function init() {
    function createManager() {
        console.log("Let's build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the name of your Manager?",
                //validate user input here
                validate: function (managerName) {
                    if (!managerName) {
                        console.log(".    Please enter a valid name!");
                        return false;
                    } else {
                        return true;
                    }
                }

            },
            {
                type: "input",
                name: "managerId",
                message: "What is the I.D of your Manager?",
                //validate user input here
                validate: function (managerId) {
                    if (!managerId) {
                        console.log(".    Please enter a valid I.D!");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the email of your Manager?",
                //validate user input here
                validate: function (email) {

                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                    if (valid) {
                        return true;
                    } else {
                        console.log(".  Please enter a valid email!")
                        return false;
                    }
                }

            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the office number of your Manager?",
                //validate user input here
                validate: function (managerOfficeNumber) {
                    if (!managerOfficeNumber) {
                        console.log(".    Please enter a valid office number!");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "list",
                name: "addEmployee",
                message: "Would you like to add an Employee?",
                //create a list of choices that prompts the User to select if they'd like to add another Employee.
                choices: [
                    "Add a Manger",
                    "Add an Engineer",
                    "Add an Intern",
                    "Chill I don't want to add another Employee!!!"
                ],
                default: "Chill I don't want to add another Employee!!!"
            },
        ]).then((answers) => { // the switch statement allows 
            switch (answers.addEmployee) {
                case "Add a Manager":
                    createManager();
                    break;
                case "Add an Engineer":
                    createEngineer();
                    break;
                case "Add an Intern":
                    createIntern();
                    break;
                default:
                    writeToFile(teamMembers);
                    //    fileWriter(outputPath, render(teamMembers));
                    break;
            }
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager); // this pushes the obj -> array (teamMembers)
            // console.log(render(teamMembers));
            // fileWriter(outputPath, render(teamMembers));
            function writeToFile(teamMembers) {
                fs.writeFile(outputPath, render(teamMembers), (err) => err ? console.log(err) : console.log('no errors found'));
            }
        }).catch((error) => console.log(error));
    }
    createManager();
}

init();


/// create ENGINEER /////////////////


function createEngineer() {
    console.log("Let's continue building your team!");
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the name of your Engineer?",
            //validate user input here
            validate: function (engineerName) {
                if (!engineerName) {
                    console.log(".    Please enter a valid name!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the I.D of your Engineer?",
            //validate user input here
            validate: function (engineerId) {
                if (!engineerId) {
                    console.log(".    Please enter a valid I.D!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the email of your Engineer?",
            //validate user input here
            validate: function (email) {

                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                if (valid) {
                    return true;
                } else {
                    console.log(".  Please enter a valid email")
                    return false;
                }
            }

        },

        {
            type: "input",
            name: "engineerGithub",
            message: "What is your Engineer's GitHub Username?"
            //validate user input here
        },
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add an Employee?",
            //create a switch statement -> if yes then loop again -> if no proceed to next team-member.
            choices: [
                "Add a Manger",
                "Add a Engineer",
                "Add an Intern",
                "Chill I don't want to add another Employee!!!"
            ],
            default: "Chill I don't want to add another Employee!!!",
        },
    ]).then((answers) => { // the switch statement allows 
        switch (answers.addEmployee) {
            case "Add a Manager":
                createManager();
                break;
            case "Add a Engineer":
                createEngineer();
                break;
            case "Add an Intern":
                createIntern();
                break;
            default:
                // writeToFile(teamMembers);
                fileWriter(outputPath, render(teamMembers));
                break;
        }
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
        // console.log(manager);
        teamMembers.push(engineer); // this pushes the obj -> array (teamMembers)

        function writeToFile(teamMembers) {
            fs.writeFile(outputPath, render(teamMembers), (err) => err ? console.log(err) : console.log('no errors found'));
        }
        writeToFile(teamMembers);
        // fileWriter(outputPath, render(teamMembers));
    }).catch((error) => console.log(error));
};


/////// create Intern/////////

function createIntern() {
    console.log("Let's continue building your team!");
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the name of your Intern?",
            //validate user input here
            validate: function (internName) {
                if (!internName) {
                    console.log(".    Please enter a valid name!");
                    return false;
                } else {
                    return true;
                }
            }

        },
        {
            type: "input",
            name: "internId",
            message: "What is the I.D of your Intern?",
            //validate user input here
            validate: function (internId) {
                if (!internId) {
                    console.log(".    Please enter a valid I.D!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the email of your Intern?",
            //validate user input here
            validate: function (email) {

                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                if (valid) {
                    return true;
                } else {
                    console.log(".  Please enter a valid email!")
                    return false;
                }
            }

        },
        {
            type: "input",
            name: "internSchool",
            message: "What school does your Intern attend?",
            //validate user input here
            validate: function (internSchool) {
                if (!internSchool) {
                    console.log(".    Please enter a valid School!");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add an Employee?",
            //create a switch statement -> if yes then loop again -> if no proceed to next team-member.
            choices: [
                "Add a Manger",
                "Add an Engineer",
                "Add an Intern",
                "Chill I don't want to add another Employee!!!"
            ],
            default: "Chill I don't want to add another Employee!!!",
        }
    ]).then((answers) => { // the switch statement allows 
        switch (answers.addEmployee) {
            case "Add a Manager":
                createManager();
                break;
            case "Add an Engineer":
                createEngineer();
                break;
            case "Add an Intern":
                createIntern();
                break;
            default:
                writeToFile(teamMembers);
                // fileWriter(outputPath, render(teamMembers));
                break;
        }
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        // console.log(manager);
        teamMembers.push(intern); // this pushes the obj -> array (teamMembers)
        // console.log(teamMembers);
        // console.log(render(teamMembers));
        function writeToFile(teamMembers) {
            fs.writeFile(outputPath, render(teamMembers), (err) => err ? console.log(err) : console.log('no errors found'));
        }
        writeToFile(teamMembers);
        // fileWriter(outputPath, render(teamMembers));
    }).catch((error) => console.log(error));
};