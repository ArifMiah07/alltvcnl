//

import AddaPostCard from "../../Components/Adda/AddaPostCard";

const Adda = () => {
  return (
    <section className="w-full min-h-screen p-4">
      <header>
        <h1>Gossip here with people from world wide</h1>
      </header>
      <main>
        <section>All posts</section>
        {Array(10)
          .fill(0)
          .map((items, index) => (
            <div className="p-2" key={index}>
              <AddaPostCard />
            </div>
          ))}
      </main>
      <footer>updating...</footer>
    </section>
  );
};

export default Adda;
