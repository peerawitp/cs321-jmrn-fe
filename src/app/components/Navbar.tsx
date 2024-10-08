"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import useProduct from "@/api/user/useProduct";
import { Product } from "@/interfaces/Product";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const dropdownRef = useRef(null); // Reference to the dropdown
  const { data: products, isLoading, error } = useProduct();
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };


  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search for:", searchQuery);
    if (filteredProducts.length > 0) {
      // Find the first product's link and trigger a click
      const firstLink = document.querySelector<HTMLAnchorElement>('.first-product-link');
      if (firstLink) {
        firstLink.click();
      }
    }
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredProducts([]); // Hide the dropdown when clicking outside
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to homepage after logout
  };

  useEffect(() => {
    // Listen for clicks outside of the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          {/* Left Section with Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-500">
              Tire Shop
            </Link>
          </div>

          {/* Center Section with Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 mx-4 relative hidden md:flex w-full max-w-xl"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && filteredProducts.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
              >
                {filteredProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${index === 0 ? 'first-product-link' : ''}`} // Add class to the first product
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </form>


          {/* Right Section with Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>

            {session?.user?.email ? (
              <>
                <Link
                  href="/cart"
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cart
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <p className="text-blue-500 block rounded-md text-sm font-bold">
                  Hi, {session?.user?.firstName} {session?.user?.lastName}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-red-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-bold"
              >
                Login | Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 focus:outline-none"
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
              <Link
                href="/"
                className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                Products
              </Link>


              <hr className="border-gray-200 my-2" />

              {session?.user?.email ? (
                <>
                  <Link
                    href="/cart"
                    className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Cart
                  </Link>
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Profile
                  </Link>
                  <p className="text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
                    Hi, {session?.user?.firstName} {session?.user?.lastName}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-red-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login | Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
