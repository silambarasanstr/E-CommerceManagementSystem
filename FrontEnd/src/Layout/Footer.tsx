const Footer = () => {
  return (
    <footer className="text-white bg-black border-t border-gray-800">
      {/* Bottom */}
      <div className="py-3 text-sm text-center text-gray-400 border-t border-gray-800">
        <p>© {new Date().getFullYear()} TechStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
