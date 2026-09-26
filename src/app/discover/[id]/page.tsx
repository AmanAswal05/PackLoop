"use client"

import { useParams, useRouter } from "next/navigation"
import { mockProducts, mockSuppliers, mockGroupBuys } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ShieldCheck, Scale, Leaf, Store, Target } from "lucide-react"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { ProductImage } from "@/components/shared/ProductImage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { useToastStore } from "@/lib/toast-store"
import { Modal } from "@/components/ui/modal"

export default function ProductDetail() {
  const params = useParams()
  const id = params.id as string
  
  const router = useRouter()
  
  const product = mockProducts.find(p => p.id === id)
  const supplier = product ? mockSuppliers.find(s => s.id === product.supplierId) : null
  const activeGroupBuy = mockGroupBuys.find(g => g.productId === id)
  
  const { addToComparison, comparisonList, joinGroupBuy } = useAppStore()
  const { addToast } = useToastStore()
  
  const [estimateQty, setEstimateQty] = useState(product?.moq.toString() || "500")
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [joinQty, setJoinQty] = useState(product?.moq.toString() || "500")

  if (!product || !supplier) {
    return <div className="p-8 text-center text-foreground">Product not found</div>
  }

  const isCompared = comparisonList.includes(product.id)

  const handleCompare = () => {
    if (comparisonList.length >= 3 && !isCompared) {
      addToast("You can only compare up to 3 items at a time.", "error")
      return
    }
    addToComparison(product.id)
    addToast(`${product.name} added to comparison`, "success")
    router.push("/calculator")
  }

  const handleJoinConfirm = () => {
    joinGroupBuy(product.id, parseInt(joinQty) || product.moq)
    addToast("🎉 You're in! Successfully joined the group buy.", "success")
    setIsJoinModalOpen(false)
    router.push("/dashboard")
  }

  const estQtyNumber = parseInt(estimateQty) || 0
  const estimatedCost = estQtyNumber * product.price
  
  const hasGroupBuy = !!activeGroupBuy
  const potentialSavings = hasGroupBuy ? (product.price - activeGroupBuy.targetPrice) * estQtyNumber : 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
      <Link href="/discover" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Discover
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left Column: Image */}
        <div>
          <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden relative border border-border">
            <ProductImage 
              src={product.image} 
              alt={product.name}
              category={product.category[0]}
            />
          </div>
        </div>

        {/* Right Column: Key Info & Actions */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground flex items-center gap-1">
                <Store className="h-4 w-4" /> {supplier.name}
              </span>
              {supplier.isVerified && <span title="Verified Supplier" className="flex items-center gap-1 text-info"><ShieldCheck className="h-4 w-4" /> Verified</span>}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">{product.name}</h1>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
              <span className="text-lg text-muted-foreground">/unit</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-muted rounded text-foreground font-medium border border-border">MOQ: {product.moq}</span>
              {hasGroupBuy && (
                <span className="px-2 py-1 bg-accent/20 text-accent-foreground font-medium rounded border border-accent/30 flex items-center gap-1">
                  Target Price: ₹{activeGroupBuy.targetPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-xl border border-border mb-8">
            <div className="flex items-start gap-3">
              <Leaf className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Sustainability Profile</h4>
                <p className="text-sm text-muted-foreground mt-1">{product.sustainability}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button onClick={() => setIsJoinModalOpen(true)} className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
              {hasGroupBuy ? "Join Active Group Buy" : "Start Group Buy"}
            </Button>
            <Button onClick={handleCompare} variant="outline" className="w-full h-12 border-border text-foreground hover:bg-muted">
              <Scale className="mr-2 h-5 w-5" /> Compare Product
            </Button>
          </div>
        </div>
      </div>
      
      {/* Below Fold: Specs, Supplier, Group Buy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border shadow-sm glass-panel hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b border-border bg-muted/20">
              <CardTitle className="text-xl">Product Specifications</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="border-b border-border pb-3">
                  <dt className="text-muted-foreground mb-1">Material</dt>
                  <dd className="font-medium text-foreground">{product.material}</dd>
                </div>
                <div className="border-b border-border pb-3">
                  <dt className="text-muted-foreground mb-1">Dimensions</dt>
                  <dd className="font-medium text-foreground">{product.size}</dd>
                </div>
                <div className="border-b border-border pb-3">
                  <dt className="text-muted-foreground mb-1">Suitable For</dt>
                  <dd className="font-medium text-foreground">{product.suitableFor}</dd>
                </div>
                <div className="border-b border-border pb-3">
                  <dt className="text-muted-foreground mb-1">Category</dt>
                  <dd className="font-medium text-foreground">{product.category.join(", ")}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-sm glass-panel hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b border-border bg-muted/20">
              <CardTitle className="text-xl">Supplier Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{supplier.name}</h3>
                  <p className="text-muted-foreground text-sm">{supplier.location}</p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                  {supplier.rating} ★
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Lead Time</span>
                  <span className="font-medium text-foreground">{supplier.leadTime}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">MOQ Range</span>
                  <span className="font-medium text-foreground">{supplier.moqRange}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          {hasGroupBuy && activeGroupBuy && (
            <Card className="border-border mb-6 shadow-sm glass-panel hover:shadow-xl transition-all duration-300">
              <CardHeader className="border-b border-border bg-muted/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" /> Active Group Buy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">{activeGroupBuy.currentQuantity.toLocaleString()} / {activeGroupBuy.targetQuantity.toLocaleString()} units</span>
                    <span className="text-primary font-bold">{Math.round((activeGroupBuy.currentQuantity / activeGroupBuy.targetQuantity) * 100)}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden border border-border">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${Math.min(100, (activeGroupBuy.currentQuantity / activeGroupBuy.targetQuantity) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center mt-6">
                  <div className="bg-muted p-3 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Current Price</div>
                    <div className="font-bold text-foreground">₹{activeGroupBuy.currentPrice.toFixed(2)}</div>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 p-3 rounded-lg">
                    <div className="text-xs text-accent-foreground mb-1">Target Price</div>
                    <div className="font-bold text-accent-foreground">₹{activeGroupBuy.targetPrice.toFixed(2)}</div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  {activeGroupBuy.participants} businesses have joined
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-border bg-card shadow-sm glass">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Calculate Savings</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-1/3 text-sm text-muted-foreground">Quantity</div>
                <Input 
                  type="number" 
                  className="w-2/3 bg-background border-border text-foreground" 
                  value={estimateQty} 
                  onChange={(e) => setEstimateQty(e.target.value)} 
                />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-semibold text-foreground">Estimated Cost</span>
                <span className="text-xl font-bold text-foreground">₹{estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              {hasGroupBuy && potentialSavings > 0 && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-secondary">Potential Savings</span>
                  <span className="text-sm font-bold text-secondary">-₹{potentialSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}>
        <h2 className="text-2xl font-bold text-foreground mb-2">Join Group Buy</h2>
        <p className="text-muted-foreground mb-6">Combine your order with other small businesses to unlock bulk pricing.</p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Product</label>
            <div className="font-medium text-foreground">{product.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Quantity required</label>
            <Input 
              type="number" 
              className="bg-background border-border text-foreground"
              value={joinQty} 
              onChange={(e) => setJoinQty(e.target.value)} 
              min={100}
            />
          </div>
          <div className="bg-primary/5 p-4 rounded-lg flex justify-between items-center border border-primary/20">
            <div>
              <p className="text-sm text-primary font-medium">Estimated target cost</p>
              <p className="text-xs text-primary/80">Based on target bulk tier</p>
            </div>
            <p className="text-xl font-bold text-primary">
              ₹{((parseInt(joinQty) || 0) * (hasGroupBuy ? activeGroupBuy.targetPrice : product.price)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          {hasGroupBuy && activeGroupBuy && (
            <div className="pt-2">
              <p className="text-sm font-medium text-foreground mb-2 flex justify-between">
                <span>Current Target Progress</span>
                <span>{activeGroupBuy.currentQuantity.toLocaleString()} / {activeGroupBuy.targetQuantity.toLocaleString()}</span>
              </p>
              <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
                <div className="h-full bg-primary" style={{ width: `${Math.min(100, (activeGroupBuy.currentQuantity / activeGroupBuy.targetQuantity) * 100)}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">After joining: {(activeGroupBuy.currentQuantity + (parseInt(joinQty) || 0)).toLocaleString()} / {activeGroupBuy.targetQuantity.toLocaleString()}</p>
            </div>
          )}
        </div>
        
        <Button onClick={handleJoinConfirm} className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
          Confirm Participation
        </Button>
      </Modal>
    </motion.div>
  )
}
