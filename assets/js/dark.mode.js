// Jika browser support local storage
if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem('tema') === 'dark') {
        darkTheme();
        document.querySelector('.loading').classList.add('dark-theme');
    }

    // Ketika tombol dark di klik
    document.querySelector('.dark-button').addEventListener('click', (e) => {
        darkTheme();
    });

    // Ketika tombol light di klik
    document.querySelector('.light-button').addEventListener('click', (e) => {
        lightTheme();
    });

    // Fungsi tema gelap
    function darkTheme() {
        localStorage.setItem('tema', 'dark');
        document.body.classList.add('dark-theme');
        document.querySelector('.add-book').classList.add('dark-theme');
        document.querySelector('.search-book').classList.add('dark-theme');

        const flexItem = document.querySelectorAll('.flex-item');
        for (let item of flexItem) {
            item.classList.add('dark-theme');
        }

        const itemList = document.querySelectorAll('.item-list');
        for (let item of itemList) {
            item.classList.add('dark-theme');
        }

        const nothing = document.querySelectorAll('.nothing');
        for (let item of nothing) {
            item.classList.add('dark-theme');
        }
    }

    // Fungsi tema terang
    function lightTheme() {
        localStorage.removeItem('tema');
        document.body.classList.remove('dark-theme');
        document.querySelector('.add-book').classList.remove('dark-theme');
        document.querySelector('.search-book').classList.remove('dark-theme');

        const flexItem = document.querySelectorAll('.flex-item');
        for (let item of flexItem) {
            item.classList.remove('dark-theme');
        }

        const itemList = document.querySelectorAll('.item-list');
        for (let item of itemList) {
            item.classList.remove('dark-theme');
        }

        const nothing = document.querySelectorAll('.nothing');
        for (let item of nothing) {
            item.classList.remove('dark-theme');
        }
    }
} else {
    console.log("Browser Anda Tidak Mendukung Local Storage");
}
