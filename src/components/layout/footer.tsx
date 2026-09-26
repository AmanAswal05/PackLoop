import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xl py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">PackLoop</h3>
            <p className="text-muted-foreground max-w-sm">
              Sustainable packaging access for small businesses. Discover, compare, and combine demand.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/discover" className="hover:text-primary transition-colors">Discover</Link></li>
              <li><Link href="/group-buys" className="hover:text-primary transition-colors">Group Buys</Link></li>
              <li><Link href="/suppliers" className="hover:text-primary transition-colors">Suppliers</Link></li>
              <li><Link href="/calculator" className="hover:text-primary transition-colors">Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/packadvisor" className="hover:text-primary transition-colors">PackAdvisor</Link></li>
              <li><Link href="/supplier-dashboard" className="hover:text-primary transition-colors">Supplier Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PackLoop Prototype. For demonstration purposes.
        </div>
      </div>
    </footer>
  )
}
