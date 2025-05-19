import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SkipLink from "@/components/SkipLink";
import { ArrowRight, CheckCircle, Clock, Search, ShieldCheck } from "lucide-react";

const Index = () => {
  // Mock features
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Blockchain Secured",
      description:
        "All bid data is secured by blockchain technology, ensuring immutable records and preventing fraud.",
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Transparent Process",
      description:
        "Public access to bid information promotes fair competition and builds trust in the procurement system.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Efficient Workflows",
      description:
        "Streamlined digital processes reduce administrative burden and accelerate procurement timelines.",
    },
  ];

  // Mock statistics
  const stats = [
    { value: "5,000+", label: "Active Bids" },
    { value: "1,200+", label: "Registered Companies" },
    { value: "350Mብር", label: "Contract Value" },
    { value: "98%", label: "Digital Compliance" },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <SkipLink />
        <Navbar />
        
        <main id="main" className="flex-grow">
          {/* Hero Section */}
          <header className="py-20 bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-screen-2xl 2xl:max-w-screen-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center xl:gap-24">
                <div className="animate-fade-in flex flex-col items-start xl:items-start xl:justify-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-2xl xl:max-w-3xl">
                    Ethiopia's Digital <span className="text-primary">Public Procurement</span> Platform
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                    A blockchain-powered platform revolutionizing how government
                    contracts are awarded through transparency, security, and
                    efficiency.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/bids">
                      <Button size="lg" className="flex items-center gap-2">
                        Browse Bids <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/auth/register">
                      <Button size="lg" variant="outline">
                        Register as Bidder
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg flex justify-center xl:justify-end">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1674&auto=format&fit=crop"
                    alt="Digital Procurement Platform"
                    className="w-full h-full object-cover max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Stats Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 xl:max-w-screen-2xl 2xl:max-w-screen-3xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center xl:gap-16">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <p className="text-3xl md:text-4xl xl:text-5xl font-bold">{stat.value}</p>
                    <p className="text-lg opacity-80 xl:text-xl">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="about" className="py-20">
            <div className="container mx-auto px-4 xl:max-w-screen-2xl 2xl:max-w-screen-3xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                  Transforming Public Procurement
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto xl:text-xl">
                  Ethiopia Bid-Chain combines cutting-edge blockchain technology with
                  user-friendly interfaces to create a more accountable procurement
                  ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-card text-card-foreground p-8 rounded-2xl shadow-lg card-hover max-w-md mx-auto xl:max-w-lg"
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 xl:text-2xl">{feature.title}</h3>
                    <p className="text-muted-foreground xl:text-lg">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4 xl:max-w-screen-2xl 2xl:max-w-screen-3xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto xl:text-xl">
                  A streamlined process that benefits all stakeholders in the
                  procurement ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 xl:gap-12">
                {[
                  {
                    step: "01",
                    title: "Bid Creation",
                    description:
                      "Procurement officers publish tender opportunities with detailed requirements.",
                  },
                  {
                    step: "02",
                    title: "Bid Submission",
                    description:
                      "Qualified vendors submit proposals securely through the platform.",
                  },
                  {
                    step: "03",
                    title: "Evaluation",
                    description:
                      "Transparent scoring and blockchain-verified evaluation process.",
                  },
                  {
                    step: "04",
                    title: "Award & Execution",
                    description:
                      "Contract award and management with continuous monitoring.",
                  },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-background rounded-2xl p-6 shadow-md h-full">
                      <div className="text-secondary font-bold text-lg mb-3">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="h-8 w-8 text-secondary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* User Roles Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  For Every Stakeholder
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our platform serves diverse roles in the procurement ecosystem
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Bidders",
                    description:
                      "Companies can discover opportunities, submit proposals, and track their status.",
                    benefits: [
                      "Easy bid discovery",
                      "Secure document submission",
                      "Real-time status updates",
                    ],
                  },
                  {
                    title: "Procurement Officers",
                    description:
                      "Create and manage tenders, evaluate proposals, and award contracts efficiently.",
                    benefits: [
                      "Streamlined bid creation",
                      "Automated evaluation tools",
                      "Compliance enforcement",
                    ],
                  },
                  {
                    title: "Endorsement Committee",
                    description:
                      "Review and approve procurement decisions with complete context and documentation.",
                    benefits: [
                      "Comprehensive scoring dashboards",
                      "Transparent decision trails",
                      "Regulatory compliance checks",
                    ],
                  },
                  {
                    title: "IT Administrators",
                    description:
                      "Maintain system integrity, manage user accounts, and ensure platform security.",
                    benefits: [
                      "User permission management",
                      "System monitoring tools",
                      "Security audit logs",
                    ],
                  },
                ].map((role, index) => (
                  <div
                    key={index}
                    className="bg-card text-card-foreground rounded-2xl shadow p-8"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-primary">
                      {role.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{role.description}</p>
                    <ul className="space-y-2">
                      {role.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Procurement?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join Ethiopia's digital procurement revolution today and experience
                a new standard of transparency and efficiency.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/bids">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-secondary text-primary hover:bg-secondary/90"
                  >
                    Browse Open Bids
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
