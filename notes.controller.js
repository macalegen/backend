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

  await fs.writeFile(notesPath, JSON.stringify(notes));

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

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
