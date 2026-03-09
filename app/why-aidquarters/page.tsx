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
        "Every worker undergoes thorough background checks, reference verification, and skill assessments before joining our platform.",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description:
        "Join over 500 satisfied families who have found reliable household staff through our platform.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available round-the-clock to assist with any questions or concerns.",
    },
    {
      icon: Star,
      title: "Quality Guarantee",
      description:
        "We stand behind our workers with performance guarantees and replacement services if needed.",
    },
    {
      icon: Award,
      title: "Professional Training",
      description:
        "Our workers receive ongoing training to maintain the highest standards of service quality.",
    },
    {
      icon: CheckCircle,
      title: "Easy Process",
      description:
        "Simple, streamlined hiring process that gets you connected with the right staff quickly.",
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
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <span>Why Choose</span>
                <span className=" text-green-600"> Aidquarters</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join a platform designed to help household professionals find
                trusted employment opportunities. At Aidquarters, every
                opportunity is backed by a proper vetting process and a system
                that keeps your welfare in view.
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              The Aidquarters Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference that comes with choosing a platform
              built specifically for Nigerian families and their unique
              household staffing needs.
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple, three-step process gets you connected with the perfect
              household staff
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
                Create an account for free, get vetted and listed on our findaid
                services.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Vetted & Trust
              </h3>
              <p className="text-gray-600">
                Let employers trust you with visible verification badges—ID
                match, face match, and references—so your profile stands out.
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
                times that work for you—right from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-medium text-white mb-8">
              "Aidquarters helped us find the perfect nanny for our children.
              The vetting process gave us complete confidence, and the ongoing
              support has been exceptional."
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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied families who trust Aidquarters for their
            household staffing needs
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
