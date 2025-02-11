"use client"

import { useState } from "react"

export default function CourseGenerator() {
  const [topic, setTopic] = useState("")
  const [level, setLevel] = useState("beginner")
  const [course, setCourse] = useState("")

  const generateCourse = async () => {
    const response = await fetch("http://localhost:3001/api/generate-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, level }),
    })
    const data = await response.json()
    setCourse(data)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Generator</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter course topic"
        className="border p-2 mr-2"
      />
      <select value={level} onChange={(e) => setLevel(e.target.value)} className="border p-2 mr-2">
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={generateCourse} className="bg-blue-500 text-white px-4 py-2">
        Generate Course
      </button>
      {course && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Generated Course:</h3>
          <pre className="bg-gray-100 p-4 rounded">{course}</pre>
        </div>
      )}
    </div>
  )
}

