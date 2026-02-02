export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  image_url?: string;
  published_at: string;
  updated_at: string;
  author?: string;
  featured: boolean;
}

export interface ArticleInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  image_url?: string;
  author?: string;
  featured?: boolean;
}

export type Category = 
  | "سياست" 
  | "کيل" 
  | "ثقافت" 
  | "تعليم" 
  | "تفريح";

export const CATEGORIES: Category[] = [
  "سياست",
  "کيل", 
  "ثقافت",
  "تعليم",
  "تفريح"
];
