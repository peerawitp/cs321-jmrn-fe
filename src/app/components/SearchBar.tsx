"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { products, Product } from "@/data/products"; // adjust the path as necessary

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const dropdownRef = useRef(null); // Reference to the dropdown

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Search for:", searchQuery);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setFilteredProducts([]); // Hide the dropdown when clicking outside
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <form onSubmit={handleSearchSubmit} className="relative hidden lg:flex ml-auto w-full lg:w-auto lg:ml-auto">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full lg:w-96 text-gray-500 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Search
            </button>

            {searchQuery && filteredProducts.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-2 w-full lg:w-96 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                >
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {product.name}
                        </Link>
                    ))}
                </div>
            )}
        </form>
    );
};

export default SearchBar;
