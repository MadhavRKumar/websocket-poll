import pollService from "@/lib/pollService"

export async function POST(request: Request) {
  const { question, options } = await request.json()

  if (typeof question !== "string" || !Array.isArray(options)) {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const poll = pollService.createPoll(question, options)

  return Response.json(poll)
}
