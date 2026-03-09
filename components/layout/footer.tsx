import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <span className="font-bold text-lg">AQ</span>
              </div>
              <span className="font-bold text-xl">Aidquarters</span>
            </div>
            <p className="text-gray-400">
              Connecting families with trusted, vetted household professionals
              across Nigeria.
            </p>
          </div>

          {/* Quick Links + Support (mobile: side by side; desktop: normal columns) */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/services"
                  className="block text-gray-400 hover:text-white"
                >
                  Services
                </Link>
                <Link
                  href="/find-aid"
                  className="block text-gray-400 hover:text-white"
                >
                  Find Aid
                </Link>
                <Link
                  href="/recruit"
                  className="block text-gray-400 hover:text-white"
                >
                  Recruit
                </Link>
                <Link
                  href="/why-aidquarters"
                  className="block text-gray-400 hover:text-white"
                >
                  Why Aidquarters
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Support</h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-gray-400 hover:text-white"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
                <Link
                  href="/terms"
                  className="block text-gray-400 hover:text-white"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="block text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Aidquarters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
