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

const steps = ["Student", "Academic", "Address", "Review"];

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* STEP HEADER (ALIGNED) */}
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-5 h-[2px] bg-gray-200" />

          {steps.map((label, index) => {
            const isActive = index === 1;

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

        {/* CARD */}
        <Card className="rounded-3xl bg-white/90 backdrop-blur shadow-xl border border-white">
          <CardHeader className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-extrabold text-gray-900">
              Academic Preferences
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Help us understand your academic goals and study preferences.
            </p>
          </CardHeader>

          <CardContent className="px-6 sm:px-10 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* SUBJECTS */}
              <div>
                <Label className="block mb-2">
                  Subjects <span className="text-red-500">*</span>
                </Label>

                <div className="flex flex-wrap gap-3">
                  {SUBJECTS_BY_CLASS[selectedClass]?.map((subject) => (
                    <label
                      key={subject}
                      className="
                        flex items-center gap-2 px-4 py-2 rounded-full
                        border border-gray-300 cursor-pointer
                        text-sm font-medium
                        hover:bg-indigo-50 hover:border-indigo-400
                        transition
                      "
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

              {/* GOAL */}
              <div>
                <Label>
                  Exam Goal <span className="text-red-500">*</span>
                </Label>

                <select
                  {...register("goal")}
                  className="
                    w-full h-11 mt-1 rounded-xl border px-4
                    focus:ring-2 focus:ring-indigo-500
                  "
                >
                  <option value="">Select your goal</option>
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

              {/* HOURS */}
              <div>
                <Label>
                  Weekly Study Hours <span className="text-red-500">*</span>
                </Label>

                <Input
                  type="number"
                  placeholder="e.g. 10"
                  {...register("hours", { valueAsNumber: true })}
                  className="mt-1 focus:ring-2 focus:ring-indigo-500"
                />

                {errors.hours && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.hours.message}
                  </p>
                )}
              </div>

              {/* SCHOLARSHIP */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                <Checkbox {...register("scholarship")} />
                <Label className="text-sm">
                  Applying for scholarship?{" "}
                  <span className="text-gray-500">(optional)</span>
                </Label>
              </div>

              {/* CONDITIONAL */}
              {scholarship && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                  <div>
                    <Label>
                      Last Exam Percentage <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="e.g. 85"
                      {...register("percentage", { valueAsNumber: true })}
                      className="mt-1 focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.percentage && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.percentage.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label>
                      Achievements{" "}
                      <span className="text-gray-400">(optional)</span>
                    </Label>
                    <Textarea
                      placeholder="Olympiads, awards, distinctions…"
                      {...register("achievements")}
                      className="mt-1 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* NAVIGATION */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/enroll/student")}
                  className="w-full sm:w-auto"
                >
                  ← Back
                </Button>

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="
                    w-full sm:w-auto
                    bg-gradient-to-r from-indigo-600 to-emerald-500
                    hover:from-indigo-500 hover:to-emerald-400
                    hover:shadow-xl hover:-translate-y-0.5
                    transition-all
                    disabled:opacity-50
                  "
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
