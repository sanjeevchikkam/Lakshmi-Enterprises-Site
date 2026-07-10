export interface Category {
  _id: string;
  categoryId: string;
  name: string;
  description?: string;
  image?: any;
}

export interface Color {
  _id: string;
  name: string;
  colorCode: string; // e.g. #FF0000
}

export interface Company {
  _id: string;
  companyId: string;
  name: string;
  image?: any;
  categoriesAvailable?: Category[] | { _ref: string }[];
}

export interface Product {
  _id: string;
  productId: string;
  name: string;
  description?: string;
  company: Company;
  category: Category;
  size?: string;
  mrp?: number;
  price?: number;
  discount?: number;
  colors?: Color[];
  image?: any;
}

export interface Offer {
  _id: string;
  offerId: string;
  title: string;
  description?: string;
  company?: Company;
  discount?: number;
  image?: any;
  featured?: boolean;
}

export interface DealerEnquiry {
  name: string;
  address: string;
  mobile: string;
}
