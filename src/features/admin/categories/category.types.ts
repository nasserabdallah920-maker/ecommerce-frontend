export interface Category {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  image?: File | null;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
}