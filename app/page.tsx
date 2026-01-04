import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Counter from "@/components/counter";
import {
  CheckCircle,
  Users,
  Shield,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 lg:py-15">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl  font-extrabold md:font-bold text-gray-900 leading-tight tracking-tight">
                  Find Vetted Household Staff in
                  <span className="text-red-600"> Minutes</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed md:leading-relaxed text-balance">
                  Connect with our vetted professionals, housekeepers, nannies,
                  and drivers. Simple, secure, and focused on quality.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <Link href="/find-aid">Find Aid Workers</Link>
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
                src="/placeholder.svg?height=500&width=600"
                alt="Professional household staff"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    {/* TODO: Connect to database to get actual count of verified workers */}
                    <p className="font-semibold text-gray-900">
                      <Counter start={100} end={347} duration={10000} />+
                    </p>
                    <p className="text-sm text-gray-600">Verified Workers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Professional Household Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect you with experienced, vetted professionals for all your
              household needs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Housekeeper"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Housekeepers
                </h3>
                <p className="text-gray-600 mb-6">
                  Professional cleaning and household management services from
                  experienced staff
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/find-aid?service=housekeeper">
                    Find Housekeepers
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Nanny"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Nannies
                </h3>
                <p className="text-gray-600 mb-6">
                  Caring, qualified childcare professionals to support your
                  family's needs
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/find-aid?service=nanny">Find Nannies</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
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
                <Button asChild variant="outline" className="w-full">
                  <Link href="/find-aid?service=driver">Find Drivers</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
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
                <Button asChild variant="outline" className="w-full">
                  <Link href="/find-aid?service=caregiver">
                    Find Care Giver
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Your Safety is Our Priority
              </h2>
              <p className="text-lg text-gray-600 mb-8">
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
                      Verified references from previous employers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      24/7 Support
                    </h3>
                    <p className="text-gray-600">
                      Round-the-clock customer support for any concerns
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Safety and trust"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
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
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
            >
              <Link href="/why-aidquarters">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
