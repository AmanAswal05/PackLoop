"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, ArrowRight, Leaf, Sparkles } from "lucide-react"
import { motion } from "framer-motion";
import Link from "next/link"
import { mockProducts } from "@/lib/mock-data"
import { ProductImage } from "@/components/shared/ProductImage"

export default function PackAdvisor() {
  const [prompt, setPrompt] = useState("I sell homemade cookies, around 500 orders per month, and my packaging budget is ₹10 per order.")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsTyping(true)
    setHasSubmitted(false)
    
    // Simulate API delay
    setTimeout(() => {
      setIsTyping(false)
      setHasSubmitted(true)
    }, 1500)
  }

  // Get products for recommendations
  const p1 = mockProducts.find(p => p.id === "p1")
  const p2 = mockProducts.find(p => p.id === "p2")
  const p4 = mockProducts.find(p => p.id === "p4")

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
      <header className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-info/10 rounded-full mb-4 border border-info/20">
          <Sparkles className="h-6 w-6 text-info" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">PackAdvisor AI</h1>
        <p className="text-lg text-muted-foreground">
          Tell us about your product and we’ll help you explore packaging options.
        </p>
      </header>

      <Card className="mb-8 border-info/20 shadow-sm bg-card glass">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              className="w-full min-h-[120px] p-4 pr-16 bg-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent text-foreground shadow-sm"
              placeholder="Describe your product, volume, and budget..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-3 bottom-4 bg-info hover:bg-info/90 text-info-foreground h-10 w-10 rounded-full shadow-md transition-transform active:scale-95"
              disabled={isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {isTyping && (
        <div className="flex justify-center items-center py-12 text-muted-foreground">
          <div className="animate-pulse flex items-center gap-3 bg-muted/50 px-6 py-3 rounded-full border border-border">
            <Bot className="h-5 w-5 text-info" /> PackAdvisor is analyzing your request...
          </div>
        </div>
      )}

      {hasSubmitted && !isTyping && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Bot className="h-5 w-5 text-info" />
              <h3 className="text-sm font-bold text-info uppercase tracking-wider">Analysis Complete</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8 pb-6 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">Product Type</p>
                <p className="font-semibold text-foreground">Cookies</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Volume</p>
                <p className="font-semibold text-foreground">500 orders</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target Budget</p>
                <p className="font-semibold text-foreground">₹10/order</p>
              </div>
            </div>

            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Recommended Options</h3>
            <div className="space-y-4 mb-10">
              {p1 && (
                <Link href="/discover/p1" className="block group">
                  <div className="bg-background p-4 rounded-xl border border-border group-hover:border-info/50 group-hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden border border-border relative flex-shrink-0">
                      <ProductImage src={p1.image} alt={p1.name} category={p1.category[0]} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-foreground flex items-center gap-2">
                          1. {p1.name} <ArrowRight className="h-4 w-4 text-info opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                        </h4>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">Under Budget</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">₹{p1.price.toFixed(2)}/unit • MOQ: {p1.moq}</p>
                      <p className="text-sm text-foreground bg-muted/50 p-2 rounded-md border border-border flex items-center gap-2">
                         Best match. Traditional bakery look, highly cost-effective at this volume.
                      </p>
                    </div>
                  </div>
                </Link>
              )}
              
              {p2 && (
                <Link href="/discover/p2" className="block group">
                  <div className="bg-background p-4 rounded-xl border border-border group-hover:border-info/50 group-hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden border border-border relative flex-shrink-0">
                      <ProductImage src={p2.image} alt={p2.name} category={p2.category[0]} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-foreground flex items-center gap-2">
                          2. {p2.name} <ArrowRight className="h-4 w-4 text-info opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                        </h4>
                        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">Within Budget</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">₹{p2.price.toFixed(2)}/unit • MOQ: {p2.moq}</p>
                      <p className="text-sm text-foreground bg-muted/50 p-2 rounded-md border border-border">
                        Compact format. Better for longer shelf life if shipping out of town.
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Sustainability Impact</h3>
            <div className="p-5 border border-secondary/20 rounded-xl bg-secondary/5 mb-8">
              <div className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">Choosing Option 1 over plastic reduces waste by ~15kg per month.</p>
                  <p className="text-sm text-muted-foreground">The Kraft Cookie Box is recyclable and uses less material than standard plastic clamshells for bakery items.</p>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg text-center border border-border">
              PackAdvisor provides informational recommendations based on available product data. Verify food-contact suitability, supplier documentation and local requirements before purchasing.
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
