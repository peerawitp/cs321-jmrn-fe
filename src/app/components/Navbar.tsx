"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";  // นำเข้า SearchBar Component
import MobileMenu from "./Menu";  // นำเข้า MobileMenu Component

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // สำหรับ mobile menu toggle

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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

                    {/* SearchBar Component */}
                    <SearchBar />

                    {/* Desktop Links */}
                    <div className="items-center hidden lg:flex lg:space-x-8 lg:ml-10">
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
                    <div className="flex lg:hidden">
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

                {/* MobileMenu Component */}
                {isOpen && <MobileMenu />}
            </div>
        </nav>
    );
};

export default Navbar;
