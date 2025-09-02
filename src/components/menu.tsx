import "@/styles/menu.css"

export default function Menu() {
    return (
        <nav className="nav-list-menu">
            <ul className="list-menu">
                <li><img src="/menu/destaque.png" alt="foto de um troféu" width={50} height={50} className="img-menu" /><span>Destaques</span></li>
                <li><img src="/menu/combo.png" alt="foto de três copos de açai" width={50} height={50} className="img-menu" /><span>Combos</span></li>
                <li><img src="/menu/copo.png" alt="foto de uma copo" width={50} height={50} className="img-menu"></img><span>Copos</span></li>
                <li><img src="/menu/tigela.png" alt="foto de uma tigela" width={50} height={50} className="img-menu" /><span>Tigelas</span></li>
                <li><img src="/menu/bebidas.jpg" alt="Bebida sobre a mesa" width={50} height={50} className="img-menu" /><span>Bebidas</span></li>
            </ul>
        </nav>
    );
}