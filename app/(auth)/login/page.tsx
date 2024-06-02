/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4lfuxncpUy7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signIn } from "@/app/auth";

export default function Component() {
  return (
    <div className="bg-gray-1000 min-h-screen flex flex-col gap-4 items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <form
            action={async (formData: FormData) => {
              'use server';
              await signIn('credentials', {
                redirectTo: '/',
                email: formData.get('email') as string,
                password: formData.get('password') as string,
              })
            }}
          >
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="example@example.com" required type="email" />
              </div>
              <div className="relative space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link className="ml-auto inline-block text-sm underline" href="#">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" required type="password" />
                <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost">
                  <EyeIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </CardContent>
          </form>
        </Card>
        <div className="mt-4 flex items-center space-x-2 text-sm">
          <div>Don't have an account?</div>
          <Link className="font-medium underline" href="/register">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

