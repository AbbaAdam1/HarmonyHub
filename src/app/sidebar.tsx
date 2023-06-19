import React from "react";
import classNames from "classnames";

type Props = {
  open: boolean;
  setOpen(open: boolean): void;
};

const Sidebar = ({ open, setOpen }: Props) => {
  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true,
        "bg-pink-700 text-zinc-50": true,
        "md:w-32 md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true,
        "md:h-[calc(100vh - 64px)] h-screen min-w-[100px]": true,
        "transition-transform .3s ease-in-out md:translate-x-0": true,
      })}
    >
      <nav className="md:sticky top-0 md:top-16">
        {/* nav items */}
        <ul className="py-2 flex flex-col gap-2">
          <li><a href="https://www.example.com">Click me</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;