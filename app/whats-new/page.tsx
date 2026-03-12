"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Post = {
  id?: string;
  category: string | null;
  header: string | null;
  sub_header: string | null;
  content: string | null;
  sub_content: string | null;
  image: string | null;
  created_at?: string | null;
};

export default function WhatsNewPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (!ignore) {
          if (!error && data && Array.isArray(data) && data.length > 0) {
            setPosts(
              data.map((d: any) => ({
                id: d.id ?? undefined,
                category: d.category ?? null,
                header: d.header ?? null,
                sub_header: d.sub_header ?? null,
                content: d.content ?? null,
                sub_content: d.sub_content ?? null,
                image: d.image_url ?? null,
                created_at: d.created_at ?? null,
              })),
            );
          } else {
            setPosts([
              {
                category: "Security",
                header: "Enhanced Background Verification System",
                sub_header: "Stronger checks and real-time validation",
                content:
                  "Our new verification system now includes biometric verification, enhanced criminal background checks, and real-time reference validation. This ensures even higher quality and safety standards for all our registered workers.",
                sub_content:
                  "We've upgraded our verification process with biometric checks and real-time validation.",
                image: "/placeholder.svg?height=300&width=500",
                created_at: null,
              },
            ]);
          }
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, []);

  const featured = useMemo(() => (posts.length > 0 ? posts[0] : null), [posts]);
  const others = useMemo(() => posts.slice(1), [posts]);

  const getCategoryColor = (category?: string | null) => {
    const name = String(category || "").toLowerCase();
    if (name.includes("security")) return "bg-red-100 text-red-800";
    if (name.includes("product")) return "bg-blue-100 text-blue-800";
    if (name.includes("train")) return "bg-green-100 text-green-800";
    if (name.includes("support")) return "bg-purple-100 text-purple-800";
    if (name.includes("expand")) return "bg-orange-100 text-orange-800";
    if (name.includes("partner")) return "bg-indigo-100 text-indigo-800";
    return "bg-gray-100 text-gray-800";
  };

  const openModal = (p: Post) => {
    setActive(p);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What's New at Aidquarters
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest features, improvements, and
            announcements from Aidquarters
          </p>
        </div>
      </section>

      {/* Featured Update */}
      {featured && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="mb-8">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-4">
                Featured Update
              </Badge>
            </div>

            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featured.image || "/placeholder.svg"}
                    alt={featured.header || "Update image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Badge className={getCategoryColor(featured?.category)}>
                        {featured?.category || "Update"}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {featured?.created_at
                          ? new Date(featured.created_at).toLocaleDateString()
                          : "Latest"}
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900">
                      {featured?.header}
                    </h2>
                    {featured?.sub_header ? (
                      <p className="text-base text-gray-700">
                        {featured.sub_header}
                      </p>
                    ) : null}

                    <p className="text-lg text-gray-600 leading-relaxed">
                      {featured?.sub_content || featured?.content}
                    </p>

                    <Button
                      className="bg-green-600 hover:bg-green-700 w-fit"
                      onClick={() => openModal(featured)}
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Regular Updates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Recent Updates
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((p, idx) => (
              <Card
                key={(p.id as any) ?? `post-${idx}`}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={p.image || "/placeholder.svg"}
                    alt={p.header || "Update"}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(p.category)}>
                        {p.category || "Update"}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {p.created_at
                          ? new Date(p.created_at).toLocaleDateString()
                          : ""}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {p.header}
                    </h3>

                    <p className="text-gray-600 line-clamp-3">
                      {p.sub_header || p.sub_content}
                    </p>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => openModal(p)}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stay in the Loop
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest updates, features, and
            announcements delivered to your inbox
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience Our Latest Features?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start using Aidquarters today and benefit from all our latest
            improvements and features
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
              <Link href="/recruit">Post a Job</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[92vw] md:w-[80vw] max-w-3xl max-h-[92vh] sm:rounded-xl p-0 overflow-hidden bg-transparent border-0 md:[&>button]:opacity-100 md:[&>button]:bg-white md:[&>button]:text-gray-900 md:[&>button]:rounded-full md:[&>button]:p-2 md:[&>button]:shadow md:[&>button]:border md:[&>button]:border-gray-200 md:[&>button>svg]:h-6 md:[&>button>svg]:w-6">
          <div className="h-full w-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-3 md:p-5">
            <div className="rounded-lg bg-white/90 dark:bg-gray-900/80 backdrop-blur border border-white/60 dark:border-gray-700 shadow-2xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />
              <div className="md:grid md:grid-cols-2">
                <div className="flex flex-col">
                  <div className="p-4 md:p-6">
                    <DialogHeader>
                      <DialogTitle className="text-xl md:text-2xl">
                        {active?.header}
                      </DialogTitle>
                      <div className="mt-2 flex items-center gap-3">
                        <Badge className={getCategoryColor(active?.category)}>
                          {active?.category || "Update"}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {active?.created_at
                            ? new Date(active.created_at).toLocaleDateString()
                            : ""}
                        </div>
                      </div>
                    </DialogHeader>
                  </div>
                  {active?.image ? (
                    <div className="relative w-full h-48 md:hidden">
                      <Image
                        src={active.image}
                        alt={active.header || "Update image"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                  ) : null}
                  <div className="overflow-y-auto p-4 md:p-6 space-y-4 max-h-[55vh] md:max-h-[65vh]">
                    {active?.sub_header ? (
                      <p className="text-gray-800">{active.sub_header}</p>
                    ) : null}
                    {active?.content ? (
                      <p className="text-gray-700 dark:text-gray-300 leading-7 whitespace-pre-line">
                        {active.content}
                      </p>
                    ) : null}
                  </div>
                  <div className="border-t border-white/60 dark:border-gray-700 bg-white/60 dark:bg-gray-900/50 backdrop-blur p-6 md:p-8">
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="bg-white/80 dark:bg-gray-800/80 hover:bg-white text-gray-800 dark:text-gray-100"
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </div>
                </div>
                <div className="relative hidden md:block min-h-[300px]">
                  {active?.image ? (
                    <>
                      <Image
                        src={active.image}
                        alt={active.header || "Update image"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
