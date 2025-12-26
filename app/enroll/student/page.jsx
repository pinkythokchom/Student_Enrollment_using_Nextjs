"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { studentSchema } from "@/schemas/student.schema";
import { useEnrollForm } from "@/context/EnrollFormContext";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const steps = ["Student", "Academic", "Address", "Review"];

const Student = () => {
  const router = useRouter();
  const { updateStepData, data } = useEnrollForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: data.student || {},
  });

  const onSubmit = (values) => {
    updateStepData("student", values);
    router.push("/enroll/academic");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

       {/* STEP INDICATOR */}
<div className="relative flex items-center justify-between">
  {/* CONNECTOR LINE */}
  <div className="absolute left-0 right-0 top-5 h-[2px] bg-gray-200" />

  {steps.map((label, index) => {
    const isActive = index === 0;

    return (
      <div
        key={label}
        className="relative z-10 flex flex-col items-center flex-1"
      >
        {/* CIRCLE */}
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

        {/* LABEL */}
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

        {/* FORM CARD */}
        <Card className="rounded-3xl bg-white/90 backdrop-blur shadow-xl border border-white">
          <CardHeader className="space-y-2 text-center">
            <h2 className="text-3xl font-serif font-extrabold text-gray-900">
              Student Information
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Tell us a bit about yourself so we can personalize your learning experience.
            </p>
          </CardHeader>

          <CardContent className="px-6 sm:px-10 py-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* FULL NAME */}
              <div className="sm:col-span-2">
                <Label>
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter your full name"
                  {...register("fullName")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <Label>
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* MOBILE */}
              <div>
                <Label>
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="10-digit mobile number"
                  {...register("mobile")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {/* CLASS */}
              <div>
                <Label>
                  Class <span className="text-red-500">*</span>
                </Label>
                <Select
                  {...register("classLevel")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select class</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </Select>
                {errors.classLevel && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.classLevel.message}
                  </p>
                )}
              </div>

              {/* BOARD */}
              <div>
                <Label>
                  Board <span className="text-red-500">*</span>
                </Label>
                <Select
                  {...register("board")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                </Select>
                {errors.board && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.board.message}
                  </p>
                )}
              </div>

              {/* LANGUAGE */}
              <div className="sm:col-span-2">
                <Label>
                  Preferred Language <span className="text-red-500">*</span>
                </Label>
                <Select
                  {...register("language")}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Hinglish">Hinglish</option>
                </Select>
                {errors.language && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.language.message}
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="sm:col-span-2 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full h-12 text-base font-semibold
                    bg-gradient-to-r from-indigo-600 to-emerald-500
                    hover:from-indigo-500 hover:to-emerald-400
                    hover:shadow-xl hover:-translate-y-0.5
                    active:translate-y-0
                    transition-all duration-300
                    disabled:opacity-50
                  "
                >
                  Continue to Academic →
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Student;
