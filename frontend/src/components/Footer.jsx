const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">CareerBridge</h2>
          <p className="text-sm text-gray-400">
            Connecting top talent with the best opportunities across industries.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-medium mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:underline">
                Jobs
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-medium mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/blog" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-medium mb-4">
            Subscribe to our newsletter
          </h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-[#6A38C2] hover:bg-[#5628a6] text-white py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CareerBridge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
