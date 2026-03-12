// takes the poll data as a prop and renders the voting interface
// It allows users to select an option and submit their vote, which updates the poll's vote counts in real-time using the socket.io connection established in the server.ts file. The component also listens for updates from the server to reflect changes in the vote counts immediately.

"use client"

import { useEffect, useState } from "react"
import { socket } from "@/socket"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"

interface VoteProps {
  pollId: string
  question: string
  options: string[]
  votes: Map<number, number>
}

export default function Vote({ pollId, question, options, votes }: VoteProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [currentVotes, setCurrentVotes] = useState(votes)

  useEffect(() => {
    // Listen for vote updates from the server
    socket.on("voteUpdate", (updatedVotes: Map<number, number>) => {
      setCurrentVotes(updatedVotes)
    })

    // Clean up the socket listener on component unmount
    return () => {
      socket.off("voteUpdate")
    }
  }, [])

  const handleVote = () => {
    if (selectedOption !== null) {
      // Emit the vote to the server
      socket.emit("vote", { pollId, optionIndex: selectedOption })
    }
  }

  return (
    <div>
      <Card className="mx-auto mt-10 w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-center">{question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            onValueChange={(value) => setSelectedOption(Number(value))}
            className="grid w-full gap-4"
          >
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <FieldGroup>
            <Button
              variant="outline"
              onClick={handleVote}
              disabled={selectedOption === null}
            >
              Submit Vote
            </Button>
          </FieldGroup>
        </CardFooter>
      </Card>
    </div>
  )
}
