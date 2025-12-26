"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const EnrollFormContext = createContext();

const initialState = {
  student: null,
  academic: null,
  address: null,
};

export function EnrollFormProvider({ children }) {
  const router = useRouter();

  const [data, setData] = useState(initialState);

  const updateStepData = (step, values) => {
    setData((prev) => ({
      ...prev,
      [step]: values,
    }));
  };

  const canAccessStep = (step) => {
    if (step === 1) return true;
    if (step === 2) return !!data.student;
    if (step === 3) return !!data.student && !!data.academic;
    if (step === 4)
      return !!data.student && !!data.academic && !!data.address;
    return false;
  };

  const goToStep = (step) => {
    if (!canAccessStep(step)) {
      router.push("/enroll/student");
      return;
    }

    if (step === 1) router.push("/enroll/student");
    if (step === 2) router.push("/enroll/academic");
    if (step === 3) router.push("/enroll/address");
    if (step === 4) router.push("/enroll/review");
  };

  const resetForm = () => {
    setData(initialState);
  };

  return (
    <EnrollFormContext.Provider
      value={{
        data,
        updateStepData,
        canAccessStep,
        goToStep,
        resetForm,
      }}
    >
      {children}
    </EnrollFormContext.Provider>
  );
}

export function useEnrollForm() {
  return useContext(EnrollFormContext);
}
