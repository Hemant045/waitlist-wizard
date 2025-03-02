import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, Users, FileText } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/">
          <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Courseova
            </span>
          </a>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <BookOpen className="h-4 w-4 mr-2" />
                Courses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <h4 className="mb-2 text-sm font-medium leading-none">Our Courses</h4>
                  <div className="grid gap-3">
                    <Link href="/courses/web-development">
                      <NavigationMenuLink className="block p-3 hover:bg-accent rounded-md transition-colors">
                        <div className="text-sm font-medium mb-1">Web Development</div>
                        <p className="text-sm text-muted-foreground">
                          Master full-stack development from scratch
                        </p>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/courses/data-structures">
                      <NavigationMenuLink className="block p-3 hover:bg-accent rounded-md transition-colors">
                        <div className="text-sm font-medium mb-1">Data Structures</div>
                        <p className="text-sm text-muted-foreground">
                          Excel in coding interviews with advanced DSA
                        </p>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/courses/mobile-dev">
                      <NavigationMenuLink className="block p-3 hover:bg-accent rounded-md transition-colors">
                        <div className="text-sm font-medium mb-1">Mobile Development</div>
                        <p className="text-sm text-muted-foreground">
                          Build cross-platform apps with Flutter
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about">
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    location === "/about" && "bg-accent text-accent-foreground"
                  )}
                >
                  <Users className="h-4 w-4 mr-2" />
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/notes">
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    location === "/notes" && "bg-accent text-accent-foreground"
                  )}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Study Notes
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button variant="outline" className="ml-4" asChild>
          <Link href="/courses">Explore Courses</Link>
        </Button>
      </div>
    </header>
  );
}