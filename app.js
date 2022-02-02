#!/usr/bin/env node

const figlet = require("figlet")
const chalk = require("chalk");
const notes = require("./notes");
const stdin = process.openStdin();


const getPosition = (string, subString, index) => {
  return string.split(subString, index).join(subString).length;
}


const validateArgument = (arguments, longForm, shortForm) => {
  if (
    (arguments.indexOf(`--${longForm}='`) === 0 || arguments.indexOf(`-${shortForm}='`) === 0) 
    && arguments[arguments.length - 1] === "'" 
  ) return arguments.slice(arguments.indexOf("'") + 1, arguments.length - 1)

  return false
}



console.log(
  chalk.green(
    figlet.textSync('Note  App', {
      font: 'Standard',
      horizontalLayout: 'fitted',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
  ), "\n"
);

console.log(chalk.yellow("Type 'help' to check the available commands."), "\n")



stdin.addListener("data", (data) => {
  const cli = data.toString().trim()

  let command = ""
  let arguments = ""
  let foundCommand = false

  for (let i = 0; i < cli.length; i++) {
    if (cli[i] === " " && !foundCommand) {
      foundCommand = true
      command = cli.slice(0, i).trim()
      arguments = cli.slice(i + 1).trim()
      break
    }
  }

  if (!foundCommand) command = cli


  switch (command) {

      case "add": {
          const title = validateArgument(arguments.slice(0, getPosition(arguments, "'", 2) + 1).trim(), "title", "t")
          const body = validateArgument(arguments.slice(getPosition(arguments, "'", 2) + 1).trim(), "body", "b")

          if (!title || !body) {
            console.log(chalk.red("Please enter the required arguments!"), "\n")
            break
          }

          notes.addNote(title, body)
          break
      }


      case "remove": {
          const title = validateArgument(arguments, "title", "t");

          if (!title) {
            console.log(chalk.red("Please enter the required arguments!"), "\n")
            break
          }

          notes.removeNote(title)
          break
      }  
      

      case "read": {
          const title = validateArgument(arguments, "title", "t");

          if (!title) {
            console.log(chalk.red("Please enter the required arguments!"), "\n")
            break
          }

          notes.readNote(title)
          break
      }


      case "list": 
          if (arguments.length !== 0) { 
            console.log(chalk.red("This command does not require any arguments!"), "\n")
            break
          }

          notes.listNotes()
          break


      case "help":
          if (arguments.length !== 0) { 
            console.log(chalk.red("This command does not require any arguments!"), "\n")
            break
          }

          console.log(
            chalk.yellow("Commands:"), "\n", 
            chalk.yellow("- add -t='' -b='' : adds a note"), "\n", 
            chalk.yellow("- remove -t='' : removes a note"), "\n",
            chalk.yellow("- read -t='' : reads a note"), "\n",
            chalk.yellow("- list : lists all notes"), "\n",
            chalk.yellow("- help : shows available commands"), "\n",
            chalk.yellow("- exit : exits the app"), "\n"
          )
          break

        
      case "exit":
          if (arguments.length !== 0) { 
            console.log(chalk.red("This command does not require any arguments!"), "\n")
            break
          }

          console.log(chalk.yellow("Exiting..."), "\n")
          process.exit(1)
        

        default:
          console.log(chalk.red("Please enter a valid command!"), "\n")
          break
  }
});