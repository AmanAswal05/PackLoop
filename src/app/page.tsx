"use client";
import Link from "next/link";
import { PackageSearch, Users, Calculator, ArrowRight, PlayCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useToastStore } from "@/lib/toast-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
};

export default function Home() {
  const { setDemoMode } = useAppStore();
  const { addToast } = useToastStore();
  const router = useRouter();

  const handleDemoStart = () => {
    setDemoMode(true);
    addToast("Demo Mode Activated. Welcome to PackLoop!", "success");
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 lg:pt-0">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="max-w-2xl text-left"
            >
              <motion.div variants={item} className="inline-flex items-center p-3 bg-primary/10 rounded-full mb-6 glass">
                <PackageSearch className="h-6 w-6 text-primary mr-3" />
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">Next-Gen Packaging</span>
              </motion.div>
              <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[1.1]">
                Make sustainable <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">packaging affordable.</span>
              </motion.h1>
              <motion.p variants={item} className="text-xl text-muted-foreground mb-10 max-w-xl">
                PackLoop helps small businesses discover, compare and collectively purchase packaging that fits their products and budget.
              </motion.p>
              <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard"
                  className="group relative inline-flex items-center justify-center h-14 px-8 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Exploring <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <button 
                  onClick={handleDemoStart}
                  className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-black/10 dark:border-white/10 text-foreground font-medium hover:bg-white/20 dark:hover:bg-black/20 transition-all shadow-lg hover:shadow-xl"
                >
                  <PlayCircle className="mr-2 h-5 w-5 text-primary" />
                  Watch Demo
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Small sellers shouldn’t need bulk <br/> buying power to access better packaging.
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Here is how PackLoop levels the playing field.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", icon: <PackageSearch className="h-6 w-6" />, title: "Discover", desc: "Find packaging based on product, quantity and budget." },
              { num: "02", icon: <Users className="h-6 w-6" />, title: "Combine", desc: "Join group orders with other small sellers to aggregate demand." },
              { num: "03", icon: <Calculator className="h-6 w-6" />, title: "Save", desc: "Access supplier bulk pricing without buying the entire bulk quantity yourself." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="glass-panel p-10 rounded-3xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 text-9xl font-black text-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors duration-500 pointer-events-none">
                  {step.num}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-8 backdrop-blur-sm border border-primary/10 group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0 rounded-t-[4rem] md:rounded-t-[8rem]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-0 rounded-t-[4rem] md:rounded-t-[8rem]"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-4xl relative z-10 text-center text-primary-foreground pt-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter">Better packaging shouldn’t <br/> require bigger businesses.</h2>
          <p className="text-primary-foreground/80 mb-12 text-2xl font-light">Discover. Compare. Combine.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center h-16 px-10 rounded-full bg-background text-foreground font-bold hover:scale-105 transition-transform shadow-2xl"
            >
              Explore PackLoop
            </Link>
            <button 
              onClick={handleDemoStart}
              className="inline-flex items-center justify-center h-16 px-10 rounded-full glass-panel text-primary-foreground font-bold hover:bg-white/10 transition-colors border border-white/20"
            >
              Run Demo
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
