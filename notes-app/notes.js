const fs = require("fs");
const chalk = require("chalk");

const addNotes = function (title, body) {
  const notes = loadnotes();
  const duplicate = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicate.length > 0) {
    console.log(chalk.red.bold("title is already exist!"));
  } else {
    notes.push({
      title: title,
      body: body,
    });
    console.log(chalk.green.bold("Note added successfully"));
    saveNotes(notes);
  }
};

const saveNotes = function (notes) {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadnotes = function () {
  try {
    const buffer = fs.readFileSync("notes.json");
    const jsonData = buffer.toString();
    return JSON.parse(jsonData);
  } catch (e) {
    console.log(chalk.red.bold("file does not found!"));
  }
};

const removeNote = function (title) {
  const notes = loadnotes();
  const updatedNotes = notes.filter(function (note) {
    return note.title !== title;
  });

  if (updatedNotes.length !== notes.length) {
    console.log(chalk.green.bold("Note has been removed!"));
    saveNotes(updatedNotes);
  } else {
    console.log(chalk.red.bold("note not found."));
  }
};

const listNote = () => {
  console.log(chalk.gray.bold("your notes"));
  const notes = loadnotes();
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadnotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.blue.inverse.bold(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.bold("note not found"));
  }
};
module.exports = {
  addNotes: addNotes,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote,
};
