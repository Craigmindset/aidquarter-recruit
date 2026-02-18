 "use client";
 
 import { useEffect } from "react";
 import { useRouter } from "next/navigation";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 
 export default function SignupSuccessPage() {
   const router = useRouter();
 
   useEffect(() => {
     const t = setTimeout(() => {
       router.push("/login");
     }, 3000);
     return () => clearTimeout(t);
   }, [router]);
 
   return (
     <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
       <Card className="w-full max-w-md shadow-xl border-0">
         <CardContent className="p-6 text-center">
           <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Created</h1>
           <p className="text-gray-600 mb-6">You will be redirected to Login shortly.</p>
           <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/login")}>
             Go to Login
           </Button>
         </CardContent>
       </Card>
     </div>
   );
 }
