import { Dispatch, SetStateAction } from "react";
import { MENULINKS } from "../../constants";

const Menu = ({
  setmenuVisible,
}: {
  setmenuVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section
      className="fixed top-0 left-0 flex items-center justify-center invisible w-full h-full overflow-hidden pointer-events-none menu"
      style={{ visibility: "hidden" }}
    >
      <div className="flex items-center justify-center flex-none overflow-hidden">
        <div className="flex items-center justify-center flex-none max-h-screen overflow-y-auto text-center opacity-0">
          <ul
            className="block max-h-screen px-0 py-4 m-0 list-none"
            role="menu"
          >
            {MENULINKS.map((el) => (
              <li
                className="block p-0 m-6 text-2xl"
                key={el.name}
                role="menuitem"
              >
                <a
                  className="relative inline text-5xl font-bold duration-300 link hover:no-underline"
                  href={`#${el.ref}`}
                  onClick={setmenuVisible.bind(null, false)}
                >
                  {el.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Menu;
