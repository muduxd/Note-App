const yargs = require("yargs");
const notes = require("./notes");

//-ADD COMMAND-
yargs.command({
  command: "add",
  builder: {
    title: {
      demandOption: true,
      type: "string",
    },
    body: {
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.addNote(argv.title, argv.body),
});

//-REMOVE COMMAND-
yargs.command({
  command: "remove",
  builder: {
    title: {
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.removeNote(argv.title),
});

//-LIST COMMAND-
yargs.command({
  command: "list",
  handler: () => notes.listNotes(),
});

//-READ COMMAND-
yargs.command({
  command: "read",
  builder: {
    title: {
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.readNote(argv.title),
});

yargs.parse();
