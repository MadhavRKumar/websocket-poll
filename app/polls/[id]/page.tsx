import pollService from "@/lib/poll-service"
import Vote from "./vote"

export default async function PollPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pollData = pollService.get(id)

  return (
    <div>
      {pollData && (
        <Vote
          id={pollData.id}
          question={pollData.question}
          options={pollData.options}
          votes={pollData.votes}
        />
      )}
    </div>
  )
}
