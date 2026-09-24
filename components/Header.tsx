import NavLink from "./NavLinks";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">Catalina Ward</h1>
      <p>{currentDate}</p>
      <NavLink />
    </header>
  );
}
