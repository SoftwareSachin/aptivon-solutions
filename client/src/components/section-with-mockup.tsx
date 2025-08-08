// components/SectionWithMockup.tsx
'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Maximize2, Sparkles } from "lucide-react";
import { Squares } from "@/components/squares-background";

interface SectionWithMockupProps {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    primaryImageSrc?: string;
    secondaryImageSrc?: string;
    reverseLayout?: boolean;
    youtubeUrl?: string;
    showVideo?: boolean;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    reverseLayout = false,
    youtubeUrl,
    showVideo = false,
}) => {
    const [showEmbedded, setShowEmbedded] = useState(false);

    const handleWatchHere = () => {
        setShowEmbedded(true);
    };

    const handleOpenYouTube = () => {
        if (youtubeUrl) {
            window.open(youtubeUrl, '_blank');
        }
    };

    const containerVariants = {
        hidden: {},
        visible: {
             transition: {
                staggerChildren: 0.2,
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const layoutClasses = reverseLayout
        ? "md:grid-cols-2 md:grid-flow-col-dense"
        : "md:grid-cols-2";

    const textOrderClass = reverseLayout ? "md:col-start-2" : "";
    const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

    return (
        <section className="relative py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-32 overflow-hidden">
            {/* Squares Background - Same as Star Project */}
            <div className="absolute inset-0 w-full h-full">
                <Squares 
                    direction="diagonal"
                    speed={0.5}
                    borderColor="rgba(147, 197, 253, 0.3)"
                    squareSize={50}
                    hoverFillColor="rgba(147, 197, 253, 0.2)"
                    className="opacity-100"
                />
            </div>
            
            {/* Light gradient overlay for text readability - Same as Star Project */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/30 to-purple-900/20"></div>

            <div className="container max-w-[1220px] w-full px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 relative z-10 mx-auto">
                <motion.div
                     className={`grid grid-cols-1 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 w-full items-center ${layoutClasses}`}
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Text Content */}
                    <motion.div
                        className={`flex flex-col items-start gap-4 xs:gap-5 sm:gap-6 mt-4 xs:mt-6 sm:mt-8 md:mt-0 max-w-full md:max-w-[546px] mx-auto md:mx-0 px-2 xs:px-0 ${textOrderClass}`}
                        variants={itemVariants}
                    >
                         <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                            <h2 className="text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-semibold leading-tight sm:leading-snug md:leading-tight lg:leading-[53px] text-center md:text-left">
                                {title}
                            </h2>
                        </div>

                        <p className="text-[#868f97] text-sm xs:text-base sm:text-lg md:text-[15px] leading-relaxed xs:leading-6 sm:leading-7 md:leading-6 text-center md:text-left max-w-lg mx-auto md:mx-0">
                            {description}
                        </p>
                    </motion.div>

                    {/* Video/Image Content */}
                    <motion.div
                        className={`relative mt-6 xs:mt-8 sm:mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[480px] px-2 xs:px-0`}
                        variants={itemVariants}
                    >
                        {showVideo && youtubeUrl ? (
                            <div className="relative w-full h-[200px] xs:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] mx-auto">
                                <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                                    {!showEmbedded ? (
                                        <>
                                            {/* Video thumbnail overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-blue-900/30 flex items-center justify-center">
                                                <div className="relative">
                                                    {/* Pulsing rings around play button */}
                                                    <div className="absolute inset-0 rounded-full bg-white/20"></div>
                                                    <div className="absolute inset-2 rounded-full bg-white/30"></div>
                                                    
                                                    <Button
                                                        size="lg"
                                                        onClick={handleWatchHere}
                                                        className="relative bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white text-slate-900 rounded-full w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 p-0 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-500 group-hover:scale-125 z-10"
                                                    >
                                                        <Play className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 ml-0.5 xs:ml-1 fill-current" />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/* Video info overlay */}
                                            <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 left-2 xs:left-3 sm:left-4 md:left-6 right-2 xs:right-3 sm:right-4 md:right-6">
                                                <div className="bg-black/70 backdrop-blur-xl rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-white/10">
                                                    <h3 className="text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1 xs:mb-2 sm:mb-3 flex items-center gap-2 xs:gap-3">
                                                        <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                                                        <span className="truncate">OPPB Demo Video</span>
                                                    </h3>
                                                    <div className="flex items-center gap-2 xs:gap-3 text-white/90 text-xs xs:text-sm sm:text-base md:text-lg">
                                                        <Play className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                                                        <span className="truncate">Watch complete demonstration</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Floating tech elements */}
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                                            </div>
                                        </>
                                    ) : (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`${youtubeUrl}?autoplay=1&mute=1`}
                                            title="OPPB Demo Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="rounded-2xl"
                                        ></iframe>
                                    )}
                                </div>

                                {/* Video Action Buttons */}
                                <div className="mt-4 xs:mt-5 sm:mt-6 flex justify-center px-2">
                                    {!showEmbedded ? (
                                        <Button
                                            onClick={handleWatchHere}
                                            className="px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl transform hover:scale-105 sm:hover:scale-110 transition-all duration-500 text-sm xs:text-base w-full xs:w-auto max-w-xs"
                                        >
                                            <Play className="w-4 h-4 xs:w-5 xs:h-5 mr-2 xs:mr-3" />
                                            Watch Here
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleOpenYouTube}
                                            className="px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-2xl transform hover:scale-105 sm:hover:scale-110 transition-all duration-500 text-sm xs:text-base w-full xs:w-auto max-w-xs"
                                        >
                                            <Maximize2 className="w-4 h-4 xs:w-5 xs:h-5 mr-2 xs:mr-3" />
                                            Watch on YouTube
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // Original image display logic
                            <>
                                {/* Decorative Background Element */}
                                <motion.div
                                     className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#090909] rounded-[32px] z-0`}
                                     style={{
                                        top: reverseLayout ? 'auto' : '10%',
                                        bottom: reverseLayout ? '10%' : 'auto',
                                        left: reverseLayout ? 'auto' : '-20%',
                                        right: reverseLayout ? '-20%' : 'auto',
                                        transform: reverseLayout ? 'translate(0, 0)' : 'translateY(10%)',
                                        filter: 'blur(2px)'
                                    }}
                                    initial={{ y: reverseLayout ? 0 : 0 }}
                                    whileInView={{ y: reverseLayout ? -20 : -30 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    viewport={{ once: true, amount: 0.5 }}
                                >
                                    {secondaryImageSrc && (
                                        <div
                                            className="relative w-full h-full bg-cover bg-center rounded-[32px]"
                                            style={{
                                                backgroundImage: `url(${secondaryImageSrc})`,
                                            }}
                                        />
                                    )}
                                </motion.div>

                                {/* Main Mockup Card */}
                                <motion.div
                                    className="relative w-full h-[405px] md:h-[637px] bg-[#ffffff0a] rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
                                    initial={{ y: reverseLayout ? 0 : 0 }}
                                    whileInView={{ y: reverseLayout ? 20 : 30 }}
                                     transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                                     viewport={{ once: true, amount: 0.5 }}
                                >
                                    <div className="p-0 h-full">
                                        <div
                                            className="h-full relative"
                                            style={{
                                                backgroundSize: "100% 100%",
                                            }}
                                        >
                                            {/* Primary Image */}
                                            {primaryImageSrc && (
                                                <div
                                                    className="w-full h-full bg-cover bg-center"
                                                    style={{
                                                        backgroundImage: `url(${primaryImageSrc})`,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative bottom gradient */}
            <div
                className="absolute w-full h-px bottom-0 left-0 z-0"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
                }}
            />
        </section>
    );
};

export default SectionWithMockup;