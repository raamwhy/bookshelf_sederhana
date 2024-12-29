const books = JSON.parse(localStorage.getItem('books')) || [];

document.getElementById('inputBook').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = parseInt(document.getElementById('inputBookYear').value);
  const isComplete = document.getElementById('inputBookIsComplete').checked;

  const book = {
    id: +new Date(),
    title,
    author,
    year,
    isComplete
  };

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
});

document.getElementById('searchBook').addEventListener('submit', function (e) {
  e.preventDefault();
  const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
  renderBooks(searchTitle);
});

function renderBooks(searchTerm = '') {
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  const completeBookshelfList = document.getElementById('completeBookshelfList');
  incompleteBookshelfList.innerHTML = '';
  completeBookshelfList.innerHTML = '';

  for (const book of books.filter(b => b.title.toLowerCase().includes(searchTerm))) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book_item');
    bookElement.innerHTML = `
      <h3>${book.title}</h3>
      <p>Penulis: ${book.author}</p>
      <p>Tahun: ${book.year}</p>
      <div class="action">
        <button class="green" onclick="toggleComplete(${book.id})">${book.isComplete ? 'Belum selesai' : 'Selesai'} dibaca</button>
        <button class="red" onclick="deleteBook(${book.id})">Hapus buku</button>
      </div>
    `;

    if (book.isComplete) {
      completeBookshelfList.appendChild(bookElement);
    } else {
      incompleteBookshelfList.appendChild(bookElement);
    }
  }
}

function toggleComplete(bookId) {
  const book = books.find(b => b.id === bookId);
  book.isComplete = !book.isComplete;
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
}

function deleteBook(bookId) {
  if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
    const bookIndex = books.findIndex(b => b.id === bookId);
    books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }
}

document.addEventListener('DOMContentLoaded', () => renderBooks());
