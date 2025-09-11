
"use client";

import { useState } from "react";
import { ChevronLeft, CreditCard, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function WithdrawPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center justify-between relative">
        <button onClick={() => router.back()} className="absolute left-4">
            <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-center flex-1">withdraw</h1>
        <Link href="/account/withdraw-record" className="absolute right-4 text-sm">
          Record &gt;
        </Link>
      </header>

      <main className="p-4">
        <Link href="/add-card">
          <div className="bg-red-500 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden cursor-pointer">
              <div className="flex items-start justify-between">
                  <div>
                      <CreditCard className="w-8 h-8 mb-4 opacity-80" />
                      <p className="text-2xl font-mono tracking-widest">0000 0000 0000</p>
                  </div>
                  <Switch id="card-switch" className="data-[state=checked]:bg-green-500 mt-1" />
              </div>
              <div className="mt-4">
                  <p className="text-sm opacity-80">Cardholder Name</p>
                  <p className="font-semibold">Cardholder Name</p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
          </div>
        </Link>

        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <label htmlFor="amount" className="font-bold text-lg">Amount</label>
                <span className="text-gray-500 text-sm">0.00</span>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="Withdrawal amount 120-100000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-gray-200 rounded-md bg-gray-50"
            />
        </div>

        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
            <label htmlFor="password"  className="font-bold text-lg mb-2 block">Transaction password</label>
            <div className="relative">
                <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Transaction password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-gray-200 rounded-md bg-gray-50"
                />
                <button
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                    <EyeOff size={20} />
                </button>
            </div>
        </div>

        <div className="mt-6 bg-red-50 p-4 rounded-lg text-sm text-red-800">
            <h3 className="font-bold text-red-900 mb-2">Explain</h3>
            <ol className="list-decimal list-inside space-y-1">
                <li>Daily withdrawal time 07:00:00 - 17:00:00</li>
                <li>Withdrawal of amounts between 120 and 100000</li>
                <li>For financial settlement purposes, you can only request 1 withdrawal per day</li>
            </ol>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-lg mt-8 text-lg">
            Apply Withdrawal
        </Button>
      </main>
    </div>
  );
}
