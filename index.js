document.addEventListener("DOMContentLoaded", function() {getBooks()});

// window.onload = function() {getBooks()};

const booksUrl = "http://localhost:3000/books"
const booksPatchUrl = "http://localhost:3000/books/:id"

function getBooks() {
  fetch(booksUrl)
  .then(response => response.json())
  .then(json => {
    json.forEach((book => {
      createNewBookLi(book)
    }))
  })
}

function readBook(book) {
  const me = {"id":1, "username":"pouros"}
  const booksPatchUrl = booksUrl + '/' + book.id

  book.users.push(me)

  let reader = document.createElement('p')
  reader.textContent = me.username
  let div = document.getElementById('show-panel')
  div.appendChild(reader)

  fetch(booksPatchUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'users': book.users})
  })
}

function createNewBookLi(book) {

  let div = document.getElementById('list-panel')
  let ul = document.getElementById('list')

  let li = document.createElement('li')
  li.textContent = book.title
  li.addEventListener('click', function() {showBookLi(book)})

  ul.appendChild(li)
  div.appendChild(ul)
}

function showBookLi(book){

  let div = document.getElementById('show-panel')

  div.innerText = ''

  let btn = document.createElement('button')
  btn.textContent = 'Read Book'
  btn.addEventListener('click', function() {readBook(book)})

  let h2 = document.createElement('h2')
  h2.textContent = book.title

  let img = document.createElement('img')
  img.src = book.img_url

  let p = document.createElement('p')
  p.textContent = book.description

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)
}
