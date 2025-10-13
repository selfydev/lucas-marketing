import { delay } from "motion";
import { Typewriter } from "motion-plus/react";
import { useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

export function TypewriterText({ text, className }: TypewriterTextProps) {
  const [iteration, setIteration] = useState(0);

  return (
    <Typewriter
      as="p"
      backspace="all"
      className={className}
      key={iteration}
      onComplete={() => {
        delay(() => {
          setIteration((prev) => prev + 1);
        }, 5);
      }}
      speed="fast"
    >
      {text}
    </Typewriter>
  );
}
