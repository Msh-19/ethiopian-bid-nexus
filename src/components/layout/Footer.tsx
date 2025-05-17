
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold">
              Ethiopia Bid-Chain
            </Link>
            <p className="mt-4 max-w-md">
              A blockchain-backed bid management system for Ethiopian public procurement,
              enhancing transparency, security, and efficiency in the bidding process.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/bids" className="hover:underline">
                  Browse Bids
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="hover:underline">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: info@ethiopiabidchain.gov.et</li>
              <li>Phone: +251 11 123 4567</li>
              <li>Address: Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} Ethiopia Bid-Chain. All rights reserved.</p>
            <p className="mt-4 md:mt-0 text-sm">
              This system is maintained by the Federal Public Procurement Authority of Ethiopia.
              <br />
              Official government procurement platform for transparent and efficient public bidding.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
