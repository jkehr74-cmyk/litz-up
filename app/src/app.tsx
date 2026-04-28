import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Menu, Truck, CheckCircle, 
  Clock, Shield, Award, Star, MapPin, Calendar, DollarSign, 
  FileText, Check, Mail, ChevronDown, ArrowRight, TreePine, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SchedulerModal } from '@/components/SchedulerModal';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

const testimonials = [
  {
    author: 'Mike Johnson',
    rating: 5,
    quote: "Called at 2 AM during the storm when a massive oak fell across our driveway. Gold Palm had a crew here within 90 minutes and cleared everything safely. Saved our insurance claim!",
    tags: ['Emergency Response', 'Storm Damage'],
  },
  {
    author: 'Sarah Martinez',
    rating: 5,
    quote: "Had a 70-foot pine leaning over power lines. Three other companies said it was too dangerous. Gold Palm handled it perfectly with their crane truck. No power outage, no damage.",
    tags: ['High-Risk Removal', 'Power Lines'],
  },
  {
    author: 'Robert Chen',
    rating: 5,
    quote: "Professional, fast, and incredibly skilled. They removed a dangerous tree between two houses with only 3 feet of clearance. Insurance company was impressed with their work.",
    tags: ['Tight Space Removal', 'Insurance Approved'],
  },
];

const faqs = [
  {
    question: 'How quickly can you respond to emergencies?',
    answer: 'We guarantee response within 2 hours for true emergencies, 24/7. Our crews are on-call and equipped with emergency lighting for night operations.',
  },
  {
    question: 'Do you handle trees near power lines?',
    answer: "Yes, we're certified for power line clearance work and coordinate with utility companies. We have specialized equipment and training for electrical hazard situations.",
  },
  {
    question: 'Will insurance cover emergency tree removal?',
    answer: "Most homeowner's insurance covers storm-damaged trees that threaten structures. We provide detailed documentation and work directly with insurance adjusters.",
  },
  {
    question: 'What makes a tree removal "high-risk"?',
    answer: "Trees over 50 feet, near structures/power lines, storm-damaged, or in tight spaces require specialized equipment and expertise. We handle what others won't attempt.",
  },
];

