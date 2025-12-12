
const About: React.FC = () => {

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Hi! I’m Amir Mohamad Fathi, founder of Fath — a passionate developer and creator dedicated to building meaningful projects that make a difference.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">My Story</h2>
        <p className="text-gray-700 leading-relaxed">
          I started my journey in programming because I wanted to solve real-world problems with elegant solutions. Over time, my passion grew into a career where I focus on full-stack web development and building user-centric applications.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Mission & Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          My mission is to create impactful software that empowers users and simplifies everyday tasks. I envision a future where technology seamlessly enhances human potential. and my company mission is building a new world!
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">What I Do</h2>
        <p className="text-gray-700 leading-relaxed">
          For now i specialize in building scalable web applications using technologies like Next.js, React, NestJS, and Tailwind CSS. Whether it’s a portfolio site, an e-commerce platform, or a custom tool, I focus on clean code and great user experience.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Interested in collaborating or have a project idea? Feel free to reach out!
        </p>
        <a
          href="https://fathi.vercel.app/"
          className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition rounded-4xl"
        >
          My website
        </a>
      </section>
    </main>
  );
};

export default About;

