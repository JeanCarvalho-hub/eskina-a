import React, { createContext, useState, ReactNode } from "react";

type ProdutoNaSacola = {
  id: number;
  nome: string;
  quantidade: number;
  tamanho: "P" | "M" | "G" | "COPAO";
  preco: number;
};

type SacolaContextType = {
  itens: ProdutoNaSacola[];
  adicionarItem: (item: ProdutoNaSacola) => void;
  removerItem: (id: number, tamanho: string) => void;
};

export const SacolaContext = createContext<SacolaContextType>({
  itens: [],
  adicionarItem: () => {},
  removerItem: () => {},
});

export const SacolaProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<ProdutoNaSacola[]>([]);

  const adicionarItem = (item: ProdutoNaSacola) => {
    setItens(prev => {
      const existe = prev.find(i => i.id === item.id && i.tamanho === item.tamanho);
      if (existe) {
        return prev.map(i =>
          i.id === item.id && i.tamanho === item.tamanho
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

    const removerItem = (id: number, tamanho: string) => {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === id && i.tamanho === tamanho);
      if (!existe) return prev;

      if (existe.quantidade === 1) {
        return prev.filter(
          (i) => !(i.id === id && i.tamanho === tamanho)
        );
      }

      return prev.map((i) =>
        i.id === id && i.tamanho === tamanho
          ? { ...i, quantidade: i.quantidade - 1 }
          : i
      );
    });
  };

  return (
    <SacolaContext.Provider value={{ itens, adicionarItem, removerItem }}>
      {children}
    </SacolaContext.Provider>
  );
};
