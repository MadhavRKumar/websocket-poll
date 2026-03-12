"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group"
import { useState } from "react"

export default function Page() {
  const [pollCreated, setPollCreated] = useState(false)
  const [pollLink, setPollLink] = useState("")

  const handleSubmit = (formData: FormData) => {
    const question = formData.get("question") as string
    const optionsText = formData.get("options") as string
    const options = optionsText
      .split("\n")
      .map((opt) => opt.trim())
      .filter(Boolean)
    fetch("/api/polls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, options }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPollCreated(true)
        setPollLink(`/polls/${data.id}`)
      })
      .catch((error) => {
        console.error("Error creating poll:", error)
      })
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto mt-10 w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create a Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="poll-form" action={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="question">Question</FieldLabel>
                <FieldDescription>Enter the poll question.</FieldDescription>
                <Input
                  id="question"
                  name="question"
                  placeholder="What is your favorite color?"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="options">Options</FieldLabel>
                <FieldDescription>
                  Enter the poll options, one per line.
                </FieldDescription>
                <InputGroup>
                  <InputGroupTextarea
                    id="options"
                    name="options"
                    placeholder="Red&#10;Green&#10;Blue"
                  />
                </InputGroup>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <FieldGroup>
            <Field>
              <Button variant="outline" type="submit" form="poll-form">
                Create Poll
              </Button>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
      {pollCreated && (
        <Alert className="mt-4">
          <AlertTitle>Poll Created</AlertTitle>
          <AlertDescription>
            Your poll has been successfully created. Use{" "}
            <a href={pollLink} className="underline">
              {pollLink}
            </a>{" "}
            to view and share your poll.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
