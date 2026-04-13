"use client";

import React, { createContext, useContext } from "react";

export interface Tenant {
  id: string;
  name: string;
  settings?: {
    footerText?: string;
    [key: string]: any;
  };
}

interface TenantContextValue {
  tenant: Tenant;
}

const defaultTenant: Tenant = {
  id: "sof",
  name: "CÔNG TY TNHH SOF",
  settings: {
    footerText: "© 2024 CÔNG TY TNHH SOF. Tất cả quyền được bảo lưu.",
  },
};

const TenantContext = createContext<TenantContextValue>({ tenant: defaultTenant });

export function TenantProvider({
  children,
  tenant,
}: {
  children: React.ReactNode;
  tenant?: Tenant;
}) {
  return (
    <TenantContext.Provider value={{ tenant: tenant || defaultTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}
