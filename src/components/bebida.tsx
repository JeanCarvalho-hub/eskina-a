import data from "@/products/itens.json";
import Image from "next/image";

export default function Bebidas(){
    return(
        <section id="bebidas" className="section-bebidas item-produto">
            <h2>Bebidas</h2>
            <ul className="list-bebidas">
                {data.Bebidas.map(b => (
                    <li key={b.id} className="itens-bebidas">
                        <Image src={b.img} alt="" width={80} height={80} className="img-bebida"/>
                        <div className="descricao-bebidas">
                            <h3>{b.nome}</h3>
                            <span>R$ {b.preco.toFixed(2)}</span>
                            <button className="btn-bebidas">Adicionar na sacola</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>

    );
}