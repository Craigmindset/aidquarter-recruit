"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [saveErr, setSaveErr] = useState<string | null>(null);

  const [savingWork, setSavingWork] = useState(false);
  const [saveWorkMsg, setSaveWorkMsg] = useState<string | null>(null);
  const [saveWorkErr, setSaveWorkErr] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [email, setEmail] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [pwdSaving, setPwdSaving] = useState(false);

  const [preferredWorkLocation, setPreferredWorkLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [experienceYears, setExperienceYears] = useState<number | "">("");

  const NIGERIAN_STATES = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await supabase
          .from("staff_profile")
          .select(
            "first_name,last_name,dob,gender,address,state,profile_image,email",
          )
          .eq("user_id", user.id)
          .single();
        const meta = (user.user_metadata as any) || {};
        setFirstName(data?.first_name ?? meta.firstName ?? "");
        setLastName(data?.last_name ?? meta.lastName ?? "");
        setDob(data?.dob ?? "");
        setGender(data?.gender ?? "");
        setAddress(data?.address ?? "");
        setStateVal(data?.state ?? meta.state ?? "");
        setEmail(data?.email ?? user.email ?? "");
        setAvatarUrl(data?.profile_image ?? null);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setSaving(true);
    setSaveMsg(null);
    setSaveErr(null);
    try {
      await supabase
        .from("staff_profile")
        .update({
          first_name: firstName,
          last_name: lastName,
          dob: dob || null,
          gender: gender || null,
          address: address || null,
          state: stateVal || null,
          email: email || null,
          preferred_work_location: preferredWorkLocation || null,
          salary_range: salaryRange || null,
          experience:
            typeof experienceYears === "number" && experienceYears >= 1
              ? `${experienceYears} year${experienceYears === 1 ? "" : "s"}`
              : null,
        })
        .eq("user_id", user.id);
      setSaveMsg("Profile saved");
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (e: any) {
      setSaveErr(e?.message || "Save error");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveWorkDetails = async () => {
    if (!user?.id) return;
    setSavingWork(true);
    setSaveWorkMsg(null);
    setSaveWorkErr(null);
    try {
      await supabase
        .from("staff_profile")
        .update({
          preferred_work_location: preferredWorkLocation || null,
          salary_range: salaryRange || null,
          experience:
            typeof experienceYears === "number" && experienceYears >= 1
              ? `${experienceYears} year${experienceYears === 1 ? "" : "s"}`
              : null,
        })
        .eq("user_id", user.id);
      setSaveWorkMsg("Work details saved");
      toast({ title: "Updated successfully" });
    } catch (e: any) {
      setSaveWorkErr(e?.message || "Save error");
    } finally {
      setSavingWork(false);
    }
  };

  const handleUploadAvatar = async () => {
    if (!user?.id || !file) return;
    setUploading(true);
    setUploadErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", `profiles/${user.id}`);
      fd.append("public_id", `profiles/${user.id}/avatar`);
      fd.append("overwrite", "true");
      fd.append("invalidate", "true");
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}) as any);
        throw new Error((j as any)?.error || "Upload failed");
      }
      const j = await res.json();
      const url = j?.url || null;
      if (url) {
        await supabase
          .from("staff_profile")
          .update({ profile_image: url })
          .eq("user_id", user.id);
        setAvatarUrl(url);
        setFile(null);
        try {
          window.dispatchEvent(
            new CustomEvent("aq:profile-image-updated", { detail: { url } }),
          );
        } catch {}
        try {
          router.refresh();
        } catch {}
      }
    } catch (e: any) {
      setUploadErr(e?.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async () => {
    setPwdMsg(null);
    setPwdErr(null);
    if (!newPassword || newPassword !== confirmPassword) {
      setPwdErr("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPwdErr("Password must be at least 6 characters");
      return;
    }
    setPwdSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      setPwdMsg("Password updated");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e: any) {
      setPwdErr(e?.message || "Password update failed");
    } finally {
      setPwdSaving(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="mt-6 shadow-xl border-0 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Profile Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={previewUrl ?? avatarUrl ?? ""}
                    alt="Avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {`${(firstName?.[0] ?? email?.[0] ?? "U").toUpperCase()}${(lastName?.[0] ?? "").toUpperCase()}`}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {file ? file.name : "Select an image to preview"}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setFile(f);
                    if (f) setPreviewUrl(URL.createObjectURL(f));
                  }}
                />
                <Button
                  onClick={handleUploadAvatar}
                  disabled={!file || uploading}
                  className="bg-[#0b1a33] hover:bg-[#132743] text-white"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
            {uploadErr && <p className="text-sm text-red-600">{uploadErr}</p>}
          </CardContent>
        </Card>
        <Card className="shadow-xl border-0 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <Label>First Name</Label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>Last Name</Label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>Date of Birth</Label>
                    <Input
                      placeholder="YYYY-MM-DD"
                      value={dob ?? ""}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>Gender</Label>
                    <Input
                      placeholder="male/female"
                      value={gender ?? ""}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1 md:col-span-2">
                    <Label>Address</Label>
                    <Input
                      value={address ?? ""}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>State</Label>
                    <Input
                      list="states-list"
                      placeholder="Type your state"
                      value={stateVal ?? ""}
                      onChange={(e) => setStateVal(e.target.value)}
                    />
                    <datalist id="states-list">
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>
                  <div className="grid gap-1">
                    <Label>Email</Label>
                    <Input value={email} disabled />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 active:opacity-80 active:scale-95 transition"
                  >
                    {saving ? "Saving..." : "Save Profile"}
                  </Button>
                </div>
                {saveMsg && <p className="text-sm text-green-600">{saveMsg}</p>}
                {saveErr && <p className="text-sm text-red-600">{saveErr}</p>}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Work Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1 md:col-span-2">
                <Label>Preferred Work Location</Label>
                <Input
                  list="states-list-work"
                  placeholder="Type a state"
                  value={preferredWorkLocation}
                  onChange={(e) => setPreferredWorkLocation(e.target.value)}
                />
                <datalist id="states-list-work">
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>
              <div className="grid gap-1 md:col-span-2">
                <Label>Salary Range</Label>
                <Select value={salaryRange} onValueChange={setSalaryRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Negotiable">Negotiable</SelectItem>
                    <SelectItem value="50,000 - 100,000">
                      50,000 - 100,000
                    </SelectItem>
                    <SelectItem value="100,000 - above">
                      100,000 - above
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <Label>My Experience (years)</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={experienceYears}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    const n = v ? Math.min(20, Math.max(1, Number(v))) : "";
                    setExperienceYears(n as any);
                  }}
                  placeholder="1-20"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSaveWorkDetails}
                disabled={savingWork}
                className="bg-green-600 hover:bg-green-700 active:opacity-80 active:scale-95 transition"
              >
                {savingWork ? "Saving..." : "Save Work Details"}
              </Button>
            </div>
            {saveWorkMsg && (
              <p className="text-sm text-green-600">{saveWorkMsg}</p>
            )}
            {saveWorkErr && (
              <p className="text-sm text-red-600">{saveWorkErr}</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleChangePassword}
                disabled={pwdSaving}
                className="bg-[#0b1a33] hover:bg-[#132743] text-white"
              >
                {pwdSaving ? "Updating..." : "Update Password"}
              </Button>
            </div>
            {pwdMsg && <p className="text-sm text-green-600">{pwdMsg}</p>}
            {pwdErr && <p className="text-sm text-red-600">{pwdErr}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
