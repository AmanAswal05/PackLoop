"use client"
import { useState } from "react"
import { mockProducts, mockSuppliers, ProductCategory } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ShoppingBag, CheckCircle, Leaf, BarChart2, Plus } from "lucide-react"
import { ProductImage } from "@/components/shared/ProductImage"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { useToastStore } from "@/lib/toast-store"
import { motion, AnimatePresence } from "framer-motion"

const allFilters: ProductCategory[] = [
  "Food", "Retail", "Paper", "Reusable", "Compostable", "Recyclable", "Low MOQ", "Under ₹10", "Under ₹15"
]

export default function Discover() {
  const [search, setSearch] = useState("")
  const [activeFilters, setActiveFilters] = useState<ProductCategory[]>([])
  
  const { addToComparison, comparisonList } = useAppStore()
  const { addToast } = useToastStore()

  const toggleFilter = (filter: ProductCategory) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }

  const handleCompare = (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (comparisonList.includes(productId)) {
      addToast("Product is already in comparison list", "info")
      return
    }
    if (comparisonList.length >= 3) {
      addToast("You can compare up to 3 products", "error")
      return
    }
    addToComparison(productId)
    addToast("Added to comparison list", "success")
  }

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.material.toLowerCase().includes(search.toLowerCase())
    const matchesFilters = activeFilters.length === 0 || activeFilters.every(f => p.category.includes(f))
    return matchesSearch && matchesFilters
  })

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as any, stiffness: 300, damping: 24 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Discover Packaging</h1>
        <p className="text-xl text-muted-foreground font-light max-w-2xl">Find packaging that fits your product, budget, and order volume.</p>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search packaging..." 
            className="pl-12 h-14 bg-background/50 backdrop-blur-sm border-border/50 text-foreground focus-visible:ring-primary text-lg rounded-2xl shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 px-8 hidden md:flex items-center gap-2 border-border/50 text-foreground hover:bg-muted/50 rounded-2xl backdrop-blur-sm">
          <Filter className="h-5 w-5" /> Filters
        </Button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-12"
      >
        {allFilters.map(filter => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border shadow-sm ${
              activeFilters.includes(filter) 
                ? "bg-primary text-primary-foreground border-primary shadow-primary/20 hover:bg-primary/90" 
                : "bg-background/40 backdrop-blur-md text-foreground border-border/50 hover:border-primary/50 hover:bg-background/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredProducts.map(product => {
            const supplier = mockSuppliers.find(s => s.id === product.supplierId)
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="h-full"
              >
                <Link href={`/discover/${product.id}`} className="group block h-full">
                  <Card className="h-full overflow-hidden flex flex-col glass border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/50 pointer-events-none z-10" />
                    
                    <div className="aspect-[4/3] relative overflow-hidden flex items-center justify-center bg-muted/20">
                      <ProductImage 
                        src={product.image} 
                        alt={product.name}
                        category={product.category[0]}
                        className="transition-transform duration-700 group-hover:scale-110 object-cover w-full h-full"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/10 uppercase tracking-wider">
                          {product.category[0]}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col flex-1 relative z-20 bg-gradient-to-b from-transparent to-card/90">
                      <div className="mb-3">
                        <h3 className="font-bold text-xl text-card-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1 font-medium">{product.suitableFor}</p>
                      </div>
                      
                      {supplier && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 bg-muted/30 w-max px-2.5 py-1 rounded-md border border-border/30">
                          <span className="truncate">{supplier.name}</span>
                          {supplier.isVerified && <CheckCircle className="h-3.5 w-3.5 text-info flex-shrink-0" />}
                        </div>
                      )}

                      <div className="flex items-end gap-1 mb-5">
                        <span className="text-3xl font-black text-foreground tracking-tighter">₹{product.price.toFixed(2)}</span>
                        <span className="text-sm font-medium text-muted-foreground pb-1.5">/unit</span>
                      </div>
                      
                      <div className="space-y-3 mb-6 flex-1">
                        <div className="flex items-center justify-between text-sm border-b border-border/30 pb-3">
                          <span className="text-muted-foreground font-medium uppercase tracking-wider text-xs">MOQ</span>
                          <span className="font-bold text-foreground bg-muted/50 px-2 py-0.5 rounded text-sm">{product.moq} units</span>
                        </div>
                        {product.sustainability && (
                          <div className="flex items-start gap-2.5 text-sm bg-secondary/5 border border-secondary/10 p-3 rounded-xl mt-4">
                            <Leaf className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/90 text-xs font-medium leading-relaxed">{product.sustainability}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <Button 
                          variant="outline" 
                          className="w-full text-xs h-10 border-border/50 text-foreground hover:bg-muted/50 rounded-lg backdrop-blur-sm"
                          onClick={(e) => handleCompare(e, product.id)}
                        >
                          <BarChart2 className="h-4 w-4 mr-2" /> Compare
                        </Button>
                        <Button 
                          className="w-full text-xs h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            window.location.href = `/discover/${product.id}`
                          }}
                        >
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredProducts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 glass-panel rounded-3xl border border-dashed border-border/50"
        >
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-6 opacity-40" />
          <h3 className="text-2xl font-bold text-card-foreground mb-2">No packaging found</h3>
          <p className="text-muted-foreground text-lg mb-8">Try adjusting your search or filters to find what you need.</p>
          <Button variant="outline" className="h-12 px-8 rounded-full border-border/50 text-foreground" onClick={() => { setSearch(""); setActiveFilters([]); }}>
            Clear all filters
          </Button>
        </motion.div>
      )}
    </div>
  )
}
