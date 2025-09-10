"use client";

import data from "@/products/itens.json";
import Image from "next/image";
import { useContext } from "react";
import { SacolaContext } from "@/context/SacolaContext";

export default function Bebidas() {
    const { adicionarBebida, bebidas } = useContext(SacolaContext);

    return (
        <section id="bebidas" className="section-bebidas item-produto">
            <h2>Bebidas</h2>
            <ul className="list-bebidas">
                {data.Bebidas.map((b) => {
                    const bebidaNaSacola = bebidas.find((item) => item.id === String(b.id));
                    const quantidade = bebidaNaSacola ? bebidaNaSacola.quantidade : 0;

                    return (
                        <li key={b.id} className="itens-bebidas">
                            <div className="descricao-bebidas">
                                <h3>{b.nome}</h3>
                                <span>R$ {b.preco.toFixed(2)}</span>
                                <button className="btn-bebidas" onClick={() => adicionarBebida({ id: String(b.id), nome: b.nome, preco: b.preco, quantidade: 1, })}>
                                    {quantidade > 0 ? `Adicionar (${quantidade})` : "Adicionar na sacola"}
                                </button>
                            </div>
                            <Image
                                src={b.img}
                                alt={b.nome}
                                width={70}
                                height={70}
                                className="img-bebida"
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
