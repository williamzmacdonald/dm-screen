import { ReactNode } from "react";

const typographyConfig = {
    sm: "text-slate-100 text-sm",
    md: "text-slate-100 text-md",
    lg: "text-slate-100 text-lg",
    xl: "text-slate-100 text-xl font-bold",
    xxl: "text-slate-100 text-2xl font-bold",
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
