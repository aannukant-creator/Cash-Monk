
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AddCardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");

  const handleSave = () => {
    // Basic validation
    if (!accountHolderName || !accountNumber || !ifscCode || !transactionPassword) {
       toast({
        title: "Error",
        description: "Please fill all the fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would save this data to a backend.
    // For now, we just show a success message and navigate back.
    toast({
      title: "Success",
      description: "Bank card added successfully.",
    });

    router.push("/withdraw");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-red-600 text-white p-4 flex items-center relative">
        <button onClick={() => router.back()} className="absolute left-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-center flex-1">Add Bank Card</h1>
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Enter your bank account details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="holder-name">Account Holder Name</Label>
              <Input
                id="holder-name"
                placeholder="Enter account holder name"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifsc-code">IFSC Code</Label>
              <Input
                id="ifsc-code"
                placeholder="Enter IFSC code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="txn-password">Transaction Password</Label>
              <Input
                id="txn-password"
                type="password"
                placeholder="Enter transaction password"
                value={transactionPassword}
                onChange={(e) => setTransactionPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleSave} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-lg mt-4 text-lg">
              Save
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
