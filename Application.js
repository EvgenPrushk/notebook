class Application {
    constructor() {
        this.noteId = null;
        // когда создается экземпляр класса Application запрашиваю копию массива из database
        this.notes = database.getNotes();
        this.bottons = document.querySelector("[data-buttons]");
        this.textarea = document.querySelector("textarea");

        this.updateButtons();

        this.textarea.addEventListener("keyup", event => {
            if (event.key === 'Enter') {
                // разобьем весь текст построчно
                const lines = this.textarea.value.split('\n');
                const lastLine = lines[lines.length - 2];
                // проверяет ли первая цифра от одной и больше + затем точка + пробел
                if (/^[0-9]+\./g.test(lastLine)) {
                    const number = parseInt(lastLine.match(/^[0-9]+/g)[0])
                    this.textarea.value += `${number + 1}. `;

                }
            }
            // передаем в случае нажатия клавишы в textarea  определенного noteId информацию  value
            database.setNote(this.noteId, this.textarea.value);
            // запрашиваем новое состояние базы данных т.к. мы работаем с копией
            this.notes = database.getNotes();
            this.updateButtons();
        });

        document.querySelector("[data-addnote]").addEventListener("click", () => {
            this.noteId = database.createNote();
            this.activeNote(true);
        });
    }

    updateButtons() {
        this.bottons.innerHTML = "";

        for (const note of this.notes) {
            const buttonElement = document.createElement("button");
            buttonElement.className = "list-group-item list-group-item-action";
            buttonElement.textContent = note.title;
            // id необходим для того, чтобы понимать по какой из
            // записей произошел клик
            buttonElement.setAttribute("note-id", note.id);

            if (note.id === this.noteId) {
                buttonElement.classList.add("active");
            }

            this.bottons.append(buttonElement);
            // стрелочная функция не создает новый контекст, а использует родительский контекст
            buttonElement.addEventListener("click", () => {
                this.noteId = parseInt(buttonElement.getAttribute("note-id"));
                // передает число noteId
                this.activeNote();
            });
        }
    }

    activeNote(isNew) {
        // если присуствует новая запись, то мы не обнавляем базу данных
        if (!isNew) {
            database.update();
        }
        // запрашивамем текущую версию базы данных
        this.notes = database.getNotes();

        this.updateButtons();
        const note = this.notes.find((x) => x.id === this.noteId);
        this.textarea.value = note.content;
        this.textarea.disabled = false;
    }
}