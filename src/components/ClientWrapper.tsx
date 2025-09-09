"use client";

import { usePathname } from "next/navigation";
import Abas from "@/components/menu-aba";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const rotasComAbas = ["/inicio", "/promocoes", "/sacola"];
  const mostrarAbas = rotasComAbas.includes(pathname);

  return (
    <>
      {mostrarAbas && <Abas />}
      {children}
    </>
  );
}
