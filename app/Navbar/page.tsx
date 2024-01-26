"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaList } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";

export default function navbar() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const session = useSession();
  console.log(session);

  const handleSignOut = () => {
    signOut();
  };

  const fullName = session?.data?.user?.name;

  let lastName = "";
  if (fullName) {
    const nameParts = fullName.split(" ");
    lastName = nameParts[nameParts.length - 1];
  }

  const links = (
    <>
      <li>
        <Link className="rounded-none" href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="rounded-none" href="/allBooks">
          All Books
        </Link>
      </li>
      <li>
        <Link className="rounded-none" href="/blogs">
          Blogs
        </Link>
      </li>
      <li>
        <Link className="rounded-none" href="#">
          Test
        </Link>
      </li>
    </>
  );

  return (
    <div  className="navbar z-20 bg-white  md:bg-gradient-to-r md:from-[#4a8ab8] to md:bg-[#34c1ce]  py-5 md:px-10 sticky dark:bg-gradient-to-r dark:from-[#0d0d0d] to dark:bg-[#010101] text-black dark:text-white md:text-white top-0 rounded-b-lg dark:border-2 border-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaList />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white md:bg-base-100 text-black rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center">
          <Link href="/">
            <Image
              height={56}
              width={56}
              src="https://i.ibb.co/zZ66BxY/In-Shot-20240118-165615156.png"
              alt="logo"
            />
          </Link>
          <Link href="/">
            <h1 className="text-lg md:text-3xl font-bold ml-2">BookWarp</h1>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-4">
        <div>
          {session.data?.user?.email ? (
            <div className="dropdown dropdown-end  flex justify-center items-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <ThemeSwitch />
                <p>{lastName}</p>
              </div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {session.data?.user?.image ? (
                    <Image
                      height={56}
                      width={56}
                      src={session.data?.user?.image ?? ""}
                      alt="logo"
                    />
                  ) : (
                    <Image
                      height={56}
                      width={56}
                      src="https://i.ibb.co/zZ66BxY/In-Shot-20240118-165615156.png"
                      alt="logo"
                    />
                  )}
                </div>

                <ul
                  tabIndex={0}
                  className="mt-32 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gradient-to-r from-[#4a8ab8] to bg-[#34c1ce] rounded-box w-64"
                >
                  <li className="border rounded-lg mt-2 flex items-center justify-center text-center">
                    <p className="text-wrap">{session.data?.user?.name}</p>
                  </li>
                  <li className="border rounded-lg mt-2 flex items-center justify-center text-center hover:bg-black">
                    <Link href={"/profile"} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li className="border rounded-lg mt-2 flex items-center justify-center text-center hover:bg-black">
                    <Link href={"/dashboard"} className="justify-between">
                      Dashboard
                    </Link>
                  </li>
                  <li className="border rounded-lg mt-2 flex items-center justify-center text-center hover:bg-black">
                    <button
                      onClick={handleSignOut}
                      className="justify-between "
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-8">
              <p className="btn bg-transparent hover:bg-transparent border-none rounded-full text-4xl text-black dark:text-white cursor-pointer">
              <ThemeSwitch  />
              </p>
              <Link title="Login" href="/login">
              <button className="btn  btn-lg border text-white bg-gradient-to-r from-[#4a8ab8] to bg-[#34c1ce] rounded-full dark:btn-outline dark:bg-gradient-to-r dark:from-[#0d0d0d] to dark:bg-[#010101] dark:text-white ">
                Login
              </button>
            </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
