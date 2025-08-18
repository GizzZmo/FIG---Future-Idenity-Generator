
import { GoogleGenAI, Type } from "@google/genai";
import type { GenerationOptions, IdentityText } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textResponseSchema = {
    type: Type.OBJECT,
    properties: {
        fullName: {
            type: Type.STRING,
            description: "The person's full name."
        },
        age: {
            type: Type.INTEGER,
            description: "The person's age, between 25 and 45."
        },
        location: {
            type: Type.STRING,
            description: "A specific city and country within the specified region."
        },
        bio: {
            type: Type.STRING,
            description: "A short, one-paragraph biography about their life, profession, or a futuristic hobby in the year 2034."
        },
        gender: {
            type: Type.STRING,
            description: "The gender of the person, matching the input."
        }
    },
    required: ["fullName", "age", "location", "bio", "gender"]
};

export const generateIdentityText = async (options: GenerationOptions): Promise<IdentityText> => {
    const { region, gender } = options;
    const prompt = `Generate a fictional identity for a person from the region of ${region} who identifies as ${gender}, living 10 years in the future (around ${new Date().getFullYear() + 10}).`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: textResponseSchema,
                temperature: 1.0,
            },
        });

        const text = response.text.trim();
        return JSON.parse(text);

    } catch (error) {
        console.error("Error generating identity text:", error);
        throw new Error("Failed to generate identity description from Gemini.");
    }
};

export const generateIdentityImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '3:4',
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating identity image:", error);
        throw new Error("Failed to generate identity image from Gemini.");
    }
};
