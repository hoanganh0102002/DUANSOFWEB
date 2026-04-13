"use client";

import React, { createContext, useContext, useCallback } from "react";

interface AffiliateContextValue {
  logAffiliateAction: (action: string, url: string) => void;
}

const AffiliateContext = createContext<AffiliateContextValue | null>(null);

export function AffiliateProvider({ children }: { children: React.ReactNode }) {
  const logAffiliateAction = useCallback((action: string, url: string) => {
    // TODO: gửi log affiliate lên server khi cần
    console.log("[Affiliate]", action, url);
  }, []);

  return (
    <AffiliateContext.Provider value={{ logAffiliateAction }}>
      {children}
    </AffiliateContext.Provider>
  );
}

export function useAffiliate() {
  const ctx = useContext(AffiliateContext);
  if (!ctx) throw new Error("useAffiliate must be used within AffiliateProvider");
  return ctx;
}
