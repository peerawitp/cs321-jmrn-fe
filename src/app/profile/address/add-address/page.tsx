"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useAddAddress from "@/api/user/useAddAddress";

const addressSchema = z.object({
  houseNumber: z.string().min(1, "House Number is required"),
  village: z.string().nullable(),
  alley: z.string().nullable(),
  street: z.string().nullable(),
  subDistrict: z.string().min(1, "Sub-District is required"),
  district: z.string().min(1, "District is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z
    .string()
    .min(1, "Postal Code is required")
    .regex(/^\d{5}$/, "Postal Code must be a 5-digit number"),
  country: z.string().min(1, "Country is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const AddAddress: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const addAddressMutation = useAddAddress();

  const onSubmit = async (data: AddressFormValues) => {
    await addAddressMutation.mutateAsync(data, {
      onSuccess: () => {
        alert("Address added successfully!");
        router.push("/profile/address");
      },
      onError: (error) => {
        alert("An error occurred. " + error.message);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Add New Address</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* House Number */}
            <div>
              <label
                htmlFor="houseNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                House Number:
              </label>
              <input
                type="text"
                id="houseNumber"
                {...register("houseNumber")}
                placeholder="House Number"
                className="w-full p-3 border rounded"
              />
              {errors.houseNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.houseNumber.message}
                </p>
              )}
            </div>

            {/* Village */}
            <div>
              <label
                htmlFor="village"
                className="block text-gray-700 font-bold mb-2"
              >
                Village:
              </label>
              <input
                type="text"
                id="village"
                {...register("village")}
                placeholder="Village"
                className="w-full p-3 border rounded"
              />
            </div>

            {/* Alley */}
            <div>
              <label
                htmlFor="alley"
                className="block text-gray-700 font-bold mb-2"
              >
                Alley:
              </label>
              <input
                type="text"
                id="alley"
                {...register("alley")}
                placeholder="Alley"
                className="w-full p-3 border rounded"
              />
            </div>

            {/* Street */}
            <div>
              <label
                htmlFor="street"
                className="block text-gray-700 font-bold mb-2"
              >
                Street:
              </label>
              <input
                type="text"
                id="street"
                {...register("street")}
                placeholder="Street"
                className="w-full p-3 border rounded"
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>

            {/* Sub-District */}
            <div>
              <label
                htmlFor="subDistrict"
                className="block text-gray-700 font-bold mb-2"
              >
                Sub-District:
              </label>
              <input
                type="text"
                id="subDistrict"
                {...register("subDistrict")}
                placeholder="Sub-District"
                className="w-full p-3 border rounded"
              />
              {errors.subDistrict && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subDistrict.message}
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <label
                htmlFor="district"
                className="block text-gray-700 font-bold mb-2"
              >
                District:
              </label>
              <input
                type="text"
                id="district"
                {...register("district")}
                placeholder="District"
                className="w-full p-3 border rounded"
              />
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.district.message}
                </p>
              )}
            </div>

            {/* Province */}
            <div>
              <label
                htmlFor="province"
                className="block text-gray-700 font-bold mb-2"
              >
                Province:
              </label>
              <input
                type="text"
                id="province"
                {...register("province")}
                placeholder="Province"
                className="w-full p-3 border rounded"
              />
              {errors.province && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.province.message}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <label
                htmlFor="postalCode"
                className="block text-gray-700 font-bold mb-2"
              >
                Postal Code:
              </label>
              <input
                type="text"
                id="postalCode"
                {...register("postalCode")}
                placeholder="Postal Code"
                className="w-full p-3 border rounded"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 font-bold mb-2"
              >
                Country:
              </label>
              <input
                type="text"
                id="country"
                {...register("country")}
                placeholder="Country"
                className="w-full p-3 border rounded"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-5 justify-end">
            <button
              className="mt-4 w-full md:w-auto px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => router.push("/profile/address")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Address
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddAddress;
