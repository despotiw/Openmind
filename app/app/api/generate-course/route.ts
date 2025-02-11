import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { topic, level } = await req.json()
    const prompt = `Generate a course outline for ${topic} at ${level} level. Include 3 main sections with 3 subsections each.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    })

    return NextResponse.json({ content: completion.choices[0].message.content })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate course" }, { status: 500 })
  }
}

