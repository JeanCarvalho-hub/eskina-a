import "@/styles/produtos/tigela.css";
import Link from "next/link";

export default function Tigela() {
    return (
        <section id="Tigela" className="style-tigela item-produto">
            <h2 style={{textAlign: "center"}}>tigelas</h2>
            <div className="div-tigela-card">
                <Link href="/produto/montar/tigela" prefetch={true}><img src="/98.png" alt="foto anunciando para montar sua tigela de açai" className="foto-tigela"/></Link>
            </div>
        </section>
    );
}