"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Search for:", searchQuery);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink mr-10">
                        <Link href="/" className="text-xl font-bold text-blue-500">
                            MyShop
                        </Link>
                    </div>

                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex ml-auto w-full md:w-auto md:ml-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full md:w-96 text-gray-500 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Search
                        </button>
                    </form>

                    {/* Desktop Links */}
                    <div className="items-center hidden md:flex md:space-x-8 md:ml-10">
                        <Link href="/" className="text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                            Products
                        </Link>
                        <Link href="/cart" className="text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                            Cart
                        </Link>
                        <Link href="/profile" className="text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                            Profile
                        </Link>
                        <Link href="/auth" className="text-gray-700 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-bold">
                            Login | Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-400 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Links */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            <Link href="/" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                                Home
                            </Link>
                            <Link href="/products" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                                Products
                            </Link>
                            <Link href="/cart" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                                Cart
                            </Link>
                            <Link href="/profile" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                                Profile
                            </Link>
                            <Link href="/auth" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                                Login | Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
