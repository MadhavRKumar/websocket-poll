"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

export default function PollChart({
  options,
  votes,
}: {
  options: string[]
  votes: { [optionIndex: number]: number }
}) {
  const data = options.map((option, index) => ({
    name: option,
    votes: votes[index] || 0,
  }))

  const chartConfig = {
    votes: {
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig}>
      <BarChart width={400} height={300} data={data} layout="vertical">
        <XAxis type="number" dataKey="votes" tickMargin={10} />
        <YAxis type="category" dataKey="name" />
        <Bar dataKey="votes" fill="var(--color-votes)" barSize={20} />
      </BarChart>
    </ChartContainer>
  )
}
