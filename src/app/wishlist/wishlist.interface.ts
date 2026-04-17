type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

export type ProductWishListType = {
  _id: string;
  id: string;

  title: string;
  slug: string;
  description: string;

  imageCover: string;
  images: string[];

  brand: Brand;
  category: Category;
  subcategory: SubCategory[];

  price: number;
  oldPrice: number;
  quantity: number;
  sold: number;

  ratingsAverage: number;
  ratingsQuantity: number;

  createdAt: string;
  updatedAt: string;

  __v: number;
};