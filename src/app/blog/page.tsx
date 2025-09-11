
import Link from 'next/link';
import { ChevronLeft, Home, ListTodo, Headphones, FileText, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const blogPosts = [
  {
    id: 1,
    title: 'Welcome to Cesh Monk!',
    date: '2024-07-29',
    excerpt: 'Find out more about our investment platform and how to get started on your journey to financial growth.',
  },
  {
    id: 2,
    title: 'Understanding Our Investment Plans',
    date: '2024-07-28',
    excerpt: 'A deep dive into the Manufacturer, Retailer, and Distributor plans. Learn which one is right for you.',
  },
  {
    id: 3,
    title: 'How to Maximize Your Earnings',
    date: '2024-07-27',
    excerpt: 'Tips and tricks on how to make the most of our platform, from daily earnings to team-building rewards.',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-20">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/home" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">Blog</h1>
      </header>

      <main className="p-4 space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-xs text-gray-500 pt-1">{post.date}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{post.excerpt}</p>
              <Link href="#" className="text-red-600 font-semibold mt-2 inline-block">
                Read More &gt;
              </Link>
            </CardContent>
          </Card>
        ))}
         <div className="text-center text-gray-500 py-10">
            <p>More posts coming soon!</p>
         </div>
      </main>

       {/* Bottom Navigation */}
       <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center text-gray-600 py-2">
        <Link href="/home" className="flex flex-col items-center">
          <Home />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/tasks" className="flex flex-col items-center">
          <ListTodo />
          <span className="text-xs">Tasks</span>
        </Link>
        <button className="flex flex-col items-center">
          <Headphones />
          <span className="text-xs">Support</span>
        </button>
        <Link href="/blog" className="flex flex-col items-center text-red-600">
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
