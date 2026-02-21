export default function Navigation() {
    return (
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</a>
            {/* <a href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</a> */}
            <a href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</a>
        </nav>
    );
}
