export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
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
}
