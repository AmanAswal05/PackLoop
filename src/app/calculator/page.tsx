"use client"
import { useState } from "react"
import { Calculator as CalcIcon, TrendingDown, ArrowRightLeft, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/lib/store"
import { mockProducts, mockSuppliers } from "@/lib/mock-data"
import { ProductImage } from "@/components/shared/ProductImage"
import { motion, AnimatePresence } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
}

export default function CalculatorPage() {
  const [numOrders, setNumOrders] = useState<number>(500)
  const [currentCost, setCurrentCost] = useState<number | string>("8.50")
  const [currentWeight, setCurrentWeight] = useState<number | string>("20")
  const [altCost, setAltCost] = useState<number | string>("12.00")
  const [altWeight, setAltWeight] = useState<number | string>("25")

  const { comparisonList, removeFromComparison } = useAppStore()

  const parsedCurrentCost = parseFloat(String(currentCost)) || 0
  const parsedAltCost = parseFloat(String(altCost)) || 0
  
  const currentTotalCost = numOrders * parsedCurrentCost
  const altTotalCost = numOrders * parsedAltCost
  const diffTotalCost = currentTotalCost - altTotalCost

  const comparedProducts = mockProducts.filter(p => comparisonList.includes(p.id))

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto px-4 py-12 max-w-6xl flex-1 relative z-10"
    >
      <motion.div variants={item} className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Calculator & Comparison</h1>
        <p className="text-xl text-muted-foreground font-light max-w-2xl">Compare your current packaging costs against sustainable alternatives to see potential savings.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card className="glass-panel border-border/50 shadow-xl overflow-hidden">
          <CardHeader className="bg-muted/20 border-b border-border/50 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalcIcon className="h-5 w-5 text-primary" />
              Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Monthly Order Volume</label>
                <Input 
                  type="number" 
                  className="bg-background/50 border-border/50 h-12 text-lg focus-visible:ring-primary" 
                  value={numOrders} 
                  onChange={e => setNumOrders(Number(e.target.value))} 
                />
              </div>

              <div className="pt-6 border-t border-border/50 space-y-4">
                <h4 className="font-semibold text-sm text-foreground/80 uppercase tracking-wider">Current Packaging</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Cost / Unit (₹)</label>
                    <Input type="number" step="0.1" className="bg-background/50 border-border/50" value={currentCost} onChange={e => setCurrentCost(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Weight / Unit (g)</label>
                    <Input type="number" step="0.1" className="bg-background/50 border-border/50" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50 space-y-4">
                <h4 className="font-semibold text-sm text-primary uppercase tracking-wider">Alternative Packaging</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Cost / Unit (₹)</label>
                    <Input type="number" step="0.1" className="bg-primary/5 border-primary/20 text-primary focus-visible:ring-primary" value={altCost} onChange={e => setAltCost(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Weight / Unit (g)</label>
                    <Input type="number" step="0.1" className="bg-background/50 border-border/50" value={altWeight} onChange={e => setAltWeight(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel border-border/50 shadow-md">
              <CardContent className="p-8">
                <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Current Monthly Cost</p>
                <h3 className="text-4xl font-bold text-foreground">₹{currentTotalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
              </CardContent>
            </Card>
            <Card className="glass-panel bg-primary/5 border-primary/20 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <TrendingDown className="w-24 h-24" />
              </div>
              <CardContent className="p-8 relative z-10">
                <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Alternative Monthly Cost</p>
                <h3 className="text-4xl font-bold text-primary">₹{altTotalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-panel border-border/50 shadow-xl flex-1 flex items-center justify-center relative overflow-hidden">
            <CardContent className="p-10 w-full flex flex-col items-center justify-center text-center relative z-10">
              <p className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider">Estimated Difference</p>
              
              <motion.div 
                key={diffTotalCost >= 0 ? 'savings' : 'loss'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" as any }}
                className="flex items-center justify-center mb-8"
              >
                <div className={`flex flex-col items-center justify-center w-56 h-56 rounded-full border-[8px] shadow-inner backdrop-blur-md ${diffTotalCost >= 0 ? 'border-secondary/30 bg-secondary/10' : 'border-error/30 bg-error/10'}`}>
                  <span className={`text-2xl font-bold mb-2 tracking-tight ${diffTotalCost >= 0 ? 'text-secondary' : 'text-error'}`}>
                    {diffTotalCost >= 0 ? "Savings" : "Extra Cost"}
                  </span>
                  <span className={`text-5xl font-black tracking-tighter ${diffTotalCost >= 0 ? 'text-secondary' : 'text-error'}`}>
                    ₹{Math.abs(diffTotalCost).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-sm text-muted-foreground mt-2 font-medium">/ month</span>
                </div>
              </motion.div>
              
              <div className="glass-panel px-8 py-3 rounded-full border border-border/50 shadow-sm">
                <p className="text-foreground font-medium flex items-center gap-3 text-lg">
                  <ArrowRightLeft className={`h-5 w-5 ${diffTotalCost >= 0 ? 'text-secondary' : 'text-error'}`} />
                  Annual Projection: <span className="font-bold text-xl">₹{(Math.abs(diffTotalCost) * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-8">Compare the trade-offs</h2>
        
        {comparedProducts.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl border border-dashed border-border text-muted-foreground shadow-sm">
            <CalcIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No products selected for comparison.</p>
            <p className="text-sm mt-1">Go to Discover to add products.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-border/50 glass-panel shadow-xl">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/20 text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="px-8 py-6 font-semibold uppercase tracking-wider text-xs">Feature</th>
                  <th className="px-8 py-6 font-semibold border-l border-border/50 bg-muted/10 uppercase tracking-wider text-xs">Current (Example)</th>
                  {comparedProducts.map((p, i) => (
                    <th key={p.id} className="px-8 py-6 font-bold border-l border-border/50 relative bg-primary/10 text-primary uppercase tracking-wider text-xs">
                      Option {String.fromCharCode(65 + i)}
                      <button 
                        onClick={() => removeFromComparison(p.id)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 hover:text-error transition-colors hover:scale-110"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-foreground">
                <tr className="hover:bg-muted/5 transition-colors">
                  <td className="px-8 py-6 font-medium text-muted-foreground">Product</td>
                  <td className="px-8 py-6 border-l border-border/50 bg-muted/10 font-medium">Generic Plastic</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="px-8 py-6 border-l border-border/50 font-bold">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg relative overflow-hidden flex-shrink-0 shadow-sm">
                          <ProductImage src={p.image} alt={p.name} category={p.category[0]} />
                        </div>
                        {p.name}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/5 transition-colors">
                  <td className="px-8 py-6 font-medium text-muted-foreground">Material</td>
                  <td className="px-8 py-6 border-l border-border/50 bg-muted/10">Plastic</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="px-8 py-6 border-l border-border/50">{p.material}</td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/5 transition-colors">
                  <td className="px-8 py-6 font-medium text-muted-foreground">Unit Cost</td>
                  <td className="px-8 py-6 border-l border-border/50 bg-muted/10">₹8.00</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="px-8 py-6 border-l border-border/50 font-black text-lg text-primary">₹{p.price.toFixed(2)}</td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/5 transition-colors">
                  <td className="px-8 py-6 font-medium text-muted-foreground">MOQ</td>
                  <td className="px-8 py-6 border-l border-border/50 bg-muted/10">100</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="px-8 py-6 border-l border-border/50 font-medium">{p.moq}</td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/5 transition-colors">
                  <td className="px-8 py-6 font-medium text-muted-foreground">Monthly Cost ({numOrders})</td>
                  <td className="px-8 py-6 border-l border-border/50 bg-muted/10">₹{currentTotalCost.toLocaleString()}</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="px-8 py-6 border-l border-border/50 font-bold text-lg">₹{(p.price * numOrders).toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="hover:bg-muted/5 transition-colors">
                  <td className="px-8 py-6 font-medium text-muted-foreground">Supplier</td>
                  <td className="px-8 py-6 border-l border-border/50 bg-muted/10">Existing</td>
                  {comparedProducts.map(p => {
                    const sup = mockSuppliers.find(s => s.id === p.supplierId)
                    return (
                      <td key={p.id} className="px-8 py-6 border-l border-border/50 font-medium text-primary hover:underline cursor-pointer">{sup?.name || "Unknown"}</td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