const stats = [
  { value: '30+', label: 'Years Experience' },
  { value: '1,000+', label: 'Trees Removed' },
  { value: '<2 Hrs', label: 'Emergency Response' },
  { value: '$2M', label: 'Insurance Coverage' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-gold-400">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gold-500/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3 group">
              <img 
                src="/images/logo.png" 
                alt="Gold Palm Solutions" 
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gold-400/80 hover:text-gold-400 font-medium transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Button 
                onClick={() => setIsSchedulerOpen(true)}
                variant="outline"
                className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <a 
                href="tel:+17276214041"
                className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-black font-semibold px-4 py-2 rounded-md hover:opacity-90 glow-gold transition-opacity"
              >
                <Phone className="w-4 h-4" />
                (727) 621-4041
              </a>
            </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-gold-400">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-black border-l border-gold-500/20">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium text-gold-400/80 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <Button 
                    onClick={() => { setIsMenuOpen(false); setIsSchedulerOpen(true); }}
                    variant="outline"
                    className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Service
                  </Button>
                  <a 
                    href="tel:+17276214041" 
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-black font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black-50 to-black" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
          </div>
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/5"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gold-400/80 text-sm font-medium">24/7 Emergency Response Available</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
              >
                <span className="text-gradient-gold">Gold Palm</span>
                <br />
                <span className="text-white">Solutions</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gold-400/70 max-w-2xl mx-auto font-light"
              >
                Premium Tree Removal Services
                <span className="block text-gold-400/50 text-lg mt-2">Sarasota • Bradenton • Tampa Bay</span>
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              >
                <a 
                  href="tel:+17276214041"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-black font-bold text-lg px-8 py-4 rounded-lg glow-gold hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-5 h-5" />
                  Emergency Call
                </a>
                <Button 
                  onClick={() => setIsSchedulerOpen(true)}
                  size="lg"
                  variant="outline"
                  className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500 text-lg px-8 py-6 rounded-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Service
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-12"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gradient-gold">{stat.value}</div>
                    <div className="text-sm text-gold-400/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gold-400/50"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black-100 to-black" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-gold-400/60 text-sm uppercase tracking-widest">What We Offer</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                <span className="text-gradient-gold">Our Services</span>
              </h2>
              <p className="text-gold-400/60 mt-4 max-w-2xl mx-auto">
                Professional tree removal solutions for every situation. From emergency storm damage to planned removals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: AlertTriangle, 
                  title: 'Emergency Removal', 
                  desc: '24/7 rapid response for storm damage, fallen trees, and urgent situations. We arrive within 2 hours.',
                  highlight: true
                },
                { 
                  icon: Shield, 
                  title: 'High-Risk Removal', 
                  desc: 'Specialized equipment and trained crews for dangerous trees near power lines and structures.',
                  highlight: false
                },
                { 
                  icon: Truck, 
                  title: 'Crane Services', 
                  desc: '90-ton crane trucks for precision removal of large trees in tight spaces with minimal impact.',
                  highlight: false
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`group relative p-8 rounded-2xl border transition-all duration-300 ${
                    service.highlight 
                      ? 'border-gold-500/50 bg-gold-500/5 glow-gold' 
                      : 'border-gold-500/20 bg-black-50 hover:border-gold-500/40'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    service.highlight ? 'bg-gradient-gold' : 'bg-gold-500/10'
                  }`}>
                    <service.icon className={`w-7 h-7 ${service.highlight ? 'text-black' : 'text-gold-400'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gold-400 mb-3">{service.title}</h3>
                  <p className="text-gold-400/60 leading-relaxed">{service.desc}</p>
                  <div className="mt-6 flex items-center text-gold-400/80 group-hover:text-gold-400 transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-24 relative">
          <div className="absolute inset-0 bg-black" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-gold-400/60 text-sm uppercase tracking-widest">Our Work</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                <span className="text-gradient-gold">Before & After</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative rounded-2xl overflow-hidden border border-gold-500/20"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="/images/before-tree.jpg" 
                    alt="Before - Emergency tree situation"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className="bg-red-500/80 text-white border-0 mb-3">Emergency</Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">Before: Dangerous Situation</h3>
                  <p className="text-gold-400/70">Large tree threatening residential property requiring immediate removal.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative rounded-2xl overflow-hidden border border-gold-500/20"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="/images/after-tree.png" 
                    alt="After - Professional removal"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className="bg-green-500/80 text-white border-0 mb-3">Complete</Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">After: Safe & Clean</h3>
                  <p className="text-gold-400/70">Professional crane-assisted removal completed safely with zero damage.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black-100 to-black" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-gold-400/60 text-sm uppercase tracking-widest">Our Fleet</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                <span className="text-gradient-gold">Professional Equipment</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { img: '/images/crane-truck.png', title: '90-Ton Crane Trucks', desc: 'Precision control for safe removal up to 150 feet' },
                { img: '/images/cutting-tools.jpg', title: 'Specialized Tools', desc: 'Professional-grade equipment for any situation' },
                { img: '/images/cleanup-crew.jpg', title: 'Complete Cleanup', desc: 'Full debris removal and site restoration' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 mb-4">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                  </div>
                  <h3 className="text-xl font-bold text-gold-400 mb-2">{item.title}</h3>
                  <p className="text-gold-400/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About / Why Choose Section */}
        <section id="about" className="py-24 relative">
          <div className="absolute inset-0 bg-black" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-gold-400/60 text-sm uppercase tracking-widest">Why Choose Us</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                  <span className="text-gradient-gold">The Gold Palm</span>
                  <br />
                  <span className="text-white">Difference</span>
                </h2>
                <p className="text-gold-400/60 text-lg mb-8 leading-relaxed">
                  We're not just another tree service. We specialize exclusively in high-risk, dangerous removals that other companies won't touch. With 30+ years of experience and $2M in insurance coverage, we deliver results with confidence.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Clock, text: '24/7 Emergency Response - 2 Hour Guarantee' },
                    { icon: Shield, text: 'Licensed, Bonded & Fully Insured' },
                    { icon: Award, text: 'ISA Certified Arborists on Staff' },
                    { icon: CheckCircle, text: 'Direct Insurance Billing Available' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gold-400" />
                      </div>
                      <span className="text-gold-400/80">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-gold-500/20">
                  <img 
                    src="/images/equipment.jpg" 
                    alt="Gold Palm Equipment"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-black border border-gold-500/30 rounded-xl p-4 glow-gold">
                  <div className="text-3xl font-bold text-gradient-gold">30+</div>
                  <div className="text-sm text-gold-400/60">Years Experience</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Coverage Area */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black-100 to-black" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-gold-400/60 text-sm uppercase tracking-widest">Service Area</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                <span className="text-gradient-gold">Coverage Area</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { city: 'Sarasota', time: '< 30 min' },
                { city: 'Bradenton', time: '< 30 min' },
                { city: 'Tampa Bay', time: '< 1 hour' },
              ].map((area, index) => (
                <motion.div
                  key={area.city}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="text-center p-8 rounded-2xl border border-gold-500/20 bg-black-50"
                >
                  <MapPin className="w-8 h-8 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gold-400 mb-2">{area.city}</h3>
                  <p className="text-gold-400/60">Response time: {area.time}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="reviews" className="py-24 relative">
          <div className="absolute inset-0 bg-black" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-gold-400/60 text-sm uppercase tracking-widest">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                <span className="text-gradient-gold">What Clients Say</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="p-8 rounded-2xl border border-gold-500/20 bg-black-50 relative"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-gold-400/70 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gold-400">{testimonial.author}</p>
                    </div>
                    <div className="flex gap-2">
                      {testimonial.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gold-500/10 text-gold-400/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black-100 to-black" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-gold-400/60 text-sm uppercase tracking-widest">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                <span className="text-gradient-gold">Transparent Pricing</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-2xl border border-gold-500/20 bg-black-50 text-center"
              >
                <DollarSign className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gold-400 mb-2">Free Assessment</h3>
                <div className="text-4xl font-bold text-gradient-gold mb-4">$0</div>
                <p className="text-gold-400/60">No charge for emergency site evaluation and quote</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="p-8 rounded-2xl border border-gold-500/50 bg-gold-500/5 glow-gold"
              >
                <FileText className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gold-400 mb-2 text-center">Tree Removal</h3>
                <div className="text-4xl font-bold text-gradient-gold mb-4 text-center">Custom</div>
                <ul className="space-y-2 text-gold-400/60 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold-400" />Small trees: $1,200 - $1,500</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold-400" />Medium trees: $1,500 - $3,500</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold-400" />Large trees: $3,500 - $8,000+</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="p-8 rounded-2xl border border-gold-500/20 bg-black-50 text-center"
              >
                <Shield className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gold-400 mb-2">Insurance Billing</h3>
                <div className="text-4xl font-bold text-gradient-gold mb-4">Direct</div>
                <p className="text-gold-400/60">We work directly with your insurance company</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-black" />
          
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-gold-400/60 text-sm uppercase tracking-widest">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                <span className="text-gradient-gold">Common Questions</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border border-gold-500/20 rounded-xl px-6 bg-black-50 data-[state=open]:border-gold-500/40"
                  >
                    <AccordionTrigger className="text-left text-gold-400 hover:text-gold-300 py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gold-400/60 pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gold-500/5 to-black" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TreePine className="w-16 h-16 text-gold-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient-gold">Ready to Get Started?</span>
              </h2>
              <p className="text-xl text-gold-400/60 mb-8 max-w-2xl mx-auto">
                Don't wait for disaster to strike. Our crews are standing by 24/7 to protect your property.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+17276214041"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-black font-bold text-lg px-8 py-4 rounded-lg glow-gold hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-5 h-5" />
                  Call (727) 621-4041
                </a>
                <Button 
                  onClick={() => setIsSchedulerOpen(true)}
                  size="lg"
                  variant="outline"
                  className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500 text-lg px-8 py-6 rounded-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Online
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="relative border-t border-gold-500/20">
        <div className="absolute inset-0 bg-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <img src="/images/logo.png" alt="Gold Palm Solutions" className="h-16 w-auto mb-4" />
              <p className="text-gold-400/60 text-sm leading-relaxed">
                Premium emergency tree removal specialists serving Sarasota, Bradenton, and Tampa Bay.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gold-400 mb-4">Services</h4>
              <ul className="space-y-2">
                {['Emergency Removal', 'High-Risk Removal', 'Crane Services', 'Storm Cleanup', 'Insurance Claims'].map((item) => (
                  <li key={item} className="text-gold-400/60 text-sm">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gold-400 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li><a href="tel:+17276214041" className="flex items-center gap-2 text-gold-400/60 hover:text-gold-400 transition-colors text-sm"><Phone className="w-4 h-4" />(727) 621-4041</a></li>
                <li><a href="mailto:info@goldpalmtreeremoval.com" className="flex items-center gap-2 text-gold-400/60 hover:text-gold-400 transition-colors text-sm"><Mail className="w-4 h-4" />info@goldpalmtreeremoval.com</a></li>
                <li className="flex items-start gap-2 text-gold-400/60 text-sm"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /><span>Serving Sarasota, Manatee, Hillsborough, Pasco, Pinellas & Polk Counties</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gold-400 mb-4">Certifications</h4>
              <ul className="space-y-2">
                {['Licensed & Insured', '$2M Liability Coverage', 'ISA Certified Arborists', 'OSHA Safety Trained'].map((cert) => (
                  <li key={cert} className="flex items-center gap-2 text-gold-400/60 text-sm"><Check className="w-4 h-4 text-gold-400" />{cert}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gold-500/20 mt-12 pt-8 text-center">
            <p className="text-gold-400/40 text-sm">
              © 2025 Gold Palm Solutions. All Rights Reserved. | Licensed & Insured
            </p>
          </div>
        </div>
      </footer>

      {/* Scheduler Modal */}
      <SchedulerModal isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} />
    </div>
  );
}

export default App;