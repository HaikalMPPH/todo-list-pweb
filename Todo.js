export default class Todo {
    // Task-task yang ada pada todo list.
    tasks;
    // Digunakan untuk mengakses task pada todo list.
    token;

    // Jika local storage belum memiliki item 'tasks', maka akan diinisialisasi dengan array kosong [].
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
    }

    // Getter token.
    get token() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Digunakan untuk menambahkan task baru pada todo-list.
    create(data) {
        data.token = this.token;

        this.tasks.push(data);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Mengambil index task berdasarakan token.
    getIndexByToken(token) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].token === token) {
                return i;
            }
        }
        return -1;
    }

    // Mengupdate todo list dengan data baru.
    update(data) {
        let index = this.getIndexByToken(data.token);

        if (index !== -1) {
            this.tasks[index] = data;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

    // Menghapus task.
    delete(data) {
        let index = this.getIndexByToken(data.token);

        if (index !== -1) {
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
}