"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

type Complemento = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

type ProdutoNaSacola = {
  id: number;
  nome: string;
  quantidade: number;
  tamanho: "300ml" | "400ml" | "500ml" | "700ml";
  preco: number;
  complemento: Complemento[];
};

type SacolaContextType = {
  itens: ProdutoNaSacola[];
  adicionarItem: (item: ProdutoNaSacola) => void;
  removerItem: (id: number, tamanho: string, complemento: Complemento[]) => void;
  adicionarComplemento: (
    id: number,
    tamanho: string,
    complemento: Complemento
  ) => void;
};

export const SacolaContext = createContext<SacolaContextType>({
  itens: [],
  adicionarItem: () => { },
  removerItem: () => { },
  adicionarComplemento: () => { },
});

export const SacolaProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<ProdutoNaSacola[]>([]);

  // carrega
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setItens(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // salva
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  const mergeComplementos = (
    existentes: Complemento[],
    novos: Complemento[]
  ): Complemento[] => {
    const mapa = new Map<number, Complemento>();

    existentes.forEach((c) => mapa.set(c.id, { ...c }));
    novos.forEach((c) => {
      if (mapa.has(c.id)) {
        mapa.set(c.id, {
          ...c,
          quantidade: (mapa.get(c.id)?.quantidade || 0) + c.quantidade,
        });
      } else {
        mapa.set(c.id, { ...c });
      }
    });

    return Array.from(mapa.values());
  };

  const adicionarItem = (item: ProdutoNaSacola) => {
    setItens((prev) => {
      const existe = prev.find((i) => {
        if (i.id !== item.id || i.tamanho !== item.tamanho) return false;
        if (i.complemento.length !== item.complemento.length) return false;

        return i.complemento.every((c, index) =>
          c.id === item.complemento[index].id &&
          c.quantidade === item.complemento[index].quantidade
        );
      });

      if (existe) {
        return prev.map((i) =>
          i === existe
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };


  const adicionarComplemento = (
    id: number,
    tamanho: string,
    complemento: Complemento
  ) => {
    setItens((prev) =>
      prev.map((i) =>
        i.id === id && i.tamanho === tamanho
          ? {
            ...i,
            complemento: mergeComplementos(i.complemento, [complemento]),
          }
          : i
      )
    );
  };

  const removerItem = (id: number, tamanho: string, complemento: Complemento[] = []) => {
    setItens((prev) => {
      return prev
        .map((i) => {
          const complementosI = i.complemento.map(c => c.id + c.quantidade).join("-");
          const complementosTarget = complemento.map(c => c.id + c.quantidade).join("-");
          if (i.id === id && i.tamanho === tamanho && complementosI === complementosTarget) {
            return { ...i, quantidade: i.quantidade - 1 };
          }
          return i;
        })
        .filter(i => i.quantidade > 0);
    });
  };

  return (
    <SacolaContext.Provider value={{ itens, adicionarItem, removerItem, adicionarComplemento }}>
      {children}
    </SacolaContext.Provider>
  );
};
