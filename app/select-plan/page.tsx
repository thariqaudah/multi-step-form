"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlanFormSchema, type PlanFormT } from "@/lib/schema";
import iconArcade from "@/public/icon-arcade.svg";
import iconAdvanced from "@/public/icon-advanced.svg";
import iconPro from "@/public/icon-pro.svg";
import FormHeader from "@/components/form-header";
import FormSteps from "@/components/form-steps";
import { Switch } from "@/components/ui/switch";

const planOptions = [
  {
    type: "monthly",
    name: "arcade",
    price: "$9/mo",
    priceValue: 9,
    desc: null,
  },
  {
    type: "monthly",
    name: "advanced",
    price: "$12/mo",
    priceValue: 12,
    desc: null,
  },
  { type: "monthly", name: "pro", price: "$15/mo", priceValue: 15, desc: null },
  {
    type: "yearly",
    name: "arcade",
    price: "$90/yr",
    priceValue: 90,
    desc: "2 months free",
  },
  {
    type: "yearly",
    name: "advanced",
    price: "$120/yr",
    priceValue: 120,
    desc: "2 months free",
  },
  {
    type: "yearly",
    name: "pro",
    price: "$150/yr",
    priceValue: 150,
    desc: "2 months free",
  },
];

export default function SelectPlanForm() {
  const router = useRouter();
  const form = useForm<PlanFormT>({
    resolver: zodResolver(PlanFormSchema),
    defaultValues: {
      type: "arcade",
      is_yearly: true,
    },
  });

  const [selectedPlans, setSelectedPlans] = useState(
    planOptions.filter((plan) => plan.type === "yearly")
  );

  useEffect(
    function () {
      const planForm = sessionStorage.getItem("planForm");
      const parsedPlanForm: PlanFormT = planForm ? JSON.parse(planForm) : null;

      if (parsedPlanForm) {
        console.log({ parsedPlanForm });
        form.setValue("type", parsedPlanForm.type);
        form.setValue("is_yearly", parsedPlanForm.is_yearly);

        setSelectedPlans(
          planOptions.filter((plan) => {
            return parsedPlanForm.is_yearly
              ? plan.type === "yearly"
              : plan.type === "monthly";
          })
        );
      }
    },
    [form]
  );

  function onSubmit(values: PlanFormT) {
    console.log({ values });

    // save to session storage
    sessionStorage.setItem("planForm", JSON.stringify(values));

    router.push("/add-ons");
  }

  function handleCheckedChange(value: boolean) {
    form.setValue("is_yearly", value);

    setSelectedPlans(
      planOptions.filter((plan) => {
        return value === true
          ? plan.type === "yearly"
          : plan.type === "monthly";
      })
    );
  }

  function handleGoBack() {
    router.push("/");
  }

  return (
    <main>
      <section className="relative h-full min-h-screen py-16">
        <div className="container flex justify-center items-centers mt-6 lg:mt-0">
          {/* Multistep form container */}
          <div className="w-full max-w-4xl flex gap-4 p-4 bg-white rounded-lg shadow-sm">
            {/* Steps */}
            <FormSteps />

            {/* Form */}
            <div className="w-full p-2 lg:py-8 lg:px-16">
              <FormHeader
                title="Select Your Plan"
                description="You have the option of monthly or yearly billing."
              />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div>
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col items-center gap-6 lg:flex-row"
                            >
                              {selectedPlans.map((plan, index) => (
                                <FormItem
                                  key={index}
                                  className={`h-full w-full p-4 border rounded-md ${
                                    field.value === plan.name
                                      ? "border-primaryPurple bg-alabaster"
                                      : "border-lightGray"
                                  }`}
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      className="hidden"
                                      value={plan.name}
                                    />
                                  </FormControl>
                                  <FormLabel className="flex gap-4 font-normal cursor-pointer lg:flex-col">
                                    <Image
                                      src={
                                        plan.name === "arcade"
                                          ? iconArcade
                                          : plan.name === "advanced"
                                          ? iconAdvanced
                                          : iconPro
                                      }
                                      alt="icon plan"
                                      className="mb-8"
                                    />
                                    <div>
                                      <p className="text-base font-medium text-primary mb-0.5">
                                        {`${plan.name
                                          .charAt(0)
                                          .toUpperCase()}${plan.name.slice(1)}`}
                                      </p>
                                      <p className="text-sm font-normal text-darkGray mb-0.5">
                                        {plan.price}
                                      </p>
                                      <p className="text-sm text-primaryBlue">
                                        {plan.desc}
                                      </p>
                                    </div>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-8 py-3 px-4 bg-alabaster rounded-lg">
                    <FormField
                      control={form.control}
                      name="is_yearly"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-center gap-5">
                          <FormLabel
                            className={`text-sm font-medium ${
                              field.value === false
                                ? "text-primary"
                                : "text-darkGray"
                            }`}
                          >
                            Monthly
                          </FormLabel>
                          <FormControl>
                            <Switch
                              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
                              checked={field.value}
                              onCheckedChange={handleCheckedChange}
                            />
                          </FormControl>
                          <FormLabel
                            className={`text-sm font-medium ${
                              field.value === true
                                ? "text-primary"
                                : "text-darkGray"
                            }`}
                          >
                            Yearly
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="hidden justify-between mt-16 lg:flex">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleGoBack}
                    >
                      Go Back
                    </Button>

                    <Button type="submit">Next Step</Button>
                  </div>

                  <div className="fixed bottom-0 left-0 w-full px-2 py-3 flex justify-between mt-16 bg-white lg:hidden">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleGoBack}
                    >
                      Go Back
                    </Button>

                    <Button type="submit">Next Step</Button>
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
