"use client"
import { useAppStore } from "@/lib/store"
import { mockGroupBuys, mockProducts } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Users, AlertCircle } from "lucide-react"
import { motion } from "framer-motion";
import { ProductImage } from "@/components/shared/ProductImage"
import { useToastStore } from "@/lib/toast-store"

export default function GroupBuys() {
  const { joinedGroupBuys, joinGroupBuy } = useAppStore()
  const { addToast } = useToastStore()
  
  const [selectedBuy, setSelectedBuy] = useState<string | null>(null)
  const [joinQty, setJoinQty] = useState("300")

  const handleJoinConfirm = () => {
    if (selectedBuy) {
      joinGroupBuy(selectedBuy, parseInt(joinQty) || 0)
      addToast("🎉 You're in! Successfully joined the group order.", "success")
      setSelectedBuy(null)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
      <header className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 border border-primary/20">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Group Buys</h1>
        <p className="text-lg text-muted-foreground">
          Combine demand with other small sellers to access supplier bulk pricing.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockGroupBuys.map(buy => {
          const product = mockProducts.find(p => p.id === buy.productId)
          if (!product) return null

          let currentQty = buy.currentQuantity
          let participants = buy.participants
          const hasJoined = !!joinedGroupBuys[product.id]
          
          if (hasJoined) {
            currentQty += joinedGroupBuys[product.id]
            participants += 1
          }

          const progress = (currentQty / buy.targetQuantity) * 100

          return (
            <Card key={buy.id} className="overflow-hidden flex flex-col group relative bg-card border-border shadow-sm hover:shadow-md transition-shadow">
              {hasJoined && (
                <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
                  Joined
                </div>
              )}
              
              <div className="aspect-[16/9] relative overflow-hidden flex items-center justify-center border-b border-border">
                <ProductImage 
                  src={product.image} 
                  alt={product.name}
                  category={product.category[0]}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <CardContent className="p-0 flex flex-col flex-1">
                <div className="p-5 pb-0 flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{product.material}</p>
                  
                  <div className="flex justify-between items-end mb-4 bg-muted/50 p-3 rounded-lg border border-border">
                    <div>
                      <p className="text-xs text-muted-foreground line-through mb-1">₹{buy.currentPrice.toFixed(2)}</p>
                      <p className="text-xl font-bold text-secondary flex items-center gap-1">
                        ₹{buy.targetPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{participants}</p>
                      <p className="text-xs text-muted-foreground">sellers</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-muted-foreground">{currentQty.toLocaleString()} / {buy.targetQuantity.toLocaleString()} units</span>
                      <span className="text-foreground">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden border border-border">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${Math.min(100, progress)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-auto">
                  <Button 
                    className="w-full font-semibold h-11" 
                    variant={hasJoined ? "outline" : "default"}
                    onClick={() => {
                      if (!hasJoined) {
                        setSelectedBuy(product.id)
                        setJoinQty(product.moq.toString())
                      }
                    }}
                    disabled={hasJoined}
                  >
                    {hasJoined ? "You are participating" : "Join Group Buy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Modal isOpen={!!selectedBuy} onClose={() => setSelectedBuy(null)}>
        {selectedBuy && (() => {
          const product = mockProducts.find(p => p.id === selectedBuy)
          const groupBuy = mockGroupBuys.find(g => g.productId === selectedBuy)
          if (!product || !groupBuy) return null

          const q = parseInt(joinQty) || 0

          return (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-2">Join Group Buy</h2>
              <p className="text-muted-foreground mb-6">You are joining the group order for <span className="font-semibold text-foreground">{product.name}</span>.</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Quantity required</label>
                  <Input 
                    type="number" 
                    className="bg-background border-border text-foreground h-11"
                    value={joinQty} 
                    onChange={(e) => setJoinQty(e.target.value)} 
                    min={product.moq}
                  />
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Minimum order: {product.moq}
                  </p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg flex justify-between items-center border border-primary/20 mt-4">
                  <div>
                    <p className="text-sm text-foreground font-semibold">Estimated cost</p>
                    <p className="text-xs text-muted-foreground">At target price (₹{groupBuy.targetPrice})</p>
                  </div>
                  <p className="text-xl font-bold text-primary">
                    ₹{(q * groupBuy.targetPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-sm text-muted-foreground mb-2 flex justify-between">
                    <span>Current target</span>
                    <span className="font-medium text-foreground">{groupBuy.currentQuantity.toLocaleString()} / {groupBuy.targetQuantity.toLocaleString()}</span>
                  </p>
                  <p className="text-sm font-medium text-secondary mb-2 flex justify-between bg-secondary/10 px-2 py-1.5 rounded border border-secondary/20">
                    <span>After joining</span>
                    <span>{(groupBuy.currentQuantity + q).toLocaleString()} / {groupBuy.targetQuantity.toLocaleString()}</span>
                  </p>
                </div>
              </div>
              
              <Button onClick={handleJoinConfirm} className="w-full h-12 text-lg">Confirm Participation</Button>
            </>
          )
        })()}
      </Modal>

    </motion.div>
  )
}
