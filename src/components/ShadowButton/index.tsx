import styles from "./style.module.scss";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { cn } from "@/lib/utils";

type VariantType = "primary" | "secondary";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: VariantType;
}

/**
 * Button
 * @param children
 * @param emphasis
 * @param props
 * @constructor
 */
function Button({ children, className, variant, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      title=""
      className={cn(styles.button, variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
