export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-5 py-12 sm:px-8">
      <section aria-labelledby="page-title" className="w-full">
        <p className="text-sm font-semibold tracking-wide text-blue-700">
          SPCE attendance planning
        </p>
        <h1
          id="page-title"
          className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl"
        >
          AttendSense
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
          The development foundation is ready. Student attendance planning
          features will be added in later phases.
        </p>
      </section>
    </main>
  );
}
