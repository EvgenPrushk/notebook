class Application {
    constructor () {
        // когда создается экземпляр класса Application запрашиваю копию массива из database
        this.notes = database.getNotes();
        this.bottons = document.querySelector('[data-buttons]');
        
        this.updateButtons();
    }

    updateButtons () {
        this.bottons.innerHTML = '';

        
    }
}