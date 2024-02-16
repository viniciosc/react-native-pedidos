import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProductProps } from '@/utils/data/products';
import * as cartInMemory from './helpers/cart-in-menory';

export type ProductCardProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCardProps[];
  add: (product: ProductProps) => void;
  remover: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      add: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),
      remover: (productId: string) =>
        set((state) => ({
          products: cartInMemory.remover(state.products, productId),
        })),
      clear: () => set(() => ({ products: [] })),
    }),
    { name: 'nlw-expert:cart', storage: createJSONStorage(() => AsyncStorage) }
  )
);
