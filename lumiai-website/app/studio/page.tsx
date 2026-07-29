import { StudioLangProvider } from "@/components/studio/lang-context"
import StudioHeader from "@/components/studio/header"
import StudioHero from "@/components/studio/hero"
import StudioMarquee from "@/components/studio/marquee"
import StudioPortfolio from "@/components/studio/portfolio"
import StudioManifesto from "@/components/studio/manifesto"
import StudioContactForm from "@/components/studio/contact-form"
import StudioFooter from "@/components/studio/footer"
import StudioFormSection from "@/components/studio/form-section"

export default function StudioPage() {
  return (
    <StudioLangProvider>
      <StudioHeader />
      <main>
        <StudioHero />
        <StudioMarquee />
        <StudioPortfolio />
        <StudioManifesto />
        <StudioFormSection />
      </main>
      <StudioFooter />
    </StudioLangProvider>
  )
}
