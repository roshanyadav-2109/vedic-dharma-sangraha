// src/pages/DonatePage.tsx
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import heroImage from "@/assets/hero-temple.jpg"; // Import the background image

const DonatePage = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !name || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);

    // TODO: Integrate with payment gateway
    // After successful payment, call edge function to verify and store

    setTimeout(() => {
      toast.success("Thank you! Your donation has been received.");
      setIsProcessing(false);
      setAmount("");
      setName("");
      setEmail("");
    }, 2000);
  };

  const presetAmounts = [100, 500, 1000, 5000];

  return (
    // Add relative positioning to the main container
    <div className="min-h-screen relative flex flex-col">
       {/* Background Image Div */}
        <div
            className="absolute inset-0 z-0 bg-cover bg-center blur-sm" // Apply blur
            style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 z-0 bg-background/80 backdrop-blur-sm" /> {/* Adjust opacity (e.g., bg-background/80) */}

      {/* Content needs to be relatively positioned and have a higher z-index */}
      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-32"> {/* Added flex-grow */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-6 rounded-full sacred-gradient divine-glow mb-4">
                <Heart className="w-16 h-16 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Support Our Cause
              </h1>
              <p className="text-lg text-muted-foreground">
                Help us spread Vedic knowledge and support our humanitarian efforts
              </p>
            </div>

            {/* Make card slightly transparent to show background */}
            <Card className="p-8 temple-shadow bg-card/90 backdrop-blur-xs"> {/* Adjusted card background opacity */}
              <form onSubmit={handleDonate} className="space-y-6">
                <div>
                  <Label htmlFor="amount" className="text-lg mb-3 block">
                    Select Amount (₹)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {presetAmounts.map((preset) => (
                      <Button
                        key={preset}
                        type="button"
                        variant={amount === preset.toString() ? "default" : "outline"}
                        onClick={() => setAmount(preset.toString())}
                        className="bg-background/80 hover:bg-background" // Adjust button background for visibility
                      >
                        ₹{preset}
                      </Button>
                    ))}
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter custom amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-background/80" // Adjust input background
                  />
                </div>

                <div>
                  <Label htmlFor="name" className="text-lg mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/80"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-lg mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/80"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sacred-gradient text-primary-foreground text-xl divine-glow"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Donate Now"}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Your donation helps preserve and spread Vedic knowledge. Thank you for your support!
                </p>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DonatePage;
