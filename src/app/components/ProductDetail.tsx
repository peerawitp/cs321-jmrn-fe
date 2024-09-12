"use client";

interface ProductProps {
  name: string;
  price: number;
  image: string;
  description: string;
}

const ProductDetail: React.FC<ProductProps> = ({ name, price, image, description }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ภาพสินค้า */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={image} alt={name} className="w-full h-64 object-cover" />
        </div>
        
        {/* รายละเอียดสินค้า */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-gray-700 text-xl mb-4">${price}</p>
          <p className="text-gray-600 mb-6">{description}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
