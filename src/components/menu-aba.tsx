"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/header/aba.css";
import { useContext } from "react";
import { SacolaContext } from "@/context/SacolaContext";


export default function Abas() {
  const pathname = usePathname();

  const links = [
    { href: "/inicio", label: "Início", icon: "/icons/home-desa.png" },
    { href: "/promocoes", label: "Promoções", icon: "/icons/promo-desa.png" },
    { href: "/sacola", label: "Sacola", icon: "/icons/car-desa.png" },
  ];
  const {itens} = useContext(SacolaContext);

  return (
    <div className="menu-app">
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`link-btn ${pathname === link.href ? "active" : ""}`}
            >
              <img
                src={link.icon}
                alt={`Ícone de ${link.label}`}
                width={20}
                height={20}
              />
              <span>{link.label}</span>
            </Link>
              {link.label === "Sacola" && itens.length > 0 ? (
                <div className="notifica-item"></div>
              ): ""}          
          </li>
        ))}
      </ul>
    </div>
  );
}
