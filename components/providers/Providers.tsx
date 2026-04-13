"use client";

import React from "react";
import { CartProvider } from "./CartProvider";
import { AuthProvider } from "./AuthProvider";
import { AffiliateProvider } from "./AffiliateProvider";
import { TenantProvider } from "./TenantProvider";
import { Toaster } from "sonner";

import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

  return (
    <TenantProvider>
      <AuthProvider>
        <CartProvider>
          <AffiliateProvider>
            <GoogleOAuthProvider clientId={googleClientId}>
              {children}
              <Toaster position="top-right" richColors />
            </GoogleOAuthProvider>
          </AffiliateProvider>
        </CartProvider>
      </AuthProvider>
    </TenantProvider>
  );
}
