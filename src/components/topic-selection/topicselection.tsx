import React from "react";

const topicselection = () => {
  return (
    // <div className="relative flex items-center justify-center h-screen w-screen bg-gradient">
    <div className="min-h-screen flex flex-col">
      <header className="bg-amber-400 p-5">
        <h1 className="text-2xl md:text-4xl">Header</h1>
      </header>

      <div className="flex-grow bg-white my-5 flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <main className="bg-sky-300 md:w-2/3 lg:w-3/4 px-5 py-40">
          <h1 className="text-2xl md:text-4xl">Main Content</h1>
        </main>
        <aside className="bg-green-300 md:w-1/3 lg:w-1/4 px-5 py-40">
          <h1 className="text-2xl md:text-4xl">Sidebar</h1>
        </aside>
      </div>

      <footer className="bg-slate-800 p-5">
        <h1 className="text-2xl md:text-4xl text-white">Footer</h1>
      </footer>
    </div>
  );
};

export default topicselection;
