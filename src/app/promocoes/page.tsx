import "@/styles/promocoes.css";
import Image from "next/image";
export default function Promoções() {
    return (
        <>
            <section id="promocoes" className="section-promocoes">
                <h2>Promoções</h2>
                <div className="div-list-promos">
                    <ul className="list-promos">
                        <li>
                            <Image src="/banner.png" alt="promoção" width={200} height={200} className="capa-promo"/>
                            <div className="title-promo">
                                <span>Nos avalie no Google e ganhe um brinde</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}