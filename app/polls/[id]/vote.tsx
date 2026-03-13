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
import PollChart from "./poll-chart"
import { Poll, Votes } from "@/lib/types"

export default function Vote({ id: pollId, question, options, votes }: Poll) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [currentVotes, setCurrentVotes] = useState(votes)

  useEffect(() => {
    // when the component mounts, join the poll room to receive updates
    socket.emit("joinPoll", pollId)

    socket.on("voteUpdate", (updatedVotes: Votes) => {
      setCurrentVotes(updatedVotes)
    })

    // Clean up the socket listener on component unmount
    return () => {
      socket.off("voteUpdate")
    }
  }, [pollId])

  const handleVote = () => {
    if (selectedOption !== null) {
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
      <Card className="mx-auto mt-6 w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Current Votes</CardTitle>
        </CardHeader>
        <CardContent>
          <PollChart options={options} votes={currentVotes} />
        </CardContent>
      </Card>
    </div>
  )
}
