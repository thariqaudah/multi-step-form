"use client";

import Image from "next/image";
import iconThankYou from "@/public/icon-thank-you.svg";
import FormSteps from "@/components/form-steps";

export default function SuccessPage() {
  return (
    <main>
      <section className="relative h-full min-h-screen py-16">
        <div className="container flex justify-center items-center mt-6 lg:mt-0">
          {/* Multistep form container */}
          <div className="w-full max-w-4xl min-h-[400px] flex gap-4 p-4 bg-white rounded-lg shadow-sm lg:min-h-[500px]">
            {/* Steps */}
            <FormSteps />

            {/* Form */}
            <div className="w-full p-2 lg:py-8 lg:px-16 text-center flex justify-center items-center">
              <div>
                <Image
                  src={iconThankYou}
                  alt="Thank you icon"
                  className="w-22 mb-6 mx-auto"
                />
                <p className="text-3xl font-bold text-primaryBlue mb-4">
                  Thank you!
                </p>
                <p className="text-base">
                  Thanks for confirming your subscription! We hope you have fun
                  using our platform. If you ever need support, please feel free
                  to email us at support@loremgaming.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
