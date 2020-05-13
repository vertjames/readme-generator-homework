const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

// Intake questions/prompts for the user:
inquirer
  .prompt([
    {
      type: "input",
      name: "gitHubUsername",
      message: "What is your Github username?"
    },  {
      type: "input",
      name: "title",
      message: "What is the name of your repository?"
    },  {
      type: "input",
      name: "description",
      message: "Describe what your project does."
    }, {
      type: "input",
      name: "installation",
      message: "Explain what a user needs to do to install your application."
    }, {
      type: "input",
      name: "usage",
      message: "Provide instructions for, and examples of, the use of your application."
    }, {
      type: "list",
      name: "license",
      message: "Choose a license for your project:",
      choices: [
        "GNU AGPLv3",
        "GNU GPLv3",
        "GNU LGPLv3",
        "Mozilla Public License 2.0",
        "Apache License 2.0",
        "MIT License",
        "Boost Software License 1.0",
        "The Unlicense"
      ]
    }, {
      type: "input",
      name: "contributing",
      message: "Input any guidelines for others who would like to contribute to your project."
    }, {
      type: "input",
      name: "tests",
      message: "List any tests for your project."
    }
]).then(function (data) {
// Contents of the file we'll create using the input provided by the user:
const readMe = `
  # ${data.title}

  ## Description
  ${data.description}

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributng](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  
  <a name="installation"></a>
  ## Installation
  ${data.installation}
  
  <a name="usage"></a>
  ## Usage
  ${data.usage}

  <a name="license"></a>
  ## License
  <img src='https://img.shields.io/badge/License-${data.license}-blue' alt='License Badge'>
      
  <a name="contributing"></a>
  ## Contributing
  ${data.contributing}

  <a name="tests"></a>
  ## Tests
  ${data.tests}

  <a name="questions"></a>
  ## Questions?
  Please feel free to reach out to me with any questions.
  `

// Write the README file: 
  fs.writeFile("README.md", readMe, function (err) {
    if (err) { 
      console.log(err) 
    };
    console.log("README successfully created.");
  });

// Use the GitHub username that the user input to get the user's GitHub profile URL and profile picture:
const gitHubURL = `https://api.github.com/users/${data.gitHubUsername}`;

axios.get(gitHubURL).then(function (data) {
const gitHubUser = data.data;
const githubProfile = `
  Github Profile: <a href='${gitHubUser.html_url}'>${gitHubUser.login}</a>
  <img src='${gitHubUser.avatar_url}' height='100px' alt='GitHub Profile Picture'>
`

// Append the GitHub user profile URL and picture to the README:
fs.appendFile(`README.md`, githubProfile, function (err) {
  if (err) { 
    console.log(err)
   };
  console.log(`Added GitHub user profile.`);
 });

// Add user's email to README
if (gitHubUser.email !== null) {
  fs.appendFile(`.README.md`, `Email: ${gitHubUser.email}`, function (err) {
    if (err) { 
      console.log(err)
     };
    console.log(`Email retrieved from GitHub.`);
  })
} else {
  fs.appendFile(`README.md`, ` `, function (err) {
    if (err) { 
      console.log(err)
     };
  });
  console.log("No email provided.")
};
});
});
