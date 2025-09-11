
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, User, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const teamData = {
  lv1: [
    { id: "0000", mobile: "0000000000", registerTime: "2024-01-01 10:00" },
    { id: "0000", mobile: "0000000000", registerTime: "2024-01-02 11:30" },
  ],
  lv2: [
    { id: "0000", mobile: "0000000000", registerTime: "2024-01-03 14:00" },
  ],
  lv3: [],
};

type Level = "lv1" | "lv2" | "lv3";

export default function TeamPage() {
  const [activeLevel, setActiveLevel] = useState<Level>("lv1");

  const renderMember = (member: {id: string, mobile: string, registerTime: string}) => (
    <Card key={member.id} className="mb-3">
        <CardContent className="p-4">
            <div className="flex items-center space-x-4">
                <div className="bg-gray-200 rounded-full p-2">
                    <User className="text-gray-500" />
                </div>
                <div className="flex-1">
                    <p className="font-bold">ID: {member.id}</p>
                    <p className="text-sm text-gray-500">Mobile: {member.mobile}</p>
                    <p className="text-sm text-gray-500">Register time: {member.registerTime}</p>
                </div>
            </div>
        </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <Link href="/" className="absolute left-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">My Team</h1>
      </header>

      <main className="p-4">
        <Card className="mb-4 bg-red-500 text-white">
          <CardContent className="p-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-bold text-2xl">0</p>
              <p className="text-sm">Total People</p>
            </div>
            <div>
              <p className="font-bold text-2xl">0.00</p>
              <p className="text-sm">Total Recharge</p>
            </div>
            <div>
              <p className="font-bold text-2xl">0</p>
              <p className="text-sm">New Members Today</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-around bg-white rounded-lg p-1 mb-4 shadow-sm">
          <Button onClick={() => setActiveLevel("lv1")} variant={activeLevel === 'lv1' ? 'destructive' : 'ghost'} className="w-full">LV1</Button>
          <Button onClick={() => setActiveLevel("lv2")} variant={activeLevel === 'lv2' ? 'destructive' : 'ghost'} className="w-full">LV2</Button>
          <Button onClick={() => setActiveLevel("lv3")} variant={activeLevel === 'lv3' ? 'destructive' : 'ghost'} className="w-full">LV3</Button>
        </div>

        <div>
            {teamData[activeLevel].length > 0 ? (
                teamData[activeLevel].map(renderMember)
            ) : (
                <div className="text-center text-gray-500 mt-10">
                    <Users size={48} className="mx-auto mb-2" />
                    <p>No members in this level yet.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
