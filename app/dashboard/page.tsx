"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  CreditCard,
  UserCheck,
  Wallet,
  TrendingUp,
  Calendar,
  FileText,
  IdCard,
  Camera,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/lib/supabase";

export default function DashboardOverview() {
  const { user } = useAuth();
  const router = useRouter();
  const [showVetting, setShowVetting] = useState(false);
  const displayName =
    (user?.user_metadata as any)?.firstName ?? user?.email ?? "there";
  const role =
    ((user?.user_metadata as any)?.role as string | undefined)?.toLowerCase() ??
    "applicant";
  const roleTitle = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Applicant";

  useEffect(() => {
    if (!user) return;
    const run = async () => {
      try {
        const { data, error } = await supabase
          .from("staff_profile")
          .select("vet_fee, verified, ninpass, idpass, facepass")
          .eq("user_id", user.id)
          .single();
        if (error) {
          setShowVetting(true);
          return;
        }
        if (data?.vet_fee === false) {
          setShowVetting(true);
        } else if (data?.vet_fee === true && data?.verified === false) {
          setShowVetting(false);
          if (data?.ninpass !== true) {
            router.replace("/verification/documentmatch");
          } else if (data?.idpass !== true) {
            router.replace("/verification/idmatch");
          } else if (data?.facepass !== true) {
            router.replace("/verification/facematch");
          } else {
            try {
              await supabase
                .from("staff_profile")
                .update({ verified: true })
                .eq("user_id", user.id);
            } catch {}
            router.replace("/verification/success");
          }
        } else {
          setShowVetting(false);
        }
      } catch {
        setShowVetting(true);
      }
    };

    run();
  }, [user, router]);

  const handleProceedVetting = () => {
    router.push("/verification/pay");
  };

  const stats = [
    {
      title: "Active Position",
      value: "3",
      icon: UserCheck,
      change: "+1 this month",
      changeType: "positive" as const,
    },
    {
      title: "Role Request",
      value: "2",
      icon: Users,
      change: "Pending interviews",
      changeType: "neutral" as const,
    },
    {
      title: "Monthly Payroll",
      value: "₦180,000",
      icon: CreditCard,
      change: "+12% from last month",
      changeType: "positive" as const,
    },
  ];

  const recentActivity = [
    {
      action: "Payment made to Grace Okoro",
      amount: "₦60,000",
      time: "2 hours ago",
      type: "payment",
    },
    {
      action: "Interview scheduled with Emeka Okonkwo",
      amount: "",
      time: "1 day ago",
      type: "interview",
    },
    {
      action: "Wallet topped up",
      amount: "₦50,000",
      time: "3 days ago",
      type: "topup",
    },
    {
      action: "New candidate selected: Fatima Ibrahim",
      amount: "",
      time: "5 days ago",
      type: "selection",
    },
  ];

  return (
    <div className="space-y-6">
      <AlertDialog open={showVetting}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for signing up as a{" "}
              <span className="font-semibold">{roleTitle}</span>. Aidquarters
              would like to profile you by vetting your data and authenticating
              your application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-8 w-8 text-gray-700" />
              <span className="text-xs mt-2 text-gray-600">Documents</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <IdCard className="h-8 w-8 text-gray-700" />
              <span className="text-xs mt-2 text-gray-600">Valid ID</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Camera className="h-8 w-8 text-gray-700" />
              <span className="text-xs mt-2 text-gray-600">Facial Auth</span>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-900">
            A vetting fee of ₦3,000 will be required during the process.
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleProceedVetting}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, John!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome, {displayName}.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="dark:bg-gray-800 dark:border-gray-700"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <p
                className={`text-xs ${
                  {
                    positive: "text-green-600 dark:text-green-400",
                    negative: "text-red-600 dark:text-red-400",
                    neutral: "text-gray-500 dark:text-gray-400",
                  }[stat.changeType]
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors dark:bg-gray-900 dark:border-gray-700">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                  <p className="font-medium dark:text-white">Update Profile</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Update your details
                  </p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors dark:bg-gray-900 dark:border-gray-700">
                <div className="text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                  <p className="font-medium dark:text-white">Salary History</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    View past payments
                  </p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors dark:bg-gray-900 dark:border-gray-700">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                  <p className="font-medium dark:text-white">
                    Schedule Interview
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Book with candidates
                  </p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors dark:bg-gray-900 dark:border-gray-700">
                <div className="text-center">
                  <Wallet className="h-8 w-8 mx-auto mb-2 text-orange-600 dark:text-orange-400" />
                  <p className="font-medium dark:text-white">Insurance +</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage coverage
                  </p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "payment"
                          ? "bg-green-500"
                          : activity.type === "interview"
                            ? "bg-blue-500"
                            : activity.type === "topup"
                              ? "bg-orange-500"
                              : "bg-purple-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  {activity.amount && (
                    <Badge
                      variant="outline"
                      className="text-green-600 dark:text-green-400 dark:border-green-400"
                    >
                      {activity.amount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
