type Poll = {
  id: string
  question: string
  options: Map<number, string> // optionIndex -> optionText
  votes: Map<number, number> // optionIndex -> voteCount
}

class PollService {
  polls: Map<string, Poll>

  constructor() {
    this.polls = new Map<string, Poll>()
  }

  createPoll(question: string, options: string[]): Poll {
    const id = this.generateId()
    const votes = new Map<number, number>()

    options.forEach((_, index) => {
      votes.set(index, 0)
    })

    const poll: Poll = {
      id,
      question,
      options,
      votes,
    }
    this.polls.set(id, poll)
    return poll
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

const pollService = new PollService()

export default pollService
