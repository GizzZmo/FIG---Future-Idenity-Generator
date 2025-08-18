
export interface GenerationOptions {
  // Basic
  region: string;
  gender: string;
  // Advanced Text
  ageRange: string;
  ethnicity: string;
  profession: string;
  // Advanced Image
  imageStyle: string;
  lightingStyle: string;
  cameraShot: string;
  aspectRatio: string;
}

export interface IdentityText {
  fullName: string;
  age: number;
  location: string;
  gender: string;
  profession: string;
  personalityTraits: string[];
  backstory: string; // Renamed from bio
  motivations: string;
}

export interface Identity extends IdentityText {
  imageUrl: string;
  imagePrompt: string;
}
