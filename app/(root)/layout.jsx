import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import LeftSideBar from "@components/layout/LeftSideBar";
import RightSideBar from "@components/layout/RightSideBar";
import BottomBar from "@components/layout/BottomBar";
import MainContainer from "@components/layout/MainContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZingZone",
  description: "Next 14 Social Media App",
};

export default function RootLayout({ children }) {
  // Print what variables are available to the layout
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${inter.className} bg-purple-2`}>
          <main className="flex flex-row">
            <LeftSideBar />
            <MainContainer>{children}</MainContainer>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
