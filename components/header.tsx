"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginDialog } from "@/components/login-dialog"
import { RegisterDialog } from "@/components/register-dialog"
import { Search, Menu } from "lucide-react"

export function Header() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <button className="lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">F</span>
                </div>
                <span className="text-xl font-bold">Forum</span>
              </div>
            </div>

            <div className="hidden flex-1 max-w-md md:flex">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search discussions..." className="w-full pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <span className="hidden text-sm text-muted-foreground sm:inline">
                    Welcome, <span className="font-medium text-foreground">{username}</span>
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsLoggedIn(false)
                      setUsername("")
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setShowLogin(true)}>
                    Login
                  </Button>
                  <Button onClick={() => setShowRegister(true)}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSuccess={(username) => {
          setIsLoggedIn(true)
          setUsername(username)
        }}
      />
      <RegisterDialog
        open={showRegister}
        onOpenChange={setShowRegister}
        onSuccess={(username) => {
          setIsLoggedIn(true)
          setUsername(username)
        }}
      />
    </>
  )
}
