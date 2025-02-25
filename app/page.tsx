"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InfoFormSchema, type InfoFormT } from "@/lib/schema";
import FormSteps from "@/components/form-steps";
import FormHeader from "@/components/form-header";

export default function InfoForm() {
  const router = useRouter();
  const form = useForm<InfoFormT>({
    resolver: zodResolver(InfoFormSchema),
    defaultValues: {
      name: "",
      email_address: "",
      phone_number: "",
    },
  });

  useEffect(
    function () {
      const infoForm = sessionStorage.getItem("infoForm");
      const parsedInfoForm: InfoFormT = infoForm ? JSON.parse(infoForm) : null;

      if (parsedInfoForm) {
        form.setValue("name", parsedInfoForm.name);
        form.setValue("email_address", parsedInfoForm.email_address);
        form.setValue("phone_number", parsedInfoForm.phone_number);
      }
    },
    [form]
  );

  function onSubmit(values: InfoFormT) {
    console.log({ values });

    // save to session storage
    sessionStorage.setItem("infoForm", JSON.stringify(values));

    router.push("/select-plan");
  }

  return (
    <main>
      <section className="relative h-full min-h-screen py-16">
        <div className="container flex justify-center items-centers mt-6 lg:mt-0">
          {/* Multistep form container */}
          <div className="w-full max-w-4xl flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm lg:flex-row">
            {/* Steps */}
            <FormSteps />

            {/* Form */}
            <div className="w-full p-2 lg:py-8 lg:px-16">
              <FormHeader
                title="Personal Info"
                description="Please provide your name, email address, and phone number."
              />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel>Name</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Input placeholder="e.g. Stephen King" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email_address"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel>Email Address</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Input
                              placeholder="e.g. stephenking@lorem.com"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel>Phone Number</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Input
                              placeholder="e.g. +1 234 567 890"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="hidden mt-16 lg:block">
                    <Button type="submit" className="block ml-auto">
                      Next Step
                    </Button>
                  </div>

                  <div className="fixed bottom-0 left-0 w-full px-2 py-3 block justify-between mt-16 bg-white lg:hidden">
                    <Button type="submit" className="block ml-auto">
                      Next Step
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
