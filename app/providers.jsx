"use client";

import { EnrollFormProvider } from "@/context/EnrollFormContext";

export default function EnrollLayout({ children }) {
  return <EnrollFormProvider>{children}</EnrollFormProvider>;
}
