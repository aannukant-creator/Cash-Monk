
import { Home, ListTodo, FileText, User, Headphones } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';
import Image from 'next/image';

const tasks = [
  {
    description: "Inviting activation of 5",
    reward: 250,
    progress: 0,
    total: 5,
    imageUrl: "https://i.ibb.co/3k042vj/group-of-people-partying.png",
  },
  {
    description: "Inviting activation of 16",
    reward: 800,
    progress: 0,
    total: 16,
    imageUrl: "https://i.ibb.co/3k042vj/group-of-people-partying.png",
  },
  {
    description: "Inviting activation of 50",
    reward: 2750,
    progress: 0,
    total: 50,
    imageUrl: "https://i.ibb.co/3k042vj/group-of-people-partying.png",
  },
  {
    description: "Inviting activation of 155",
    reward: 9300,
    progress: 0,
    total: 155,
    imageUrl: "https://i.ibb.co/3k042vj/group-of-people-partying.png",
  },
];

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-yellow-50 font-sans pb-20">
      <header className="bg-gradient-to-b from-red-500 to-orange-400 text-white text-center p-6 rounded-b-3xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32">
             <Image src="https://i.ibb.co/k0gHWWd/coin-and-treasure-chest.png" alt="Treasure Chest" width={128} height={128} />
        </div>
        <h1 className="text-3xl font-bold">Invite friends to win cash</h1>
        <p className="mt-2 bg-yellow-400 text-black font-semibold px-4 py-1 rounded-full inline-block">
          Multiple rewards waiting for you to claim
        </p>
      </header>

      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Task Rewards</h2>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <CardContent className="p-4 relative">
                <div className="absolute top-2 left-0 bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 rounded-r-full">
                  Incomplete
                </div>
                <div className="flex items-center mt-6">
                    <div className="w-16 h-12 mr-4 flex-shrink-0">
                         <Image src={task.imageUrl} alt="Task illustration" width={64} height={48} data-ai-hint="people celebrating" />
                    </div>
                  <div className="flex-grow">
                    <p className="font-semibold">{task.description}</p>
                    <Progress value={(task.progress / task.total) * 100} className="mt-2 h-2" />
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="font-bold text-red-500">₹{task.reward}</p>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center text-gray-600 py-2">
        <Link href="/" className="flex flex-col items-center">
          <Home />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/tasks" className="flex flex-col items-center text-red-600">
          <ListTodo />
          <span className="text-xs">Tasks</span>
        </Link>
        <button className="bg-red-600 text-white rounded-full p-4 -mt-8 shadow-lg">
          <Headphones size={28} />
        </button>
        <a href="#" className="flex flex-col items-center">
          <FileText />
          <span className="text-xs">Blog</span>
        </a>
        <a href="#" className="flex flex-col items-center">
          <User />
          <span className="text-xs">Account</span>
        </a>
      </div>
    </div>
  );
}
