"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import FormSteps from "@/components/form-steps";
import FormHeader from "@/components/form-header";

type PlanOptionT = {
  type: string;
  name: string;
  price: string;
  priceValue: number;
  desc: string | null;
};

type AddOnT = {
  id: string;
  title: string;
  description: string;
  price: string;
  priceValue: number;
  type: string;
};

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

export default function SummaryForm() {
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState<PlanOptionT | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnT[]>([]);

  const totalPrice = useMemo(() => {
    const priceItems = [selectedPlan, ...selectedAddOns]
      .map((item) => item?.priceValue)
      .filter((priceValue): priceValue is number => priceValue !== undefined);
    return priceItems.reduce((sum, priceValue) => sum + priceValue, 0);
  }, [selectedPlan, selectedAddOns]);

  useEffect(function () {
    const parsedInfoForm = sessionStorage.getItem("parsedInfoForm")
      ? JSON.parse(sessionStorage.getItem("infoForm")!)
      : null;
    const parsedPlanForm = sessionStorage.getItem("planForm")
      ? JSON.parse(sessionStorage.getItem("planForm")!)
      : null;
    const parsedAddOns = sessionStorage.getItem("addOnsForm")
      ? JSON.parse(sessionStorage.getItem("addOnsForm")!)
      : null;

    console.log({ parsedInfoForm, parsedPlanForm, parsedAddOns });

    if (parsedInfoForm) {
      console.log(parsedInfoForm);
    }

    if (parsedPlanForm) {
      const planItem =
        planOptions.find((plan) => {
          return (
            plan.name === parsedPlanForm.type &&
            plan.type === (parsedPlanForm.is_yearly ? "yearly" : "monthly")
          );
        }) || null;
      setSelectedPlan(planItem);
    }

    if (parsedAddOns) {
      const addOnItems = parsedAddOns.map((addOnId: string) => {
        return addOnOptions.find((addOn) => addOn.id === addOnId);
      });
      setSelectedAddOns(addOnItems);
    }
  }, []);

  function handleGoBack() {
    router.push("/add-ons");
  }

  function handleSubmit() {
    router.push("/success");
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
            <div className="w-full p-2 lg:py-8 lg:px-16 text-sm">
              <FormHeader
                title="Finishing up"
                description="Double-check everything looks OK before confirming."
              />

              {/* Summary price */}
              <div className="p-5 bg-magnolia rounded-lg">
                {/* Plan */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-lightGray">
                  <div>
                    <p className="text-primaryBlue font-medium">
                      {`${selectedPlan?.name
                        .charAt(0)
                        .toUpperCase()}${selectedPlan?.name.slice(1)}`}{" "}
                      (
                      {`${selectedPlan?.type
                        .charAt(0)
                        .toUpperCase()}${selectedPlan?.type.slice(1)}`}
                      )
                    </p>
                    <button
                      className="font-normal underline hover:text-primaryPurple"
                      onClick={() => router.push("/select-plan")}
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-primaryBlue font-bold">
                    {selectedPlan?.price}
                  </p>
                </div>

                {/* Add ons */}
                {selectedAddOns.map((addOn) => (
                  <div
                    className="flex items-center justify-between mb-3 last:mb-0"
                    key={addOn.id}
                  >
                    <p>{addOn.title}</p>
                    <p className="text-primaryBlue font-normal">
                      {addOn.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total price */}
              <div className="px-5 flex items-center justify-between mt-6">
                <p>
                  Total ({selectedPlan?.type === "monthly" ? "Month" : "Year"})
                </p>
                <p className="text-lg font-bold text-primaryPurple">
                  +${totalPrice}/
                  {selectedPlan?.type === "monthly" ? "mo" : "yr"}
                </p>
              </div>

              <div className="hidden justify-between mt-16 lg:flex">
                <Button type="button" variant="ghost" onClick={handleGoBack}>
                  Go Back
                </Button>

                <Button
                  type="submit"
                  className="bg-primaryPurple"
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-2 py-3 flex justify-between mt-16 bg-white lg:hidden">
          <Button type="button" variant="ghost" onClick={handleGoBack}>
            Go Back
          </Button>

          <Button
            type="submit"
            className="bg-primaryPurple"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </div>
      </section>
    </main>
  );
}
