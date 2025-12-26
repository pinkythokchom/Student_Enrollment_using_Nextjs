"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { academicSchema } from "@/schemas/academic.schema";
import { useEnrollForm } from "@/context/EnrollFormContext";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const SUBJECTS_BY_CLASS = {
  "9": ["English", "Mathematics", "Science", "Social Science", "Hindi"],
  "10": ["English", "Mathematics", "Science", "Social Science", "Hindi"],
  "11": ["Physics", "Chemistry", "Mathematics", "Biology"],
  "12": ["Physics", "Chemistry", "Mathematics", "Biology"],
};

export default function Academic() {
  const router = useRouter();
  const { data, updateStepData, canAccessStep } = useEnrollForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(academicSchema),
    mode: "onChange",
    defaultValues: data.academic || {
      subjects: [],
      scholarship: false,
    },
  });

  useEffect(() => {
    if (!canAccessStep(2)) {
      router.replace("/enroll/student");
    }
  }, [canAccessStep, router]);

  const scholarship = watch("scholarship");
  const selectedClass = data.student?.classLevel;

  const onSubmit = (values) => {
    updateStepData("academic", values);
    router.push("/enroll/address");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 px-4 py-10 sm:py-14">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">

        {/* Steps */}
        <div className="flex justify-between text-xs sm:text-sm">
          {["Student", "Academic", "Address", "Review"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center
                font-bold transition-all
                ${index === 1
                  ? "bg-gradient-to-r from-indigo-700 to-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"}`}
              >
                {index + 1}
              </div>
              <span className={index === 1 ? "text-gray-900" : "text-gray-500"}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <Card className="rounded-2xl border bg-white/90 backdrop-blur shadow-md">
          <CardHeader>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold">
              Academic Details
            </h2>
            <p className="text-sm text-gray-500">
              Fields marked with <span className="text-red-500">*</span> are required
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">

              {/* Subjects */}
              <div>
                <Label>
                  Subjects <span className="text-red-500">*</span>
                </Label>

                <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
                  {SUBJECTS_BY_CLASS[selectedClass]?.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center gap-2 px-3 py-2 rounded-full border
                      cursor-pointer hover:bg-indigo-50 transition text-sm"
                    >
                      <input
                        type="checkbox"
                        value={subject}
                        {...register("subjects")}
                        className="accent-indigo-600"
                      />
                      {subject}
                    </label>
                  ))}
                </div>

                {errors.subjects && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.subjects.message}
                  </p>
                )}
              </div>

              {/* Goal */}
              <div>
                <Label>
                  Exam Goal <span className="text-red-500">*</span>
                </Label>

                <select
                  {...register("goal")}
                  className="w-full h-11 rounded-lg border px-3 mt-1"
                >
                  <option value="">Select goal</option>
                  <option value="Board Excellence">Board Excellence</option>
                  <option value="Concept Mastery">Concept Mastery</option>
                  <option value="Competitive Prep">Competitive Prep</option>
                </select>

                {errors.goal && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.goal.message}
                  </p>
                )}
              </div>

              {/* Hours */}
              <div>
                <Label>
                  Weekly Study Hours <span className="text-red-500">*</span>
                </Label>

                <Input
                  type="number"
                  {...register("hours", { valueAsNumber: true })}
                  className="mt-1"
                />

                {errors.hours && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.hours.message}
                  </p>
                )}
              </div>

              {/* Scholarship */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border">
                <Checkbox {...register("scholarship")} />
                <Label className="text-sm">
                  Applying for scholarship? <span className="text-gray-400">(optional)</span>
                </Label>
              </div>

              {/* Conditional Fields */}
              {scholarship && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label>
                      Last Exam Percentage <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      {...register("percentage", { valueAsNumber: true })}
                      className="mt-1"
                    />
                    {errors.percentage && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.percentage.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label>
                      Achievements <span className="text-gray-400">(optional)</span>
                    </Label>
                    <Textarea {...register("achievements")} className="mt-1" />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/enroll/student")}
                  className="cursor-pointer w-full sm:w-auto"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="cursor-pointer w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-500"
                >
                  Continue →
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
