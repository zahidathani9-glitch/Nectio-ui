import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";
import Navigation from "./navigation";
import ProgressBar from "./progressBar";

interface WizardProps {
  children: ReactNode[];
  onFinish?: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 450 : -450,
    opacity: 0,
    scale: 0.96,
  }),

  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },

  exit: (direction: number) => ({
    x: direction > 0 ? -450 : 450,
    opacity: 0,
    scale: 0.96,
  }),
};

export default function Wizard({
  children,
  onFinish,
}: WizardProps) {

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalSteps = children.length;

  const next = () => {
    if (step === totalSteps - 1) {
      onFinish?.();
      return;
    }

    setDirection(1);
    setStep(step + 1);
  };

  const back = () => {
    if (step === 0) return;

    setDirection(-1);
    setStep(step - 1);
  };

  return (
    <div className="max-w-xl mx-auto">

      <ProgressBar
        current={step + 1}
        total={totalSteps}
      />

      <AnimatePresence mode="wait" custom={direction}>

        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
         transition={{
            duration:0.45,
            ease:[0.22,1,0.36,1]
}}
        >
          {children[step]}
        </motion.div>

      </AnimatePresence>

      <Navigation
        current={step}
        total={totalSteps}
        onNext={next}
        onBack={back}
      />

    </div>
  );
}