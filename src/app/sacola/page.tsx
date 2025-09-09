"use client";
import Image from "next/image";
import { useContext } from "react";
import { SacolaContext } from "@/context/SacolaContext";
import "@/styles/sacola.css";
import data from "@/products/copos.json";

export default function Sacola() {
  const { itens, removerItem } = useContext(SacolaContext);
  return (
    <section id="Sacola" className="section-sacola">
      <h2>Sacola</h2>
      <div className="div-list-sacola">
        {itens.length === 0 ? (
          <div className="empaty-sacola">
            <Image src="/icons/vazio.png" alt="" width={50} height={50} />
            <span>Sua sacola está vazia</span>
          </div>
        ) : (
          itens.map((i) => {
            const imgSrc = data.find(d => d.nome === i.nome)?.img || "/img/default.png";
            return (
              <div key={i.id + i.tamanho + i.complemento.map((c) => c.id + c.quantidade).join("-")} className="sacola-item">
                <div className="div-descricao-item-sacola">
                  <Image src={imgSrc} alt="" width={100} height={100} className="img-sacola" />
                  <div className="span-descricao">
                    <span>
                      {i.nome} ({i.tamanho})
                    </span>
                    <span className="preco">
                      R$ {(i.preco * i.quantidade).toFixed(2)}
                    </span>
                    {i.complemento.length > 0 && (
                      <ul className="lista-complementos">
                        {i.complemento.map((c) => (
                          <li key={c.id}>
                            <span className="block-quantidade">{c.quantidade} </span>{c.nome}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button onClick={() => removerItem(i.id, i.tamanho, i.complemento)} className="bnt-complemento">
                    Remover
                  </button>
                </div>
              </div>
            );
          }
          )
        )}
      </div>
    </section>
  );
}
