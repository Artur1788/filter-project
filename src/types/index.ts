export interface Product {
  id?: number;
  name: string;
  category: 'Electronics' | 'Clothing' | 'Footwear';
  brand: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export interface ProductFilters {
  category?: 'Electronics' | 'Clothing' | 'Footwear' | '';
  maxPrice?: number;
  rating?: number;
  search?: string;
  sortBy?: 'asc' | 'desc' | '';
}
