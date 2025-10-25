const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full sacred-gradient flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">ॐ</span>
                </div>
                <h3 className="text-xl font-bold font-devanagari text-gradient">
                  आर्य समाज
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Preserving and spreading the eternal wisdom of the Vedas
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/mantras" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Mantras
                  </a>
                </li>
                <li>
                  <a href="/bhajans" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Bhajans
                  </a>
                </li>
                <li>
                  <a href="/donate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Donate
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Arya Samaj</p>
                <p>Siddhi Plaza, Bariwan Road</p>
                <p>Siliguri, West Bengal</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © 2025 Arya Samaj. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <p className="text-sm font-sanskrit text-primary">
                  ॐ ���ान्तिः शान्तिः शान्तिः
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
