
import Link from 'next/link';
import { ChevronLeft, Headphones, LifeBuoy, MessageCircle, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/home" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">Support Center</h1>
      </header>

      <main className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="text-red-500" />
              <span>Contact Us</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href="https://t.me/your_support_channel" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                <div className='flex items-center gap-3'>
                    <MessageCircle className="text-blue-500" />
                    <div>
                        <p className="font-semibold">Telegram Chat</p>
                        <p className="text-sm text-gray-500">Get instant support from our team</p>
                    </div>
                </div>
                <ChevronLeft className='rotate-180 text-gray-400'/>
            </a>
             <a href="https://wa.me/918432666677" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                <div className='flex items-center gap-3'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <div>
                        <p className="font-semibold">WhatsApp Support</p>
                        <p className="text-sm text-gray-500">Chat with us on WhatsApp</p>
                    </div>
                </div>
                <ChevronLeft className='rotate-180 text-gray-400'/>
            </a>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LifeBuoy className="text-red-500" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-10">
              <p>FAQ section coming soon!</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
