import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutAryaSamaj = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          About Arya Samaj
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="temple-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Arya Samaj is a monotheistic Hindu reform movement founded by Maharshi Dayanand Saraswati in 1875. 
                It emphasizes the infallible authority of the Vedas and promotes values of truth, righteousness, 
                and social reform.
              </p>
              <p>
                The organization works towards the physical, social, and spiritual uplift of humanity through 
                Vedic principles and practices.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Organizational Structure</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Local Arya Samaj:</strong> Community-level organizations serving local populations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Provincial Arya Pratinidhi Sabha:</strong> State or regional coordinating bodies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Sarvadeshik Arya Pratinidhi Sabha:</strong> The apex body coordinating all activities</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center">
            <img
              src="https://placehold.co/600x400/ff9933/ffffff?text=Arya+Samaj+Activities"
              alt="Arya Samaj Activities"
              className="rounded-lg temple-shadow w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x400/ff9933/ffffff?text=Arya+Samaj";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAryaSamaj;
