"use client";

import { motion } from "framer-motion";
import { Textarea } from "~/components/ui/textarea";
import { StepLayout, itemVariants } from "./step-layout";

interface LoreStepProps {
  value: string;
  onChange: (lore: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function LoreStep({
  value,
  onChange,
  onNext,
  onBack,
  onSkip,
}: LoreStepProps) {
  return (
    <StepLayout
      title="Tell me about your business"
      subtitle="Optional - help me understand your industry, size, and what you need"
      onNext={onNext}
      onBack={onBack}
      onSkip={onSkip}
      nextDisabled={!value.trim()}
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., We're a 5-person SaaS startup doing ~$30k MRR. Main expenses are AWS, salaries, and marketing..."
          maxLength={500}
          className="min-h-[120px]"
        />
        <p className="text-muted-foreground text-right text-xs">
          {value.length}/500
        </p>
      </motion.div>
    </StepLayout>
  );
}
