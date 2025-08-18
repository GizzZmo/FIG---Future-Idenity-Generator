
export interface GenerationOptions {
  region: string;
  gender: string;
}

export interface IdentityText {
  fullName: string;
  age: number;
  location: string;
  bio: string;
  gender: string;
}

export interface Identity extends IdentityText {
  imageUrl: string;
}
