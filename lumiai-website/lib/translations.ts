const translations = {
  tr: {
    nav: { services: "Hizmetler", process: "Süreç", contact: "İletişim" },
    hero: {
      badge: "AI Destekli Dijital Dönüşüm",
      title: "İşletmenizi dijitalde bir adım öne taşıyoruz",
      subtitle:
        "47 firma analiz edildi, 38 SSL taraması yapıldı, her firma için özel dijital kimlik profili çıkarıldı. LUMI AI ile tanışın.",
      cta: "Bekleme listesine katılın",
      secondary: "Hizmetleri keşfedin",
    },
    services: {
      title: "Ne yapıyoruz?",
      subtitle: "B2B firmalar için uçtan uca dijital dönüşüm",
      items: [
        {
          title: "Dijital kimlik profili",
          desc: "Şirketinizin dijital ayak izini analiz ediyor, zafiyetleri ve fırsatları raporluyoruz.",
        },
        {
          title: "AI lead yönetimi",
          desc: "Hedef kitlenizi yapay zeka ile belirleyip kişiselleştirilmiş outreach stratejisi kuruyoruz.",
        },
        {
          title: "Web sitesi modernizasyonu",
          desc: "Kurumsal sitenizi Next.js ile yeniliyor, SEO dostu ve mobil uyumlu hale getiriyoruz.",
        },
        {
          title: "Sosyal medya stratejisi",
          desc: "LinkedIn, Instagram ve diğer platformlarda kurumsal kimliğinizi güçlendiriyoruz.",
        },
        {
          title: "Video & medya prodüksiyonu",
          desc: "Tesis B-Roll, ürün tanıtım ve kurumsal videoları 4K çekiyoruz.",
        },
      ],
    },
    process: {
      title: "Nasıl çalışıyor?",
      subtitle: "Üç adımda dijital dönüşüm",
      steps: [
        {
          step: "01",
          title: "Analiz",
          desc: "Dijital varlığınızı tüm yönleriyle tarıyor, rakiplerinizle kıyaslıyoruz.",
        },
        {
          step: "02",
          title: "Strateji",
          desc: "Zafiyetlerinize özel dijital yol haritası çıkarıyoruz.",
        },
        {
          step: "03",
          title: "Uygulama",
          desc: "Planı hayata geçiriyor, sonuçları ölçüp optimize ediyoruz.",
        },
      ],
    },
    stats: {
      firms: "47+ firma",
      ssl: "38 SSL taraması",
      domains: "52 domain sorgusu",
      tools: "7 OSINT aracı",
    },
    contact: {
      title: "Hadi konuşalım",
      subtitle: "Bekleme listesine katılın, lansmandan öncelikli erişim kazanın",
      email: "info@lumiaimedia.com",
    },
    footer: { copyright: "Tüm hakları saklıdır." },
  },
  en: {
    nav: { services: "Services", process: "How it works", contact: "Contact" },
    hero: {
      badge: "AI-Powered Digital Transformation",
      title: "Take your business digital, the smart way",
      subtitle:
        "47 firms analyzed, 38 SSL scans completed, custom digital identity profiles for every client. Meet LUMI AI.",
      cta: "Join the waitlist",
      secondary: "Explore services",
    },
    services: {
      title: "What we do",
      subtitle: "End-to-end digital transformation for B2B",
      items: [
        {
          title: "Digital identity profile",
          desc: "We analyze your digital footprint from every angle, finding vulnerabilities and opportunities.",
        },
        {
          title: "AI lead management",
          desc: "AI-powered audience targeting and personalized outreach strategy.",
        },
        {
          title: "Website modernization",
          desc: "Rebuild your site with Next.js, SEO-optimized and mobile-first.",
        },
        {
          title: "Social media strategy",
          desc: "Strengthen your brand on LinkedIn, Instagram, and beyond.",
        },
        {
          title: "Video & media production",
          desc: "Facility B-roll, product showcases and corporate videos in 4K.",
        },
      ],
    },
    process: {
      title: "How it works",
      subtitle: "Digital transformation in three steps",
      steps: [
        {
          step: "01",
          title: "Analyze",
          desc: "We scan your digital presence and benchmark against competitors.",
        },
        {
          step: "02",
          title: "Strategize",
          desc: "We craft a tailored roadmap based on your goals.",
        },
        {
          step: "03",
          title: "Execute",
          desc: "We implement, measure, and optimize continuously.",
        },
      ],
    },
    stats: {
      firms: "47+ firms",
      ssl: "38 SSL scans",
      domains: "52 domain WHOIS",
      tools: "7 OSINT tools",
    },
    contact: {
      title: "Let's talk",
      subtitle: "Join the waitlist and get early access at launch",
      email: "info@lumiaimedia.com",
    },
    footer: { copyright: "All rights reserved." },
  },
}

export type Lang = "tr" | "en"
export default translations
