"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CourseGenerator() {
  const [topic, setTopic] = useState("")
  const [level, setLevel] = useState("beginner")
  const [course, setCourse] = useState("")
  const [loading, setLoading] = useState(false)

  const generateCourse = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const response = await fetch("/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level }),
      })
      const data = await response.json()
      setCourse(data.content)
    } catch (error) {
      console.error("Failed to generate course:", error)
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter course topic"
            className="flex-1"
          />
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateCourse} disabled={loading}>
            {loading ? "Generating..." : "Generate Course"}
          </Button>
        </div>
        {course && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Generated Course:</h3>
            <div className="bg-secondary/50 p-4 rounded-md whitespace-pre-wrap">{course}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

