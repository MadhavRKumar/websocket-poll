import pollService from "@/lib/pollService"
import Vote from "./vote"

export default async function PollPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: pollId } = await params
  const pollData = pollService.get(pollId)

  return (
    <div>
      {pollData && (
        <Vote
          pollId={pollData.id}
          question={pollData.question}
          options={pollData.options}
          votes={pollData.votes}
        />
      )}
    </div>
  )
}
