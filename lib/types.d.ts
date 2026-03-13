type Poll = {
  id: string
  question: string
  options: string[]
  votes: Votes
}

type Votes = {
  [optionIndex: number]: number
}

export type { Poll, Votes }
