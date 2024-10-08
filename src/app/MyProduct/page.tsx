"use client";
import { useState } from "react";
import { Product } from "../types/product";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const addProduct = () => {
    const product: Product = {
      id: products.length + 1,
      ...newProduct,
    };
    setProducts([...products, product]);
    resetForm();
  };

  const updateProduct = (id: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...newProduct } : product,
    );
    setProducts(updatedProducts);
    resetForm();
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      imageUrl: "",
    });
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, imageUrl: reader.result as string });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-10 bg-white">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {/* Form to add/update product */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: Number(e.target.value) })
          }
          className="border p-2 rounded"
        />

        {/* File input for image */}
        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Product Preview"
              className="h-24 w-24 object-cover rounded"
            />
          </div>
        )}
      </div>

      <button
        onClick={addProduct}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Product
      </button>

      {/* Products Table */}
      <table className="min-w-full bg-white border-collapse border border-gray-200 shadow-lg">
        <thead>
          <tr>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border px-4 py-2">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-20 w-20 object-cover rounded"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.price} บาท</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => updateProduct(product.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
