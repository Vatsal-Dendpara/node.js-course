//  -> impoting node.js modules

const { notEqual } = require("assert");
const yargs = require("yargs");

// const fs = require('fs');

// // fs.writeFileSync('note.txt','this is file created using node module.!!');

// fs.appendFileSync('note.txt',' hello how r u?');

// -> import your own file.

// const add = require("./utils.js");
// console.log(add(5, 5));

// const notes = require("./notes.js");

// console.log(notes());

//-> importing npm modules

// const validator = require("validator");

// console.log(validator.isEmail("@gmail.com"));

//-> color printing
// const chalk = require("chalk");

// console.log(chalk.bgRed.bold("Success"));

// -> input from user

// console.log(process.argv[2]);

// const { title } = require("process");
// const yargs = require("yargs");
// const commandLine = process.argv[2];
// console.log(process.argv);
// console.log(yargs.argv["title"]);

//add command

const notes = require("./notes.js");
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "body of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

//remove command

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "remove a note",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

//list command

yargs.command({
  command: "list",
  describe: "list your notes",
  handler: function () {
    notes.listNote();
  },
});

//read command

yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "reading a note",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
