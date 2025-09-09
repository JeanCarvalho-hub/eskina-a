"use client";

import { useEffect, useState, useRef } from "react";

//styles
import "@/styles/header/header.css"

export default function Header() {
    const [diaAtual, setDiaAtual] = useState<number>();
    const [hora, setHora] = useState<number>();
    const [open, setOpen] = useState(false);
    const [estrela, setEstrela] = useState<string[]>([]);
    const dirRef = useRef<"add" | "remove">("add");

    type Horario = { hr_in: number; hr_cl: number };

    type DiaInfo = {
        open: boolean;
        horarios?: Horario[]
    };

    useEffect(() => {
        const atualizarStatus = () => {
            const date = new Date();
            const dia = date.getDay();
            const hrs = date.getHours();

            setDiaAtual(dia);
            setHora(hrs);


            const dia_atual = info_dias[dia]
            if (!dia_atual?.open || !dia_atual.horarios) {
                setOpen(false);
                return;
            }

            const abertoAgora = dia_atual.horarios.find(i => hrs >= i.hr_in && hrs < i.hr_cl);
            setOpen(!!abertoAgora);
        }
        atualizarStatus()
    });

    const info_dias: Record<number, DiaInfo> = {
        0: {
            open: true,
            horarios: [
                { hr_in: 10, hr_cl: 13 },
                { hr_in: 18, hr_cl: 22 }
            ]
        },
        1: { open: false },
        2: { open: true, horarios: [{ hr_in: 18, hr_cl: 22 }] },
        3: { open: true, horarios: [{ hr_in: 18, hr_cl: 22 }] },
        4: { open: true, horarios: [{ hr_in: 18, hr_cl: 22 }] },
        5: { open: true, horarios: [{ hr_in: 18, hr_cl: 22 }] },
        6: {
            open: true,
            horarios: [
                { hr_in: 10, hr_cl: 13 },
                { hr_in: 18, hr_cl: 22 }
            ]
        },
    };
    function getStatus(): string {
        if (diaAtual === undefined || hora === undefined) return "";

        const dia_atual = info_dias[diaAtual];
        if (!dia_atual?.open || !dia_atual.horarios) return "Fechado";

        const abertoAgora = dia_atual.horarios.find(i => hora >= i.hr_in && hora < i.hr_cl);
        if (abertoAgora) return `Aberto • fecharemos às ${abertoAgora.hr_cl}:00`;

        const proximoIntervalo = dia_atual.horarios.find(i => hora < i.hr_in);
        if (proximoIntervalo) return `Fechado • Abriremos às ${proximoIntervalo.hr_in}:00`;


        return "Fechado • Nenhum horário restante hoje";
    }
    return (
        <>
            <div className="Header-profile">
                <div className='Background-image_profile'></div>
                <img src="/logo.png" alt="Foto de perfil - Eskina Açaí" width={200} height={200} className="logo-profile"></img>
                <div className="profile-description">
                    <div className='title-name_profile'>
                        <h1>Eskina Açaí</h1>
                        <i className="local-profile"><img src="/icons/local.png" alt="icone de localização" width={20} height={20} /><span>Ribeirão Preto - SP</span></i>
                        <span className={open ? "style-open" : "style-closed"}>{getStatus()}</span>
                        <div className="icones_profile">
                            <nav>
                                <ul>
                                    <div className="icones_network">
                                        <li><a><img src="/icons/zap.png" alt="Icone do WhatsApp" width={25} height={25} /></a></li>
                                        <li><a><img src="/icons/insta.png" alt="Icone do Instagram" width={25} height={25} /></a></li>
                                        <li><a><img src="/icons/face.png" alt="Icone do Facebook" width={25} height={25} /></a></li>
                                        <li><a><img src="/icons/tiktok.png" alt="Icone do Tik Tok" width={25} height={25} /></a></li>

                                    </div>
                                </ul>
                                <a className="link-google">
                                    <img src="/icons/google.png" alt="Icone do Google" width={25} height={25} />
                                    <span>Nos avalie e ganhe um brinde</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}