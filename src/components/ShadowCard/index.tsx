import * as React from "react";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";

const ShadowCard = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }) => {
  return (
    <div className={cn(styles.card, className)} {...props}>
      {children}
    </div>
  );
});

ShadowCard.displayName = "ShadowCard";

export default ShadowCard;
