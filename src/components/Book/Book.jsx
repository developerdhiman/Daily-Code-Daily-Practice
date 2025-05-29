import { Link } from "react-router";

const Book = ({ book }) => {
  const { bookId, image, bookName, author, rating, category } = book;

  return (
    <Link to={`/book/${bookId}`}>
      <div className="card bg-base-100 w-96 shadow-sm mb-8">
        <figure className="bg-gray-100 p-12">
          <img className="w-[125px] h-[166px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-actions justify-between mt-3 mx-5">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {bookName}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{author}</p>
          <div className="border-2 border-b-black border-dotted mt-4"></div>
        </div>
        <div className="card-actions justify-between mx-5 mb-3">
          <div className="bg-gray-100 p-1 rounded">{category}</div>
          <div className="badge badge-outline">{rating}</div>
        </div>
      </div>
    </Link>
  );
};

export default Book;
