"use client";
import "@/styles/produtos/montar.css";
import complementos from "@/products/complementos.json";
import { useState } from "react";

export default function Montar() {
    const [tamanho, setTamanho] = useState();
    const [complementoSacola, setComplementoSacola] = useState<string[]>([]);

    return (
        <section className="montar-section">
            <header>
            </header>
            <div className="main-montar">
                <div>
                    <h3>Escolha o tamanho</h3>
                    <ul className="list-tamanhos">
                        {["500ml", "1L"].map(t => (
                            <li key={t}
                            >{t}</li>
                        ))}
                    </ul>
                </div>
                <div className="complementos-div">
                    <h3>Chocolate e bombons</h3>
                    <ul>
                        {complementos.acompanhamentos.chocolate_e_bombons.map(cb => (
                            <li key={cb.id}>
                                <div className="montar-description">
                                    <h4>{cb.nome}</h4>
                                </div>
                                <div className="contador-montar">
                                    <button>-</button>
                                    <span></span>
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
                    <span>Adicionar na sacola</span>
                </div>
            </div>
        </section>
    );
}