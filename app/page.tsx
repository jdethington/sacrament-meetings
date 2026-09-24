import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <h2>Welcome to the Catalina Ward Sacrament Meeting page.</h2>
        <Image
          src="/gilbert-arizona-temple-evening.jpeg"
          alt="Gilbert Arizona Temple"
          width={1920}
          height={1280}
          loading="eager"
          fetchPriority="high"
        />
      </main>
    </div>
  );
}
