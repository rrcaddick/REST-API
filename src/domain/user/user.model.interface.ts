export interface IAddressModel {
  type: string;
  buildingCompanyName?: string;
  street: string;
  city: string;
  state: string;
  postCode: number;
}

export interface IUserModel {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  addresses: IAddressModel[];
  roles: string[];
}
