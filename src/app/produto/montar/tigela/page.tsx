"use client";
import "@/styles/produtos/montar.css";
import complementos from "@/products/complementos.json" assert {type: "json"};
import tigelaTamanho from "@/products/tigelas.json" assert {type: "json"};
import { useState, useContext, useEffect } from "react";
import { SacolaContext } from "@/context/SacolaContext";
import Image from "next/image";

export default function Montar() {
    type Tamanhos = "500ml" | "1L";

    const [tamanho, setTamanho] = useState<"500ml" | "1L" | undefined>(undefined);
    const [quantidadeComplemento, setQuantidadeComplemento] = useState<number>();
    const { adicionarTigelas } = useContext(SacolaContext);
    const [complementoSacola, setComplementoSacola] = useState<string[]>([]);

    useEffect(() => {
        if (!tamanho) return;
        const TigelaEncontrada = tigelaTamanho.find(t => t.tamanho === tamanho);
        setQuantidadeComplemento(TigelaEncontrada?.quantidade_de_complemento);
    }, [tamanho])

    return (
        <section className="montar-section">
            <header className="background-tigela-header">
            </header>
                <h3>Escolha o tamanho</h3>
                <ul className="list-tamanhos-montar">
                    {["500ml", "1L"].map(t => (
                        <li key={t} onClick={() => setTamanho(t as Tamanhos)} className={`tamanho ${tamanho === t ? "selecionado" : ""}`}>
                            {t}
                        </li>
                    ))}
                </ul>
            <div className="complementos-div">
                <div className="list-complementos-tigela">
                    <h3>Chocolate e bombons</h3>
                    <ul>
                        {complementos.acompanhamentos.chocolate_e_bombons.map(cb => (
                            <li key={cb.id}>
                                <div className="montar-description">
                                    <h4>{cb.nome}</h4>
                                </div>
                                <div className="contador-montar">
                                    <button>-</button>
                                    <span>{ }</span>
                                    <button>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Frutas</h3>
                    <ul>
                        {complementos.acompanhamentos.frutas.map(f => (
                            <li key={f.id}>
                                <div>
                                    <h4>{f.nome}</h4>
                                </div>
                                <div className="contador-montar">
                                    <button>-</button>
                                    <span></span>
                                    <button>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Cremes e lacteos</h3>
                    <ul>
                        {complementos.acompanhamentos.cremes_e_lacteos.map(cl => (
                            <li key={cl.id}>
                                <div>
                                    <h4>{cl.nome}</h4>
                                </div>
                                <div className="contador-montar">
                                    <button>-</button>
                                    <span></span>
                                    <button>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Crocâncias e cereais</h3>
                    <ul>
                        {complementos.acompanhamentos.crocancia_e_cereais.map(cc => (
                            <li key={cc.id}>
                                <div>
                                    <h4>{cc.nome}</h4>
                                </div>
                                <div className="contador-montar">
                                    <button>-</button>
                                    <span></span>
                                    <button>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="aba-montar">
                <div>
                    <span></span>
                </div>
                <div>
                    <span>Escolha até {quantidadeComplemento} complementos</span>
                </div>
            </div>
        </section>
    );
}