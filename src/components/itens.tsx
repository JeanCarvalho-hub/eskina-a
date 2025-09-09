"use client";

import { useRouter } from "next/navigation";
import data from "@/products/copos.json";
import "@/styles/produtos/itens.css";
import "@/styles/produtos/allitens.css";
import Link from "next/link";

export default function AllItens() {
  const router = useRouter();

  return (
    <section id="Copos" className="item-produto produtos-copos">
      <h2>Copos</h2>
      <div className="div-produtos-copos">
        <ul className="list-copos">
          {data.map((i) => (
            <li key={i.id} className="item-copos">
              <Link href={`/produto/${i.nome}`} prefetch={true} className="item-copos-link">
                <div className="div-description-item">
                  <h3>{i.nome}</h3>
                  <p className="item-description">{i.descricao}</p>
                  <span className="item-preco">
                    A partir de R$ {i.precos["300ml"]}
                  </span>
                </div>
                <img
                  src={i.img}
                  alt={`foto de um copo de ${i.nome}`}
                  width={120}
                  height={120}
                  className="foto-copo"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
