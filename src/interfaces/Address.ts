export default interface Address {
  id: number;
  userId: string;
  houseNumber: string;
  village: string | null;
  alley: string | null;
  street: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
}
