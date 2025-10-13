import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { type RefObject, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  navItems: {
    name: string;
    link: string;
  }[];
  visible: boolean;
}

export function Navigation() {
  const navItems = [
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "Pricing",
      link: "/#pricing",
    },
    {
      name: "FAQ",
      link: "/#faq",
    },
    {
      name: "Blog",
      link: "/#blog",
    },
    {
      name: "Contact",
      link: "/#contact",
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div className="fixed inset-x-0 top-0 z-50 w-full" ref={ref}>
      <DesktopNav navItems={navItems} visible={visible} />
      <MobileNav navItems={navItems} visible={visible} />
    </motion.div>
  );
}

function DesktopNav({ navItems, visible }: NavbarProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
        visible && "bg-white/80 dark:bg-neutral-950/80"
      )}
      onMouseLeave={() => {
        setHovered(null);
      }}
      style={{
        minWidth: "800px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
    >
      <Logo />
      <motion.div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 font-medium text-sm text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
        {navItems.map((navItem, idx: number) => (
          <Link
            className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
            key={`link=${idx}`}
            onMouseEnter={() => setHovered(idx)}
            to={navItem.link}
          >
            {hovered === idx && (
              <motion.div
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                layoutId="hovered"
              />
            )}
            <span className="relative z-20">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
      <div className="flex items-center gap-4">
        <ModeToggle />

        <AnimatePresence initial={false} mode="popLayout">
          {!visible && (
            <motion.div
              animate={{
                x: 0,
                opacity: [0, 0, 1],
              }}
              exit={{
                x: 100,
                opacity: [0, 0, 0],
              }}
              initial={{
                x: 100,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <Button className="hidden md:block" variant="ghost">
                Log in
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <Button className="hidden bg-primary text-white hover:bg-primary/90 md:block">
          Join the waitlist
        </Button>
      </div>
    </motion.div>
  );
}

function MobileNav({ navItems, visible }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          width: visible ? "90%" : "100%",
          y: visible ? 20 : 0,
          borderRadius: open ? "4px" : "2rem",
          paddingRight: visible ? "12px" : "0px",
          paddingLeft: visible ? "12px" : "0px",
        }}
        className={cn(
          "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
          visible && "bg-white/80 dark:bg-neutral-950/80"
        )}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Logo />
          {open ? (
            <X
              className="text-black dark:text-white"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Menu
              className="text-black dark:text-white"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950"
              exit={{ opacity: 0 }}
              initial={{
                opacity: 0,
              }}
            >
              {navItems.map((navItem, idx: number) => (
                <Link
                  className="relative text-neutral-600 dark:text-neutral-300"
                  key={`link=${idx}`}
                  onClick={() => setOpen(false)}
                  to={navItem.link}
                >
                  <motion.span className="block">{navItem.name} </motion.span>
                </Link>
              ))}
              <Button
                className="block w-full md:hidden"
                onClick={() => setOpen(false)}
                variant="outline"
              >
                Log in
              </Button>
              <Button
                className="block w-full bg-primary text-white hover:bg-primary/90 md:hidden"
                onClick={() => setOpen(false)}
              >
                Join the waitlist
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
