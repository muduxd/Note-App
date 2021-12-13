const fs = require("fs");
const chalk = require("chalk");

//-LOADING THE NOTES-
const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("data.json", "utf8"));
  } catch (e) {
    return [];
  }
};

//-SAVING THE NOTES-
const saveNotes = (notes) => fs.writeFileSync("data.json", JSON.stringify(notes));

//-ADDING THE NOTES-
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);

  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);

    console.log(chalk.green("Note added!"));
  } else console.log(chalk.red("The note has already been added!"));
};

//-REMOVING THE NOTES-
const removeNote = (title) => {
  const notes = loadNotes();
  const filtered = notes.filter((note) => note.title !== title);

  if (notes.length !== filtered.length) console.log(chalk.green("The note has been removed successfully"));
  else console.log(chalk.red("The note doesn't exist"));

  saveNotes(filtered);
};

//-LISTING THE NOTES-
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blueBright("Your Notes:"));
  notes.forEach((note) => console.log(chalk.yellow(note.title)));
};

//-READING THE NOTES-
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) console.log(`${note.title} : ${note.body}`);
  else console.log(chalk.red("Note not found!"));
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
