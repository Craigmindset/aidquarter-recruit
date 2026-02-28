"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export default function SignupRegisterPage() {
  const router = useRouter();
  const search = useSearchParams();
  const roleParam = (search.get("role") || "nanny").toLowerCase();
  const [step, setStep] = useState<1 | 2>(1);
  const storageKey = useMemo(() => `signup-${roleParam}`, [roleParam]);
  const [notQualifiedOpen, setNotQualifiedOpen] = useState(false);

  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    role: roleParam,
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        const data = JSON.parse(cached);
        if (data.step) setStep(data.step);
        if (data.answers) setAnswers(data.answers);
        if (data.form) setForm({ ...form, ...data.form, role: roleParam });
        if (data.emailVerified) setEmailVerified(data.emailVerified);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    try {
      const data = { step, answers, form, emailVerified };
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {}
  }, [step, answers, form, emailVerified, storageKey]);

  const handleAnswer = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const proceedFromQuestionnaire = () => {
    const allYes = Object.values(answers).every((a) => a === "yes");
    if (!allYes) {
      setNotQualifiedOpen(true);
      return;
    }
    setStep(2);
  };

  const sendOtp = async () => {
    if (!form.email) return;
    setOtpCode("111111");
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (otp === otpCode && otp.length === 6) {
      setEmailVerified(true);
      setOtpSent(false);
    }
  };

  const canCreate = useMemo(() => {
    const withinLength =
      form.password.length >= 6 && form.password.length <= 22;
    const matches = form.password === form.confirmPassword;
    return (
      form.firstName &&
      form.lastName &&
      form.email &&
      form.phone &&
      form.state &&
      form.role &&
      withinLength &&
      matches
    );
  }, [form]);

  const passwordLengthInvalid =
    form.password.length > 0 &&
    (form.password.length < 6 || form.password.length > 22);
  const confirmMismatch =
    form.confirmPassword.length > 0 && form.confirmPassword !== form.password;

  const createAccount = async () => {
    if (!canCreate) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/login`
              : undefined,
          data: {
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            state: form.state,
            role: form.role,
          },
        },
      });
      if (error) {
        setSubmitting(false);
        return;
      }
      const userId = data?.user?.id;
      if (userId) {
        const questionnaire = true;
        try {
          await supabase.from("staff_profile").upsert(
            {
              user_id: userId,
              first_name: form.firstName,
              last_name: form.lastName,
              email: form.email,
              email_verified: false,
              phone_number: form.phone,
              state: form.state,
              role: form.role,
              questionnaire,
            },
            { onConflict: "user_id" },
          );
        } catch {}
      }
      router.push("/login");
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-emerald-50 to-green-100">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Questionnaire
              </h1>
              <p className="text-sm text-gray-700 text-center">
                You are expected to answer the below questions before you can
                proceed
              </p>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Are you above 18 and a Nationality of Nigeria?</Label>
                  <Select
                    value={answers.q1}
                    onValueChange={(v) => handleAnswer("q1", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>
                    Are you registering at your own consent or will?
                  </Label>
                  <Select
                    value={answers.q2}
                    onValueChange={(v) => handleAnswer("q2", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>
                    Do you consent to verification and scrutiny of your data?
                  </Label>
                  <Select
                    value={answers.q3}
                    onValueChange={(v) => handleAnswer("q3", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Are you experienced in this chosen role?</Label>
                  <Select
                    value={answers.q4}
                    onValueChange={(v) => handleAnswer("q4", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>
                    Do you agree to abide by the platform’s terms, policies, and
                    code of conduct?
                  </Label>
                  <Select
                    value={answers.q5}
                    onValueChange={(v) => handleAnswer("q5", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={proceedFromQuestionnaire}
                >
                  Continue
                </Button>
              </div>
              <AlertDialog
                open={notQualifiedOpen}
                onOpenChange={setNotQualifiedOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Not Qualified</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your answers do not meet our qualification criteria.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => setNotQualifiedOpen(false)}
                    >
                      Close
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Personal Information
              </h1>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>First Name</Label>
                  <Input
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Last Name</Label>
                  <Input
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    className="flex-1"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-600">
                    A confirmation link will be sent to this email after you
                    create your account.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>State</Label>
                  <Select
                    value={form.state}
                    onValueChange={(v) => setForm({ ...form, state: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lagos">Lagos</SelectItem>
                      <SelectItem value="Abuja">Abuja</SelectItem>
                      <SelectItem value="Rivers">Rivers</SelectItem>
                      <SelectItem value="Kano">Kano</SelectItem>
                      <SelectItem value="Oyo">Oyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label>Role</Label>
                  <Select
                    value={form.role}
                    onValueChange={(v) => setForm({ ...form, role: v })}
                    disabled
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nanny">Nanny</SelectItem>
                      <SelectItem value="housekeeper">Housekeeper</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="caregiver">Caregiver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPwd ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      minLength={6}
                      maxLength={22}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPwd ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordLengthInvalid && (
                    <p className="text-sm text-red-600">
                      Password must be 6–22 characters
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPwd ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                      minLength={6}
                      maxLength={22}
                      className={`pr-10 ${confirmMismatch ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPwd((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPwd ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {confirmMismatch && (
                    <p className="text-sm text-red-600">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>
              <div className="pt-2">
                <Button
                  disabled={!canCreate || submitting}
                  onClick={createAccount}
                  className="w-full h-12 rounded-xl bg-[#0b1a33] hover:bg-[#132743] text-white font-semibold"
                >
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
