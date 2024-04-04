import { NextResponse } from "next/server"

export async function POST(req: Request) {
  return NextResponse.json({
    message: {
      role: "assistant",
      content: "Sorry, I'm too hungry to answer your question."
    }
  }, {
    status: 200
  })

  // const messages = await req.json()
  // try {
  //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  //     },
  //     body: JSON.stringify({
  //       model: "gpt-3.5-turbo",
  //       messages: messages,
  //       max_tokens: 200,
  //       temperature: 0.6,
  //     }),
  //   })
  //   const data = await response.json()
  //   return NextResponse.json({ data: data.choices[0].message.content })
  // } catch (error) {
  //   return NextResponse.error()
  // }
}