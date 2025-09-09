import { ReactNode } from "react";
import "@/styles/global.css";
import { SacolaProvider } from "@/context/SacolaContext";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata = {
  title: "Eskina Açaí | Cardápio Digital",
  description: "Eskina Açaí - Melhor açai de Ribeirão Preto",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          <SacolaProvider>
            <ClientWrapper>{children}</ClientWrapper>
          </SacolaProvider>
        </main>
      </body>
    </html>
  );
}
