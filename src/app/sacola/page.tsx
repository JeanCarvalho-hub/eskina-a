"use client";
import Image from "next/image";
import { useContext } from "react";
import { SacolaContext } from "@/context/SacolaContext";
import "@/styles/sacola.css";
import data from "@/products/copos.json";
import be from "@/products/itens.json"

export default function Sacola() {
  const { itens, bebidas, removerItem, removerBebida } = useContext(SacolaContext);

  const sacolaVazia = itens.length === 0 && bebidas.length === 0;

  return (
    <section id="Sacola" className="section-sacola">
      <h2>Sacola</h2>
      <div className="div-list-sacola">
        {sacolaVazia ? (
          <div className="empaty-sacola">
            <Image src="/icons/vazio.png" alt="" width={50} height={50} />
            <span>Sua sacola está vazia</span>
          </div>
        ) : (
          <>
            {/* Produtos */}
            {itens.map((i) => {
              const imgSrc =
                data.find((d) => d.nome === i.nome)?.img || "/img/default.png";

              return (
                <div
                  key={
                    i.id +
                    i.tamanho +
                    i.complemento.map((c) => c.id + c.quantidade).join("-")
                  }
                  className="sacola-item"
                >
                  <div className="div-descricao-item-sacola">
                    <Image
                      src={imgSrc}
                      alt={i.nome}
                      width={100}
                      height={100}
                      className="img-sacola"
                    />
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
                              <span className="block-quantidade">
                                {c.quantidade}{" "}
                              </span>
                              {c.nome}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button onClick={() => removerItem(i.id, i.tamanho, i.complemento)} className="bnt-complemento">Remover</button>
                  </div>
                </div>
              );
            })}
            {bebidas.map((b) => {
              const imgSrc =
                be.Bebidas.find((d) => d.nome === b.nome)?.img || "/img/default.png";
              return (
                <div key={b.id} className="sacola-item">
                  <div className="div-descricao-item-sacola">
                    <Image
                      src={imgSrc}
                      alt={b.nome}
                      width={80}
                      height={80}
                      className="img-sacola"
                    />
                    <div className="span-descricao">
                      <span>{b.nome} ({b.quantidade})</span>
                      <span className="preco">
                        R$ {(b.preco * b.quantidade).toFixed(2)}
                      </span>
                    </div>
                    <button onClick={() => removerBebida(b.id)} className="bnt-complemento">Remover</button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
