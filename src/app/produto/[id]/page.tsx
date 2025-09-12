"use client";

import { useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { SacolaContext } from "@/context/SacolaContext";
import Image from "next/image";

import data from "@/products/copos.json";
import compl from "@/products/complementos.json";

import "@/styles/produtos.css";

type ComplementoSelecionado = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

export default function Produto() {
  const router = useRouter();
  const params = useParams();
  const { adicionarItem } = useContext(SacolaContext);

  type Tamanho = "300ml" | "400ml" | "500ml" | "700ml" | "";

  const [tamanho, setTamanho] = useState<Tamanho>("");
  const [quantidade, setQuantidade] = useState<number>(1);

  const [complemento, setComplemento] = useState<ComplementoSelecionado[]>([]);

  const produtoId = typeof params.id === "string" ? decodeURIComponent(params.id) : "";

  const produtoFind = data.find((i) => i.nome === produtoId);

  const adicionarAoCarrinho = () => {
    if (!produtoFind || !tamanho || quantidade <= 0) return;

    adicionarItem({
      id: produtoFind.id,
      nome: produtoFind.nome,
      quantidade,
      tamanho,
      preco: produtoFind.precos[tamanho as Exclude<Tamanho, "">],
      complemento,
    });
  };
  const atualizarComplemento = (c: ComplementoSelecionado, delta: number) => {
    setComplemento((prev) => {
      const existe = prev.find((item) => item.id === c.id);
      if (existe) {
        const novaQtd = existe.quantidade + delta;
        if (novaQtd <= 0) return prev.filter((item) => item.id !== c.id);
        return prev.map((item) =>
          item.id === c.id ? { ...item, quantidade: novaQtd } : item
        );
      } else {
        return delta > 0 ? [...prev, { ...c, quantidade: delta }] : prev;
      }
    });
  };

  const valorTotal =
    (tamanho && produtoFind
      ? produtoFind.precos[tamanho as Exclude<Tamanho, "">] * quantidade
      : 0) +
    complemento.reduce(
      (acc, c) => acc + c.preco * c.quantidade,
      0
    );
  const handleAdicionar = () => {
    adicionarAoCarrinho();
    router.back();
  };
  return (
    <>
      <button onClick={() => router.back()} className="btn-back">
        <Image src="/icons/back.png" alt="Voltar" width={35} height={35} />
      </button>

      <section className="produto-page">
        <div>
          <div className="div-imagem-produto">
            <Image
              src={produtoFind?.img ?? ""}
              alt={`Imagem do ${produtoFind?.nome}`}
              className="foto-produto-selecionar"
              width={200}
              height={200}
            />
          </div>
          <div className="div-description-produto">
            <h2>{produtoFind?.nome}</h2>
            <p>{produtoFind?.descricao}</p>

            <div className="div-tamanho">
              <h3>Escolha o tamanho</h3>
              <ul className="list-tamanhos">
                {["300ml", "400ml", "500ml", "700ml"].map((t) => (
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
            <div className="div-complemento">
              {Object.entries(compl.acompanhamentos).map(([categoria, lista]) => (
                <div key={categoria} className="div-list-complementos">
                  <h3 className="title-complemento">
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1).replace(/_/g, " ")}
                  </h3>
                  <ul className="list-complementos">
                    {lista.map((c: any) => {
                      const selecionado = complemento.find(
                        (item) => item.id === c.id
                      );
                      return (
                        <li key={c.id} className="item-complemento">
                          <div className="complemento-descricao">
                            <h4>{c.nome}</h4>
                            <span>R$ {c.preco.toFixed(2)}</span>
                          </div>
                          <div className="contador">
                            <button
                              onClick={() =>
                                atualizarComplemento(
                                  { id: c.id, nome: c.nome, preco: c.preco, quantidade: 1 },
                                  -1
                                )
                              }
                            >
                              -
                            </button>
                            <span>{selecionado?.quantidade || 0}</span>
                            <button
                              onClick={() =>
                                atualizarComplemento(
                                  { id: c.id, nome: c.nome, preco: c.preco, quantidade: 1 },
                                  1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="block-carrinho-finalizar">
        <div>
          <span>Um item por vez</span>
        </div>
        <button onClick={handleAdicionar} className={`text-btn-finalizar ${!tamanho ? "desabled":"enabled"}`} disabled={!tamanho}>
          {tamanho ? (
            <span>AdicionarR$ {valorTotal.toFixed(2)}</span>
          ):"Escolha o tamanho"}
        </button>
      </div>
    </>
  );
}

