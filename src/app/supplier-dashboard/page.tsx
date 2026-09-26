"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PackageOpen, Users, TrendingUp } from "lucide-react"
import { motion } from "framer-motion";

export default function SupplierDashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-info/10 text-info border border-info/20 px-3 py-1.5 rounded-full text-sm font-medium mb-3">
          <PackageOpen className="h-4 w-4" /> B2B Supplier Portal (Demo)
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">GreenPack Solutions</h1>
        <p className="text-muted-foreground">Overview of aggregated demand and active group orders.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-card border-border shadow-sm glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Active Group Orders</p>
              <div className="p-2 bg-muted rounded-md"><PackageOpen className="h-4 w-4 text-muted-foreground" /></div>
            </div>
            <h3 className="text-3xl font-bold text-foreground">4</h3>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-sm glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Total Committed Volume</p>
              <div className="p-2 bg-muted rounded-md"><Users className="h-4 w-4 text-muted-foreground" /></div>
            </div>
            <h3 className="text-3xl font-bold text-foreground">32,400</h3>
            <p className="text-xs text-muted-foreground mt-2">Units across all products</p>
          </CardContent>
        </Card>
        <Card className="bg-info/5 border-info/20 shadow-sm relative overflow-hidden">
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-info">Estimated Revenue</p>
              <div className="p-2 bg-info/10 rounded-md"><TrendingUp className="h-4 w-4 text-info" /></div>
            </div>
            <h3 className="text-3xl font-bold text-info">₹2,14,500</h3>
            <p className="text-xs text-info/80 mt-2 flex items-center gap-1">
              From grouped demand
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-6">Aggregated Demand Pipeline</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-info bg-card shadow-sm border-y-border border-r-border glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Kraft Food Box</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-info bg-info/10 px-2 py-0.5 rounded text-xs border border-info/20">Accumulating Demand</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center p-4 bg-muted/50 rounded-lg border border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Required</p>
                  <p className="font-bold text-lg text-foreground">5,000</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Committed</p>
                  <p className="font-bold text-lg text-secondary">4,000</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Remaining</p>
                  <p className="font-bold text-lg text-muted-foreground">1,000</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-xs font-medium mb-2 text-muted-foreground">
                  <span>80% filled</span>
                </div>
                <Progress value={80} className="h-2 bg-muted border border-border" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary bg-card shadow-sm border-y-border border-r-border glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Paper Stand-Up Pouch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded text-xs border border-secondary/20">Ready for Production</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center p-4 bg-muted/50 rounded-lg border border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Required</p>
                  <p className="font-bold text-lg text-foreground">10,000</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Committed</p>
                  <p className="font-bold text-lg text-secondary">10,500</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Remaining</p>
                  <p className="font-bold text-lg text-muted-foreground">0</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-xs font-medium mb-2 text-secondary">
                  <span>Target reached!</span>
                </div>
                <Progress value={100} className="h-2 bg-secondary/20 border border-secondary/30 [&>div]:bg-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
