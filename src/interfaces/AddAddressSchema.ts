export default interface AddAddressSchema {
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
