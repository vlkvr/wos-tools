import { Link } from "wouter";
import { Heart, Shirt, UserCheck, Megaphone, Zap, Smartphone, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-wos-gray-900 dark:text-foreground mb-4">
          Whiteout Survival Calculators
        </h2>
        <p className="text-lg text-wos-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
          Essential calculation tools for Whiteout Survival players. Plan your strategy, optimize resources, and dominate the frozen wasteland.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
        {/* Healing Calculator Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Heart className="text-green-600 dark:text-green-400 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-wos-gray-900 dark:text-foreground ml-3">
                Healing Calculator
              </h3>
            </div>
            <p className="text-wos-gray-600 dark:text-muted-foreground mb-4">
              Calculate optimal healing batches for wounded troops. Supports alliance timer help and determines the most efficient healing strategy.
            </p>
            <Link href="/healing">
              <Button
                className="w-full bg-wos-blue hover:bg-wos-blue-dark text-white"
                data-testid="button-healing-calculator"
              >
                Open Calculator
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Armament Competition Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Shirt className="text-purple-600 dark:text-purple-400 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-wos-gray-900 dark:text-foreground ml-3">
                Armament Competition
              </h3>
            </div>
            <p className="text-wos-gray-600 dark:text-muted-foreground mb-4">
              Plan your armament competition strategy across multiple stages. Track points, resources needed, and optimize your approach.
            </p>
            <Link href="/armament">
              <Button
                className="w-full bg-wos-blue hover:bg-wos-blue-dark text-white"
                data-testid="button-armament-calculator"
              >
                Open Calculator
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Officer Project Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <UserCheck className="text-orange-600 dark:text-orange-400 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-wos-gray-900 dark:text-foreground ml-3">
                Officer Project
              </h3>
            </div>
            <p className="text-wos-gray-600 dark:text-muted-foreground mb-4">
              Calculate points for Officer Project event. Plan charm upgrades and troop training strategies across multiple stages.
            </p>
            <Link href="/officer-project">
              <Button
                className="w-full bg-wos-blue hover:bg-wos-blue-dark text-white"
                data-testid="button-officer-project-calculator"
              >
                Open Calculator
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Alliance Showdown Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <Megaphone className="text-red-600 dark:text-red-400 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-wos-gray-900 dark:text-foreground ml-3">
                Alliance Showdown
              </h3>
            </div>
            <p className="text-wos-gray-600 dark:text-muted-foreground mb-4">
              Strategic planning for all 6 stages of Alliance Showdown event. Optimize your resource allocation and scoring across multiple stages.
            </p>
            <Link href="/alliance-showdown">
              <Button
                className="w-full bg-wos-blue hover:bg-wos-blue-dark text-white"
                data-testid="button-alliance-showdown-calculator"
              >
                Open Calculator
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card>
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold text-wos-gray-900 dark:text-foreground mb-6 text-center">
            Features
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Zap className="text-blue-600 dark:text-blue-400 h-6 w-6" />
              </div>
              <h4 className="font-medium text-wos-gray-900 dark:text-foreground mb-2">
                Lightning Fast
              </h4>
              <p className="text-sm text-wos-gray-600 dark:text-muted-foreground">
                All calculations happen instantly on your device
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Smartphone className="text-purple-600 dark:text-purple-400 h-6 w-6" />
              </div>
              <h4 className="font-medium text-wos-gray-900 dark:text-foreground mb-2">
                Mobile Friendly
              </h4>
              <p className="text-sm text-wos-gray-600 dark:text-muted-foreground">
                Works perfectly on all devices and screen sizes
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Lock className="text-green-600 dark:text-green-400 h-6 w-6" />
              </div>
              <h4 className="font-medium text-wos-gray-900 dark:text-foreground mb-2">
                Privacy First
              </h4>
              <p className="text-sm text-wos-gray-600 dark:text-muted-foreground">
                No data collection, everything stays on your device
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
