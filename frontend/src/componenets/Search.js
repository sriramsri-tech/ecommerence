import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  return (
    <div>
      <form onSubmit={searchHandler}>
        <div>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">
            <i>Search</i>
          </button>
        </div>
      </form>
    </div>
  );
}
