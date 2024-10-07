export default function CTASection() {
  return (
    <section
      id="cta"
      className="bg-primary px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold">
          Ready to Boost Your Productivity?
        </h2>
        <p className="mb-8 text-xl">
          Join thousands of professionals who trust TaskQuill for efficient task
          management.
        </p>
        <button className="rounded-full bg-white px-8 py-3 text-lg font-medium text-primary transition-colors hover:bg-gray-100">
          Get Started for Free
        </button>
      </div>
    </section>
  );
}
