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
  const { itens } = useContext(SacolaContext);

  return (
    <div className="menu-app">
      {itens.length > 0 ? (
        <div className="div-finalizar-sacola">
          <span className="total-text">Total: R$ {" "}
          {itens
            .reduce((acc, item) => {
              const precoProduto = item.preco * item.quantidade;
              const precoComplementos = item.complemento.reduce(
                (sum, c) => sum + c.preco * c.quantidade,
                0
              );
              return acc + precoProduto + precoComplementos;
            }, 0)
            .toFixed(2)}</span>          
            <span className="btn-finalizar">Finalizar</span>
        </div>
      ) : ""}
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`link-btn ${pathname === link.href ? "active" : ""}`}
              prefetch={true}
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
            ) : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
