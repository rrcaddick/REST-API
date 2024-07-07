interface IBaseAddress {
  buildingCompanyName?: string;
  street: string;
  city: string;
  state: string;
  postCode: number;
}

export interface IAddressModel extends IBaseAddress {
  type: string;
}

export interface ICreateAddress extends IBaseAddress {
  addressTypeId: number;
}
