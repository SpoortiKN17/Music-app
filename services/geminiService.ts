import { GoogleGenAI, Type } from "@google/genai";
import { GeminiRecommendation } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getMusicRecommendations = async (mood: string, context: string = ''): Promise<GeminiRecommendation> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Recommend 5 songs for a user who is feeling ${mood}. ${context ? `Additional context: ${context}` : ''}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasoning: {
            type: Type.STRING,
            description: "A friendly explanation of why these songs were chosen.",
          },
          suggestedTracks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                artist: { type: Type.STRING },
                description: { type: Type.STRING, description: "Brief mood description for this track" }
              },
              required: ["title", "artist", "description"]
            }
          }
        },
        required: ["reasoning", "suggestedTracks"]
      }
    }
  });

  try {
    // The response.text property directly returns the generated string. Do not call as a method.
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Could not get music recommendations");
  }
};

export const searchTrendingMusic = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Find real-time information about trending music or details for: ${query}. Focus on latest releases or artist news.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  return {
    text: response.text,
    // Extract website URLs from groundingChunks to display references as required.
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web).filter(Boolean) || []
  };
};