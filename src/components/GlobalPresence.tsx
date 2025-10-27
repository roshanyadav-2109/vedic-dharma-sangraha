import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

const GlobalPresence = () => {
  const countries = [
    "India", "United States", "Canada", "United Kingdom", "Australia", 
    "South Africa", "Kenya", "Trinidad and Tobago", "Guyana", "Suriname",
    "Mauritius", "Fiji", "Singapore", "Malaysia", "Thailand"
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full sacred-gradient flex items-center justify-center">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Global Presence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Since its founding in 1875, Arya Samaj has spread across the world, establishing 
            branches in numerous countries. Today, millions of followers practice Vedic principles 
            and contribute to social welfare in their communities globally.
          </p>
        </div>

        <Card className="temple-shadow max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Arya Samaj Centers Worldwide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {countries.map((country, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="text-primary">•</span>
                  <span className="text-sm font-medium">{country}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              And many more countries across all continents...
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GlobalPresence;
