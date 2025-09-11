
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function RechargePage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("qepay");

  const amounts = [100, 399, 500, 2150, 4500, 10500, 25000, 50000];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center justify-between relative">
        <button onClick={() => router.back()} className="absolute left-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-center flex-1">recharge</h1>
        <Link href="/account/recharge-record" className="absolute right-4">
          <Button variant="ghost" className="text-white hover:bg-red-700 p-2 rounded-md">
            Record &gt;
          </Button>
        </Link>
      </header>

      <main className="p-4">
        <div className="bg-red-600 p-4 rounded-lg text-white">
          <div className="relative mb-4">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="number"
              placeholder="Recharge amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 pl-10 border-none rounded-md bg-white text-black"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {amounts.map((value) => (
              <Button
                key={value}
                variant="outline"
                className={`bg-red-500 border-none hover:bg-red-400 text-white rounded-lg p-2 text-sm h-auto ${amount === value.toString() ? 'bg-white text-red-600' : ''}`}
                onClick={() => setAmount(value.toString())}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">Recharge Channel</h2>
          <RadioGroup value={selectedChannel} onValueChange={setSelectedChannel} className="space-y-3">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="qepay" className="text-base font-medium">QePay</Label>
                <RadioGroupItem value="qepay" id="qepay" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dzxumpay" className="text-base font-medium">DzxumPay</Label>
                <RadioGroupItem value="dzxumpay" id="dzxumpay" />
              </div>
            </Card>
            <Card className="p-4">
               <div className="flex items-center justify-between">
                <Label htmlFor="ptmnewpay" className="text-base font-medium">PtmNewPay</Label>
                <RadioGroupItem value="ptmnewpay" id="ptmnewpay" />
              </div>
            </Card>
          </RadioGroup>
        </div>

        <div className="mt-6 bg-red-50 p-4 rounded-lg text-sm text-red-800">
            <h3 className="font-bold text-red-900 mb-2">Explain</h3>
            <p>1. Please do not modify the deposit amount.</p>
            <p>Unauthorized modification of the deposit amount will...</p>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-lg mt-8 text-lg">
            Recharge Now
        </Button>

      </main>
    </div>
  );
}
