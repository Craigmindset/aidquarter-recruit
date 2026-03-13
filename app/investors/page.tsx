import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ShieldOff,
  Clock,
  Users,
  FileX,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Globe2,
  Cpu,
  ShieldCheck,
  SearchCheck,
  LayoutDashboard,
  Handshake,
} from "lucide-react";

export default function InvestorsPage() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Trust gap in hiring",
      desc: "Families struggle to verify domestic workers’ identities and backgrounds.",
    },
    {
      icon: ShieldOff,
      title: "Safety and accountability",
      desc: "No standardized vetting, leading to exposure and risk for both parties.",
    },
    {
      icon: Clock,
      title: "Time-consuming process",
      desc: "Discovery, screening, and onboarding are fragmented and slow.",
    },
    {
      icon: Users,
      title: "Fragmented supply",
      desc: "Skilled workers are offline and lack access to real opportunities.",
    },
    {
      icon: FileX,
      title: "Poor documentation",
      desc: "Experience, ratings, and records are rarely captured or portable.",
    },
  ];

  const solutions = [
    "Verified profiles with identity and background checks",
    "Digital reputation and structured experience records",
    "Guided hiring flow and standardized onboarding",
    "Secure, transparent employer–worker communication",
    "Nationwide matching to reliable, available professionals",
  ];

  const markets = [
    {
      icon: TrendingUp,
      title: "Large domestic services TAM",
      desc: "Growing urban households create strong long-term demand.",
    },
    {
      icon: BarChart3,
      title: "Recurring engagement",
      desc: "Ongoing staffing needs, renewals, and referrals drive retention.",
    },
    {
      icon: Globe2,
      title: "Digital shift",
      desc: "Rapid adoption of mobile, fintech, and KYC rails across Nigeria.",
    },
  ];

  const technologies = [
    { icon: Cpu, label: "AI-assisted matching" },
    { icon: ShieldCheck, label: "Identity verification" },
    { icon: SearchCheck, label: "Background checks" },
    { icon: LayoutDashboard, label: "Platform management" },
    { icon: Handshake, label: "Easy hire & separation" },
  ];

  const partners = [
    "/download.png",
    "/placeholder.svg",
    "/placeholder.svg",
    "/download.png",
    "/placeholder.svg",
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="py-0">
        <div className="relative">
          <div className="relative h-[400px] lg:h-[520px]">
            <Image
              src="/investor-img.png"
              alt="Aidquarters investors"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="absolute inset-0">
            <div className="container mx-auto px-4 lg:px-6 h-full flex items-center justify-center">
              <div className="max-w-xl text-center text-white py-20 md:py-10">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                  unlocking a multi-trillion Naira hidden economy
                </h1>
                <p className="text-base md:text-lg text-gray-100 mb-6">
                  Nigeria’s household services sector is a ₦4 trillion invisible
                  economy. We are building the operating system that finally
                  brings this fragmented market online, capturing the flow of
                  capital from recruitment to recurring payroll.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6">
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  >
                    <a href="/pitchdeck.pdf" download>
                      Download Pitchdeck
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/90 text-gray-900 hover:bg-white w-full sm:w-auto"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 min-w-0">
              <h2 className="text-3xl font-bold text-gray-900">The Problem</h2>
              <div className="space-y-5 pr-1">
                {problems.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 w-full max-w-full"
                  >
                    <p.icon className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0 max-w-full">
                      <div className="font-semibold text-gray-900 text-base md:text-lg whitespace-normal break-words leading-6">
                        {p.title}
                      </div>
                      <div className="text-gray-700 text-sm md:text-base whitespace-normal break-all sm:break-words [overflow-wrap:anywhere] leading-6">
                        {p.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative lg:max-w-[520px] lg:ml-auto">
              <Image
                src="/problem-img2.png"
                alt="The problem illustration"
                width={640}
                height={480}
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1 lg:max-w-[520px]">
              <Image
                src="/solution-img.png"
                alt="Solution illustration"
                width={640}
                height={480}
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900">The Solution</h2>
              <div className="space-y-4">
                {solutions.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Market Opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {markets.map((m, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 shadow-sm border ${
                  i % 3 === 0
                    ? "bg-red-50 border-red-100"
                    : i % 3 === 1
                      ? "bg-green-50 border-green-100"
                      : "bg-purple-50 border-purple-100"
                }`}
              >
                <m.icon
                  className={`h-8 w-8 mb-3 ${
                    i % 3 === 0
                      ? "text-red-600"
                      : i % 3 === 1
                        ? "text-green-600"
                        : "text-purple-600"
                  }`}
                />
                <div className="font-semibold text-gray-900 mb-1">
                  {m.title}
                </div>
                <div className="text-gray-700">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Technology</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {technologies.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 p-4"
                  >
                    <t.icon className="h-6 w-6 text-green-600" />
                    <span className="text-gray-800">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative lg:max-w-[520px] lg:ml-auto">
              <Image
                src="/technology-img.png"
                alt="Technology preview"
                width={640}
                height={480}
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Supporting Partners
          </h2>
          <div className="overflow-x-auto whitespace-nowrap py-2">
            <div className="inline-flex gap-8">
              {partners.map((src, i) => (
                <div
                  key={i}
                  className="inline-block px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`Partner ${i + 1}`}
                    width={140}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Invest in us today
          </h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Join us in building the most trusted domestic staffing platform in
            Nigeria.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-white text-green-700 hover:bg-gray-100"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
