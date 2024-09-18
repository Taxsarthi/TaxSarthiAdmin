"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Props = {};

const SignIn = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(""); 
    setLoading(true); 

    try {
      const docRefs = ["admin", "sales", "ops"].map((collection) =>
        doc(db, collection, email)
      );
      
      const docs = await Promise.all(docRefs.map((docRef) => getDoc(docRef)));
      
      const userDoc = docs.find((doc) => doc.exists());

      if (!userDoc) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const { emailPAN } = userDoc.data() as { emailPAN: string };
      if (!emailPAN) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      
      const res = await signInWithEmailAndPassword(auth, emailPAN, password);
      console.log(res); 
      router.push("/dashboard"); 
      toast.success("Signed in successfully"); 
    } catch (error) {
      console.error(error); 
      setError("Invalid email or password"); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center mt-6 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password input field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Display error message if there is one */}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </span>
              </div>
            )}
            {/* Submit button with conditional loading spinner */}
            <Button type="submit" className="w-full mt-4">
              {loading ? <Loader className="animate-spin" /> : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
