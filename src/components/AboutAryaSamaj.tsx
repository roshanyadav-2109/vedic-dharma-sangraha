import { Badge } from "@/components/ui/badge";

const AboutAryaSamaj = () => {
  return (
    <section className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">Founded 1875</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                About Arya Samaj
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Arya Samaj is a monotheistic Hindu reform movement founded by Maharshi Dayanand Saraswati in 1875. 
                It emphasizes the infallible authority of the Vedas and promotes values of truth, righteousness, 
                and social reform.
              </p>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                The organization works towards the physical, social, and spiritual uplift of humanity through 
                Vedic principles and practices.
              </p>
              <div className="mt-4">
                <h3 className="text-2xl font-semibold mb-3">Organizational Structure</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Local Arya Samaj:</strong> Community-level organizations serving local populations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Provincial Arya Pratinidhi Sabha:</strong> State or regional coordinating bodies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Sarvadeshik Arya Pratinidhi Sabha:</strong> The apex body coordinating all activities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-muted rounded-md aspect-square overflow-hidden">
            <img
              src="https://placehold.co/600x600/ff9933/ffffff?text=Arya+Samaj+Activities"
              alt="Arya Samaj Activities"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x600/ff9933/ffffff?text=Arya+Samaj";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAryaSamaj;
