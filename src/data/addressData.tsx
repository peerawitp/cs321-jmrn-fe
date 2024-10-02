// addressData.ts

export interface Address {
    id: number;
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  
  export const addresses: Address[] = [
    {
      id: 1,
      name: "John Doe",
      addressLine1: "123 Main St",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
    {
      id: 2,
      name: "Jane Smith",
      addressLine1: "456 Oak St",
      addressLine2: "",
      city: "San Francisco",
      state: "CA",
      postalCode: "94103",
      country: "USA",
    },
  ];
  