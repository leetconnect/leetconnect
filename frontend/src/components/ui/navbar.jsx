// Dummy navbar components to make the template work
export function Navbar({ children, className }) {
    return (
        <div className={`flex items-center justify-between w-full h-16 ${className || ""}`}>
            {children}
        </div>
    );
}

export function NavbarLeft({ children, className }) {
    return (
        <div className={`flex items-center gap-4 ${className || ""}`}>
            {children}
        </div>
    );
}

export function NavbarRight({ children, className }) {
    return (
        <div className={`flex items-center gap-4 ${className || ""}`}>
            {children}
        </div>
    );
}
