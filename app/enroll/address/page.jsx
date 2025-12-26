"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { addressSchema } from "@/schemas/address.schema";
import { useEnrollForm } from "@/context/EnrollFormContext";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const steps = ["Student", "Academic", "Address", "Review"];

export default function Address() {
  const router = useRouter();
  const { data, updateStepData, canAccessStep } = useEnrollForm();

  useEffect(() => {
    if (!canAccessStep(3)) {
      router.replace("/enroll/student");
    }
  }, [canAccessStep, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: data.address || {},
  });

  const onSubmit = (values) => {
    updateStepData("address", values);
    router.push("/enroll/review");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* STEP HEADER (ALIGNED) */}
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-5 h-[2px] bg-gray-200" />

          {steps.map((label, index) => {
            const isActive = index === 2;

            return (
              <div
                key={label}
                className="relative z-10 flex flex-col items-center flex-1"
              >
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
                    mt-2 text-xs sm:text-sm font-medium text-center
                    ${isActive ? "text-indigo-700" : "text-gray-400"}
                  `}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ADDRESS CARD */}
          <Card className="rounded-3xl bg-white/90 backdrop-blur shadow-xl border border-white">
            <CardHeader className="space-y-1">
              <h2 className="text-3xl font-serif font-extrabold text-gray-900">
                Address Information
              </h2>
              <p className="text-sm text-gray-500">
                Please provide your current residential address.
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>
                  PIN Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("pinCode")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
                {errors.pinCode && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.pinCode.message}
                  </p>
                )}
              </div>

              <div>
                <Label>
                  State / UT <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("state")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <Label>
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("city")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <Label>
                  Address Line <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("addressLine")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* GUARDIAN CARD */}
          <Card className="rounded-3xl bg-white/90 backdrop-blur shadow-xl border border-white">
            <CardHeader>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Guardian Details
              </h2>
              <p className="text-sm text-gray-500">
                Required for communication and support.
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>
                  Guardian Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("guardianName")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <Label>
                  Guardian Mobile <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("guardianMobile")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* PAYMENT CARD */}
          <Card className="rounded-3xl bg-white/90 backdrop-blur shadow-xl border border-white">
            <CardHeader>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Payment Preferences
              </h2>
              <p className="text-sm text-gray-500">
                Choose a plan and payment method convenient for you.
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>
                  Payment Plan <span className="text-red-500">*</span>
                </Label>
                <Select
                  {...register("paymentPlan")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select plan</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Annual">Annual</option>
                </Select>
              </div>

              <div>
                <Label>
                  Payment Mode <span className="text-red-500">*</span>
                </Label>
                <Select
                  {...register("paymentMode")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select mode</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="NetBanking">NetBanking</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* NAVIGATION */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/enroll/academic")}
              className="w-full sm:w-auto"
            >
              ← Back
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full sm:w-auto
                bg-gradient-to-r from-indigo-600 to-emerald-500
                hover:from-indigo-500 hover:to-emerald-400
                hover:shadow-xl hover:-translate-y-0.5
                transition-all
                disabled:opacity-50
              "
            >
              Continue to Review →
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
