"use client"
import CourseGenerator from "@/components/course-generator"
import Chat from "@/components/chat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Openmind AI Professor</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="course" className="space-y-4">
          <TabsList>
            <TabsTrigger value="course">Course Generator</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="course">
            <CourseGenerator />
          </TabsContent>
          <TabsContent value="chat">
            <Chat />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

