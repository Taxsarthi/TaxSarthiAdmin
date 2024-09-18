"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/lib/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export function UpdateProfile() {
  const router = useRouter();
  const user = useUser();
  const [notice, setNotice] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate password change
    if (passwords.new || passwords.confirm || passwords.current) {
      if (passwords.new !== passwords.confirm) {
        setError("New passwords do not match");
        return;
      }
      if (passwords.new.length < 8) {
        setError("New password must be at least 8 characters long");
        return;
      }
      // Here you would typically verify the current password with the backend
    }

    // Here you would typically send the updated profile data to your backend
    console.log("Updated user:", user);
    console.log("Updated notice:", notice);
    if (passwords.new) {
      console.log("New password:", passwords.new);
    }

    setSuccess(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function to extract the base email
  const getBaseEmail = (email: string) => {
    const atIndex = email.indexOf("@");
    const plusIndex = email.indexOf("+");

    if (plusIndex !== -1 && atIndex > plusIndex) {
      return email.slice(0, plusIndex) + email.slice(atIndex); // Combine before '+' with the domain
    }

    return email; // Return original email if no '+' is present
  };

  const handleAddNotice = async () => {
    if (!notice.trim() || !expiryDate) {
      console.log("Notice and expiry date are required");
      return;
    }

    try {
      const noticeRef = doc(collection(db, "notices")); // Auto-generate document ID
      await setDoc(noticeRef, { notice, expiryDate }); // Add notice and expiry date
      toast.success("Notice added successfully");
      setNotice(""); // Clear the textarea after successful submission
      setExpiryDate(null); // Clear the expiry date
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="mb-6 bg-green-100 text-green-800 border-green-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your profile has been updated successfully.
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>View your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                value={
                  user && user.email
                    ? getBaseEmail(user.email)
                    : "nouser@gmail.com"
                }
                disabled
              />
            </CardContent>
            <CardFooter className="gap-4">
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Change Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input
                    id="current"
                    name="current"
                    type="password"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input
                    id="new"
                    name="new"
                    type="password"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input
                    id="confirm"
                    name="confirm"
                    type="password"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Change Password</Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Add Notice</CardTitle>
              <CardDescription>Add a notice for users</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                placeholder="Add a notice"
                className="min-h-[200px]"
              />
            </CardContent>
            <CardFooter className="gap-4">
              <Input
                type="date"
                value={expiryDate ? expiryDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setExpiryDate(new Date(e.target.value))}
              />
              <Button onClick={handleAddNotice}>Add Notice</Button>
            </CardFooter>
          </Card> 
        </div>
      </div>
    </div>
  );
}
