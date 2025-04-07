import React, { useState } from "react";

const techList = [
  {
    name: "Visual Studio Code",
    logo: "https://th.bing.com/th?q=Visual+Studio+Code+Logo.png&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=vi&adlt=moderate&t=1&mw=247",
    color: "#007ACC",
    description: "Visual Studio Code là trình soạn thảo mã nguồn miễn phí và mạnh mẽ của Microsoft."
  },
  {
    name: "ReactJS",
    logo: "https://th.bing.com/th/id/OIP.CTvVfHEeovAx-0V5-dqVRwHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7",
    color: "#61DAFB",
    description: "React là thư viện JavaScript phổ biến để xây dựng giao diện người dùng."
  },
  {
    name: "Component",
    logo: "https://th.bing.com/th/id/OIP.2Hm_nsMr9dDvRLDo_-tdCwHaEK?w=303&h=180&c=7&r=0&o=5&pid=1.7",
    color: "#FF7F50",
    description: "Component là khối xây dựng cơ bản trong React giúp tái sử dụng giao diện dễ dàng."
  }
];

export default function TechIntroComponent() {
  const [current, setCurrent] = useState(0);
  const tech = techList[current];

  const next = () => setCurrent((current + 1) % techList.length);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{ backgroundColor: "#f4f4f9" }}
    >
      <div
        className="rounded-2xl shadow-lg p-8 text-center max-w-md transition-all duration-500"
        style={{ backgroundColor: tech.color, color: "white" }}
      >
        <h1 className="text-3xl font-bold mb-4 drop-shadow">
          Giới thiệu: {tech.name}
        </h1>
        <img
          src={tech.logo}
          alt={tech.name}
          className="w-32 h-32 object-contain mx-auto rounded-xl mb-4"
        />
        <p className="text-lg leading-relaxed mb-6">{tech.description}</p>
        <button
          onClick={next}
          className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition transform"
        >
          Tiếp theo ➡
        </button>
      </div>
    </div>
  );
}
