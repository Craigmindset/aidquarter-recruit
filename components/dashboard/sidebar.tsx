"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Users,
  CreditCard,
  UserCheck,
  Wallet,
  Home,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const menuItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Recruitment",
    url: "/dashboard/recruitment",
    icon: Users,
  },
  {
    title: "Payroll",
    url: "/dashboard/payroll",
    icon: CreditCard,
  },
  {
    title: "Employees",
    url: "/dashboard/employees",
    icon: UserCheck,
  },
  {
    title: "Wallet",
    url: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const { user, signOut } = useAuth();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!user?.id) {
        setIsVerified(false);
        return;
      }
      try {
        const { data } = await supabase
          .from("staff_profile")
          .select("verified")
          .eq("user_id", user.id)
          .single();
        if (!ignore) setIsVerified(Boolean(data?.verified));
      } catch {
        if (!ignore) setIsVerified(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [user?.id]);

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 mt-16 px-6 pb-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-start md:hidden gap-2">
            <SidebarTrigger className="text-gray-900 dark:text-gray-100">
              <X className="h-6 w-6" />
            </SidebarTrigger>
            <ThemeToggle />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Management Portal
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url && isVerified}
                    size="lg"
                    className={`w-full text-base ${!isVerified ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isVerified ? (
                      <Link
                        href={item.url}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <button type="button">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </button>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await signOut();
                  } finally {
                    if (isMobile) setOpenMobile(false);
                  }
                }}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
