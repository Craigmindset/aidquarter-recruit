"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Counter from "@/components/counter";
import {
  CheckCircle,
  Users,
  Shield,
  Clock,
  Star,
  ArrowRight,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-19 pt-10 py-5 lg:py-19 ">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl  font-extrabold md:font-bold text-gray-900 leading-tight tracking-tight">
                  Join Our Team <br />
                  of Vetted Professionals <br />
                  <span className="text-red-600"> In Minutes</span>
                </h1>
                <p className="text-m md:text-lg text-gray-600 leading-relaxed md:leading-normal text-justify md:text-start ">
                  Connect with families across Nigeria. Join a community that
                  values your work, supports your journey, and connects you to
                  families who truly appreciate what you do.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <Link href="/find-aid">Get Started</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 md:gap-8 pt-4 flex-nowrap overflow-x-auto">
                <div className="flex items-center gap-1 md:gap-2">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    Background Verified
                  </span>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    Reference Checked
                  </span>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    Age 18+
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="recruit-hero.png"
                alt="Professional household staff"
                width={400}
                height={400}
                className="rounded-2xl md:ml-10 w-full max-w-sm md:max-w-none md:mt-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Professional Household Services
            </h2>
            <p className=" text-gray-600 max-w-3xl mx-auto">
              We connect you with experienced, vetted professionals for all your
              household needs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/sweeping.svg"
                    alt="Housekeeper"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Housekeepers
                </h3>
                <p className="text-gray-600 mb-6">
                  Cleaning and household management services from experienced
                  staff
                </p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 active:opacity-75 active:scale-95 transition-all duration-150 text-white"
                >
                  <Link href="/signup/info?role=housekeeper">Register</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image src="/baby.svg" alt="Nanny" width={32} height={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Nannies
                </h3>
                <p className="text-gray-600 mb-6">
                  Caring, qualified childcare professionals to support your
                  family's needs
                </p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 active:opacity-75 active:scale-95 transition-all duration-150 text-white"
                >
                  <Link href="/signup/info?role=nanny">Register</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/steering.svg"
                    alt="Driver"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Drivers
                </h3>
                <p className="text-gray-600 mb-6">
                  Reliable, licensed drivers for personal and family
                  transportation needs
                </p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 active:opacity-75 active:scale-95 transition-all duration-150 text-white"
                >
                  <Link href="/signup/info?role=driver">Register</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/nurse.svg"
                    alt="Care Giver"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Care Giver
                </h3>
                <p className="text-gray-600 mb-6">
                  Compassionate, professional care for elderly and patients with
                  dedicated support
                </p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 active:opacity-75 active:scale-95 transition-all duration-150 text-white"
                >
                  <Link href="/signup/info?role=caregiver">Register</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Your Safety is Our Priority
              </h2>
              <p className=" text-gray-600 mb-8">
                Every worker on our platform goes through a comprehensive
                vetting process to ensure you get the highest quality service
                with complete peace of mind.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Background Verification
                    </h3>
                    <p className="text-gray-600">
                      Comprehensive background checks and identity verification
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Reference Checks
                    </h3>
                    <p className="text-gray-600">
                      Verified references from guarantors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Dedicated Management Dashboard
                    </h3>
                    <p className="text-gray-600">
                      Manage all staff in one place with our user-friendly
                      dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/aid-verify.png"
                alt="Safety and trust"
                width={450}
                height={400}
                className="rounded-2xl shadow-xl mx-auto  w-full max-w-sm md:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Trusted Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with leading organizations to provide you with the best
              household staffing solutions
            </p>
          </div>

          <div className="flex flex-nowrap justify-center items-center gap-4 md:gap-12 overflow-x-auto md:overflow-x-visible">
            <div className="flex items-center justify-center p-2 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex-shrink-0">
              <Image
                src="/sp-header-logo.webp"
                alt="SP Header Logo"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
            {/*<div className="flex items-center justify-center p-2 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex-shrink-0">
              <Image
                src="/Reliance-HMO-LOGO.jpg"
                alt="Reliance HMO Logo"
                width={100}
                height={50}
                className="object-contain"
              />
            </div> */}
            <div className="flex items-center justify-center p-2 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex-shrink-0">
              <Image
                src="/download.png"
                alt="Download Logo"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Household Staff?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied families who trust Aidquarters for their
            household staffing needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3"
            >
              <Link href="/find-aid">
                Browse Workers <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-green-600 hover:bg-white hover:text-red-600 px-8 py-3"
            >
              <Link href="/why-aidquarters">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button - Mobile Only */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="md:hidden fixed left-4 bottom-4 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
