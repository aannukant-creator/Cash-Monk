import Link from 'next/link';
import { ChevronLeft, Home, ListTodo, Headphones, FileText, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Welcome to Cesh Monk!',
    excerpt: 'Welcome to Cesh Monk, your trusted partner for financial growth! Our platform is designed to make earning money simple and accessible. Explore our unique investment opportunities and start your journey towards significant daily returns today.',
  },
  {
    id: 2,
    title: 'Understanding Our Investment Plans',
    excerpt: "Choosing the right plan is key to your success. This guide provides a deep dive into our 'Manufacturer' and 'Retailer' plans. Learn how each plan works, its potential returns, and how you can choose the best option to start earning money right away.",
  },
  {
    id: 3,
    title: 'How to Maximize Your Earnings',
    excerpt: 'Ready to boost your income? This post shares powerful tips and tricks to maximize your earnings on Cesh Monk. From daily income to team-building rewards, we\'ll show you the strategies you need to unlock your earning potential.',
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
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{post.excerpt}</p>
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
        <Link href="/support" className="flex flex-col items-center">
          <Headphones />
          <span className="text-xs">Support</span>
        </Link>
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
