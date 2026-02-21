import { motion } from "motion/react";
import { 
  Truck, 
  Package, 
  Bot, 
  Leaf, 
  Navigation,  
  BarChart3, 
  MapPin, 
  Wrench, 
  Boxes,
  ArrowRight,
  ShieldCheck,
  Zap,
  Weight,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleAccess = () => {
    if (user && user.role) {
      switch (user.role) {
        case 'Dispatcher': navigate('/dispatcher'); break;
        case 'FinancialAnalyst': navigate('/financial-analyst'); break;
        case 'FleetManager': navigate('/fleet-manager'); break;
        case 'SafetyOfficer': navigate('/safety-officer'); break;
        default: navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-navy-primary/5 px-6 lg:px-20 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} alt="FleetFlow Logo" className="w-8 h-8 object-contain" />
        <span className="text-navy-primary text-xl font-bold tracking-tight">FleetFlow</span>
      </div>
      <div className="hidden md:flex items-center gap-10">
        {["Product", "Solutions", "Pricing", "Resources"].map((item) => (
          <a key={item} href="#" className="text-slate-600 hover:text-navy-primary text-sm font-semibold transition-colors">
            {item}
          </a>
        ))}
      </div>
      <button 
        onClick={handleAccess}
        className="bg-muted-gold hover:bg-muted-gold/90 text-black px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm"
      >
        {user ? 'Go to Dashboard' : 'Log In'}
      </button>
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleAccess = () => {
    if (user && user.role) {
      switch (user.role) {
        case 'Dispatcher': navigate('/dispatcher'); break;
        case 'FinancialAnalyst': navigate('/financial-analyst'); break;
        case 'FleetManager': navigate('/fleet-manager'); break;
        case 'SafetyOfficer': navigate('/safety-officer'); break;
        default: navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-20 pt-16 pb-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-navy-primary/5 text-navy-primary px-4 py-1.5 rounded-full w-fit mx-auto lg:mx-0">
            <Zap className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wider">The New Standard in Logistics</span>
          </div>
          <h1 className="text-navy-primary text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            Precision Fleet Management. <br />
            <span className="text-primary-orange">Real-Time Flow.</span>
          </h1>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            From trip dispatching to proactive maintenance, take control of your logistics with a single, high-fidelity dashboard designed for performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={handleAccess}
              className="bg-navy-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-navy-primary/90 transition-all shadow-lg shadow-navy-primary/20"
            >
              Access Dashboard
            </button>
          </div>
        </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative group"
      >
        <div className="absolute -inset-4 bg-navy-primary/5 rounded-3xl blur-2xl group-hover:bg-navy-primary/10 transition-all"></div>
        <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip Dispatcher v4.2</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-3 font-semibold">Route</th>
                  <th className="pb-3 font-semibold">Vehicle</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { route: "Mumbai → Pune", sub: "Expressway A12", vehicle: "MH-12-FG-4521", status: "In Transit", eta: "14:45 PM", statusColor: "bg-green-100 text-green-700" },
                  { route: "Bangalore → Hubli", sub: "Route 48-B", vehicle: "KA-05-MM-9012", status: "Loading", eta: "16:10 PM", statusColor: "bg-orange-100 text-orange-700" },
                  { route: "Delhi → Jaipur", sub: "Expressway A8", vehicle: "DL-01-JK-3321", status: "Delayed", eta: "18:00 PM", statusColor: "bg-slate-100 text-slate-500" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-navy-primary">{row.route}</span>
                        <span className="text-[10px] text-slate-500">{row.sub}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600 font-medium">{row.vehicle}</td>
                    <td className="py-4">
                      <span className={`${row.statusColor} px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide`}>{row.status}</span>
                    </td>
                    <td className="py-4 font-mono font-bold text-navy-primary">{row.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
}

const SocialProof = () => (
  <div className="bg-white/50 border-y border-slate-100 py-10">
    <div className="max-w-7xl mx-auto px-6 lg:px-20">
      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Trusted by industry leaders</p>
      <div className="flex flex-wrap justify-center gap-12 lg:gap-24 grayscale opacity-40">
        <div className="flex items-center gap-2"><Truck className="w-8 h-8" /> <span className="font-black text-xl">LOGIX</span></div>
        <div className="flex items-center gap-2"><Package className="w-8 h-8" /> <span className="font-black text-xl">SHIPIT</span></div>
        <div className="flex items-center gap-2"><Bot className="w-8 h-8" /> <span className="font-black text-xl">NETNODE</span></div>
        <div className="flex items-center gap-2"><Leaf className="w-8 h-8" /> <span className="font-black text-xl">GREENMOVE</span></div>
      </div>
    </div>
  </div>
);

const Features = () => (
  <section className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
    <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
      {[
        { icon: MapPin, label: "Active Fleet", title: "Live tracking" },
        { icon: Wrench, label: "Maintenance Alerts", title: "Service Sync" },
        { icon: Boxes, label: "Pending Cargo", title: "Load Optimization" },
      ].map((feature, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-xl transition-all"
        >
          <div className="bg-muted-gold/10 w-12 h-12 rounded-xl flex items-center justify-center">
            <feature.icon className="text-muted-gold w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{feature.label}</p>
            <h3 className="text-navy-primary text-2xl font-black">{feature.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const BentoGrid = () => (
  <section className="max-w-7xl mx-auto px-6 lg:px-20 py-20 bg-ice-blue rounded-[3rem] mb-20 mx-4 lg:mx-auto">
    <div className="flex flex-col gap-4 mb-16 text-center lg:text-left">
      <h2 className="text-navy-primary text-4xl lg:text-5xl font-black">The Bento Command Center</h2>
      <p className="text-slate-600 text-lg max-w-2xl">Modular tools designed for high-performance logistics teams. Every mile, every kilogram, accounted for.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-navy-primary/5 flex flex-col justify-between hover:border-primary-orange/20 transition-colors">
        <div className="flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy-primary flex items-center justify-center">
            <Navigation className="text-white w-5 h-5" />
          </div>
          <h4 className="text-navy-primary text-2xl font-bold">Trip Dispatcher</h4>
          <p className="text-slate-500">Intelligent real-time routing with automated driver assignments and dynamic traffic rerouting.</p>
        </div>
        <div className="mt-12 bg-ice-blue/50 rounded-xl p-4 border border-dashed border-navy-primary/10">
          <div className="flex justify-between items-center text-[10px] font-bold text-navy-primary mb-2">
            <span>OPTIMIZED PATHFINDER</span>
            <span className="text-primary-orange">ACTIVE</span>
          </div>
          <div className="flex gap-2">
            <div className="h-1 flex-1 bg-primary-orange rounded-full"></div>
            <div className="h-1 flex-1 bg-primary-orange rounded-full"></div>
            <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="md:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-navy-primary/5 hover:border-primary-orange/20 transition-colors">
        <div className="flex flex-col gap-4 h-full">
          <div className="w-10 h-10 rounded-lg bg-ice-blue flex items-center justify-center">
            <Activity className="text-navy-primary w-5 h-5" />
          </div>
          <h4 className="text-navy-primary text-xl font-bold">Maintenance</h4>
          <p className="text-slate-500 text-sm">Proactive odometer tracking. Get alerted before failures happen.</p>
          <div className="mt-auto pt-6">
            <div className="text-3xl font-black text-navy-primary tracking-tighter">12,482<span className="text-sm font-normal text-slate-400 ml-1">km</span></div>
            <p className="text-[10px] text-primary-orange font-bold uppercase">Next Service in 518 km</p>
          </div>
        </div>
      </div>

      <div className="md:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-navy-primary/5 hover:border-primary-orange/20 transition-colors">
        <div className="flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-ice-blue flex items-center justify-center">
            <BarChart3 className="text-navy-primary w-5 h-5" />
          </div>
          <h4 className="text-navy-primary text-xl font-bold">Performance</h4>
          <p className="text-slate-500 text-sm">Real-time fuel efficiency and driver performance scoring.</p>
        </div>
        <div className="mt-8 flex items-end gap-1 h-12">
          {[0.4, 0.6, 1, 0.5, 0.8].map((h, i) => (
            <div key={i} className={`w-full ${i === 2 ? 'bg-primary-orange' : i === 4 ? 'bg-navy-primary' : 'bg-slate-100'} rounded-t-sm`} style={{ height: `${h * 100}%` }}></div>
          ))}
        </div>
      </div>

      <div className="md:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-navy-primary/5 hover:border-primary-orange/20 transition-colors">
        <div className="flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-ice-blue flex items-center justify-center">
            <Weight className="text-navy-primary w-5 h-5" />
          </div>
          <h4 className="text-navy-primary text-xl font-bold">Cargo Insight</h4>
          <p className="text-slate-500 text-sm">Monitor weight distribution and payload efficiency instantly.</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-navy-primary h-full w-[85%]"></div>
            </div>
            <span className="text-[10px] font-bold text-navy-primary">85% Capacity</span>
          </div>
        </div>
      </div>

      <div className="md:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-navy-primary/5 hover:border-primary-orange/20 transition-colors">
        <div className="flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-ice-blue flex items-center justify-center">
            <ShieldCheck className="text-navy-primary w-5 h-5" />
          </div>
          <h4 className="text-navy-primary text-xl font-bold">Analytics</h4>
          <p className="text-slate-500 text-sm">Comprehensive data visualization for fleet-wide health metrics.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-ice-blue p-2 rounded-lg text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase">ROI</p>
              <p className="text-sm font-black text-navy-primary">+22%</p>
            </div>
            <div className="bg-ice-blue p-2 rounded-lg text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Safety</p>
              <p className="text-sm font-black text-navy-primary">98.2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AIScore = () => (
  <section className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
    <div className="bg-navy-primary rounded-[3rem] p-8 lg:p-16 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-orange/10 to-transparent pointer-events-none"></div>
      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full mb-6">
            <Bot className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">AI Core v2.0</span>
          </div>
          <h2 className="text-white text-4xl lg:text-5xl font-black mb-6">
            Predictive Intelligence <br />
            <span className="text-primary-orange">for Every Route.</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg">
            Our proprietary AI engine analyzes millions of data points to predict maintenance needs, optimize fuel consumption, and prevent delays before they happen.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Prediction Accuracy", value: "99.4%" },
              { label: "Fuel Saved", value: "14.2%" },
            ].map((stat, i) => (
              <div key={i} className="border-l-2 border-primary-orange/30 pl-4">
                <p className="text-white/50 text-[10px] font-bold uppercase">{stat.label}</p>
                <p className="text-white text-2xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-white text-sm font-bold">AI Analysis Live Feed</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { msg: "Predicting brake wear on VH-442 in 450km", type: "alert" },
              { msg: "Optimizing route for DL-01-JK-3321: +12m saved", type: "success" },
              { msg: "Fuel efficiency anomaly detected in KA-05-MM", type: "warning" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.type === 'alert' ? 'bg-red-400' : item.type === 'success' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <p className="text-white/80 text-xs font-medium">{item.msg}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button className="text-primary-orange font-bold text-sm hover:text-primary-orange/80 transition-colors flex items-center gap-2 mx-auto">
              View AI Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTA = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleAccess = () => {
    if (user && user.role) {
      switch (user.role) {
        case 'Dispatcher': navigate('/dispatcher'); break;
        case 'FinancialAnalyst': navigate('/financial-analyst'); break;
        case 'FleetManager': navigate('/fleet-manager'); break;
        case 'SafetyOfficer': navigate('/safety-officer'); break;
        default: navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-20 pb-24">
      <div className="bg-muted-gold rounded-[2.5rem] p-12 lg:p-24 text-center flex flex-col items-center gap-8 shadow-2xl shadow-muted-gold/20">
        <h2 className="text-navy-primary text-4xl lg:text-6xl font-black max-w-3xl leading-tight">
          Ready to optimize your flow?
        </h2>
        <p className="text-navy-primary/80 text-lg lg:text-xl font-medium max-w-xl">
          Join over 400+ logistics companies streamlining their operations with FleetFlow today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button 
            onClick={handleAccess}
            className="bg-navy-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}
const Footer = () => (
  <footer className="bg-white border-t border-slate-100 py-16 px-6 lg:px-20">
    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
      <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="FleetFlow Logo" className="w-6 h-6 object-contain" />
          <span className="text-navy-primary text-lg font-bold">FleetFlow</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Precision tools for the modern logistics industry. Real-time data, real-world results.
        </p>
      </div>
      {[
        { title: "Product", links: ["Features", "API Docs", "Pricing"] },
        { title: "Company", links: ["About Us", "Customers", "Careers"] },
        { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service"] },
      ].map((col) => (
        <div key={col.title} className="flex flex-col gap-4">
          <h5 className="text-navy-primary font-bold">{col.title}</h5>
          {col.links.map((link) => (
            <a key={link} href="#" className="text-slate-500 hover:text-navy-primary text-sm transition-colors">
              {link}
            </a>
          ))}
        </div>
      ))}
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-50 flex justify-between items-center">
      <p className="text-slate-400 text-xs font-medium">© 2024 FleetFlow Inc. All rights reserved.</p>
      <div className="flex gap-4 opacity-50">
        <ArrowRight className="w-4 h-4 text-slate-600 cursor-pointer" />
        <Activity className="w-4 h-4 text-slate-600 cursor-pointer" />
      </div>
    </div>
  </footer>
);


export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary-orange/30">
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <SocialProof />
        <Features />
        <BentoGrid />
        <AIScore />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
