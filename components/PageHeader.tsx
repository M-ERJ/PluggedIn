"use client";
import { usePathname } from "next/navigation";

const PageHeader = () => {
  const pathName = usePathname();
  let header = "";
  if (pathName === "/") {
    header = "Music";
  } else {
    const pageTitle = pathName.slice(1);
    const firstLetter = pageTitle[0].toUpperCase();
    header = firstLetter + pageTitle.slice(1);
  }

  return (
    <h1 className="p-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-14">
      {header}
    </h1>
  );
};

export default PageHeader;
