import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const DonatePage = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !name || !email) {
      toast.error("कृपया सभी फ़ील्ड भरें");
      return;
    }

    setIsProcessing(true);
    
    // TODO: Integrate with payment gateway
    // After successful payment, call edge function to verify and store
    
    setTimeout(() => {
      toast.success("धन्यवाद! आपका दान स्वीकार किया गया है।");
      setIsProcessing(false);
      setAmount("");
      setName("");
      setEmail("");
    }, 2000);
  };

  const presetAmounts = [100, 500, 1000, 5000];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-6 rounded-full sacred-gradient divine-glow mb-4">
              <Heart className="w-16 h-16 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-devanagari text-gradient mb-4">
              दान करें
            </h1>
            <p className="text-lg font-devanagari text-muted-foreground">
              वैदिक ज्ञान के प्रसार में सहयोग करें
            </p>
          </div>

          <Card className="p-8 temple-shadow">
            <form onSubmit={handleDonate} className="space-y-6">
              <div>
                <Label htmlFor="amount" className="font-devanagari text-lg mb-3 block">
                  राशि चुनें (₹)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant={amount === preset.toString() ? "default" : "outline"}
                      onClick={() => setAmount(preset.toString())}
                      className="font-devanagari"
                    >
                      ₹{preset}
                    </Button>
                  ))}
                </div>
                <Input
                  id="amount"
                  type="number"
                  placeholder="अन्य राशि दर्ज करें"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="font-devanagari"
                />
              </div>

              <div>
                <Label htmlFor="name" className="font-devanagari text-lg mb-2 block">
                  नाम
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="अपना नाम दर्ज करें"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-devanagari"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-devanagari text-lg mb-2 block">
                  ईमेल
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sacred-gradient text-primary-foreground font-devanagari text-xl divine-glow"
                disabled={isProcessing}
              >
                {isProcessing ? "प्रक्रिया में..." : "दान करें"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm font-devanagari text-muted-foreground text-center">
                आपका दान वैदिक ज्ञान के संरक्षण और प्रसार में सहायक होगा। धन्यवाद!
              </p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonatePage;
