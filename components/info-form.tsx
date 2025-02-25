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

export default function InfoForm({
  handleSubmit,
}: {
  handleSubmit: (currentStep: string, values: InfoFormT) => void;
}) {
  const form = useForm<InfoFormT>({
    resolver: zodResolver(InfoFormSchema),
    defaultValues: {
      name: "",
      email_address: "",
      phone_number: "",
    },
  });

  function onSubmit(values: InfoFormT) {
    handleSubmit("information", values);
  }

  return (
    <>
      <p className="text-lg font-bold text-primary mb-2 lg:text-2xl">
        Personal Info
      </p>
      <p className="text-base text-foreground mb-8">
        Please provide your name, email address, and phone number
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Stephen King" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. stephenking@lorem.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. +1 234 567 890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="block mt-12 ml-auto">
            Next Step
          </Button>
        </form>
      </Form>
    </>
  );
}
