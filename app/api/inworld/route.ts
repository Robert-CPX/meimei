import { NextResponse } from "next/server"
import { haveConversation } from "@/lib/actions/interaction.actions";

export async function POST(req: Request) {
  const my_key = "Basic " + process.env.INWORLD_BASE64_KEY
  const character = "workspaces/default-upyjqviok36wsxukslekpq/characters/emi2"
  const url = `https://api.inworld.ai/v1/${character}:simpleSendText`

  const { text, endUserFullname, endUserId, conversationId } = await req.json()
  if (!text) return NextResponse.error()

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': my_key,
      },
      body: JSON.stringify({
        character,
        text,
        sessionId: conversationId,
        endUserFullname,
        endUserId,
      }),
    })
    const { textList, emotion, sessionId, relationshipUpdate } = await response.json();
    const reply = textList.join('. ')
    // save user input to db
    await haveConversation({ content: text, userId: endUserId })
    return NextResponse.json({ reply, emotion, sessionId, relationshipUpdate })
  } catch (error) {
    return NextResponse.error()
  }

}
