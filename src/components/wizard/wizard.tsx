import {
  type ReactNode,
  type ReactElement,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import type { NavProps } from "./types";
import ProgressRing from "./ProgressRing";

/**
 * Same contract as before — no prop/behavior changes:
 *   <Wizard onFinish={...}>
 *     <TextCard .../>
 *     <DateCard .../>
 *     ...
 *   </Wizard>
 *
 * What's different from the previous version:
 *  - There is no more separate sticky nav bar below the stage. Back/Next
 *    now render *inside* the active card's own bottom (questionCard.tsx),
 *    via a `nav` prop cloned onto each step here.
 *  - Background (peek) cards are dimmer and slightly blurred, so they
 *    read purely as ambient context.
 *  - Card width bumped slightly and transition sped up to 320ms.
 */

interface WizardProps {
  children: ReactNode[];
  onFinish?: () => void;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 320;

const SIDE_OFFSET = 58; // % of card width the neighbors sit from center
const SIDE_ROTATE = 3; // deg tilt on neighbors
const SIDE_SCALE = 0.94; // scale of neighbors
const SIDE_OPACITY = 0.1; // opacity of neighbors
const SIDE_BLUR = 2; // px blur on neighbors

export default function Wizard({ children, onFinish }: WizardProps) {
  const steps = Children.toArray(children);
  const [step, setStep] = useState(0);

  const totalSteps = steps.length;

  const next = () => {
    if (step === totalSteps - 1) {
      onFinish?.();
      return;
    }
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  const navProps: NavProps = {
    current: step + 1,
    total: totalSteps,
    onNext: next,
    onBack: back,
  };

  return (
    <div className="max-w-[600px] mx-auto w-full">
      <div className="relative w-full" style={{ minHeight: 420 }}>
        <ProgressRing current={step + 1} total={totalSteps} />

        {steps.map((child, i) => {
          const offset = i - step;

          if (Math.abs(offset) > 1) return null;

          const isCenter = offset === 0;

          let transform: string;
          let opacity: number;
          let zIndex: number;
          let pointerEvents: "auto" | "none";
          let blur: number;

          if (isCenter) {
            transform = "translateX(0) translateY(0) rotate(0deg) scale(1)";
            opacity = 1;
            zIndex = 10;
            pointerEvents = "auto";
            blur = 0;
          } else {
            const dir = offset > 0 ? 1 : -1;
            transform = `translateX(${dir * SIDE_OFFSET}%) translateY(14px) rotate(${
              dir * SIDE_ROTATE
            }deg) scale(${SIDE_SCALE})`;
            opacity = SIDE_OPACITY;
            zIndex = 5;
            pointerEvents = "none";
            blur = SIDE_BLUR;
          }

          const content = isValidElement(child)
            ? cloneElement(child as ReactElement<{ nav?: NavProps }>, {
                nav: navProps,
              })
            : child;

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                zIndex,
                transform,
                opacity,
                pointerEvents,
                filter: blur ? `blur(${blur}px)` : undefined,
                transformOrigin: "center bottom",
                transition: `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}`,
              }}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
