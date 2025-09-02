"use client";
import { useContext } from "react";
import { SacolaContext } from "@/context/SacolaContext";

export default function Sacola() {
  const { itens, removerItem } = useContext(SacolaContext);

  return (
    <section id="Sacola" className="section-sacola">
      <h2>Sacola</h2>
      <div className="div-list-sacola">
        {itens.length === 0 ? (
          <p>Sacola vazia</p>
        ) : (
          itens.map((i) => (
            <div key={i.id + i.tamanho} className="sacola-item">
              <span>
                {i.nome} ({i.tamanho}) x {i.quantidade} -{" "}
                R$ {(i.preco * i.quantidade).toFixed(2)}
              </span>
              <button onClick={() => removerItem(i.id, i.tamanho)}>
                Remover
              </button>
            </div>
          ))
        )}
      </div>
      <div className="div-finalizar-sacola">
        <span>Total: R$ {itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2)}</span>
        <span style={{color: "rgb(129, 3, 179)"}}>Finalizar</span>
      </div>
    </section>
  );
}
