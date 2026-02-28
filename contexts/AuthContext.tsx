"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const sync = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from("staff_profile")
          .select("user_id")
          .eq("user_id", user.id)
          .limit(1);
        if (!data || data.length === 0) {
          const meta = (user.user_metadata as any) || {};
          await supabase.from("staff_profile").upsert(
            {
              user_id: user.id,
              first_name: meta.firstName ?? "",
              last_name: meta.lastName ?? "",
              email: user.email ?? "",
              email_verified: !!(user as any).email_confirmed_at,
              phone_number: meta.phone ?? "",
              state: meta.state ?? "",
              role: meta.role ?? "",
              questionnaire: true,
              vet_fee: false,
              dob: null,
              address: null,
              gender: null,
              id_upload: null,
              profile_image: null,
              facepass: false,
              ninpass: false,
              idpass: false,
              facialvet: null,
              verified: false,
            },
            { onConflict: "user_id" },
          );
        }
      } catch {}
    };
    sync();
  }, [user]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
