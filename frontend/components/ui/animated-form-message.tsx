import { AnimatePresence, motion } from "motion/react";
import { FormMessage } from "@/components/shadcn-ui/form";

export default function AnimatedFormMessage({
  show,
  isSubmitted,
}: {
  show: boolean;
  isSubmitted: boolean;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {show && (
        <motion.div
          key="form-error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <FormMessage
            className={isSubmitted ? "text-red-500" : "text-white"}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
