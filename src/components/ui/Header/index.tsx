import { useContext } from "react";
import style from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

import logo from "../../../styles/img/logo.png";

import { FiLogOut } from "react-icons/fi";

import { AuthContext } from "@/contexts/AuthContext";

export function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <Link href="/requests">
          <Image
            className="img"
            src={logo}
            width={190}
            height={60}
            alt="logo"
            priority={true}
          />
        </Link>

        <nav>
          <Link href={"/category"} legacyBehavior>
            <a>Categoria</a>
          </Link>

          <Link href={"/product"} legacyBehavior>
            <a>Cardápio</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#fff" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
