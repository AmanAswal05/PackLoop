"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Leaf, ArrowUpRight, TrendingUp, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
}

export default function About() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto px-4 py-20 max-w-5xl relative z-10"
    >
      <motion.header variants={item} className="mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">About PackLoop</h1>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
          A sustainable packaging marketplace prototype designed to help small businesses overcome cost and availability challenges.
        </p>
      </motion.header>

      <div className="space-y-16">
        <motion.section variants={item}>
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-error/10 text-error border border-error/20 flex items-center justify-center text-lg font-black">01</span>
            The Problem
          </h2>
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-border/50 text-xl text-card-foreground leading-relaxed shadow-lg">
            Small food and retail businesses may want to reduce packaging waste but can face cost and availability challenges. Suppliers require high minimum order quantities (MOQs) to offer affordable prices, locking small sellers out of sustainable options and forcing them to rely on cheaper, mixed-plastic alternatives.
          </div>
        </motion.section>

        <motion.section variants={item}>
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-lg font-black">02</span>
            The Solution
          </h2>
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-border/50 text-xl text-card-foreground leading-relaxed shadow-lg">
            PackLoop combines packaging discovery, cost comparison, supplier discovery, and shared group purchasing. By aggregating demand across multiple small businesses, PackLoop allows them to hit supplier MOQs together, unlocking bulk pricing for everyone.
          </div>
        </motion.section>

        <motion.section variants={item}>
          <h2 className="text-3xl font-bold text-foreground mb-8">Prototype Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="glass-panel border-border/50 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center flex flex-col justify-center h-full">
                <div className="text-5xl font-black text-foreground mb-4">500</div>
                <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Demo monthly orders</p>
              </CardContent>
            </Card>
            <Card className="glass-panel border-border/50 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center flex flex-col justify-center h-full">
                <div className="text-5xl font-black text-foreground mb-4">₹750</div>
                <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Example monthly diff</p>
              </CardContent>
            </Card>
            <Card className="glass-panel border-border/50 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center flex flex-col justify-center h-full">
                <div className="text-5xl font-black text-foreground mb-4">5,000</div>
                <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Example group-buy target</p>
              </CardContent>
            </Card>
            <Card className="glass-panel border-border/50 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center flex flex-col justify-center h-full">
                <div className="text-5xl font-black text-foreground mb-4">18</div>
                <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Example participating sellers</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center italic">Note: These are prototype / illustrative values.</p>
        </motion.section>

        <motion.section variants={item} className="bg-primary/95 backdrop-blur-xl text-primary-foreground rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Leaf className="w-64 h-64" />
          </div>
          <h2 className="text-4xl font-bold mb-12 relative z-10">Future Expansion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
            {[
              { title: "Real Suppliers", desc: "Onboard actual manufacturers" },
              { title: "Logistics Integration", desc: "End-to-end delivery tracking" },
              { title: "Supplier Verification", desc: "Strict audits and certificates" },
              { title: "Real Payments", desc: "Escrow and split payments" },
              { title: "Regional Hubs", desc: "Localized distribution centers" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 shadow-inner">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{feature.title}</h4>
                  <p className="text-primary-foreground/80 mt-1">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}
