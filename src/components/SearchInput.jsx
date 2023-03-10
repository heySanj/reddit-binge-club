import { useState } from "react";

const SearchInput = ({ findDiscussionHandler }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        findDiscussionHandler(searchTerm);
        setSearchTerm("");
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-control">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Search Movie Discussions"
                        className="input-bordered input flex-auto"
                        onChange={handleChange}
                        value={searchTerm}
                    />
                    <button type="submit" className="btn-square btn hover:bg-primary transition-all group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 group-hover:text-base-100 transition-all"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchInput;
