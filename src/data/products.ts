import productsData from './products.json';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number; // en Dirhams (DH)
  category: 'parfumerie' | 'bijouterie' | 'horlogerie' | 'antiquites';
  subcategory: 'homme' | 'femme' | 'unisex' | 'argent' | 'cuivre' | 'inspiration' | 'epoque';
  image: string;
  badge?: 'Tendance 2026' | 'Exclusivité Maroc' | 'Pièce Unique' | 'Édition Limitée' | 'Édition Privée';
  description: string;
  material: string;
  artisanOrigin?: string;
  
  // Spécifications spécifiques
  specs: {
    volume?: string; // Parfumerie
    concentration?: string; // Parfumerie
    topNotes?: string[]; // Parfumerie
    heartNotes?: string[]; // Parfumerie
    baseNotes?: string[]; // Parfumerie
    
    metalType?: string; // Bijouterie
    stone?: string; // Bijouterie
    weight?: string; // Bijouterie
    hallmark?: string; // Bijouterie
    artisanName?: string;
    
    movement?: string; // Horlogerie
    reserve?: string; // Horlogerie
    complication?: string; // Horlogerie
    case?: string; // Horlogerie
    diameter?: string; // Horlogerie
    strap?: string; // Horlogerie
    glass?: string; // Horlogerie
  };
}

export const products: Product[] = productsData.products as Product[];
