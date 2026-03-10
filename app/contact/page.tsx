"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Phone,
  Mail,
  ArrowRight,
  Facebook,
  Instagram,
  Music2,
} from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return null;
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const supportEmail = "support@aidquarters";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      toast({
        title: "Please enter your name",
        description: "Name must be at least 2 characters.",
      });
      return;
    }
    if (!lastName.trim() || lastName.trim().length < 2) {
      toast({
        title: "Please enter your last name",
        description: "Last name must be at least 2 characters.",
      });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      toast({
        title: "Invalid phone",
        description: "Enter a valid phone number (digits only).",
      });
      return;
    }
    if (!subject.trim()) {
      toast({
        title: "Subject required",
        description: "Add a short subject for your message.",
      });
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      toast({
        title: "Message too short",
        description: "Please provide at least 10 characters.",
      });
      return;
    }
    setSubmitting(true);
    try {
      const body =
        `First Name: ${name}\n` +
        `Last Name: ${lastName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `\n${message}`;
      const href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      let opened = false;
      try {
        const w = window.open(href, "_blank");
        opened = !!w;
      } catch {}
      if (!opened) {
        window.location.href = href;
      }
      try {
        toast({
          title: "Message sent",
          description: "We opened your email app with a prefilled draft.",
        });
      } catch {}
      setName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="mt-8 md:mt-12 py-12">
        <div className="container mx-auto px-4 lg:px-6 grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <Image
                src="/drivr.jpg"
                alt="Recruit for Aidquarters"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-6 mt-6 md:mt-10">
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Recruit for{" "}
                  <span className="text-green-600">Aidquarters</span>
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-xl">
                  We connect trusted household professionals with families
                  across Nigeria. Reach out and we’ll get back to you shortly.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="rounded-2xl border border-black/5 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-600" />
                      <span>+2348149658109</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-green-600" />
                      <a
                        href={`mailto:${supportEmail}`}
                        className="hover:underline"
                      >
                        {supportEmail}
                      </a>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border border-black/5 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-gray-900">
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-gray-700">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      <Facebook className="h-5 w-5" aria-hidden />
                      <span>Facebook</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      <Music2 className="h-5 w-5" aria-hidden />
                      <span>TikTok</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      <Instagram className="h-5 w-5" aria-hidden />
                      <span>Instagram</span>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div>
            <Card className="rounded-2xl border border-black/5 shadow-2xl bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-gray-900">Get in touch</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Digits only"
                      />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Topic of your message"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-green-600 hover:bg-green-700 transition-opacity active:opacity-70 disabled:opacity-50"
                    >
                      {submitting ? "Submitting…" : "Submit"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
