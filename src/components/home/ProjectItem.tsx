import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface ProjectProps {
  index: number;
  title: string;
  year: string;
  domain: string;
  role: string;
  statement: string;
  image: string;
  choreography: "float" | "sink" | "spin" | "drift" | "pop" | "glitch";
}

export function ProjectItem({ index, title, year, domain, role, statement, image, choreography }: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;

  // BASE CONTAINER ANIMATION (The "Thought" entering)
  const getContainerAnimations = () => {
    switch (choreography) {
      case "float":
        return {
          y: useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["40%", "0%", "0%", "-40%"]),
        };
      case "drift":
        return {
          y: useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["20%", "0%", "0%", "-20%"]),
        };
      case "sink":
        return {
          y: useTransform(scrollYProgress, [0, 0.5, 0.6, 1], ["0%", "0%", "0%", "-20%"]),
        };
      default:
        return {
          y: useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["20%", "0%", "0%", "-20%"]),
        };
    }
  };

  const container = getContainerAnimations();

  // IMAGE (The "Object gains form")
  // Starts small/blurred deep in Z, moves forward
  const imgZ = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 1], [-500, 0, 0, -300]);
  const imgScale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 1], [0.5, 1, 1, 0.8]);
  const imgBlur = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 1], ["blur(30px)", "blur(0px)", "blur(0px)", "blur(20px)"]);
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // TITLE (The "Title resolves")
  // Enters slightly after the image, crossing X
  const titleX = useTransform(scrollYProgress, [0.2, 0.45, 0.6, 1], [isEven ? "30%" : "-30%", "0%", "0%", isEven ? "-10%" : "10%"]);
  const titleBlur = useTransform(scrollYProgress, [0.2, 0.45, 0.6, 1], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 1], [0, 1, 1, 0]);

  // METADATA & STATEMENT (The "Metadata locks into place")
  // Enters last, sliding up
  const metaY = useTransform(scrollYProgress, [0.3, 0.5, 0.6, 1], ["50%", "0%", "0%", "-20%"]);
  const metaBlur = useTransform(scrollYProgress, [0.3, 0.5, 0.6, 1], ["blur(15px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const metaOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 1], [0, 1, 1, 0]);

  // Background fragments
  const fragY1 = useTransform(scrollYProgress, [0, 1], ["60%", "-60%"]);
  const fragY2 = useTransform(scrollYProgress, [0, 1], ["90%", "-90%"]);
  const fragY3 = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);

  return (
    <div ref={ref} className="relative w-full min-h-[100vh] py-20 flex items-center justify-center overflow-hidden" style={{ perspective: "1500px" }}>
      
      {/* Background Idea Fragments */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-40">
        <motion.div style={{ y: fragY1, x: isEven ? "10%" : "-10%" }} className="absolute top-[20%] left-[20%] font-mono text-[8px] tracking-[0.5em] text-[#00ff80] opacity-50">
          IDEA // {year}
        </motion.div>
        <motion.div style={{ y: fragY2, x: isEven ? "-20%" : "20%" }} className="absolute top-[60%] right-[15%] font-mono text-[10px] tracking-[0.4em] text-ivory/30">
          FRAGMENT // FORM // {domain.toUpperCase()}
        </motion.div>
        <motion.div style={{ y: fragY3 }} className="absolute top-[40%] left-[50%] w-[1px] h-32 bg-gradient-to-b from-transparent via-[#00ff80] to-transparent opacity-30" />
      </div>

      <motion.div 
        style={{ y: container.y }}
        className="foundry-container w-full relative z-10"
      >
        <div 
          className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* IMAGE */}
          <motion.div style={{ scale: imgScale, z: imgZ, filter: imgBlur, opacity: imgOpacity }} className="w-full lg:w-3/5 relative transform-gpu">
            <motion.div 
              animate={{ 
                rotateX: isHovered ? (isEven ? 5 : -5) : 0,
                rotateY: isHovered ? (isEven ? -10 : 10) : 0,
                z: isHovered ? 40 : 0,
                scale: isHovered ? 1.02 : 1,
                boxShadow: isHovered ? "0 30px 60px rgba(0,255,128,0.15), 0 0 40px rgba(0,0,0,0.8)" : "0 10px 30px rgba(0,0,0,0.5)"
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[4/3] lg:aspect-[3/4] relative overflow-hidden bg-charcoal group rounded-sm"
              data-cursor="explore"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700 bg-[linear-gradient(45deg,rgba(0,255,128,0.2),rgba(75,42,143,0.3),rgba(200,69,27,0.2))]" />
              
              <div className="absolute inset-0 bg-ink/30 group-hover:bg-transparent transition-colors duration-700 z-10" />
              
              {image ? (
                <motion.img 
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#00ff80]/20 font-mono text-xs">NO ASSET</span>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* TEXT CONTENT */}
          <div className={`w-full lg:w-2/5 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
            <div className="relative z-10 w-full flex flex-col">
              
              {/* METADATA */}
              <motion.div style={{ y: metaY, opacity: metaOpacity, filter: metaBlur }} className={`flex gap-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#00ff80]/70 mb-8 flex-wrap ${isEven ? 'justify-start' : 'justify-end lg:justify-end justify-start'} w-full`}>
                <span>{year}</span>
                <span className="hidden sm:inline">/</span>
                <span>{domain}</span>
                <span className="hidden sm:inline">/</span>
                <span>{role}</span>
              </motion.div>
              
              {/* TITLE */}
              <motion.h3 
                style={{ x: titleX, opacity: titleOpacity, filter: titleBlur }}
                animate={isHovered ? { x: isEven ? 10 : -10 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[10vw] sm:text-5xl lg:text-7xl leading-[0.9] tracking-tight text-ivory uppercase mb-6 sm:mb-8 mix-blend-difference w-full block"
              >
                {title}
              </motion.h3>
              
              {/* STATEMENT */}
              <motion.p 
                style={{ y: metaY, opacity: metaOpacity, filter: metaBlur }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
                className="font-sans text-xs sm:text-sm leading-relaxed text-ivory/80 max-w-sm w-full"
              >
                {statement}
              </motion.p>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
