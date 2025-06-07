export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Mini Blog — Built with Next.js & Prisma</p>
    </footer>
  );
}
