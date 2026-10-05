import { Cormorant_Garamond, Noto_Serif_Ethiopic, Lora } from "next/font/google";
import "./globals.css";
const head = Cormorant_Garamond({ subsets: ["latin"], weight: ["400","600","700"], style: ["normal","italic"], variable: "--f-head" });
const eth = Noto_Serif_Ethiopic({ subsets: ["ethiopic"], variable: "--f-eth" });
const body = Lora({ subsets: ["latin"], variable: "--f-body" });
export const metadata = { title: "SENAF & TOTI Graduation Invitation | ሴናፍ & ቶቲ", description: "Join us in celebrating the graduation of Senaf and Toti Getachew." };
export default function RootLayout({ children }) {
  return (<html lang="en"><body className={`${head.variable} ${eth.variable} ${body.variable}`}>{children}</body></html>);
}
