import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-2 text-gray-600">Effective Date: March 2026</p>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>
                  These Terms of Service govern the use of the platform (“the
                  Service”) provided by AidQuarters Recruit (“the Company”). By
                  accessing or using the Service, users agree to be bound by
                  these Terms. Users who do not agree must discontinue use
                  immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Eligibility</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  Users must be at least 18 years old and legally capable of
                  entering into binding agreements. By using the Service, users
                  represent that all information provided is accurate and
                  truthful.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Description of the Service</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  The Service provides tools for talent sourcing, job posting,
                  candidate matching, communication, and related recruitment or
                  hiring activities. The Company may update, modify, or
                  discontinue features at any time without notice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  Users may be required to create an account. Users are
                  responsible for maintaining the confidentiality of login
                  details and all activities under their account. The Company is
                  not liable for unauthorized access resulting from user
                  negligence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide false or misleading information</li>
                  <li>Upload harmful, inappropriate, or illegal content</li>
                  <li>Attempt to bypass platform security</li>
                  <li>
                    Use the platform to harass, discriminate, or violate
                    employment laws
                  </li>
                  <li>
                    Scrape, copy, or misuse platform data without authorization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Content Submitted by Users</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>
                  Users may upload resumes, job descriptions, company
                  information, or other materials. By submitting content, users
                  grant the Company a non‑exclusive license to store, process,
                  and use such content for the purpose of providing the Service.
                </p>
                <p>
                  Users are responsible for ensuring they have the right to
                  upload any submitted content.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Employer and Candidate Interactions</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  The Service acts only as a connection platform. The Company
                  does not guarantee job offers, candidate suitability,
                  employment outcomes, or the accuracy of user‑generated
                  content. All hiring decisions are solely the responsibility of
                  employers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Payments and Billing (if applicable)</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  If paid plans or services are offered, users agree to pay all
                  associated fees. Billing terms, subscription renewals, and
                  refund policies will be outlined at the point of purchase. The
                  Company may modify pricing with prior notice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Data Protection and Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  The Company collects and processes user data in accordance
                  with its Privacy Policy. Users consent to the handling of
                  personal data necessary to operate the Service, including
                  candidate profile processing and employer communication.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Prohibited Uses</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Engage in illegal recruitment practices</li>
                  <li>Post discriminatory or fraudulent job listings</li>
                  <li>Conduct background checks without candidate consent</li>
                  <li>Upload viruses or malicious software</li>
                  <li>Mine or store personal data in violation of laws</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  All platform content, features, branding, and technology are
                  the property of the Company and protected by applicable
                  intellectual property laws. Users may not copy, modify, or
                  reverse‑engineer any part of the Service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Third‑Party Services</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  The Service may integrate with third‑party tools. The Company
                  is not responsible for the availability or performance of
                  third‑party services or for data shared with those providers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  The Company may suspend or terminate user accounts at its
                  discretion, including for violations of these Terms. Users may
                  discontinue their account at any time. Termination does not
                  relieve users of any outstanding obligations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Disclaimer of Warranties</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  The Service is provided “as is” without warranties of any
                  kind. The Company does not guarantee uninterrupted service,
                  error‑free operation, or the accuracy of user‑generated
                  content.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  To the maximum extent permitted by law, the Company is not
                  liable for indirect, incidental, or consequential damages,
                  including loss of data, employment opportunities, or revenue.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  Users agree to indemnify and hold the Company harmless from
                  claims or damages arising from misuse of the Service, uploaded
                  content, or violation of these Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  These Terms are governed by the laws of [Insert Jurisdiction].
                  Users agree to submit to the exclusive jurisdiction of courts
                  located within that region.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Changes to the Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  The Company may update these Terms at any time. Continued use
                  of the Service after changes are posted constitutes acceptance
                  of the revised Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-2">
                <p>
                  For questions regarding these Terms, users may contact the
                  Company at:
                </p>
                <div className="space-y-1">
                  <p className="font-medium">AidQuarters Recruit</p>
                  <p>Lagos, Nigeria</p>
                  <p>support@aidquarters.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
