"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEnrollForm } from "../../../context/EnrollFormContext";

import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../../components/ui/card";

const steps = ["Student", "Academic", "Address", "Review"];

const ReviewSubmit = () => {
  const router = useRouter();
  const { data, canAccessStep, resetForm } = useEnrollForm();

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showJSON, setShowJSON] = useState(false);

  useEffect(() => {
    if (!canAccessStep(4)) {
      router.replace("/enroll/student");
    }
  }, [canAccessStep, router]);

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 1200));
    console.log("FINAL ENROLLMENT PAYLOAD:", data);
    setSubmitting(false);
    setSubmitted(true);
  };

  /* SUCCESS SCREEN */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
        <Card className="max-w-xl w-full text-center rounded-3xl shadow-2xl">
          <CardHeader className="space-y-2">
            <h2 className="text-3xl font-serif font-extrabold text-emerald-700">
              Enrollment Successful 🎉
            </h2>
            <p className="text-gray-600">
              Welcome aboard! Your enrollment has been completed.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
              >
                Go Home
              </Button>

              <Button
                onClick={() => {
                  resetForm();
                  router.push("/enroll/student");
                }}
                className="bg-gradient-to-r from-indigo-600 to-emerald-500"
              >
                New Enrollment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* STEP HEADER */}
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-5 h-[2px] bg-gray-200" />
          {steps.map((label, index) => {
            const isActive = index === 3;
            return (
              <div key={label} className="relative z-10 flex flex-col items-center flex-1">
                <div
                  className={`
                    h-10 w-10 rounded-full flex items-center justify-center
                    text-sm font-bold
                    ${isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-500"}
                  `}
                >
                  {index + 1}
                </div>
                <span
                  className={`
                    mt-2 text-xs sm:text-sm font-medium
                    ${isActive ? "text-indigo-700" : "text-gray-400"}
                  `}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* STUDENT */}
        <Card className="rounded-3xl shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-xl font-serif font-bold">Student Details</h3>
            <Button variant="outline" onClick={() => router.push("/enroll/student")}>
              Edit
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p><b>Name:</b> {data.student?.fullName}</p>
            <p><b>Email:</b> {data.student?.email}</p>
            <p><b>Mobile:</b> +91 {data.student?.mobile}</p>
            <p><b>Class:</b> {data.student?.classLevel}</p>
            <p><b>Board:</b> {data.student?.board}</p>
            <p><b>Language:</b> {data.student?.language}</p>
          </CardContent>
        </Card>

        {/* ACADEMIC */}
        <Card className="rounded-3xl shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-xl font-serif font-bold">Academic Details</h3>
            <Button variant="outline" onClick={() => router.push("/enroll/academic")}>
              Edit
            </Button>
          </CardHeader>

          <CardContent className="space-y-2 text-sm">
            <p><b>Subjects:</b> {data.academic?.subjects?.join(", ")}</p>
            <p><b>Goal:</b> {data.academic?.goal}</p>
            <p><b>Weekly Hours:</b> {data.academic?.hours}</p>
            <p><b>Scholarship:</b> {data.academic?.scholarship ? "Yes" : "No"}</p>
            {data.academic?.scholarship && (
              <>
                <p><b>Percentage:</b> {data.academic?.percentage}%</p>
                <p><b>Achievements:</b> {data.academic?.achievements}</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* ADDRESS */}
        <Card className="rounded-3xl shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-xl font-serif font-bold">Address & Payment</h3>
            <Button variant="outline" onClick={() => router.push("/enroll/address")}>
              Edit
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p><b>PIN:</b> {data.address?.pinCode}</p>
            <p><b>City:</b> {data.address?.city}</p>
            <p><b>State:</b> {data.address?.state}</p>
            <p className="sm:col-span-2"><b>Address:</b> {data.address?.addressLine}</p>
            <p><b>Guardian:</b> {data.address?.guardianName}</p>
            <p><b>Guardian Mobile:</b> {data.address?.guardianMobile}</p>
            <p><b>Plan:</b> {data.address?.paymentPlan}</p>
            <p><b>Mode:</b> {data.address?.paymentMode}</p>
          </CardContent>
        </Card>

        {/* ACTION BAR */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <Button variant="outline" onClick={() => router.push("/enroll/address")}>
            ← Back
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="
              min-w-[180px]
              bg-gradient-to-r from-indigo-600 to-emerald-500
              hover:from-indigo-500 hover:to-emerald-400
              hover:shadow-xl hover:-translate-y-0.5
              transition-all
            "
          >
            {submitting ? "Submitting…" : "Submit Enrollment"}
          </Button>
        </div>

        {/* RAW JSON (DEV FRIENDLY) */}
        <div className="pt-6">
          <button
            onClick={() => setShowJSON(!showJSON)}
            className="text-sm text-indigo-600 underline"
          >
            {showJSON ? "Hide" : "Show"} Raw JSON
          </button>

          {showJSON && (
            <pre className="mt-4 bg-black text-emerald-400 p-4 rounded-xl text-xs overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>

      </div>
    </div>
  );
};

export default ReviewSubmit;
