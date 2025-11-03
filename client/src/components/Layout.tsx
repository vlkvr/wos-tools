import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Calculator, Home, Heart, Shirt, UserCheck, Menu, Moon, Sun, Megaphone, Trophy, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Healing", href: "/healing", icon: Heart },
    { name: "Armament Competition", href: "/armament-competition", icon: Shirt },
    { name: "Officer Project", href: "/officer-project", icon: UserCheck },
    { name: "Alliance Showdown", href: "/alliance-showdown", icon: Megaphone },
    { name: "King of Icefield", href: "/king-of-icefield", icon: Trophy },
    { name: "State of Power", href: "/state-of-power", icon: Swords },
  ];

  return (
    <div className="min-h-screen bg-wos-gray-50 dark:bg-background text-foreground">
      {/* Header */}
      <header className="bg-white dark:bg-card shadow-sm border-b border-wos-gray-200 dark:border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="text-wos-blue text-xl" />
              <h1 className="text-xl font-bold text-wos-gray-900 dark:text-foreground">
                WOS Calc
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    data-testid={`nav-${item.name.toLowerCase()}`}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center
                      ${
                        isActive
                          ? "bg-wos-blue text-white"
                          : "text-wos-gray-600 dark:text-foreground hover:text-wos-blue dark:hover:text-wos-blue"
                      }
                    `}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                data-testid="theme-toggle"
                className="p-2 rounded-lg text-wos-gray-600 dark:text-foreground hover:bg-wos-gray-100 dark:hover:bg-accent"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-toggle"
                className="md:hidden p-2 rounded-lg text-wos-gray-600 dark:text-foreground hover:bg-wos-gray-100 dark:hover:bg-accent"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-wos-gray-200 dark:border-border py-4">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      className={`
                        flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-wos-blue text-white"
                            : "text-wos-gray-600 dark:text-foreground hover:text-wos-blue hover:bg-wos-gray-100 dark:hover:bg-accent"
                        }
                      `}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
