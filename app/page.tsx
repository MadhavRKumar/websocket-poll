"use client"

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

export default function Page() {
  const handleSubmit = (formData: FormData) => {
    console.log("Form submitted with data:", formData)
    const question = formData.get("question") as string
    const optionsText = formData.get("options") as string
    const options = optionsText
      .split("\n")
      .map((opt) => opt.trim())
      .filter(Boolean)
    fetch("/polls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, options }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Poll created:", data)
      })
      .catch((error) => {
        console.error("Error creating poll:", error)
      })
  }

  return (
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
  )
}
