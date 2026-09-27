import NavLinks from "./NavLinks";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-gray-800 text-white px-4 py-5">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Catalina Ward</h1>
        <p className="text-sm text-gray-300">{currentDate}</p>
        <NavLinks />
      </div>
    </header>
  );
}
