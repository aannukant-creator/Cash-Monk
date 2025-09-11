
import Link from "next/link";
import { ChevronLeft, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TelegramPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">Join our Telegram</h1>
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Official Telegram Channel</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <p className="mb-4 text-gray-600">Click the button below to join our official Telegram channel for updates, news, and support.</p>
            <a href="https://t.me/+61Vjwe5dOO84YzM1" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-6 rounded-lg text-lg">
                <Send className="mr-2 h-5 w-5" /> Join Channel
              </Button>
            </a>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
