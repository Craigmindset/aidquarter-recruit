import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-2 text-gray-600">Last updated: March 2026</p>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>
                  This Privacy Policy explains how AidQuarters Recruit (“the Company”, “we”, “us”, or “our”) collects, uses, discloses, and safeguards information when users (“you”) access our platform and services (“the Service”).
                </p>
                <p>
                  By using the Service, you agree to the collection and use of information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Scope & Controller</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  This policy applies to information processed through our website and applications. AidQuarters Recruit is the data controller for information collected through the Service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Account & Identity: name, email, phone, address, profile image, demographic details provided by you.
                  </li>
                  <li>
                    Professional Data: resumes/CVs, job preferences, employment history, references, skills, certifications, and employer-provided role details.
                  </li>
                  <li>
                    Usage Data: device information, browser type, pages viewed, referring URLs, approximate location, and interaction data used for analytics and service improvement.
                  </li>
                  <li>
                    Communications: messages, support queries, and other correspondence sent via the platform.
                  </li>
                  <li>
                    Cookies & Similar Technologies: cookies and local storage used for authentication, preferences, and performance.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>How We Use Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, operate, and improve the Service.</li>
                  <li>Facilitate recruitment workflows, matching, and communication between candidates and employers.</li>
                  <li>Personalize experiences and surface relevant roles or candidates.</li>
                  <li>Maintain security, detect fraud, and prevent misuse.</li>
                  <li>Communicate about updates, features, and policy changes.</li>
                  <li>Comply with legal obligations and enforce our Terms.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Legal Bases for Processing</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  Where applicable, we rely on one or more of the following legal bases: consent, performance of a contract, legitimate interests (such as service improvement and security), and compliance with legal obligations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>
                  We use cookies and similar technologies to keep you signed in, remember preferences, and analyze usage. You may manage cookies through your browser settings; disabling certain cookies may affect functionality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Sharing & Disclosures</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    With Employers or Candidates: to facilitate matching and communication as part of the Service.
                  </li>
                  <li>
                    Service Providers: hosting, analytics, communications, and support vendors who process data under strict confidentiality.
                  </li>
                  <li>
                    Legal & Compliance: to comply with laws, enforce policies, or protect rights, safety, and security.
                  </li>
                  <li>
                    Business Transfers: during mergers, acquisitions, or asset sales, subject to continued protection of your information.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>International Transfers</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  If information is transferred across borders, we implement appropriate safeguards in accordance with applicable laws to protect your information.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  We retain information for as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce agreements. When no longer needed, information is deleted or anonymized.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, correct, or delete your information subject to legal limits.</li>
                  <li>Object to or restrict certain processing in accordance with applicable laws.</li>
                  <li>Withdraw consent where processing is based on consent.</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact us using the details below. We may request information to verify your identity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  We implement administrative, technical, and physical safeguards to protect information. No method of transmission or storage is entirely secure; users should also take care in sharing information online.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Children’s Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  The Service is not directed to individuals under 18. We do not knowingly collect personal information from children under 18. If we learn that we have collected such information, we will take appropriate steps to delete it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>
                  We may update this Privacy Policy from time to time. Material changes will be posted on this page. Continued use of the Service after changes are posted constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-2">
                <p>
                  If you have questions or requests relating to this policy, contact:
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

