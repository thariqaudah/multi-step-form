"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddOnsFormSchema, PlanFormT, type AddOnsFormT } from "@/lib/schema";
import FormSteps from "@/components/form-steps";
import FormHeader from "@/components/form-header";

const addOnOptions = [
  {
    id: "online-service-monthly",
    title: "Online service",
    description: "Access to multiplayer games",
    price: "+$1/mo",
    priceValue: 1,
    type: "monthly",
  },
  {
    id: "larger-storage-monthly",
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: "+$2/mo",
    priceValue: 2,
    type: "monthly",
  },
  {
    id: "customizable-profile-monthly",
    title: "Customizable profile",
    description: "Custom theme on your profile",
    price: "+$2/mo",
    priceValue: 2,
    type: "monthly",
  },
  {
    id: "online-service-yearly",
    title: "Online service",
    description: "Access to multiplayer games",
    price: "+$10/yr",
    priceValue: 10,
    type: "yearly",
  },
  {
    id: "larger-storage-yearly",
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: "+$20/yr",
    priceValue: 20,
    type: "yearly",
  },
  {
    id: "customizable-profile-yearly",
    title: "Customizable profile",
    description: "Custom theme on your profile",
    price: "+$20/yr",
    priceValue: 20,
    type: "yearly",
  },
];

export default function AddOnsForm() {
  const router = useRouter();
  const form = useForm<AddOnsFormT>({
    resolver: zodResolver(AddOnsFormSchema),
    defaultValues: {
      add_ons: [],
    },
  });
  const [addOns, setAddons] = useState(() =>
    addOnOptions.filter((addOn) => addOn.type === "monthly")
  );

  useEffect(function () {
    const addOnsForm = sessionStorage.getItem("addOnsForm");
    const planForm = sessionStorage.getItem("planForm");
    const parsedAddOnsForm = addOnsForm ? JSON.parse(addOnsForm) : null;
    const parsedPlanForm: PlanFormT = planForm ? JSON.parse(planForm) : null;

    console.log({ parsedAddOnsForm, parsedPlanForm });

    // check selected plan
    if (parsedPlanForm?.is_yearly) {
      setAddons(addOnOptions.filter((addOn) => addOn.type === "yearly"));
    }

    if (parsedAddOnsForm) {
      const filteredAddOns = parsedAddOnsForm.filter((addOn: string) => {
        return parsedPlanForm?.is_yearly
          ? addOn.includes("yearly")
          : addOn.includes("monthly");
      });
      form.setValue("add_ons", filteredAddOns);
    }
  }, []);

  function handleGoBack() {
    router.push("/select-plan");
  }

  function onSubmit(values: AddOnsFormT) {
    console.log({ values });

    // save to session storage
    sessionStorage.setItem("addOnsForm", JSON.stringify(values.add_ons));

    router.push("/summary");
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
                title="Pick add-ons"
                description="Add-ons help enhance your gaming experience."
              />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="add_ons"
                      render={() => (
                        <FormItem className="flex flex-col space-y-4">
                          {addOns.map((addOn) => (
                            <FormField
                              key={addOn.id}
                              control={form.control}
                              name="add_ons"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={addOn.id}
                                    className={`flex flex-row items-center space-x-5 space-y-0 px-5 py-4 rounded-md border hover:border-primaryBlue ${
                                      field.value?.includes(addOn.id)
                                        ? "bg-alabaster border-primaryPurple"
                                        : "bg-white border-lightGray"
                                    }`}
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          addOn.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                addOn.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== addOn.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="w-full flex justify-between items-center cursor-pointer">
                                      <div>
                                        <p className="text-sm font-medium text-primaryBlue">
                                          {addOn.title}
                                        </p>
                                        <p className="text-sm font-normal text-darkGray">
                                          {addOn.description}
                                        </p>
                                      </div>
                                      <p className="text-sm font-normal text-primaryPurple">
                                        {addOn.price}
                                      </p>
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
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
