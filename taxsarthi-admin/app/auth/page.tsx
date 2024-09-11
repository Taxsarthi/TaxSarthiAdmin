'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

type Props = {}

const page = (props: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) 
  const [redirecting, setRedirecting] = useState(false) 
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true) 
    setTimeout(async () => {
      if (email === 'user@example.com' && password === 'password') {
        toast.success('Login successful')
        setLoading(false) 
        setRedirecting(true) 
        setTimeout(() => {
          router.push('/dashboard')
        }, 500) 
      } else {
        setError('Invalid email or password')
        setLoading(false) 
      }
    }, 1000) 
  }

  return (
    <div className="flex items-center justify-center mt-6 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || redirecting} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || redirecting} 
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={loading || redirecting} 
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </span>
              </div>
            )}
            {(loading || redirecting) ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin" />
                <span className="ml-2">Redirecting...</span>
              </div>
            ) : (
              <Button type="submit" className="w-full">Sign in</Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default page
