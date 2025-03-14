import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import bgSidebarMobile from "@/public/bg-sidebar-mobile.svg";
import bgSidebarDesktop from "@/public/bg-sidebar-desktop.svg";

export default function FormSteps() {
  const pathname = usePathname();
  const [bgImage, setBgImage] = useState(bgSidebarMobile.src);

  const [currentStep, setCurrentStep] = useState<number | null>(null);

  useEffect(() => {
    if (pathname === "/") {
      setCurrentStep(1);
    } else if (pathname === "/select-plan") {
      setCurrentStep(2);
    } else if (pathname === "/add-ons") {
      setCurrentStep(3);
    } else if (pathname === "/summary" || pathname === "/success") {
      setCurrentStep(4);
    } else {
      setCurrentStep(null);
    }
  }, [pathname]);

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth >= 768) {
        setBgImage(bgSidebarDesktop.src);
      } else {
        setBgImage(bgSidebarMobile.src);
      }
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <ol
      className={`absolute left-0 top-0 w-screen -z-20 pt-8 pb-24 flex flex-row justify-center gap-4 bg-center bg-cover lg:basis-1/3 lg:flex-col lg:justify-start lg:rounded-lg lg:h-auto lg:gap-8 lg:p-6 lg:relative lg:z-0 lg:top-auto lg:left-auto lg:w-auto`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <li className="flex items-center gap-3">
        <div
          className={`flex justify-center items-center w-4 h-4 p-3.5 text-xs font-medium rounded-full border border-white ${
            currentStep === 1
              ? "bg-primaryBlue-foreground text-primaryBlue"
              : "bg-transparent text-white"
          }`}
        >
          1
        </div>
        <div className="hidden lg:block">
          <p className="text-xs text-lightGray uppercase mb-0.5">Step 1</p>
          <p className="text-xs uppercase font-medium tracking-wider text-alabaster">
            Your Info
          </p>
        </div>
      </li>
      <li className="flex items-center gap-3">
        <div
          className={`flex justify-center items-center w-4 h-4 p-3.5 text-xs font-medium rounded-full border border-white ${
            currentStep === 2
              ? "bg-primaryBlue-foreground text-primaryBlue"
              : "bg-transparent text-white"
          }`}
        >
          2
        </div>
        <div className="hidden lg:block">
          <p className="text-xs text-lightGray uppercase mb-0.5">Step 2</p>
          <p className="text-xs uppercase font-medium tracking-wider text-alabaster">
            Select Plan
          </p>
        </div>
      </li>
      <li className="flex items-center gap-3">
        <div
          className={`flex justify-center items-center w-4 h-4 p-3.5 text-xs font-medium rounded-full border border-white ${
            currentStep === 3
              ? "bg-primaryBlue-foreground text-primaryBlue"
              : "bg-transparent text-white"
          }`}
        >
          3
        </div>
        <div className="hidden lg:block">
          <p className="text-xs text-lightGray uppercase mb-0.5">Step 3</p>
          <p className="text-xs uppercase font-medium tracking-wider text-alabaster">
            Add-Ons
          </p>
        </div>
      </li>
      <li className="flex items-center gap-3">
        <div
          className={`flex justify-center items-center w-4 h-4 p-3.5 text-xs font-medium rounded-full border border-white ${
            currentStep === 4
              ? "bg-primaryBlue-foreground text-primaryBlue"
              : "bg-transparent text-white"
          }`}
        >
          4
        </div>
        <div className="hidden lg:block">
          <p className="text-xs text-lightGray uppercase mb-0.5">Step 4</p>
          <p className="text-xs uppercase font-medium tracking-wider text-alabaster">
            Summary
          </p>
        </div>
      </li>
    </ol>
  );
}
