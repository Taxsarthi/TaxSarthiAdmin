'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export function UpdateProfile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  })
  const [notice, setNotice] = useState('')
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validate password change
    if (passwords.new || passwords.confirm || passwords.current) {
      if (passwords.new !== passwords.confirm) {
        setError('New passwords do not match')
        return
      }
      if (passwords.new.length < 8) {
        setError('New password must be at least 8 characters long')
        return
      }
      // Here you would typically verify the current password with the backend
    }

    // Here you would typically send the updated profile data to your backend
    console.log('Updated user:', user)
    console.log('Updated notice:', notice)
    if (passwords.new) {
      console.log('New password:', passwords.new)
    }

    setSuccess(true)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Personal Information</CardTitle>
              <CardDescription>View and edit your profile information</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Update Profile</Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Change Password</CardTitle>
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
              <CardTitle className='text-xl'>Add Notice</CardTitle>
              <CardDescription>Add a notice or update your bio</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                placeholder="Add a notice or bio"
                className="min-h-[200px]"
              />
            </CardContent>
            <CardFooter>
              <Button onClick={() => console.log('Notice updated:', notice)}>Update Notice</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="mt-6 bg-green-100 text-green-800 border-green-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your profile has been updated successfully.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}