;(function () {
    "use strict"

   

    const notes = [
        {
            id: 1,
            title: "Список полезных дел",
            content: "Список полезных дел"
        },    
        {
            id: 2,
            title: "Лучшее за неделю",
            content: "Лучшее за неделю"
        },     
        {
            id: 3,
            title: "Фильмы на прокат",
            content: `Фильмы на прокат
            1. Вечно молодой
            2. Гори гори ясно
            3. Призрак в доспехах
            4. Назад в будущее`
        },        
        {
            id: 4,
            title: "Интенсивы на constcode.ru",
            content: "Интенсивы на constcode.ru"
        }
    ];

    const api = {

    };

    loadLocal();

    api.getNotes = function getNotes () {
        return getCopy(notes);
    }

    api.setNote = function setNote (noteId, content) {
          const note = notes.find (x => x.id === noteId);
          note.content = content; 

          saveLocal();
    }

    window.database = api;

    function getCopy (obj) {
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

