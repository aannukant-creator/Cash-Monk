
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gem, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!mobile || !password) {
      toast({
        title: "Error",
        description: "Please enter mobile number and password.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, you'd verify credentials against a backend.
    // Here we'll just simulate a successful login.
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    // Redirect to the main app page
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <Gem className="w-20 h-20 mx-auto text-red-600" />
            <h1 className="mt-4 text-4xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-500">Login to your account</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        id="mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Button onClick={handleLogin} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-lg text-lg">
                Login
            </Button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-red-600 hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
