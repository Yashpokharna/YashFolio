import Image from "next/image";
import { useState } from "react";
import Menu from "@/components/common/menu";

const Header = () => {
  const [menuVisible, setmenuVisible] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full py-8 select-none bg-gradient-to-b from-gray-900 to-transparent">
      <div className="flex justify-between section-container">
        <a href="#home" className="link">
          <Image
            src="/logonew.svg"
            alt="Logo - Yash Pokharna"
            width={100}
            height={100}
          />
        </a>
        <nav className={`outer-menu ${menuVisible ? "menu-visible" : ""}`}>
          <button
            className="relative flex items-center justify-center w-6 h-6 hamburger link"
            onClick={setmenuVisible.bind(null, !menuVisible)}
          >
            <div className="relative flex items-center justify-center flex-none w-full duration-300 bg-white"></div>
          </button>
          <Menu setmenuVisible={setmenuVisible} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
