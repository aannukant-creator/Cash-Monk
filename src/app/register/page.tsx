"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gem, Lock, Phone, UserPlus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { app, db } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!mobile || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const auth = getAuth(app);
    const email = `${mobile}@cashmonk.app`;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: mobile });
      
      const userId = Math.floor(10000 + Math.random() * 90000).toString();
      
      // Create a document for the new user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        mobile: mobile,
        userId: userId,
        createdAt: new Date().toISOString(),
        inviteCode: inviteCode,
      });

      // Store mobile number and a simulated user ID in localStorage for client-side access
      if (typeof window !== 'undefined') {
        localStorage.setItem('userMobile', mobile);
        localStorage.setItem('userId', userId);
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });
      router.push("/home");

    } catch (error: any) {
      console.error("Registration failed:", error);
      let errorMessage = "An unknown error occurred during registration.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This mobile number is already registered.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The mobile number format is invalid.";
      }
      toast({
        title: "Registration Failed",
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
            <h1 className="mt-4 text-4xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500">Join our community today!</p>
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
                <Label htmlFor="password">Password (min. 6 characters)</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Create a password"
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
            <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        id="confirm-password"
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10"
                        disabled={isLoading}
                    />
                     <button
                        type="button"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    >
                        {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="invite-code">Invite Code (Optional)</Label>
                <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        id="invite-code"
                        type="text"
                        placeholder="Enter invite code"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                    />
                </div>
            </div>

            <Button onClick={handleRegister} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-6 rounded-lg text-lg" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </Button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-red-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
