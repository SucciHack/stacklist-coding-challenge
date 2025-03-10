"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm, FormProvider } from "react-hook-form"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ImageInput from "./image-upload"

interface RegisterFormValues {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  imageUrl: string | null
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const initialImage = "/bfg3.webp";
    const [imageUrl, setImageUrl] = useState(initialImage);

  const methods = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      imageUrl: null,
    },
  })

  const { register, handleSubmit, control, watch, formState: { errors } } = methods

  const password = useRef({})
  password.current = watch("password", "")

  async function onSubmit(data: RegisterFormValues) {
    data.imageUrl = imageUrl
    try {
      console.log("Form Submitted:", data)
      // Add your registration logic here
    } catch (error) {
      console.error("Submission Error:", error)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your information below to create your account</p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormItem className="text-center">
                <FormControl>
                  <div className="space-y-4">
                    <div className="">
                    <ImageInput
                        title="Category Image"
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        endpoint="categoryImage"
                    />
                    </div>
                  </div>
                </FormControl>
              </FormItem>

              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        {...field}
                      />
                    </FormControl>
                    {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your-email@gmail.com"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address",
                          },
                        })}
                        {...field}
                      />
                    </FormControl>
                    {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
                            message: "Please enter a valid phone number",
                          },
                          minLength: {
                            value: 10,
                            message: "Phone number must be at least 10 digits",
                          },
                        })}
                        {...field}
                      />
                    </FormControl>
                    {errors.phone && <FormMessage>{errors.phone.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                          })}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormControl>
                    {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Confirm your password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) => value === password.current || "Passwords don't match",
                          })}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormControl>
                    {errors.confirmPassword && <FormMessage>{errors.confirmPassword.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </FormProvider>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/cocktail-topped-with-orange-slice_141793-643.avif')" }}
      ></div>
    </div>
  )
}