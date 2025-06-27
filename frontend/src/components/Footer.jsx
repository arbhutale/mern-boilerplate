// Footer.jsx
export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-primary text-white text-sm py-4 text-center shadow-md z-50">
      © {new Date().getFullYear()} MyApp. All rights reserved.
    </footer>
  );
}
