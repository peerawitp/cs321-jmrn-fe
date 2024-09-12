"use client"
import Link from "next/link";

const products = [
    { id: 1, name: "Product 1", price: 100, image: "images/product1.jpg" },
    { id: 2, name: "Product 2", price: 200, image: "images/product2.jpg" },
    { id: 3, name: "Product 3", price: 150, image: "images/product2.jpg" },
    { id: 4, name: "Product 4", price: 250, image: "images/product1.jpg" },
    { id: 5, name: "Product 5", price: 300, image: "images/product1.jpg" },
    { id: 6, name: "Product 6", price: 300, image: "images/product1.jpg" },
    { id: 7, name: "Product 7", price: 300, image: "images/product1.jpg" },
    { id: 8, name: "Product 8", price: 300, image: "images/product1.jpg" },
    { id: 9, name: "Product 9", price: 300, image: "images/product1.jpg" },
    
];
const ProductsPage = () => {
    return (
        <div className="container mx-auto mt-8 px-4 py-8 bg-white rounded shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden "
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-fit h-48 object-cover ml-auto mr-auto"
                        />
                        <div className="p-4">
                            <h2 className="text-gray-500 text-lg font-bold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-4">${product.price}</p>
                            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Add to Cart
                            </button>
                            <Link className="flex justify-end mr-1 mt-3 hover:underline" href="products/id">View Detail</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;