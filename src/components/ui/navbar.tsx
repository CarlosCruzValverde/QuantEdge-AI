"use client";

import Link from "next/link";
import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold">
                        <span className="text-primary">QuantEdge</span>
                        <span className="hidden sm:inline-block">AI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Auth Buttons */}
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <ul className="space-y-2 pt-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="block px-4 py-2 hover:bg-accent rounded-md"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-2 pt-4">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                    Login
                                </Link>
                            </Button>
                            <Button className="w-full" asChild>
                                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    Sign Up
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}