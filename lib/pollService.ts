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

  get(pollId: string): Poll | undefined {
    return this.polls.get(pollId)
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

// Ensure a single instance of PollService is used across the application
globalThis.pollService = globalThis.pollService || new PollService()

export default globalThis.pollService
