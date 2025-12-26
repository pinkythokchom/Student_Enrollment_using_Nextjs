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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 py-16">
      <div className="max-w-4xl mx-auto px-6 space-y-12">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-wrap justify-center sm:justify-between gap-4">
          {["Student", "Academic", "Address", "Review"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center
                text-sm font-bold
                ${index === 2
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600"}`}
              >
                {index + 1}
              </div>
              <span className={`text-sm ${index === 0 ? "text-black" : "text-gray-500"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

          {/* Address */}
          <Card className="rounded-2xl bg-white shadow-md">
            <CardHeader>
              <h2 className="text-3xl font-serif font-extrabold">
                Address Information
              </h2>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <Label>
                  PIN Code <span className="text-red-500">*</span>
                </Label>
                <Input {...register("pinCode")} />
                {errors.pinCode && (
                  <p className="text-xs text-red-500">{errors.pinCode.message}</p>
                )}
              </div>

              <div>
                <Label>
                  State / UT <span className="text-red-500">*</span>
                </Label>
                <Input {...register("state")} />
              </div>

              <div>
                <Label>
                  City <span className="text-red-500">*</span>
                </Label>
                <Input {...register("city")} />
              </div>

              <div className="md:col-span-2">
                <Label>
                  Address Line <span className="text-red-500">*</span>
                </Label>
                <Input {...register("addressLine")} />
              </div>
            </CardContent>
          </Card>

          {/* Guardian */}
          <Card className="rounded-2xl bg-white shadow-md">
            <CardHeader>
              <h2 className="text-2xl font-serif font-bold">
                Guardian Details
              </h2>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <Label>
                  Guardian Name <span className="text-red-500">*</span>
                </Label>
                <Input {...register("guardianName")} />
              </div>

              <div>
                <Label>
                  Guardian Mobile <span className="text-red-500">*</span>
                </Label>
                <Input {...register("guardianMobile")} />
              </div>

            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="rounded-2xl bg-white shadow-md">
            <CardHeader>
              <h2 className="text-2xl font-serif font-bold">
                Payment Preferences
              </h2>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <Label>
                  Payment Plan <span className="text-red-500">*</span>
                </Label>
                <Select {...register("paymentPlan")}>
                  <option value="">Select</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Annual">Annual</option>
                </Select>
              </div>

              <div>
                <Label>
                  Payment Mode <span className="text-red-500">*</span>
                </Label>
                <Select {...register("paymentMode")}>
                  <option value="">Select</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="NetBanking">NetBanking</option>
                </Select>
              </div>

            </CardContent>
          </Card>

          {/* Nav */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => router.push("/enroll/academic")}
            >
              Back
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-emerald-600 to-green-500 cursor-pointer"
            >
              Continue to Review →
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
