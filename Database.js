;
(function () {
    "use strict"



    const notes = [];

    const api = {};

    loadLocal();

    api.getNotes = function getNotes() {
        return getCopy(notes);
    }

    api.setNote = function setNote(noteId, content) {
        const note = notes.find(x => x.id === noteId);
        note.content = content;

        saveLocal();
    }

    api.update = function update () {
        for (const note of notes) {
            // если есть длина контанта, то продолжим
            if (note.content.length) {
                continue;
            }

            const index = notes.indexOf(note);
            notes.splice(index, 1);
        }

        for (let i = 0; i < notes.length; i++) {
            notes[i].id = i + 1;
            
        }

        saveLocal();
    }

    api.reinit = function reinit() {
        notes.splice(0, notes.length);
        notes.push(
            {
                id: 1,
                title: "Список полезных дел",
                content: "Список полезных дел"
            });

        notes.push({
                id: 2,
                title: "Лучшее за неделю",
                content: "Лучшее за неделю"
        });
        notes.push({
                id: 3,
                title: "Фильмы на прокат",
                content: `Фильмы на прокат
                1. Вечно молодой
                2. Гори гори ясно
                3. Призрак в доспехах
                4. Назад в будущее`
        });
        notes.push({
                id: 4,
                title: "Интенсивы на constcode.ru",
                content: "Интенсивы на constcode.ru"
        });
        saveLocal();
    }

    window.database = api;

    function getCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    function saveLocal() {
        // ключ для локал localStorage - __NOTEBOOK__
        localStorage.setItem("__NOTEBOOK__", JSON.stringify(notes));
    }

    function loadLocal() {
        //вытаскиваем localStorage в виде строки по ключу __NOTEBOOK__
        const str = localStorage.getItem("__NOTEBOOK__");
        //превращение в массив
        const array = JSON.parse(str);
        // проверка на существоание массива
        if (array) {
            // очищаем содержимое массива
            notes.splice(0, notes.length);
            // вставляем содержимое
            notes.push(...array);
        }
    }

})();

13-44