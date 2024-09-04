export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.root.innerHTML = `
      <div class="notes__sidebar">
        <div class="notes__logo">NOTE APP</div>
        <div class="notes__list">
        </div>
        <button class="notes__add">ADD NOTE</button>
      </div>
      <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="note title ..." />
        <textarea class="notes__body">Take Note</textarea>
      </div>
    `;
    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");
    addNoteBtn.addEventListener("click", () => {
      this.onNoteAdd();
    });
    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });
  }
  #createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;
    return `
      <div class="notes__list-item" data-note-id="${id}">
        <div class="notes__small-title">${title}</div>
        <div class="notes__small-body">
          ${body.substring(0, MAX_BODY_LENGTH)}
          ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="notes__small-updated">
          ${new Date(updated).toLocaleString("en", {
            dateStyle: "full",
            timeStyle: "short",
            hour12: false,
          })}
        </div>
      </div>
    `;
  }
  updateNoteList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");
    notesContainer.innerHTML = "";
    let notesList = "";
    for (const note of notes) {
      note.forEach((noteItem) => {
        const { id, title, body, updated } = noteItem;
        const html = this.#createListItemHTML(id, title, body, updated);
        notesList += html;
      });
    }
    notesContainer.innerHTML = notesList;
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });
  }
}
