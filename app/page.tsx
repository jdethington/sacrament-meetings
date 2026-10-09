import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      <main className="w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to the Catalina Ward Sacrament Meeting page.
        </h2>
        <Image
          src="/gilbert-arizona-temple-evening.jpeg"
          alt="Gilbert Arizona Temple"
          width={1920}
          height={1280}
          loading="eager"
          fetchPriority="high"
          className="w-full h-auto rounded-lg shadow"
          sizes="(max-width: 1152px) 100vw, 1152px"
        />
      </main>
    </div>
  );
}
