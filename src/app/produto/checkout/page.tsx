import { SacolaContext } from "@/context/SacolaContext";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function Checkout(){
    const {itens} = useContext(SacolaContext);
    const router = useRouter()

    return(
        <section className="checkout" id="checkout">
            {itens.length > 0 ? (
                <div>
                    <h2>Infome seu endereço</h2>
                    <div>
                        
                    </div>
                </div>
                ):""}
        </section>
    );
}