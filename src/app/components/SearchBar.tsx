// "use client";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import useProduct from "@/api/user/useProduct";
// import { Product } from "@/interfaces/Product";

// const SearchBar = () => {
//     const [searchQuery, setSearchQuery] = useState(""); // Search query input by user
//     const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Stores filtered products
//     const dropdownRef = useRef<HTMLDivElement | null>(null);
    
//     const { data: products} = useProduct(); // Fetch products, default to empty array if undefined

//     // Debounce effect to delay search processing
//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             // Filter products by name based on search query
//             if (searchQuery) {
//                 const filtered = products?.filter((product: Product) =>
//                     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//                 );
//                 setFilteredProducts(filtered || []);
//             } else {
//                 setFilteredProducts([]);
//             }
//         }, 300); // Delay search to optimize performance

//         return () => clearTimeout(delayDebounceFn);
//     }, [searchQuery, products]);

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(e.target.value); // Update search query as user types
//     };

//     const handleSearchSubmit = (event: React.FormEvent) => {
//         event.preventDefault(); // Prevent page reload
//         console.log("Search for:", searchQuery);
        
//     };

//     // Hide dropdown when clicking outside
//     const handleClickOutside = (event: MouseEvent) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//             setFilteredProducts([]); // Clear dropdown when clicked outside
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <form onSubmit={handleSearchSubmit} className="relative hidden lg:flex ml-auto w-full lg:w-auto lg:ml-auto">
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search products by name..."
//                 className="w-full lg:w-96 text-gray-500 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {searchQuery && filteredProducts.length > 0 && (
//                 <div
//                     ref={dropdownRef}
//                     className="absolute top-full left-0 mt-2 w-full lg:w-96 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//                     {filteredProducts.map((product: Product) => (
//                         <Link
//                             key={product.id}
//                             href={`/products/${product.id}`}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                             {product.name}
//                         </Link>
//                     ))}
//                 </div>
//             )}
//         </form>
//     );
// };

// export default SearchBar;
