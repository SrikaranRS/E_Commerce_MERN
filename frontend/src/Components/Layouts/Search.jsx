import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/product/${input}`);


    }

    setInput("")
  };

  return (
    <div className="w-100">
      <form onSubmit={handleSubmit} className="d-flex align-items-center w-100">
        <input
          type="text"
          placeholder="Search..."
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-link text-dark ms-2">
          <FaSearch size={18} />
        </button>
      </form>
    </div>
  );
};

export default Search;
