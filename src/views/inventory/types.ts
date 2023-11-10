type NewProductProps = {
  name: string;
  stock: number;
  price: number;
  picture: string;
  description: string;
};

type ProductProps = NewProductProps & { id: number };

type EditProductProps = { name: string; stock: number; price: number };

export type { NewProductProps, ProductProps, EditProductProps };
