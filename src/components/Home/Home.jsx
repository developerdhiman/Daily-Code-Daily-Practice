import { useEffect, useState } from "react";
import Book from "../Book/Book";
import { Link } from "react-router";

const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("./booksData.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100 rounded">
        <div className="lg:ml-[30%] lg:mt-[10%]">
          <h2 className="text-4xl font-bold mb-8">
            Books to freshen up <br /> your bookself
          </h2>
          <Link to="/listedBooks" className="btn btn-success w-fit">View The List</Link>
        </div>
        <div className="flex mx-auto my-7">
          <img
            className="w-[220px] h-[280px]"
            src="https://i.ibb.co.com/MprDyVt/51-BIA4rrae-L-AC-UF1000-1000-QL80.jpg"
            alt={books.bookName}
          />
        </div>
      </div>

      <h2 className="text-2xl flex justify-center my-4 font-bold">Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-[1170px] mx-auto">
        {books.map((book) => (
          <Book key={book.bookId} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default Home;
