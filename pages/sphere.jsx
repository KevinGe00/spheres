import { useEffect, useState } from "react";
import Image from "next/image";
import house from "./house.js";
import { useGlobalState } from "./state";
import logo from "./Images/Landing/logo.png";

export default function Home() {
  const [playerPosition, setPlayerPosition] = useState({ x: 20, y: 10 });
  const [currentCollection] = useGlobalState("currentCollection");

  function downHandler({ key }) {
    switch (key) {
      case "w":
        setPlayerPosition((pp) => ({ x: pp.x, y: pp.y - 1 }));
        return;
      case "s":
        setPlayerPosition((pp) => ({ x: pp.x, y: pp.y + 1 }));
        return;
      case "a":
        setPlayerPosition((pp) => ({ x: pp.x - 1, y: pp.y }));
        return;
      case "d":
        setPlayerPosition((pp) => ({ x: pp.x + 1, y: pp.y }));
        return;
      default:
        return;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  return (
    <main className="h-screen relative">
      <h2 className="bg-black shadow-lg absolute right-10 top-5 z-10 text-white px-4 py-2 font-bold rounded-lg">
        {currentCollection}
      </h2>

      <nav className="absolute left-0 h-screen z-10 bg-black shadow-xl px-6 py-8">
        <ul className="flex flex-col gap-7 h-full">
          <li>
            <button>
              <Image src={logo} height={40} width={40} />
            </button>
          </li>
          <li>
            <Image src="/boredape.png" height={40} width={40} />
          </li>
          <li>
            <Image src="/rainbow.png" height={40} width={40} />
          </li>
          <li>
            <Image src="/azuki.png" height={40} width={40} />
          </li>
          <li className="mt-auto">
            <button
              title="Build"
              className="hover:scale-110 transition-transform"
            >
              <Image src="/hammer.svg" height={35} width={35} />
            </button>
          </li>
          <li>
            <button
              title="Inventory"
              className="hover:scale-110 transition-transform"
            >
              <Image src="/backpack.svg" height={35} width={35} />
            </button>
          </li>
        </ul>
      </nav>
      <div
        className="cursor-pointer grid h-full w-full overflow-auto"
        style={{
          gridTemplateColumns: "repeat(40, 50px)",
          gridTemplateRows: "repeat(20, 50px)",
        }}
      >
        {[...Array(20)].map((_, y) =>
          [...Array(40)].map((_, x) => {
            const tile = house.find((tile) => tile.x === x && tile.y === y);

            return (
              <div className="relative" style={{ width: "55px" }}>
                {tile ? (
                  <div className="absolute">
                    <Image src={tile.tile} height={55} width={55} />
                  </div>
                ) : (
                  <div className="absolute">
                    <Image src="/tiles/tile915.svg" height={55} width={55} />
                  </div>
                )}
                {playerPosition.x === x && playerPosition.y === y && (
                  <div className="absolute">
                    <Image src="/avatar.svg" height={55} width={55} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="absolute flex items-center gap-4 bg-black left-1/2 -translate-x-1/2 bottom-10 rounded-full px-7 py-3 shadow-2xl">
        <button className="flex">
          <Image src="/avatar.svg" className="m-auto" height={25} width={25} />
        </button>
        <div>
          <p className="text-white min-w-[7rem] font-semibold">Bobvin</p>
          <p className="text-white text-xs">0xf04...a3aa</p>
        </div>
        <button className="flex">
          <Image src="/train.svg" className="m-auto" height={20} width={20} />
        </button>
        <button className="flex">
          <Image src="/mic.svg" className="m-auto" height={20} width={20} />
        </button>
        <button className="flex">
          <Image src="/map.svg" className="m-auto" height={20} width={20} />
        </button>
      </div>
    </main>
  );
}
