import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const rawIcons = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "TensorFlow", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Arduino", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" },
];

function StreamLayer({
  icons,
  direction,
  speed,
  scale,
  mobileScale,
  opacity,
  blur,
  yOffset,
  velocityFactor,
}: {
  icons: typeof rawIcons;
  direction: 1 | -1;
  speed: number;
  scale: number;
  mobileScale: number;
  opacity: number;
  blur: number;
  yOffset: string;
  velocityFactor: number;
}) {
  const [x, setX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityMultiplier = useTransform(smoothVelocity, [-1000, 0, 1000], [1 + velocityFactor, 1, 1 + velocityFactor]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      const currentVelo = velocityMultiplier.get();
      const moveAmount = speed * currentVelo * deltaTime * direction;
      
      setX(prev => {
        let next = prev + moveAmount;
        if (direction === 1 && next > 100) next = -100;
        if (direction === -1 && next < -100) next = 100;
        return next;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, speed, velocityMultiplier]);

  const activeIcons = isMobile ? icons.slice(0, Math.max(3, Math.ceil(icons.length * 0.6))) : icons;
  const loopingIcons = [...activeIcons, ...activeIcons];
  const currentScale = isMobile ? mobileScale : scale;

  let shadow = "none";
  if (blur === 0) shadow = "drop-shadow(0 2px 8px rgba(0,0,0,0.4))";
  else if (blur < 10) shadow = "drop-shadow(0 2px 4px rgba(0,0,0,0.2))";

  return (
    <div 
      className="absolute left-0 right-0 flex items-center pointer-events-none"
      style={{
        top: yOffset,
        opacity,
        filter: `blur(${blur}px)`,
        transform: `translateZ(${blur === 0 ? 100 : -blur * 10}px)`, 
      }}
    >
      <motion.div
        className="flex gap-10 sm:gap-32 w-max"
        style={{ x: `${x}vw` }}
        whileHover={{ scale: 1.02 }}
      >
        {loopingIcons.map((icon, i) => {
          const seed = i + 1;
          const seededRandom = (s: number) => {
            const val = Math.sin(s) * 10000;
            return val - Math.floor(val);
          };
          
          const randomY = seededRandom(seed * 13) * 30 - 15;
          const randomRot = seededRandom(seed * 17) * 6 - 3;
          const randomScale = seededRandom(seed * 19) * 0.2 + 0.9;

          return (
            <motion.div
              key={i}
              className="flex-shrink-0 flex items-center justify-center grayscale transition-all duration-500"
              style={{ 
                width: `${currentScale}px`, 
                height: `${currentScale}px`,
                filter: shadow,
                animation: `pulse ${3 + (i % 3)}s infinite alternate ease-in-out`
              }}
              initial={{ y: randomY, rotate: randomRot, scale: randomScale }}
            >
              <img src={icon.src} alt={icon.name} className="w-full h-full object-contain" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function TechStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocitySkew = useTransform(smoothVelocity, [-1000, 0, 1000], [5, 0, -5]);
  const velocityScale = useTransform(smoothVelocity, [-1000, 0, 1000], [1.1, 1, 1.1]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100vh] w-full bg-ink text-ivory overflow-hidden flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 grain pointer-events-none z-10 mix-blend-overlay opacity-30" />
      
      {/* Main typographic anchor */}
      <motion.div 
        style={{ scale: velocityScale, skewY: velocitySkew }}
        className="relative z-20 text-center pointer-events-none transform-gpu drop-shadow-2xl bg-ink/30 px-12 py-8 rounded-[4rem] backdrop-blur-md border border-ivory/10"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#00ff80] block mb-6">
          [ 02 ] Technical Capabilities
        </span>
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase text-ivory/90">
          Material <br />
          <span className="text-ivory/50 italic">Architecture</span>
        </h2>
      </motion.div>

      {/* Autonomous Layers */}
      <div className="absolute inset-0 z-0" style={{ transformStyle: "preserve-3d" }}>
        {/* Layer 4: Deep Background (Slowest, Heavily Blurred) */}
        <StreamLayer 
          icons={rawIcons.slice().reverse()} 
          direction={-1} 
          speed={1.5} 
          scale={40}
          mobileScale={28}
          opacity={0.15} 
          blur={10} 
          yOffset="15%" 
          velocityFactor={0.5} 
        />

        {/* Layer 3: Mid-Background */}
        <StreamLayer 
          icons={rawIcons} 
          direction={1} 
          speed={2.5} 
          scale={56}
          mobileScale={36}
          opacity={0.25} 
          blur={6} 
          yOffset="35%" 
          velocityFactor={1.0} 
        />

        {/* Layer 2: Mid-Foreground */}
        <StreamLayer 
          icons={rawIcons.slice(0, 8)} 
          direction={-1} 
          speed={4} 
          scale={72}
          mobileScale={44}
          opacity={0.4} 
          blur={3} 
          yOffset="65%" 
          velocityFactor={1.5} 
        />

        {/* Layer 1: Sharp Foreground (Fastest) */}
        <StreamLayer 
          icons={rawIcons.slice(6, 12)} 
          direction={1} 
          speed={6} 
          scale={96}
          mobileScale={56}
          opacity={0.7} 
          blur={0} 
          yOffset="80%" 
          velocityFactor={2.0} 
        />
      </div>
    </section>
  );
}
