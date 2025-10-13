import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";
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
      link: "#features",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    },
    {
      name: "FAQ",
      link: "#faq",
    },
    {
      name: "Contact",
      link: "#contact",
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

  // Body scroll lock when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Animation variants for the dropdown container
  const dropdownVariants = {
    closed: {
      scaleY: 0,
      opacity: 0,
      height: 0,
      transition: {
        scaleY: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.25, ease: "easeOut" },
        height: { duration: 0.3, ease: "easeInOut" },
      },
    },
    open: {
      scaleY: 1,
      opacity: 1,
      height: "auto",
      transition: {
        scaleY: { duration: 0.4, ease: "easeOut" },
        opacity: { duration: 0.3, ease: "easeIn" },
        height: { duration: 0.4, ease: "easeOut" },
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  // Animation variants for individual menu items
  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        opacity: { duration: 0.2, ease: "easeOut" },
        y: { duration: 0.2, ease: "easeIn" },
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.3, ease: "easeIn" },
        y: { duration: 0.3, ease: "easeOut" },
      },
    },
  };

  return (
    <>
      {/* Backdrop blur overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            transition={{
              duration: 0.3,
              delay: 0.25, // Delay so backdrop appears when menu is almost open
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          backdropFilter: visible || open ? "blur(10px)" : "none",
          boxShadow: visible || open
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          width: visible ? "90%" : "100%",
          y: visible ? 20 : 0,
          borderRadius: open ? "1rem 1rem 0.5rem 0.5rem" : "2rem",
        }}
        className={cn(
          "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-4 py-2 lg:hidden overflow-hidden",
          (visible || open) && "bg-white/80 dark:bg-neutral-950/80"
        )}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Logo />
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              animate="open"
              className="w-full origin-top"
              exit="closed"
              initial="closed"
              style={{
                transformOrigin: "top center",
              }}
              variants={dropdownVariants}
            >
              <motion.div
                className="flex flex-col gap-4 items-start justify-start w-full pt-6 pb-4"
              >
                {navItems.map((navItem, idx: number) => (
                  <motion.div
                    className="w-full"
                    key={`link-${idx}`}
                    variants={itemVariants}
                  >
                    <Link
                      className="relative block py-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      onClick={() => setOpen(false)}
                      to={navItem.link}
                    >
                      {navItem.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="w-full pt-4 space-y-3"
                  variants={itemVariants}
                >
                  <Button
                    className="block w-full"
                    onClick={() => setOpen(false)}
                    variant="outline"
                  >
                    Log in
                  </Button>
                  <Button
                    className="block w-full bg-primary text-white hover:bg-primary/90"
                    onClick={() => setOpen(false)}
                  >
                    Join the waitlist
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
