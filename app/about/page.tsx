import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6 text-center mt-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            About Aidquarters
          </h1>
          <p className="text-lg lg:text-xl text-green-100 max-w-3xl mx-auto">
            Connecting families with trusted, vetted domestic professionals
            across Nigeria
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-start-2 md:col-span-10">
              <div className="rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10 bg-white">
                <div className="space-y-6 text-gray-800 leading-7 text-justify">
                  <p>
                    Aidquarters is a digital recruitment platform that
                    streamlines the domestic staffing process in Nigeria by
                    connecting families with trusted, vetted professionals like
                    nannies, drivers, and housekeepers. By integrating advanced
                    technology with a rigorous vetting system—including identity
                    verification and background checks—the platform replaces the
                    uncertainty of traditional hiring with a structured,
                    transparent, and secure environment. This ensures that
                    households can find reliable help through a simplified
                    onboarding process that prioritizes accountability and
                    safety for all parties involved.
                  </p>
                  <p>
                    More than just a staffing tool, Aidquarters is designed to
                    elevate the entire household employment ecosystem through
                    digital profiles and transparent communication. It empowers
                    skilled domestic workers by providing them with access to
                    legitimate employment opportunities while raising
                    professional standards across the industry. Ultimately,
                    Aidquarters serves as a comprehensive solution that fosters
                    trust and reliability, creating a better experience for
                    employers and sustainable career paths for household
                    professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-start-2 md:col-span-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Vision
                  </h3>
                  <p className="text-gray-700 leading-7 text-justify">
                    To become Nigeria’s most trusted household recruitment
                    platform, empowering families to find reliable domestic
                    professionals while creating meaningful employment
                    opportunities for skilled workers.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Mission
                  </h3>
                  <p className="text-gray-700 leading-7 text-justify">
                    To provide a secure, transparent, and technology-driven
                    platform that connects households with vetted domestic
                    staff, ensuring trust, professionalism, and improved working
                    relationships for both employers and workers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Explore Aidquarters
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Find verified professionals or learn more about the services we
            offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/find-aid">Find Workers</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
