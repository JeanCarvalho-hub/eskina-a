import React from "react";
import "@/styles/produtos/itens.css";
import data from "@/products/itens.json" assert {type: "json"};
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
                                <div className="description-item-destaque">
                                    <h3>{i.nome}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            
        </>
    );
}