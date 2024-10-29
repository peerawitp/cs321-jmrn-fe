import React from "react";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="mb-4 ">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by product name"
                className="w-full lg:w-96 text-gray-500 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;
