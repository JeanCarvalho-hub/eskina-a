"use client";

import { usePathname } from "next/navigation";
import Abas from "@/components/menu-aba";
import { ReactNode } from "react";
import "@/styles/global.css"
import { SacolaProvider } from "@/context/SacolaContext";

export default function RootLayout({ children }: Readonly<{children: ReactNode}>) {
  const pathname = usePathname();

  const rotasComAbas = ["/inicio", "/promocoes", "/sacola"];
  const mostrarAbas = rotasComAbas.includes(pathname);

  return (
    <html lang="pt-BR">
      <body>
        <main>
          <SacolaProvider>
            {mostrarAbas && <Abas />}
            {children}
          </SacolaProvider>
        </main>
      </body>
    </html>
  );
}
