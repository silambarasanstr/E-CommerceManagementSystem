import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="bg-card border-[#e5e7eb] border-t px-20 py-4 bg-black text-white">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold text-foreground">
                  FlipKart
                </span>
              </Link>
              <p className="text-muted-foreground mb-4">
                Your trusted destination for the latest mobile devices and home
                appliances.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>(+91) 9092387869</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/mobiles"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Mobiles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/appliances"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home Appliances
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>Warranty</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <span>123 bye Street, porur, Chennai-28</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>info@demostore.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e5e7eb] mt-4 pt-4 text-center text-sm ">
            <p>&copy; 2024 TechStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
