import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Clock, Star, CheckCircle, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WhyAidquartersPage() {
  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Vetting",
      description:
        "ID, NIN and live face checks plus reference verification before profiles go live.",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description:
        "Hundreds of families hire verified nannies, housekeepers, caregivers and drivers across Nigeria.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Get help any time from onboarding to interview scheduling and beyond.",
    },
    {
      icon: Star,
      title: "Quality Guarantee",
      description:
        "If a hire doesn’t work out, we’ll help you find a replacement fast.",
    },
    {
      icon: Award,
      title: "Professional Training",
      description:
        "Ongoing upskilling resources and best‑practice guides for workers.",
    },
    {
      icon: CheckCircle,
      title: "Easy Process",
      description:
        "Create a profile, get verified, appear in search,so families can book you in a few clicks.",
    },
  ];

  const stats = [
    { number: "2,500+", label: "Verified Workers" },
    { number: "500+", label: "Happy Families" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
                <span>Why Choose</span>
                <span className=" text-green-600"> Aidquarters</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Opening doors for household professionals to find trusted jobs
                with verified families across Nigeria. Every profile includes
                clear verification badges (NIN, ID and Face Match) so employers
                can hire with confidence.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                <Link href="/find-aid">Start Your Search</Link>
              </Button>
            </div>
            <div className="relative lg:flex lg:justify-end">
              <Image
                src="/smile_whyaidquarters.jpg"
                alt="Happy family with household staff"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (commented out)
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              The Aidquarters Advantage
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Built for Nigerian families and workers: clear vetting, fair pay
              expectations, and simple tools that make hiring and getting hired
              straightforward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-transform duration-300 cursor-pointer hover:scale-[0.97]"
              >
                <CardContent className="p-8">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <benefit.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Create an account, complete verification, and connect with
              families. It’s built for speed and clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Started
              </h3>
              <p className="text-gray-600">
                Create a free account, submit your vet details and get listed in
                Find‑Aid.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Verified
              </h3>
              <p className="text-gray-600">
                Earn visible badges. so families can hire with confidence.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Scheduled
              </h3>
              <p className="text-gray-600">
                Receive interview invites from verified families and confirm
                times that work for you, right from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-xl lg:text-2xl font-medium text-white mb-8">
              "I set up my profile, completed NIN and face verification, and got
              interview requests within a week. The badges gave families
              confidence to hire."
            </blockquote>
            <div className="text-green-100">
              <p className="font-semibold text-lg">Mrs. Adebayo</p>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-base lg:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Opening doors for household professionals to find trusted job
            opportunities with families across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link href="/find-aid">Find Workers</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
