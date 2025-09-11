
'use client';

import { Gem } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-600">
      <div className="text-center text-white">
        <Gem className="w-24 h-24 mx-auto animate-pulse text-yellow-300" />
        <h1 className="mt-6 text-5xl font-bold bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">
          Cesh Monk
        </h1>
        <p className="mt-2 text-lg">Your investment partner</p>
      </div>
    </div>
  );
}
