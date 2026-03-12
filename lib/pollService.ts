type Poll = {
  id: string
  question: string
  options: string[]
  votes: Votes
}

type Votes = {
  [optionIndex: number]: number
}

class PollService {
  polls: Map<string, Poll>

  constructor() {
    this.polls = new Map<string, Poll>()
  }

  createPoll(question: string, options: string[]): Poll {
    const id = this.generateId()
    const votes = {} as Votes

    options.forEach((option, index) => {
      votes[index] = 0
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

  vote(pollId: string, optionIndex: number): Votes {
    const poll = this.polls.get(pollId)
    if (poll && optionIndex >= 0 && optionIndex < poll.options.length) {
      poll.votes[optionIndex] = (poll.votes[optionIndex] || 0) + 1
    }
    return poll ? poll.votes : {}
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

// Ensure a single instance of PollService is used across the application
// declare the types for globalThis to avoid TypeScript errors
declare global {
  var pollService: PollService
}

globalThis.pollService = globalThis.pollService || new PollService()

export default globalThis.pollService
