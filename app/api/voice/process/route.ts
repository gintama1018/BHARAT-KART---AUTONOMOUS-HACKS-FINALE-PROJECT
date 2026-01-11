import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Gemini API configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const audioFile = formData.get("audio") as File

        if (!audioFile) {
            return NextResponse.json(
                { error: "No audio file provided" },
                { status: 400 }
            )
        }

        // Convert audio to base64
        const audioBuffer = await audioFile.arrayBuffer()
        const audioBase64 = Buffer.from(audioBuffer).toString("base64")

        // Use Gemini for transcription and structured extraction
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        const prompt = `You are assisting an Indian artisan in creating a product listing for their handcrafted item.

The artisan has provided an audio description of their product. Please:
1. Transcribe the spoken content
2. Extract structured product information
3. Preserve all cultural terms and craft-specific vocabulary
4. Do not invent or assume any details not mentioned

IMPORTANT: Return ONLY valid JSON, no markdown, no explanation.

Required JSON structure:
{
  "transcription": "Full transcription of the audio in the original language with English translation",
  "product_name": "Name of the product (e.g., Handwoven Bandhani Dupatta)",
  "description": "Detailed product description",
  "craft_type": "Type of craft (e.g., Bandhani, Block Printing, Pottery)",
  "material": "Primary material used",
  "state": "Indian state of origin",
  "cultural_tags": ["Array", "of", "relevant", "tags"],
  "language_detected": "Language spoken in the audio",
  "suggested_price": "Suggested price range in INR if mentioned, otherwise null",
  "confidence_score": "0.0 to 1.0 confidence in extraction accuracy"
}

If you cannot extract certain fields, set them to null. Always provide the transcription.`

        // For audio processing, we'll use the multimodal capabilities
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: audioFile.type || "audio/webm",
                    data: audioBase64
                }
            },
            prompt
        ])

        const response = await result.response
        const text = response.text()

        // Parse the JSON response
        let extractedData
        try {
            // Clean up the response in case it has markdown code blocks
            const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
            extractedData = JSON.parse(cleanedText)
        } catch (parseError) {
            // If parsing fails, return raw text with error
            return NextResponse.json({
                success: false,
                error: "Failed to parse AI response",
                raw_response: text
            }, { status: 422 })
        }

        return NextResponse.json({
            success: true,
            data: extractedData
        })

    } catch (error: any) {
        console.error("Voice processing error:", error)

        // Handle specific Gemini API errors
        if (error.message?.includes("API key")) {
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { error: "Failed to process audio", details: error.message },
            { status: 500 }
        )
    }
}
