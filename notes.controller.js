const fs = require("fs/promises");
const path = require("path");
// const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const { default: chalk } = await import("chalk");

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);

  console.log(chalk.bgGreen("Note added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  const { default: chalk } = await import("chalk");

  console.log(chalk.bgBlue("List of notes:"));

  notes.forEach((note) => {
    console.log(chalk.blue(note.title, note.id));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const { default: chalk } = await import("chalk");

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    await fs.writeFile(notesPath, JSON.stringify(notes));

    console.log(chalk.bgRed("Note removed"));
  } else {
    console.log(chalk.bgYellow("Note with provided id not found"));
  }
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function updateNote(noteData) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === noteData.id);
  if (index >= 0) {
    notes[index] = { ...notes[index], ...noteData };
    await saveNotes(notes);
    console.log(
      chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`)
    );
  }
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
