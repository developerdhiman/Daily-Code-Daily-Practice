import { useLoaderData, useParams } from "react-router";

const BookDetails = () => {
  const { bookId } = useParams();
  const id = parseInt(bookId);

  const data = useLoaderData();
  const book = data.find((book) => book.bookId === id);

  const {bookName, author, image, review, rating, category, tags, publisher, yearOfPublishing} = book;

  return (
    <div className="card lg:card-side bg-base-100 my-4">
      <figure>
        <img
          
          src={image}
          alt={bookName}
        />
      </figure>

      <div className="px-6">
        <h2 className="card-title">{bookName}</h2>
        <p>By : {author}</p>
        <div className="border-1 border-b-balck"></div>
        <p>{category}</p>
        <div className="border-1 border-b-balck"></div>
        <div className="card-actions justify-end">
          {/* <button className="btn btn-primary">Listen</button> */}
        </div>
      </div>

    </div>
  );
};

export default BookDetails;
