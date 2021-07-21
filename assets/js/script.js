// Ketika page berhasil diload
window.addEventListener('load', () => {
    let loadingElement = document.querySelector('.loading');
    loadingElement.style.opacity = "0%";
    setTimeout(() => {
        loadingElement.parentNode.removeChild(loadingElement);
        document.querySelector('header').removeAttribute('hidden');
        document.querySelector('main').removeAttribute('hidden');
        document.querySelector('footer').removeAttribute('hidden');
    }, 500);
    loadData()

    document.querySelector('nav a').setAttribute('href', window.location.href);
});

// Load data buku
function loadData(search = false) {
    // Membersihkan rak buku
    const uncompleteList = document.querySelector('.uncomplete-list');
    const completeList = document.querySelector('.complete-list');
    uncompleteList.innerHTML = '';
    completeList.innerHTML = '';

    // Cek dark mode
    const dark = document.body.classList.contains('dark-theme');
    // Mengambil semua data buku dari local storage
    let allBookData = JSON.parse(localStorage.getItem('book-data')) || [];

    // Memfilter hasil jika ada pencarian
    if (search) {
        allBookData = allBookData.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase())
        })
    }

    let completeCount = 0;
    let uncompleteCount = 0;

    if (allBookData.length > 0) {
        allBookData = allBookData.reverse();
        allBookData.forEach((item) => {
            let itemElement =
                `<div class="item-list ${dark ? 'dark-theme' : ''}">
                    <div class="item-list-title">
                        ${item.title}
                    </div>
                    <p>Penulis: ${item.author}</p>
                    <p>Tahun: ${item.year}</p>
                    <button class="button success" book-id="${item.id}">${item.isComplete ? "Belum selesai Dibaca" : "Selesai Dibaca"}</button>
                    <button class="button danger" book-id="${item.id}">Hapus Buku</button>
                </div>`;

            if (item.isComplete === true) {
                completeList.insertAdjacentHTML('beforeend', itemElement);
                completeCount++;
            } else {
                uncompleteList.insertAdjacentHTML('beforeend', itemElement);
                uncompleteCount++;
            }
        })
        !completeCount ? completeList.innerHTML = `<p class="nothing ${dark ? 'dark-theme' : ''}">Tidak ada Data Buku yang ditemukan.</p>` : null;
        !uncompleteCount ? uncompleteList.innerHTML = `<p class="nothing ${dark ? 'dark-theme' : ''}">Tidak ada Data Buku yang ditemukan.</p>` : null;
    } else {
        uncompleteList.innerHTML = `<p class="nothing ${dark ? 'dark-theme' : ''}">Tidak ada Data Buku yang ditemukan.</p>`;
        completeList.innerHTML = `<p class="nothing ${dark ? 'dark-theme' : ''}">Tidak ada Data Buku yang ditemukan.</p>`;
    }

}

// Checkbox selesai diklik
let checked = false;
document.getElementById('complete').addEventListener('click', (e) => {
    if (checked) {
        document.querySelector('.add-book button b').innerText = "Belum selesai dibaca";
        checked = false;
    } else {
        document.querySelector('.add-book button b').innerText = "Selesai dibaca";
        checked = true;
    }
})

// Form add data buku disubmit
document.getElementById('form-add').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = new Date().getTime()
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const bookData = {
        id,
        title,
        author,
        year,
        isComplete: checked,
    };

    let allBookData = [];
    if (localStorage.getItem('book-data')) {
        allBookData = JSON.parse(localStorage.getItem('book-data'));
        allBookData.push(bookData);
    } else {
        allBookData = [bookData];
    }
    localStorage.setItem('book-data', JSON.stringify(allBookData));

    // Load data setelah penambahan data
    loadData();

    // Memunculkan sweetalert
    Swal.fire(
        'Added!',
        `Data buku tersebut berhasil ditambahkan ke rak ${bookData.isComplete ? 'Selesai Dibaca' : 'Belum Selesai Dibaca'}.`,
        'success'
    );

    // Membersihkan input form add buku
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
})

// Button search diklik
document.querySelector('.container-search').addEventListener('click', () => {
    const keyword = document.querySelector(".flex-search-input").firstElementChild.value;
    loadData(keyword);
})

// Sesuatu di dalam elemen .container-flex diklik
document.querySelector('.container-flex').addEventListener('click', (e) => {
    // Tombol selesai atau belum selesai diklik
    if (e.target.classList.contains('success')) {
        const id = e.target.getAttribute('book-id');

        const allBookData = JSON.parse(localStorage.getItem('book-data'));
        const mappedAllBookData = allBookData.map((item) => {
            if (item.id == id) {
                item.isComplete = !item.isComplete;
            };

            return item;
        });

        localStorage.setItem('book-data', JSON.stringify(mappedAllBookData));
        loadData();
    } else if (e.target.classList.contains('danger')) {
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Tindakan ini tidak bisa dibatalkan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                const id = e.target.getAttribute('book-id');

                const allBookData = JSON.parse(localStorage.getItem('book-data'));
                const filteredAllBookData = allBookData.filter((item) => {
                    if (item.id == id) {
                        return false;
                    }

                    return true;
                });

                localStorage.setItem('book-data', JSON.stringify(filteredAllBookData));
                loadData();

                Swal.fire(
                    'Deleted!',
                    `Data buku tersebut berhasil dihapus.`,
                    'success',
                );
            }
        })
    }
})
