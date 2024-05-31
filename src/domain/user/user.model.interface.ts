export interface IUserModel {
  id: string;
  email: string;
  name: string;
  phoneNumbers: string[];
  roles: string[];
  addPhoneNumber(phoneNumber: string): void;
  removePhoneNumber(phoneNumber: string): void;
}