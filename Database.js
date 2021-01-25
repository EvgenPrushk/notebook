;(function () {
    "use strict"

    const notes = [
        {
            id: 1,
            title: "Список полезных дел",
            contenet: "Список полезных дел"
        },    
        {
            id: 2,
            title: "Лучшее за неделю",
            contenet: "Лучшее за неделю"
        },     
        {
            id: 3,
            title: "Фильмы на прокат",
            contenet: `Фильмы на прокат
            1. Вечно молодой
            2. Гори гори ясно
            3. Призрак в доспехах
            4. Назад в будущее`
        },        
        {
            id: 4,
            title: "Интенсивы на constcode.ru",
            contenet: "Интенсивы на constcode.ru"
        }
    ];

    const api = {

    };

    api.getNotes = function getNotes () {
        return getCopy(notes);
    }

    api.setNotes = function setNotes (notes) {
        
    }

    window.database = api;

    function getCopy (obj) {
        return JSON.parse(JSON.stringify(obj));
    }

})();

