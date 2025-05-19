import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SkipLink from "@/components/SkipLink";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Globe, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <SkipLink />
        <Navbar />
        <main id="main" className="flex-grow">
          {/* Hero Section */}
          <header className="py-20 bg-gradient-to-b from-primary/10 to-background">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="text-center max-w-3xl mx-auto">
                <div className="mb-4">
                  <span className="inline-block bg-primary text-primary-foreground rounded-full px-4 py-1 text-sm font-semibold shadow">
                    Capstone Project
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                  About <span className="text-primary">Ethiopia Bid-Chain</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Learn more about our mission, vision, and the team behind Ethiopia's digital public procurement revolution.
                  <br />
                  <span className="text-base text-muted-foreground">This project was created as part of our undergraduate capstone at AASTU.</span>
                </p>
                <Link to="/bids">
                  <Button size="lg" className="flex items-center gap-2 mx-auto">
                    Browse Bids <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Mission & Vision Section */}
          <section className="py-20">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    To empower Ethiopia's public procurement system with transparency, security, and efficiency through innovative blockchain technology.
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
                  <p className="text-lg text-muted-foreground">
                    To set a new standard for public trust and accountability in government contracts, making Ethiopia a leader in digital procurement.
                  </p>
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1200&auto=format&fit=crop"
                    alt="Mission and Vision"
                    className="rounded-2xl shadow-lg object-cover w-full max-w-md h-80"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-muted">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We are committed to upholding the highest standards in everything we do.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16">
                <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-lg card-hover max-w-md mx-auto xl:max-w-lg flex flex-col items-center">
                  <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                  <p className="text-muted-foreground text-center">We ensure all processes are transparent and tamper-proof, building trust at every step.</p>
                </div>
                <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-lg card-hover max-w-md mx-auto xl:max-w-lg flex flex-col items-center">
                  <Globe className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-muted-foreground text-center">We leverage cutting-edge technology to solve real-world problems in public procurement.</p>
                </div>
                <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-lg card-hover max-w-md mx-auto xl:max-w-lg flex flex-col items-center">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                  <p className="text-muted-foreground text-center">We work with all stakeholders to create a fair, accessible, and efficient ecosystem.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contributors & Creators Section */}
          <section className="py-20">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Contributors & Creators</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Meet the talented individuals who brought this project to life.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                <div className="flex flex-col items-center bg-card text-card-foreground p-6 rounded-2xl shadow-lg">
                  <img
                    src="https://ui-avatars.com/api/?name=Metsehafe+Eyasu&background=0D8ABC&color=fff&size=128"
                    alt="Metsehafe Eyasu"
                    className="w-24 h-24 rounded-full mb-4 object-cover shadow"
                  />
                  <h3 className="text-lg font-semibold mb-1">Metsehafe Eyasu</h3>
                  <p className="text-muted-foreground text-sm mb-2">Full Stack Developer</p>
                  <p className="text-center text-muted-foreground text-xs">Focused on backend integration and smart contract logic.</p>
                </div>
                <div className="flex flex-col items-center bg-card text-card-foreground p-6 rounded-2xl shadow-lg">
                  <img
                    src="https://ui-avatars.com/api/?name=Mohammed+Restem&background=0D8ABC&color=fff&size=128"
                    alt="Mohammed Restem"
                    className="w-24 h-24 rounded-full mb-4 object-cover shadow"
                  />
                  <h3 className="text-lg font-semibold mb-1">Mohammed Restem</h3>
                  <p className="text-muted-foreground text-sm mb-2">UI/UX Designer</p>
                  <p className="text-center text-muted-foreground text-xs">Designed user flows and crafted the visual experience.</p>
                </div>
                <div className="flex flex-col items-center bg-card text-card-foreground p-6 rounded-2xl shadow-lg">
                  <img
                    src="https://ui-avatars.com/api/?name=Mohammed+Mehad&background=0D8ABC&color=fff&size=128"
                    alt="Mohammed Mehad"
                    className="w-24 h-24 rounded-full mb-4 object-cover shadow"
                  />
                  <h3 className="text-lg font-semibold mb-1">Mohammed Mehad</h3>
                  <p className="text-muted-foreground text-sm mb-2">Frontend Developer</p>
                  <p className="text-center text-muted-foreground text-xs">Implemented responsive layouts and interactive features.</p>
                </div>
                <div className="flex flex-col items-center bg-card text-card-foreground p-6 rounded-2xl shadow-lg">
                  <img
                    src="https://ui-avatars.com/api/?name=Mohammed+Shemim&background=0D8ABC&color=fff&size=128"
                    alt="Mohammed Shemim"
                    className="w-24 h-24 rounded-full mb-4 object-cover shadow"
                  />
                  <h3 className="text-lg font-semibold mb-1">Mohammed Shemim</h3>
                  <p className="text-muted-foreground text-sm mb-2">Frontend Developer</p>
                  <p className="text-center text-muted-foreground text-xs">Coordinated tasks, documentation, and team communication.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Us in Transforming Procurement
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Be part of Ethiopia's digital procurement revolution. Explore open bids or register as a bidder today.
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

export default About; 