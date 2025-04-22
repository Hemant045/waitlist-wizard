
import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-muted-foreground">
              We are dedicated to providing high-quality education to help you succeed in your tech career journey.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/notes">Study Notes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: contact@example.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Location: Mumbai, India</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Youtube className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Your Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
