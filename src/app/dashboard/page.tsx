"use client"
import { Package, TrendingDown, Users, ChevronRight, Activity, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAppStore } from "@/lib/store"
import { useToastStore } from "@/lib/toast-store"
import Link from "next/link"
import { mockProducts } from "@/lib/mock-data"
import { ProductImage } from "@/components/shared/ProductImage"
import { motion } from "framer-motion"

export default function Dashboard() {
  const { isDemoMode, currentCostPerOrder, currentPackaging, activities } = useAppStore()
  const { addToast } = useToastStore()

  // For demo: pretend there are 2 active group buys and 4,500 total items
  const totalGroupBuys = isDemoMode ? 2 : 0
  const totalOrderedItems = isDemoMode ? 4500 : 0
  
  const recommendedProduct = mockProducts.find(p => p.id === 'p1')

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

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto px-4 py-8 max-w-6xl flex-1 relative z-10"
    >
      <motion.div variants={item} className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">Overview</h1>
          <p className="text-muted-foreground">Monitor your packaging costs and active orders.</p>
        </div>
        {isDemoMode && (
          <div className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20">
            Demo Mode Active
          </div>
        )}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-panel border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <TrendingDown className="h-7 w-7" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Cost Per Order</p>
            <h3 className="text-4xl font-bold text-foreground mb-1">₹{currentCostPerOrder.toFixed(2)}</h3>
            <p className="text-xs text-muted-foreground">Current average</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4 text-secondary">
              <Users className="h-7 w-7" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Group Buys</p>
            <h3 className="text-4xl font-bold text-foreground mb-1">{totalGroupBuys}</h3>
            <p className="text-xs text-muted-foreground">Combined orders</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-4 text-muted-foreground">
              <Package className="h-7 w-7" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Packaging Orders</p>
            <h3 className="text-4xl font-bold text-foreground mb-1">{totalOrderedItems}</h3>
            <p className="text-xs text-muted-foreground">Total committed units</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={item}>
            <Card className="glass-panel border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
                <CardTitle className="text-lg">Your Packaging Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/50"></div>
                  
                  <div className="group">
                    <h4 className="font-semibold text-foreground mb-4 opacity-80">Current</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Material</p>
                        <p className="font-medium text-foreground text-lg group-hover:text-primary transition-colors">{currentPackaging}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Estimated monthly usage</p>
                        <p className="font-medium text-foreground text-lg">1.8 kg</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <h4 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                      Potential Alternative <CheckCircle2 className="h-4 w-4" />
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Material</p>
                        <p className="font-medium text-foreground text-lg group-hover:text-secondary transition-colors">Kraft Paperboard</p>
                        <p className="text-xs text-muted-foreground mt-1">Recyclable material — supplier information provided</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Estimated usage</p>
                        <p className="font-medium text-foreground text-lg">1.2 kg</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end pt-4 border-t border-border/50">
                  <Link href="/discover">
                    <Button variant="outline" className="flex items-center gap-2 border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all rounded-full">
                      Find Packaging <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {isDemoMode && recommendedProduct && (
            <motion.div variants={item}>
              <Card className="border-primary/20 shadow-lg overflow-hidden glass hover:shadow-xl transition-all duration-300">
                <div className="bg-primary/95 text-primary-foreground p-6 relative overflow-hidden flex flex-col md:flex-row gap-6">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Users className="w-32 h-32" />
                  </div>
                  
                  <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden relative z-10 border border-primary-foreground/20 bg-muted/20 flex-shrink-0 shadow-inner">
                    <ProductImage src={recommendedProduct.image} alt={recommendedProduct.name} category={recommendedProduct.category[0]} />
                  </div>
                  
                  <div className="w-full md:w-2/3 relative z-10 flex flex-col justify-center">
                    <p className="text-primary-foreground/80 text-sm font-bold mb-1 uppercase tracking-wider">Group Buy Spotlight</p>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">{recommendedProduct.name}</h3>
                    
                    <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-md mb-4 border border-white/10 shadow-sm">
                      <div className="flex justify-between text-sm mb-2 font-medium">
                        <span>Progress: 3,700 / 5,000 units</span>
                        <span className="text-secondary font-bold">74%</span>
                      </div>
                      <Progress value={74} className="h-2 bg-black/40 [&>div]:bg-secondary rounded-full" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-primary-foreground/70 text-xs uppercase tracking-wider mb-1">Current</p>
                        <p className="font-semibold line-through opacity-70">₹7.20</p>
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-xs uppercase tracking-wider mb-1">Target</p>
                        <p className="font-bold text-2xl">₹5.90</p>
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-xs uppercase tracking-wider mb-1">Difference</p>
                        <p className="font-bold text-2xl text-secondary">₹1.30</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm p-4 flex justify-end border-t border-border/50">
                  <Link href="/group-buys">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-8 shadow-md">View Group Buy Details</Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="space-y-8">
          <motion.div variants={item} className="h-full">
            <Card className="glass-panel border-border/50 h-full flex flex-col hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-border/50 bg-muted/20">
                <CardTitle className="text-lg flex items-center gap-2 text-foreground font-semibold">
                  <Activity className="h-5 w-5 text-secondary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                {activities.length > 0 ? (
                  <div className="space-y-6">
                    {activities.map((act, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        key={act.id} 
                        className="flex gap-4 text-sm group"
                      >
                        <div className="mt-1 w-2.5 h-2.5 rounded-full bg-secondary shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:scale-150 transition-transform" />
                        <div>
                          <p className="text-foreground font-medium">{act.text}</p>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">
                            {new Date(act.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 flex-1 flex flex-col justify-center items-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Activity className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">No recent activity found.</p>
                    <Button variant="outline" className="text-sm border-border/50 rounded-full px-6 hover:border-primary hover:text-primary transition-all" onClick={() => addToast("Requirement form opened", "info")}>
                      Create Requirement
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
