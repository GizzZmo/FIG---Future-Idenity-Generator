
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
            description: "The person's full name, culturally appropriate for their location."
        },
        age: {
            type: Type.INTEGER,
            description: "The person's age, within the specified range if provided."
        },
        location: {
            type: Type.STRING,
            description: "A specific city and country within the specified region."
        },
        gender: {
            type: Type.STRING,
            description: "The gender of the person, matching the input."
        },
        profession: {
            type: Type.STRING,
            description: "A plausible profession for the person in the year 2035, reflecting technological and social trends. Should match the user's input if provided."
        },
        personalityTraits: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 key personality traits, including potential contradictions to create a nuanced character."
        },
        backstory: {
            type: Type.STRING,
            description: "A rich, one-paragraph backstory about their life, formative experiences, and how they navigate the world of 2035."
        },
        motivations: {
            type: Type.STRING,
            description: "The character's core motivations, including their goals, desires, and fears in the context of their life in 2035."
        }
    },
    required: ["fullName", "age", "location", "gender", "profession", "personalityTraits", "backstory", "motivations"]
};

export const generateIdentityText = async (options: GenerationOptions): Promise<IdentityText> => {
    const { region, gender, ageRange, ethnicity, profession } = options;
    const futureYear = new Date().getFullYear() + 10;

    const prompt = `Generate a detailed, nuanced, and fictional identity for a person living in the year ${futureYear}.
    
    **Core Identity Parameters:**
    - Region of Origin: ${region}
    - Gender: ${gender}
    ${ageRange !== 'Any' ? `- Age Range: ${ageRange}` : ''}
    ${ethnicity ? `- Described Appearance/Ethnicity: ${ethnicity}` : ''}
    ${profession ? `- Profession: ${profession}` : ''}

    **Contextual Directives for the year ${futureYear}:**
    - **Technological Integration:** Assume widespread integration of AI, autonomous systems, hyper-connectivity (IoT), and advanced human-machine collaboration. Reflect this in their profession, hobbies, or daily life.
    - **Socio-cultural Environment:** Consider a world with increased global tensions but also new forms of virtual communities. Societies may be more fragmented.
    - **Demographics:** Acknowledge global demographic shifts, such as aging populations in some developed nations and youth booms in others.
    
    **Character Depth Requirements:**
    - **Avoid Stereotypes:** Create a unique individual. Do not rely on cultural, gender, or professional stereotypes.
    - **Nuance & Contradiction:** Give them a complex personality with potentially conflicting traits (e.g., "brave but fears failure," "empathetic but socially withdrawn").
    - **Authenticity:** Their story should feel plausible and grounded in the projected future reality.

    Generate a JSON object that strictly adheres to the provided schema. The 'location' should be a specific city and country within the given '${region}'.
    `;

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
        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error("Error parsing JSON response from Gemini:", text);
            throw new Error("Failed to parse identity description. The AI returned an invalid format.");
        }

    } catch (error) {
        console.error("Error generating identity text:", error);
        throw new Error("Failed to generate identity description from Gemini.");
    }
};

export const generateIdentityImage = async (prompt: string, aspectRatio: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated. This might be due to a safety policy violation.");
        }
    } catch (error) {
        console.error("Error generating identity image:", error);
        throw new Error("Failed to generate identity image from Gemini.");
    }
};
