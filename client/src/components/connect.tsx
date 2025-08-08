"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MessageCircle, Sparkles } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

import { HighlighterItem, HighlightGroup, Particles } from "@/components/ui/highlighter";

export function Connect() {
  const [scope, setScope] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!scope) return;

    const animatePointer = () => {
      const pointer = scope.querySelector("#pointer");
      const javascript = scope.querySelector("#javascript");
      const reactJs = scope.querySelector("#react-js");
      const typescript = scope.querySelector("#typescript");
      const nextJs = scope.querySelector("#next-js");

      if (!pointer || !javascript || !reactJs || !typescript || !nextJs) return;

      const sequence = [
        () => {
          (pointer as HTMLElement).style.left = '200px';
          (pointer as HTMLElement).style.top = '60px';
          (javascript as HTMLElement).style.opacity = '1';
        },
        () => {
          (pointer as HTMLElement).style.left = '50px';
          (pointer as HTMLElement).style.top = '102px';
          (javascript as HTMLElement).style.opacity = '0.4';
          (reactJs as HTMLElement).style.opacity = '1';
        },
        () => {
          (pointer as HTMLElement).style.left = '224px';
          (pointer as HTMLElement).style.top = '170px';
          (reactJs as HTMLElement).style.opacity = '0.4';
          (typescript as HTMLElement).style.opacity = '1';
        },
        () => {
          (pointer as HTMLElement).style.left = '88px';
          (pointer as HTMLElement).style.top = '198px';
          (typescript as HTMLElement).style.opacity = '0.4';
          (nextJs as HTMLElement).style.opacity = '1';
        },
        () => {
          (pointer as HTMLElement).style.left = '200px';
          (pointer as HTMLElement).style.top = '60px';
          (nextJs as HTMLElement).style.opacity = '0.5';
        }
      ];

      let currentStep = 0;
      const runAnimation = () => {
        sequence[currentStep]();
        currentStep = (currentStep + 1) % sequence.length;
        setTimeout(runAnimation, 1000);
      };

      runAnimation();
    };

    animatePointer();
  }, [scope]);

  return (
    <section className="relative mx-auto mb-20 mt-6 max-w-5xl">
      <HighlightGroup className="group h-full">
        <div
          className="group/item h-full md:col-span-6 lg:col-span-12"
          data-aos="fade-down"
        >
          <HighlighterItem className="rounded-3xl p-6">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-black">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={200}
                color={"#555555"}
                vy={-0.2}
              />
              <div className="flex justify-center">
                <div className="flex h-full flex-col justify-center gap-10 p-4 md:h-[300px] md:flex-row">
                  <div
                    className="relative mx-auto h-[270px] w-[300px] md:h-[270px] md:w-[300px]"
                    ref={(el) => el && setScope(el)}
                  >
                    <Sparkles className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
                    <div
                      id="next-js"
                      className="absolute bottom-12 left-14 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      UI-UX
                    </div>
                    <div
                      id="react-js"
                      className="absolute left-2 top-20 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Graphic Design
                    </div>
                    <div
                      id="typescript"
                      className="absolute bottom-20 right-1 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Web Application
                    </div>
                    <div
                      id="javascript"
                      className="absolute right-12 top-10 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Branding
                    </div>

                    <div id="pointer" className="absolute transition-all duration-500 ease-in-out">
                      <svg
                        width="16.8"
                        height="18.2"
                        viewBox="0 0 12 13"
                        className="fill-red-500"
                        stroke="white"
                        strokeWidth="1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                        />
                      </svg>
                      <span className="relative -top-1 left-3 rounded-3xl bg-red-500 px-2 py-1 text-xs text-white">
                        Ali
                      </span>
                    </div>
                  </div>

                  <div className="-mt-20 flex h-full flex-col justify-center p-2 md:-mt-4 md:ml-10 md:w-[400px]">
                    <div className="flex flex-col items-center">
                      <h3 className="mt-6 pb-1 font-bold">
                        <span className="text-2xl md:text-4xl">
                          Any questions about Design?
                        </span>
                      </h3>
                    </div>
                    <p className="mb-4 text-slate-400">
                      Feel free to reach out to me!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://cal.com/aliimam/designali"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>Book a call</Button>
                      </a>
                      <a
                        href="mailto:contact@designali.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                        )}
                      >
                        <span className="flex items-center gap-1">
                          <Mail strokeWidth={1} className="h-5 w-5" />
                        </span>
                      </a>
                      <a
                        href="https://wa.me/917678432186"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                        )}
                      >
                        <span className="flex items-center gap-1">
                          <MessageCircle
                            strokeWidth={1}
                            className="h-4 w-4"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  );
}