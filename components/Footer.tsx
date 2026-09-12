export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <p className="text-center">
        &copy; {new Date().getFullYear()} Sacrament Meetings. All rights
        reserved.
      </p>
    </footer>
  );
}
