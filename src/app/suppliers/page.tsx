"use client"
import { mockSuppliers } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ShieldCheck, Star, Factory } from "lucide-react"
import { motion } from "framer-motion";

export default function Suppliers() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
      <header className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-muted rounded-full mb-4 border border-border">
          <Factory className="h-6 w-6 text-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Packaging Suppliers</h1>
        <p className="text-lg text-muted-foreground">Discover verified suppliers providing sustainable packaging solutions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSuppliers.map(supplier => (
          <Card key={supplier.id} className="flex flex-col bg-card border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    {supplier.name}
                    {supplier.isVerified && <span title="Verified Supplier"><ShieldCheck className="h-5 w-5 text-info" /></span>}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground/70" /> {supplier.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-accent/10 border border-accent/20 text-accent-foreground px-2 py-1 rounded text-sm font-semibold">
                  <Star className="h-4 w-4 fill-current text-accent" /> {supplier.rating}
                </div>
              </div>

              <div className="space-y-4 mb-6 flex-1">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.categories.map(cat => (
                      <Badge key={cat} variant="secondary" className="bg-muted text-muted-foreground border-border">{cat}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">MOQ Range</p>
                    <p className="text-sm font-medium text-foreground">{supplier.moqRange}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Lead Time</p>
                    <p className="text-sm font-medium text-foreground">{supplier.leadTime}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className={`h-4 w-4 ${supplier.isVerified ? 'text-info' : 'text-muted-foreground'}`} /> 
                    {supplier.isVerified ? "Supplier information verified" : "Basic information provided"}
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-auto border-border text-foreground hover:bg-muted font-medium">View Supplier Profile</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
