"use client";

import { useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { SacolaContext } from "@/context/SacolaContext";

import data from "@/products/copos.json";
import "@/styles/produtos.css";

export default function Produto() {
  const router = useRouter();
  const params = useParams();
  const { adicionarItem } = useContext(SacolaContext);

  type Tamanho = "P" | "M" | "G" | "COPAO" | "";

  const [tamanho, setTamanho] = useState<Tamanho>("");
  const [quantidade, setQuantidade] = useState<number>(1);

  // Decodifica o parâmetro da URL
  const produtoId =
    typeof params.id === "string" ? decodeURIComponent(params.id) : "";

  const produtoFind = data.find((i) => i.nome === produtoId);

  const valorTotal =
    tamanho && produtoFind
      ? produtoFind.precos[tamanho as Exclude<Tamanho, "">] * quantidade
      : 0;

  const adicionarAoCarrinho = () => {
    if (!produtoFind || !tamanho || quantidade <= 0) return;

    adicionarItem({
      id: produtoFind.id,
      nome: produtoFind.nome,
      quantidade,
      tamanho,
      preco: produtoFind.precos[tamanho as Exclude<Tamanho, "">],
    });
  };

  const handleAdicionar = () => {
    adicionarAoCarrinho();
    router.push("/inicio");
  };

  const aumentar = () => setQuantidade((prev) => prev + 1);
  const diminuir = () => setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <button onClick={() => router.back()} className="btn-back">
        <img src="/icons/back.png" alt="Voltar" width={40} height={40} />
      </button>

      <section className="produto-page">
        <div className="div-imagem-produto">
          <img
            src={produtoFind?.img}
            alt={`Imagem do ${produtoFind?.nome}`}
            className="foto-produto-selecionar"
          />
        </div>
        <div className="div-description-produto">
          <h2>{produtoFind?.nome}</h2>
          <p>{produtoFind?.descricao}</p>
          <div>
            <h3>Escolha o tamanho</h3>
            <ul className="list-tamanhos">
              {["P", "M", "G", "COPAO"].map((t) => (
                <li
                  key={t}
                  className={tamanho === t ? "selecionado" : ""}
                  onClick={() => setTamanho(t as Tamanho)}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="block-carrinho-finalizar">
        <div className="contador">
          <button onClick={diminuir} className="btn-quant">
            -
          </button>
          <span className="quantidade">{quantidade}</span>
          <button onClick={aumentar} className="btn-quant">
            +
          </button>
        </div>
        <button
          onClick={handleAdicionar}
          className="text-btn-finalizar"
          disabled={!tamanho || !produtoFind}
        >
          Adicionar <span>R$ {valorTotal.toFixed(2)}</span>
        </button>
      </div>
    </>
  );
}
