import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FounderBiography = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Founder: Maharshi Dayanand Saraswati
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src="https://placehold.co/500x600/ff9933/ffffff?text=Maharshi+Dayanand"
              alt="Maharshi Dayanand Saraswati"
              className="rounded-lg temple-shadow w-full max-w-md object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/500x600/ff9933/ffffff?text=Maharshi";
              }}
            />
          </div>
          <Card className="temple-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">
                <span className="font-devanagari">महर्षि दयानन्द सरस्वती</span>
              </CardTitle>
              <p className="text-muted-foreground mt-2">1824 - 1883</p>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Born as Mool Shankar Tiwari in 1824 in Gujarat, Maharshi Dayanand Saraswati was a profound 
                scholar and social reformer who dedicated his life to reviving Vedic wisdom and eradicating 
                social evils from Hindu society.
              </p>
              <p>
                After years of rigorous study and spiritual practice, he founded Arya Samaj in Mumbai in 1875 
                with the mission to propagate Vedic knowledge and reform society. His clarion call "Back to the Vedas" 
                resonated across India.
              </p>
              <p>
                He authored "Satyarth Prakash" (The Light of Truth), which outlines his philosophy and vision 
                for a reformed society based on Vedic principles. He championed women's rights, opposed the 
                caste system, and fought against superstitions.
              </p>
              <p>
                His teachings continue to inspire millions worldwide, emphasizing truth, righteousness, 
                and the pursuit of knowledge through the eternal wisdom of the Vedas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FounderBiography;
