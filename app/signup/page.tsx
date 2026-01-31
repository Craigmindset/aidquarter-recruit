"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    state: "Lagos",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Password validation criteria
  const passwordCriteria = {
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      formData.password,
    ),
    isValidLength:
      formData.password.length >= 8 && formData.password.length <= 15,
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
  const doPasswordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.phone.length === 11 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.state !== "" &&
    isPasswordValid &&
    doPasswordsMatch;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 11) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setFormData({ ...formData, password: value });
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setFormData({ ...formData, confirmPassword: value });
    }
  };

  const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsLoading(true);
    setError("");

    try {
      // Format phone number with +234 prefix
      const formattedPhone = `+234${formData.phone}`;

      // Hash password (in production, use proper bcrypt library)
      const hashedPassword = await hashPassword(formData.password);

      // Insert into client_profile table
      const { data, error: supabaseError } = await supabase
        .from("client_profile")
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formattedPhone,
          state: formData.state,
          password_hash: hashedPassword,
          email_verified: false,
        })
        .select();

      if (supabaseError) {
        // Check for specific error types
        if (supabaseError.message.includes("duplicate")) {
          setError("This email is already registered. Please login instead.");
        } else {
          setError(
            supabaseError.message ||
              "Failed to create account. Please try again.",
          );
        }
        setIsLoading(false);
        return;
      }

      // Success - redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const CriteriaItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <XCircle className="h-4 w-4 text-gray-400" />
      )}
      <span className={`text-xs ${met ? "text-green-600" : "text-gray-600"}`}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join Aidquarters today</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Error Alert */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md flex gap-2 items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    <span className="text-gray-700 text-sm">+234</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="8012345678"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={11}
                    required
                    className="rounded-l-none"
                  />
                </div>
                {formData.phone && formData.phone.length !== 11 && (
                  <p className="text-xs text-red-600">
                    Phone number must be 11 digits
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                {formData.email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <p className="text-xs text-red-600">
                      Please enter a valid email address
                    </p>
                  )}
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, state: value })
                  }
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Abia">Abia</SelectItem>
                    <SelectItem value="Adamawa">Adamawa</SelectItem>
                    <SelectItem value="Akwa Ibom">Akwa Ibom</SelectItem>
                    <SelectItem value="Anambra">Anambra</SelectItem>
                    <SelectItem value="Bauchi">Bauchi</SelectItem>
                    <SelectItem value="Bayelsa">Bayelsa</SelectItem>
                    <SelectItem value="Benue">Benue</SelectItem>
                    <SelectItem value="Borno">Borno</SelectItem>
                    <SelectItem value="Cross River">Cross River</SelectItem>
                    <SelectItem value="Delta">Delta</SelectItem>
                    <SelectItem value="Ebonyi">Ebonyi</SelectItem>
                    <SelectItem value="Edo">Edo</SelectItem>
                    <SelectItem value="Ekiti">Ekiti</SelectItem>
                    <SelectItem value="Enugu">Enugu</SelectItem>
                    <SelectItem value="FCT">FCT - Abuja</SelectItem>
                    <SelectItem value="Gombe">Gombe</SelectItem>
                    <SelectItem value="Imo">Imo</SelectItem>
                    <SelectItem value="Jigawa">Jigawa</SelectItem>
                    <SelectItem value="Kaduna">Kaduna</SelectItem>
                    <SelectItem value="Kano">Kano</SelectItem>
                    <SelectItem value="Katsina">Katsina</SelectItem>
                    <SelectItem value="Kebbi">Kebbi</SelectItem>
                    <SelectItem value="Kogi">Kogi</SelectItem>
                    <SelectItem value="Kwara">Kwara</SelectItem>
                    <SelectItem value="Lagos">Lagos</SelectItem>
                    <SelectItem value="Nasarawa">Nasarawa</SelectItem>
                    <SelectItem value="Niger">Niger</SelectItem>
                    <SelectItem value="Ogun">Ogun</SelectItem>
                    <SelectItem value="Ondo">Ondo</SelectItem>
                    <SelectItem value="Osun">Osun</SelectItem>
                    <SelectItem value="Oyo">Oyo</SelectItem>
                    <SelectItem value="Plateau">Plateau</SelectItem>
                    <SelectItem value="Rivers">Rivers</SelectItem>
                    <SelectItem value="Sokoto">Sokoto</SelectItem>
                    <SelectItem value="Taraba">Taraba</SelectItem>
                    <SelectItem value="Yobe">Yobe</SelectItem>
                    <SelectItem value="Zamfara">Zamfara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password "
                    value={formData.password}
                    onChange={handlePasswordChange}
                    minLength={8}
                    maxLength={15}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Criteria */}
                {formData.password && (
                  <div className="space-y-1 p-3 bg-gray-50 rounded-md">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Password must contain:
                    </p>

                    <CriteriaItem
                      met={passwordCriteria.hasUpperCase}
                      text="One uppercase letter"
                    />
                    <CriteriaItem
                      met={passwordCriteria.hasLowerCase}
                      text="One lowercase letter"
                    />
                    <CriteriaItem
                      met={passwordCriteria.hasNumber}
                      text="One number"
                    />
                    <CriteriaItem
                      met={passwordCriteria.hasSpecialChar}
                      text="One special character"
                    />
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    minLength={8}
                    maxLength={15}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && !doPasswordsMatch && (
                  <p className="text-xs text-red-600">Passwords do not match</p>
                )}
                {formData.confirmPassword && doPasswordsMatch && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Passwords match
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
