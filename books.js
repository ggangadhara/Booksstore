let books;
async function renderBook(filter) {
  const booksWrapper = document.querySelector(".books");
  booksWrapper.classList += " books__loading";
  if (!books) {
    books = await getBooks();
  }
  booksWrapper.classList.remove("books__loading");

  if (filter === "LOW_TO_HIGH") {
    books.sort((a, b) => a.salePrice - b.salePrice);
  } else if (filter === "HIGH_TO_LOW") {
    books.sort((a, b) => b.salePrice - a.salePrice);
  } else if (filter === "RATING") {
    books.sort((a, b) => a.rating - b.rating);
  }

  const booksHTML = books
    .map((book) => {
      return `<div class="book">
    <figure class="book_img_wrapper">
      <img class="book_img" src="${book.url}" alt="" />
    </figure>
    <div class="book_title">${book.title}</div>
    <div class="book_ratings">
   ${ratingsHTML(book.rating)}
    </div>
    <div class="book_price">
      <span class="book_price_normal">Rs.${book.originalPrice}</span>Rs. ${
        book.salePrice
      }
    </div>
  </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHTML;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += ' <i class="fas fa-star-half-alt"></i>';
  }
  return ratingHTML;
}

function filterBooks(event) {
  renderBook(event.target.value);
}

setTimeout(() => {
  renderBook();
});

function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "ಮಲೆಗಳಲ್ಲಿ ಮಧುಮಗಳು ",
          url: "assets/book2.jpg",
          originalPrice: 500,
          salePrice: 400,
          rating: 5,
        },
        {
          id: 2,
          title: "ನೆನಪಿನ ದೋಣಿಯಲ್ಲಿ  ",
          url: "assets/book3.jpg",
          originalPrice: 400,
          salePrice: 300,
          rating: 4,
        },
        {
          id: 3,
          title: "ಶೂದ್ರ ತಪಸ್ವಿ  ",
          url: "assets/book4.jpg",
          originalPrice: 300,
          salePrice: 200,
          rating: 3,
        },
        {
          id: 4,
          title: "ನರಿಗಳಿಗೇಕೆ ಕೋಡಿಲ್ಲ  ",
          url: "assets/book5.jpg",
          originalPrice: 200,
          salePrice: 100,
          rating: 3.5,
        },
      ]);
    }, 1000);
  });
}

//console.log(getBooks());
