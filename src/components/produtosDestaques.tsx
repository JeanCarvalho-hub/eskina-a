import React from "react";
import "@/styles/produtos/itens.css";
import data from "@/products/itens.json";
import Image from "next/image";

export default function ProdutosDestaques() {
    return (
        <>
            <section id="Destaques" className="item-produto destaque-item">
                <h2>Destaques</h2>
                <div className="produtos-destaques">
                    <ul className="list-destaques">
                        {data.Destaques.map((i) => (
                            <li key={i.id} className="item-destaque">
                                <img src={i.img} alt="foto do açaí" width={150} height={150} className="foto-destaque" />
                                <div className="description-item">
                                    <h3>{i.nome}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section id="Combos" className="item-produto">
                <h2>Combos</h2>
                <ul className="list-combo">
                    {data.Combos.map((i, idx) => {
                        const pos = idx % 2 === 0 ? "direita" : "esquerda";
                        return (
                            <li key={i.id} className="item-combo">
                                <div className={`div-item-combo-all div-item-combo-${pos}`}>
                                    <img src={i.img} alt="foto do açaí" width={180} height={180} className="foto-item foto-combo"/>
                                    <div className="combo-item-descripiton">
                                        <h3>{i.nome}</h3>
                                        <p>{i.descricao}</p>
                                        <button className="btn-combo">A partir de R$ 10,00</button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </>
    );
}