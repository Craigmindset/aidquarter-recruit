import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Housekeepers",
      role: "housekeeper",
      description: "Professional cleaning and household management services",
      image: "/nanny-img.jpg?height=300&width=400",
      features: [
        "Deep cleaning and maintenance",
        "Laundry and ironing services",
        "Kitchen and bathroom sanitization",
        "Organization and tidying",
        "Weekly or daily schedules",
      ],
      priceRange: "₦30,000 - ₦60,000/month",
    },
    {
      title: "Nannies",
      role: "nanny",
      description: "Qualified childcare professionals for your family",
      image: "/House_help.jpg?height=300&width=400",
      features: [
        "Child supervision and care",
        "Educational activities",
        "Meal preparation for children",
        "Transportation to activities",
        "Overnight care available",
      ],
      priceRange: "₦50,000 - ₦100,000/month",
    },
    {
      title: "Drivers",
      role: "driver",
      description:
        "Reliable transportation services for personal and family needs",
      image: "/driver-img.jpg?height=300&width=400",
      features: [
        "Personal transportation",
        "School runs and pickups",
        "Shopping and errands",
        "Airport transfers",
        "Vehicle maintenance knowledge",
      ],
      priceRange: "₦40,000 - ₦70,000/month",
    },
    {
      title: "Care Giver",
      role: "caregiver",
      description:
        "Compassionate and professional elderly and patient care services",
      image: "/care-giver.jpg?height=300&width=400",
      features: [
        "Elderly care and companionship",
        "Patient care assistance",
        "Medication management support",
        "Personal hygiene assistance",
        "24/7 care options available",
      ],
      priceRange: "₦60,000 - ₦120,000/month",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6 text-center mt-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Comprehensive household staffing solutions tailored to meet your
            family's unique needs
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={360}
                    height={240}
                    className="rounded-2xl shadow-lg mx-auto"
                  />
                </div>

                <div
                  className={`space-y-6 ${
                    index % 2 === 1 ? "lg:col-start-1 lg:pl-10 xl:pl-16" : ""
                  }`}
                >
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-gray-900">
                      What's Included:
                    </h3>
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <Link href={`/signup/info?role=${service.role}`}>
                        Register
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our verified professionals or post your requirements to get
            matched with the perfect household staff
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link href="/find-aid">Browse Workers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
