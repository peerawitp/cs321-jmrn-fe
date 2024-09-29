"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../TableContext";
import { product } from "../../../public/data/data";
import { useForm } from "react-hook-form";

interface UpdateFormProps {
  closePopUp: () => void; // Function with no arguments, returning nothing
}

const findProductByID = (id: string) => {
  return product.find((product) => product.id === id);
};

const UpdateForm: React.FC<UpdateFormProps> = ({ closePopUp }) => {
  const { id } = useContext(Context);
  // console.log(id);


  const { register, handleSubmit, setValue } = useForm();


  useEffect(() => {
    if (id === null) return;
    const product = findProductByID(id);
    if (product !== undefined) {
      setValue("id", product.id);
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("imageURL", product.imageURL);
      setValue("TireSize", product.TireSize);
      setValue("PatternAndType", product.PatternAndType);
      setValue("OverAllDiameter", product.OverAllDiameter);
      setValue("OverAllWidth", product.OverAllWidth);
      setValue("MeasurementRim", product.MeasurementRim);
      setValue("StandardRim", product.StandardRim);
      setValue("Wheel", product.Wheel);
      setValue("Type", product.Type);
      setValue("Quantity", product.Quantity);
      setValue("Price", product.Price);
      setValue("createdAt", product.createdAt);
      setValue("updatedAt", product.updatedAt);
    }
  }, [id, setValue]);

  return (
    <div className="overflow-y-auto p-5 bg-slate-200 w-[500px] h-[600px] rounded-md">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            ID
          </label>
          <input
            {...register("id")}
            id="id"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageURL"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            {...register("imageURL")}
            id="imageURL"
            type="file"
            className="file-input w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="TireSize"
            className="block text-sm font-medium text-gray-700"
          >
            Tire Size
          </label>
          <input
            {...register("TireSize")}
            id="TireSize"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="PatternAndType"
            className="block text-sm font-medium text-gray-700"
          >
            Pattern and Type
          </label>
          <input
            {...register("PatternAndType")}
            id="PatternAndType"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="OverAllDiameter"
            className="block text-sm font-medium text-gray-700"
          >
            OverAll Diameter
          </label>
          <input
            {...register("OverAllDiameter")}
            id="OverAllDiameter"
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="OverAllWidth"
            className="block text-sm font-medium text-gray-700"
          >
            OverAll Width
          </label>
          <input
            {...register("OverAllWidth")}
            id="OverAllWidth"
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="MeasurementRim"
            className="block text-sm font-medium text-gray-700"
          >
            Measurement Rim
          </label>
          <input
            {...register("MeasurementRim")}
            id="MeasurementRim"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="StandardRim"
            className="block text-sm font-medium text-gray-700"
          >
            Standard Rim
          </label>
          <input
            {...register("StandardRim")}
            id="StandardRim"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Wheel"
            className="block text-sm font-medium text-gray-700"
          >
            Wheel
          </label>
          <input
            {...register("Wheel")}
            id="Wheel"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <input
            {...register("Type")}
            id="Type"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            {...register("Quantity")}
            id="Quantity"
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            {...register("Price")}
            id="Price"
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="createdAt"
            className="block text-sm font-medium text-gray-700"
          >
            Created At
          </label>
          <input
            {...register("createdAt")}
            id="createdAt"
            type="datetime-local"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="updatedAt"
            className="block text-sm font-medium text-gray-700"
          >
            Updated At
          </label>
          <input
            {...register("updatedAt")}
            id="updatedAt"
            type="datetime-local"
            placeholder="Type here"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="flex justify-end">
          <div className="">
            <button
              onClick={closePopUp}
              className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>

          <div className="ml-5">
            <button
              className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
