"use client";
import React, { useEffect, useState } from "react";
import ProductDetailTableRow from "../../components/ProductDetailTableRow";
import useProduct from "@/api/user/useProduct";
import SearchBar from "../../components/SearchBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product, ProductSize } from "@/interfaces/Product";
import useAddProductSize from "@/api/employee/useAddProductSize";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateProductSize from "@/api/employee/useUpdateProductSize";
import { UpdateProductSize } from "@/interfaces/UpdateProductSize";
import { AddProductSize } from "@/interfaces/AddProductSize";

const ProductDetail = ({ params }: { params: { stockId: number } }) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { data: products } = useProduct();
  const [selectedID, setSelectedID] = useState<number | null>(null);
  const { register, handleSubmit, reset, getValues } = useForm<AddProductSize>({
    defaultValues: {
      productId: 0,
      name: "",
      overallDiameter: 0,
      overallWidth: 0,
      measurementRim: "",
      standardRim: "",
      price: 0,
      quantity: 0,
    },
  });

  const addProductSizeMutation = useAddProductSize();
  const updateProductSizeMutation = useUpdateProductSize();
  const queryClient = useQueryClient();

  useEffect(() => {
    const productID = Number(params.stockId);
    const product = products?.find((product) => product.id === productID);
    setCurrentProduct(product || null);
  }, [params.stockId, products]);

  const getSelectedProductName = () => {
    return currentProduct?.name || "";
  };

  const handleRowClick = (product: ProductSize) => {
    if (selectedID === product.id) {
      setSelectedID(null);
      reset();
    } else {
      setSelectedID(product.id);
      reset(product);
    }
  };

  const submitHandler: SubmitHandler<AddProductSize> = async (data) => {
    const exists = products?.some((product) => product.name === data.name);
    if (exists) {
      console.log("This product already exists");
    } else {
      console.log("Submitting:", data);
      data.overallDiameter = Number(data.overallDiameter);
      data.overallWidth = Number(data.overallWidth);
      data.price = Number(data.price);
      data.quantity = Number(data.quantity);

      await addProductSizeMutation.mutateAsync(
        {
          ...data,
          productId: Number(params.stockId),
        },
        {
          onSuccess: () => {
            alert("Product size added successfully!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
          },
          onError: (error) => {
            alert("An error occurred. " + error.message);
          },
        },
      );
      reset();
      setSelectedID(null);
    }
  };

  const updateHandler = () => {
    console.log("Selected ID:", selectedID);
    const updatedProduct = getValues();
    console.log("Updated product:", updatedProduct);

    // map with UpdateProductSize interfaces
    const updateProductSizeForm: UpdateProductSize = {
      id: selectedID!,
      name: updatedProduct.name,
      overallDiameter: updatedProduct.overallDiameter,
      overallWidth: updatedProduct.overallWidth,
      measurementRim: updatedProduct.measurementRim,
      standardRim: updatedProduct.standardRim,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
    };

    updateProductSizeMutation.mutateAsync(
      { ...updateProductSizeForm },
      {
        onSuccess: () => {
          alert("Product size updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
          alert("An error occurred. " + error.message);
        },
      },
    );
  };

  return (
    <div className="flex">
      <div className="p-10 overflow-x-auto w-full bg-white">
        <h1 className="font-bold text-2xl mb-4">
          Product Size for {getSelectedProductName()}
        </h1>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Size Name
              </label>
              <input
                {...register("name")}
                id="name"
                className="w-full p-2 border rounded"
                placeholder="Product size name"
              />
            </div>
            <div>
              <label
                htmlFor="overallDiameter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Overall Diameter
              </label>
              <input
                {...register("overallDiameter")}
                id="overallDiameter"
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Overall Diameter"
              />
            </div>
            <div>
              <label
                htmlFor="overallWidth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Overall Width
              </label>
              <input
                {...register("overallWidth")}
                id="overallWidth"
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Overall Width"
              />
            </div>
            <div>
              <label
                htmlFor="measurementRim"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Measurement Rim
              </label>
              <input
                {...register("measurementRim")}
                id="measurementRim"
                className="w-full p-2 border rounded"
                placeholder="Measurement Rim"
              />
            </div>
            <div>
              <label
                htmlFor="standardRim"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Standard Rim
              </label>
              <input
                {...register("standardRim")}
                id="standardRim"
                className="w-full p-2 border rounded"
                placeholder="Standard Rim"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                {...register("price")}
                id="price"
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Price"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                {...register("quantity")}
                id="quantity"
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Quantity"
              />
            </div>
          </div>

          <div className="gap-1 mt-6 flex justify-start">
            <button
              type="submit"
              className="btn bg-[#387ADF] hover:bg-[#2558a5] text-white"
            >
              Create
            </button>
            <button
              type="button"
              className="btn bg-slate-200"
              onClick={updateHandler}
            >
              Update
            </button>
          </div>
        </form>

        <div className="mb-4">
          <SearchBar />
        </div>

        <table className="shadow-lg border-collapse min-w-full table-auto justify-center text-center">
          <thead className="border-y border-gray-300">
            <tr>
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">product id</th>
              <th className="p-2 border border-gray-300">name</th>
              <th className="p-2 border border-gray-300">overall diameter</th>
              <th className="p-2 border border-gray-300">overall width</th>
              <th className="p-2 border border-gray-300">measurement rim</th>
              <th className="p-2 border border-gray-300">standard rim</th>
              <th className="p-2 border border-gray-300">price</th>
              <th className="p-2 border border-gray-300">quantity</th>
              <th className="p-2 border border-gray-300">updated at</th>
            </tr>
          </thead>
          <tbody>
            {currentProduct?.productSizes.map((productSize) => (
              <ProductDetailTableRow
                key={productSize.id}
                productDetail={productSize}
                isSelected={selectedID === productSize.id}
                onRowClick={() => handleRowClick(productSize)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
