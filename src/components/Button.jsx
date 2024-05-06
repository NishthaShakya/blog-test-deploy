import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "", //common syntax for additional className and props passed by user
    ...props
}) {
    return (
        <button
        type={type}
         className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}
         >
            {children}
        </button>
    );
}
