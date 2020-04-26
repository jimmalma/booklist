//initiate the books array
if (localStorage.getItem("books") === null) {
  var books = [];
} else {
  var books = getBookList();
}

var btn = document.getElementById("info");
btn.addEventListener("click", submitBookInfo);

// post the book info to local storage
function submitBookInfo(e) {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let url = document.getElementById("url").value;

  if (!isValidInput(title, author)) {
    alert("The title or Author should not be empty.");
    e.preventDefault();
    return false;
  }

  if (!isValidUrl(url)) {
    alert("Please enter a valid url *including https://*");
    e.preventDefault();
    return false;
  }
  books.push({ title: title, author: author, url: url });
  storeBookList(books);
}

//store the booklist to local storage
function storeBookList(books) {
  let json_bookList = JSON.stringify(books);
  localStorage.setItem("books", json_bookList);
}

//get a booklist from the local storage (object)
function getBookList() {
  return JSON.parse(localStorage.getItem("books"));
}

//verify the input
function isValidInput(title, author) {
  if (!title || !author) {
    return false;
  } else {
    return true;
  }
}

function isValidUrl(url) {
  let regex = /(http(s?)):\/\//;
  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

//generate a booklist when the page is reload
function reloadBookList() {
  let books = getBookList();

  if (books === null) {
    return false;
  }

  document.getElementById("books").innerHTML = "";

  index = 0;
  for (let book of books) {
    let title = book.title;
    let author = book.author;
    let url = book.url;

    if (index % 2) {
      aos = `data-aos="fade-up-left" data-aos-duration="1000" `;
    } else {
      aos = `data-aos="fade-up-right" data-aos-duration="1000" `;
    }

    // book template
    document.getElementById("books").innerHTML += `
     <ul class="book w-75 rounded mx-auto" ${aos}>
      
       <li>Title: ${title} <i class="del float-right far fa-trash-alt"></i></li>
       <li>Author: ${author}</li>
       <li>Url: <a href="${url}" target="_blank" class="link">${url}</a></li>
     </ul>
     `;
    index += 1;
  }

  //add an event for removing the book from booklist
  var deleteBtns = document.querySelectorAll("i.del");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", () => {
      books.splice(i, 1);
      storeBookList(books);
      reloadBookList();
    });
  }
}

//activate aos effect
AOS.init();
