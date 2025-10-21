import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  easeIn,
  easeInOut,
  easeOut,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
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
      name: "Testimonials",
      link: "/#testimonials",
    },
    {
      name: "FAQ",
      link: "/#faq",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div className="fixed inset-x-0 top-0 z-50 w-full pt-2 lg:pt-4">
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
        y: visible ? 2 : 0,
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
      <div className="relative z-50">
        <Logo />
      </div>
      <motion.div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 font-medium text-sm text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
        {navItems.map((navItem) => (
          <Link
            className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
            key={navItem.link}
            onClick={(e) => {
              if (navItem.link.startsWith("#")) {
                e.preventDefault();
                const targetId = navItem.link.replace("#", "");
                const element = document.getElementById(targetId);
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }
            }}
            onMouseEnter={() => setHovered(navItems.indexOf(navItem))}
            to={navItem.link}
          >
            {hovered === navItems.indexOf(navItem) && (
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
  const [hasOpened, setHasOpened] = useState(false);

  const openMenu = () => {
    setHasOpened(true);
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    // Only run this effect if the menu has been opened at least once
    if (!hasOpened) {
      return;
    }

    const color = open ? "#D7E1D8" : "#F8FDF5";
    const metaTag = document.querySelector('meta[name="theme-color"]');

    if (open && metaTag) {
      // Delay color change on open to sync with animations
      document.body.style.backgroundColor = color;
      (metaTag as HTMLMetaElement).content = color;
    } else if (metaTag) {
      // Update immediately on close
      document.body.style.backgroundColor = color;
      (metaTag as HTMLMetaElement).content = color;
    }
  }, [open, hasOpened]);

  // Animation variants for the dropdown container
  const dropdownVariants = {
    closed: {
      scaleY: 0,
      opacity: 0,
      height: 0,
      transition: {
        scaleY: { duration: 0.3, ease: easeInOut },
        opacity: { duration: 0.25, ease: easeOut },
        height: { duration: 0.3, ease: easeInOut },
      },
    },
    open: {
      scaleY: 1,
      opacity: 1,
      height: "auto",
      transition: {
        scaleY: { duration: 0.4, ease: easeOut },
        opacity: { duration: 0.3, ease: easeIn },
        height: { duration: 0.4, ease: easeOut },
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
        opacity: { duration: 0.2, ease: easeOut },
        y: { duration: 0.2, ease: easeIn },
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.3, ease: easeOut },
        y: { duration: 0.3, ease: easeOut },
      },
    },
  };

  return (
    <>
      {/* Backdrop - entry animation only (no exit to avoid iOS Safari bug) */}
      {open && (
        <motion.button
          animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-[#3a5a4a]/15 lg:hidden"
          initial={{ opacity: 1, backdropFilter: "blur(0px)" }}
          onClick={closeMenu}
          transition={{
            opacity: { duration: 0.3 },
            backdropFilter: { duration: 0.3, delay: 0.3, ease: "easeOut" },
          }}
          type="button"
        />
      )}

      <motion.div
        animate={{
          backdropFilter: visible || open ? "blur(10px)" : "none",
          boxShadow:
            visible || open
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
          width: visible ? "90%" : "100%",
          y: visible ? 2 : 0,
          borderRadius: open ? "1.4rem 1.4rem 1.4rem 1.4rem" : "1.4rem",
        }}
        className={cn(
          "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between overflow-hidden bg-transparent px-4 py-3 lg:hidden",
          (visible || open) && "bg-white/80 dark:bg-neutral-950/80"
        )}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Logo className="h-5 w-auto" />
          <motion.button
            animate={{ rotate: open ? 90 : 0 }}
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex items-center justify-center rounded-full p-2 text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-white dark:hover:bg-white/10"
            onClick={() => {
              if (open) {
                closeMenu();
              } else {
                openMenu();
              }
            }}
            transition={{ duration: 0.3 }}
            type="button"
          >
            {open ? (
              <X className="size-5 text-black dark:text-white" />
            ) : (
              <Menu className="size-5 text-black dark:text-white" />
            )}
          </motion.button>
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
              <motion.div className="flex w-full flex-col items-start justify-start gap-4 pt-6 pb-4">
                {navItems.map((navItem) => (
                  <motion.div
                    className="w-full"
                    key={navItem.link}
                    variants={itemVariants}
                  >
                    <Link
                      className="relative block py-2 text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                      onClick={(e) => {
                        if (navItem.link.startsWith("#")) {
                          e.preventDefault();
                          closeMenu();
                          const targetId = navItem.link.replace("#", "");
                          const element = document.getElementById(targetId);
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        } else {
                          closeMenu();
                        }
                      }}
                      to={navItem.link}
                    >
                      {navItem.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="w-full space-y-3 pt-4"
                  variants={itemVariants}
                >
                  <Button
                    className="block w-full"
                    onClick={closeMenu}
                    type="button"
                    variant="outline"
                  >
                    Log in
                  </Button>
                  <Button
                    className="block w-full bg-primary text-white hover:bg-primary/90"
                    onClick={closeMenu}
                    type="button"
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
