"use client";

import { RecoilRoot } from "recoil";

export default function Root({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
