import { Drug } from "./Drug";

export interface Review {
  id: number;
  content: string;
  rating: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  drug_id: number;
  images: Image[];
  drug: Drug;
}

export interface Image {
  id: number;
  image_url: string;
  image_key: string;
  created_at: string;
  updated_at: string;
  review_id: number;
}

export interface ReviewFormData {
  content: string;
  rating: string;
  image_keys: string[];
}

export interface ImageUploadResponse {
  image_url: string;
  image_key: string;
}
