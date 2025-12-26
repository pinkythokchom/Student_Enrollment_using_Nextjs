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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 px-3 sm:px-4 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">

        {/* STEPS — RESPONSIVE */}
        <div className="flex flex-wrap justify-center sm:justify-between gap-4">
          {["Student", "Academic", "Address", "Review"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center
                text-sm font-bold
                ${index === 0
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

        {/* CARD */}
        <Card className="rounded-2xl bg-white/90 backdrop-blur shadow-md">
          <CardHeader className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold">
              Student Details
            </h2>
            <p className="text-sm text-gray-500">
              Fields marked with <span className="text-red-500">*</span> are required
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7"
            >
              {/* Full Name */}
              <div className="sm:col-span-2">
                <Label>
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <Label>
                  Mobile <span className="text-red-500">*</span>
                </Label>
                <Input {...register("mobile")} />
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {/* Class */}
              <div>
                <Label>
                  Class <span className="text-red-500">*</span>
                </Label>
                <Select {...register("classLevel")}>
                  <option value="">Select</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Select>
                {errors.classLevel && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.classLevel.message}
                  </p>
                )}
              </div>

              {/* Board */}
              <div>
                <Label>
                  Board <span className="text-red-500">*</span>
                </Label>
                <Select {...register("board")}>
                  <option value="">Select</option>
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

              {/* Language */}
              <div className="sm:col-span-2">
                <Label>
                  Preferred Language <span className="text-red-500">*</span>
                </Label>
                <Select {...register("language")}>
                  <option value="">Select</option>
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

              {/* BUTTON */}
              <div className="sm:col-span-2 pt-4 sm:pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-green-500 hover:shadow-lg transition"
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
