import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface HeroSectionProps {
  className?: string
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 grid-container [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  )
}

export default function HeroSection({
  className,
  title = "Enterprise AI Solutions",
  subtitle = {
    regular: "Transform Your Business with ",
    gradient: "AI Solutions.",
  },
  description = "Aptivon Solutions delivers enterprise-grade AI automation, cloud infrastructure, and digital transformation services that scale your operations and accelerate growth.",
  ctaText = "Explore Solutions",
  ctaHref = "#services",
  gridOptions,
  ...props
}: HeroSectionProps) {
  const [typewriterText, setTypewriterText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const typewriterWords = ["AI Solutions", "Cloud Infrastructure", "Digital Transformation", "Automation Services"];
  
  useEffect(() => {
    const currentWord = typewriterWords[currentWordIndex];
    const shouldDelete = isDeleting;
    
    const timeout = setTimeout(() => {
      if (!shouldDelete) {
        // Typing
        if (typewriterText.length < currentWord.length) {
          setTypewriterText(currentWord.slice(0, typewriterText.length + 1));
        } else {
          // Finished typing, start deleting after a pause
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (typewriterText.length > 0) {
          setTypewriterText(typewriterText.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % typewriterWords.length);
        }
      }
    }, shouldDelete ? 100 : 150);
    
    return () => clearTimeout(timeout);
  }, [typewriterText, currentWordIndex, isDeleting, typewriterWords]);
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute top-0 z-[0] h-screen w-screen bg-purple-950/10 dark:bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <section className="relative max-w-full mx-auto z-1">
        <RetroGrid {...gridOptions} />
        <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8">
          <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
            <div className="relative group mx-auto w-fit">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <h1 className="relative text-sm font-semibold group mx-auto px-6 py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-full w-fit shadow-lg shadow-black/10 dark:shadow-black/30 backdrop-blur-md hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 text-gray-800 dark:text-gray-200">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {title}
                </span>
                <ChevronRight className="inline w-4 h-4 ml-2 text-purple-500 dark:text-purple-400 group-hover:translate-x-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300" />
              </h1>
            </div>
            <h2 className="text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
              {subtitle.regular}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200">
                {typewriterText}
                <span className="animate-pulse text-purple-500 dark:text-purple-300 ml-1">|</span>
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              {description}
            </p>
            <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                  <a
                    href={ctaHref}
                    className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all sm:w-auto py-4 px-10"
                  >
                    {ctaText}
                  </a>
                </div>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
