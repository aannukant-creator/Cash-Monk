"use client";

import { Home, ListTodo, FileText, User, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";

const tasks = [
  {
    description: "Inviting activation of 5",
    reward: 250,
    progress: 0,
    total: 5,
    imageUrl: "https://i.ibb.co/3k042vj/group-of-people.jpg",
  },
  {
    description: "Inviting activation of 16",
    reward: 800,
    progress: 0,
    total: 16,
    imageUrl: "https://i.ibb.co/3k042vj/group-of-people.jpg",
  },
  {
    description: "Inviting activation of 50",
    reward: 2750,
    progress: 0,
    total: 50,
    imageUrl: "https://i.ibb.co/3k042vj/group-of-people.jpg",
  },
  {
    description: "Inviting activation of 155",
    reward: 9300,
    progress: 0,
    total: 155,
    imageUrl: "https://i.ibb.co/3k042vj/group-of-people.jpg",
  },
];

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-red-500 p-4 text-center relative">
        <div className="absolute -top-10 -right-10 w-32">
          <Image
            src="https://i.ibb.co/k0gHWwd/coin.png"
            alt="coin"
            width={128}
            height={128}
          />
        </div>
        <h1 className="text-3xl font-bold">Invite friends</h1>
        <p className="mt-2 bg-yellow-400 text-black font-semibold rounded px-2 py-1 inline-block">
          Multiple rewards waiting for you to claim
        </p>
      </header>

      {/* Main Task List */}
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Task Rewards</h2>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Card key={index} className="bg-white rounded-lg shadow">
              <CardContent className="p-4 relative">
                <div className="absolute top-2 left-0 bg-gray-200 text-xs px-2 py-1 rounded-r">
                  Incomplete
                </div>

                <div className="flex items-center mt-6">
                  {/* Task Image */}
                  <div className="w-16 h-12 mr-4 flex-shrink-0">
                    <Image
                      src={task.imageUrl}
                      alt="Task"
                      width={64}
                      height={48}
                      className="rounded"
                    />
                  </div>

                  {/* Task Details */}
                  <div className="flex-grow">
                    <p className="font-semibold">{task.description}</p>
                    <Progress value={(task.progress / task.total) * 100} />
                  </div>

                  {/* Progress Numbers */}
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="font-bold text-red-500">{task.reward} Rs</p>
                    <p className="text-sm text-gray-500">
                      {task.progress}/{task.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <Link href="/home" className="flex flex-col items-center">
          <Home />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/tasks" className="flex flex-col items-center">
          <ListTodo />
          <span className="text-xs">Tasks</span>
        </Link>
        <Link href="/support" className="flex flex-col items-center">
          <Headphones />
          <span className="text-xs">Support</span>
        </Link>
        <Link href="/blog" className="flex flex-col items-center">
          <FileText />
          <span className="text-xs">Blog</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center">
          <User />
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </div>
  );
}
