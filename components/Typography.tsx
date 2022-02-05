import { ReactNode } from "react";

const typographyConfig = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl font-bold",
    xxl: "text-2xl font-bold",
};

interface TypographyProps {
    size?: keyof typeof typographyConfig;
    children: ReactNode;
    className?: string;
}

export const Typography = ({
    size = "md",
    children,
    className,
}: TypographyProps) => (
    <span className={`${typographyConfig[size]} ${className}`}>{children}</span>
);
