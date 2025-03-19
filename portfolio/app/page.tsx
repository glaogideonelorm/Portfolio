// app/page.tsx
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <section
          id="home"
          style={{ minHeight: "100vh", padding: "2rem 0", scrollMarginTop: "80px" }}
        >
          <h1>Welcome to My Portfolio</h1>
          <p>This is the home section.</p>
        </section>

        <section
          id="about"
          style={{ minHeight: "100vh", padding: "2rem 0", scrollMarginTop: "80px" }}
        >
          <h1>About</h1>
          <p>This is the about section.</p>
        </section>

        <section
          id="projects"
          style={{ minHeight: "100vh", padding: "2rem 0", scrollMarginTop: "80px" }}
        >
          <h1>Projects</h1>
          <p>This is the projects section.</p>
        </section>

        <section
          id="ideas"
          style={{ minHeight: "100vh", padding: "2rem 0", scrollMarginTop: "80px" }}
        >
          <h1>Ideas</h1>
          <p>This is the ideas section.</p>
        </section>

        <section
          id="thoughts"
          style={{ minHeight: "100vh", padding: "2rem 0", scrollMarginTop: "80px" }}
        >
          <h1>Thoughts</h1>
          <p>This is the thoughts section.</p>
        </section>
      </main>
    </>
  );
}
