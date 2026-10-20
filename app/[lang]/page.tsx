import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RevealObserver from "@/components/RevealObserver";
import WordLightObserver from "@/components/WordLightObserver";
import Builder from "@/components/sections/Builder";
import Compare from "@/components/sections/Compare";
import Cta from "@/components/sections/Cta";
import EcosystemScale from "@/components/sections/EcosystemScale";
import FeatureBand from "@/components/sections/FeatureBand";
import Hero from "@/components/sections/Hero";
import NextStep from "@/components/sections/NextStep";
import Numbers from "@/components/sections/Numbers";
import Products from "@/components/sections/Products";
import Statement from "@/components/sections/Statement";
import VirtualOffice from "@/components/sections/VirtualOffice";
import { getContent } from "@/content";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = getContent(lang);

  return (
    <>
      <a
        href="#main"
        className="label sr-only z-[60] bg-fg px-4 py-3 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {c.a11y.skip}
      </a>
      <Navbar c={c} />
      <main id="main">
        <Hero c={c} />
        <Statement c={c} />
        <EcosystemScale c={c} />
        <Builder c={c} />
        <FeatureBand c={c} />
        <Numbers c={c} />
        <Products c={c} />
        <VirtualOffice c={c} />
        <Compare c={c} />
        <NextStep c={c} />
        <Cta c={c} />
      </main>
      <Footer c={c} />
      <RevealObserver />
      <WordLightObserver />
    </>
  );
}
