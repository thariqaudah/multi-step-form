import Image from "next/image";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlanFormSchema, type PlanFormT } from "@/lib/schema";
import iconArcade from "@/public/icon-arcade.svg";
import iconAdvanced from "@/public/icon-advanced.svg";
import iconPro from "@/public/icon-pro.svg";

export default function PlanForm({
  handleSubmit,
  handleGoBack,
}: {
  handleSubmit: (currentStep: string, values: PlanFormT) => void;
  handleGoBack: (currentStep: string) => void;
}) {
  const form = useForm<PlanFormT>({
    resolver: zodResolver(PlanFormSchema),
    defaultValues: {
      type: "arcade",
    },
  });

  function onSubmit(values: PlanFormT) {
    handleSubmit("plan", values);
  }

  return (
    <>
      <p className="text-lg font-bold text-primary mb-2 lg:text-2xl">
        Select Your Plan
      </p>
      <p className="text-base text-foreground mb-8">
        You have the option of monthly or yearly billing.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-6"
                    >
                      <FormItem
                        className={`h-full w-full p-4 border rounded-md ${
                          field.value === "arcade"
                            ? "border-primaryPurple bg-alabaster"
                            : "border-lightGray"
                        }`}
                      >
                        <FormControl>
                          <RadioGroupItem className="hidden" value="arcade" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Image
                            src={iconArcade}
                            alt="icon arcade"
                            className="mb-6"
                          />
                          <p className="text-base font-medium text-primary">
                            Arcade
                          </p>
                          <p className="text-sm font-normal text-darkGray">
                            $9/mo
                          </p>
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className={`h-full w-full p-4 border rounded-md ${
                          field.value === "advanced"
                            ? "border-primaryPurple bg-alabaster"
                            : "border-lightGray"
                        }`}
                      >
                        <FormControl>
                          <RadioGroupItem className="hidden" value="advanced" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Image
                            src={iconAdvanced}
                            alt="icon advanced"
                            className="mb-6"
                          />
                          <p className="text-base font-medium text-primary">
                            Advanced
                          </p>
                          <p className="text-sm font-normal text-darkGray">
                            $12/mo
                          </p>
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className={`h-full w-full p-4 border rounded-md ${
                          field.value === "pro"
                            ? "border-primaryPurple bg-alabaster"
                            : "border-lightGray"
                        }`}
                      >
                        <FormControl>
                          <RadioGroupItem className="hidden" value="pro" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Image
                            src={iconPro}
                            alt="icon pro"
                            className="mb-6"
                          />
                          <p className="text-base font-medium text-primary">
                            Pro
                          </p>
                          <p className="text-sm font-normal text-darkGray">
                            $15/mo
                          </p>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between mt-12">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleGoBack("plan")}
            >
              Go Back
            </Button>

            <Button type="submit">Next Step</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
