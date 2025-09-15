"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gem, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobile || !password) {
      toast({
        title: "Error",
        description: "Please enter mobile number and password.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    const auth = getAuth(app);
    // Firebase Auth uses email, so we use the same dummy email format as in registration.
    const email = `${mobile}@cashmonk.app`;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Store mobile number and a simulated user ID in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userMobile', mobile);
        // For simulation, if user ID doesn't exist, create one.
        // In a real app, you might fetch a persistent user ID from your database.
        let userId = localStorage.getItem(`userId_${mobile}`); // Store userId per mobile
        if (!userId) {
          userId = Math.floor(10000 + Math.random() * 90000).toString();
          localStorage.setItem(`userId_${mobile}`, userId);
        }
        localStorage.setItem('userId', userId);
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      // Redirect to the main app page
      router.push("/home");

    } catch (error: any) {
      let errorMessage = "An unexpected error occurred.";
      // Handle specific Firebase authentication errors
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            errorMessage = "Invalid mobile number or password.";
            break;
          case 'auth/invalid-email':
            errorMessage = "The mobile number format is invalid.";
            break;
          default:
            console.error("Login failed with unhandled error:", error);
            errorMessage = "Login failed. Please try again later.";
        }
      } else {
        console.error("Login failed:", error);
      }
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                        disabled={isLoading}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    >
                        {passwordVisible ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>

            <Button onClick={handleLogin} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-lg text-lg" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
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
