"use client"

import { useState } from "react"
import { Search, ShoppingBag, Heart, Menu, ChevronRight } from "lucide-react"

const categories = [
  { name: "Erkek", image: "https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/7d6a288c-bff4-44ef-be93-bdea9f6baa47/just-do-it-erkek-giyim.png", slug: "erkek" },
  { name: "Kadın", image: "https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/e3c0c0b0-18be-42f7-9e78-63aa1e97b7eb/just-do-it-kadin-giyim.png", slug: "kadin" },
  { name: "Çocuk", image: "https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/472c5260-bc3b-44ac-88d2-bd8d9f3ae03f/nike-just-do-it-cocuk.png", slug: "cocuk" },
]

const featured = [
  { name: "Air Max Pulse", category: "Erkek Ayakkabısı", price: "₺7.299", image: "https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/3be7790a-5b8c-4a3d-ae03-7ced0d9ac1b1/air-max-pulse.png" },
  { name: "Air Force 1 '07", category: "Kadın Ayakkabısı", price: "₺5.499", image: "https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/af44e86c-0ff0-4894-bac1-feb2c0a7881a/air-force-1-07.png" },
  { name: "Dunk Low", category: "Erkek Ayakkabısı", price: "₺4.799", image: "https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/0c944c81-13d8-462a-8a82-71f26edb9c67/dunk-low.png" },
  { name: "Pegasus Plus", category: "Koşu Ayakkabısı", price: "₺6.999", image: "https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/c99505e4-a39a-4a75-ba41-51503e6f2a54/pegasus-plus.png" },
]

const menuItems = ["Erkek", "Kadın", "Çocuk", "Yeni Çıkanlar", "İndirim"]

export default function NikeDeneme() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-sans text-black antialiased">
      <header className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <a href="#" className="text-2xl font-black tracking-tight">NIKE</a>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {menuItems.slice(0, 4).map((item) => (
              <a key={item} href="#" className="text-sm font-medium hover:text-neutral-500">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 cursor-pointer" />
            <Heart className="h-5 w-5 cursor-pointer hidden sm:block" />
            <ShoppingBag className="h-5 w-5 cursor-pointer" />
          </div>
        </div>
        {menuOpen && (
          <div className="border-t px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <a key={item} href="#" className="text-sm font-medium">{item}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <section className="relative mt-14 flex min-h-[90vh] items-center justify-center overflow-hidden bg-black">
        <img
          src="https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/9ef16c50-eaf0-4cba-bf1b-7479ab3e9192/nike-just-do-it.jpg"
          alt="Just Do It"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="relative z-10 px-4 text-center text-white">
          <p className="mb-3 text-sm tracking-[0.2em] uppercase">Nike</p>
          <h1 className="mb-4 text-6xl font-black leading-none tracking-tight sm:text-8xl md:text-9xl">
            JUST DO IT
          </h1>
          <p className="mx-auto mb-8 max-w-md text-base text-white/70">
            Yeni sezon stillerini keşfet. Sınırları zorlayan tasarımlar seni bekliyor.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-white px-10 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200">
              Alışverişe Başla
            </button>
            <button className="rounded-full border border-white/40 px-10 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Daha Fazla
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Kategoriler</h2>
          <a href="#" className="text-sm font-medium text-neutral-500 hover:text-black">Tümünü Gör</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <a key={cat.name} href="#" className="group relative aspect-[3/4] overflow-hidden bg-neutral-100">
              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                <span className="mt-1 flex items-center gap-1 text-sm text-white/70">
                  Alışveriş <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Öne Çıkan Ürünler</h2>
          <a href="#" className="text-sm font-medium text-neutral-500 hover:text-black">Tümünü Gör</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <a key={product.name} href="#" className="group">
              <div className="mb-3 aspect-square overflow-hidden bg-neutral-50">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-110" />
              </div>
              <p className="text-xs text-neutral-500">{product.category}</p>
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-sm text-neutral-600">{product.price}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              <img
                src="https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/65e7a3a3-63d1-407d-945a-27d9c78d608b/nike-just-do-it-kosu.jpg"
                alt="Koşu"
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">Koşu</h3>
                <p className="text-sm text-white/70">Yeni sezon koşu ürünlerini keşfet</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              <img
                src="https://static.nike.com/a/images/f_auto,q_auto:eco/t_default/aa026497-c561-4e65-b34a-abbb1e42a3ed/nike-just-do-it-gunluk-stil.jpg"
                alt="Günlük Stil"
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">Günlük Stil</h3>
                <p className="text-sm text-white/70">Her gün için tasarlanmış ürünler</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <a href="#" className="mb-8 block text-3xl font-black tracking-tight">NIKE</a>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-4 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Ürünler</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                {["Ayakkabı", "Giyim", "Aksesuar", "İndirim"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Yardım</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                {["Sipariş Durumu", "Kargolama", "İade & Değişim", "Ödeme"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Hakkımızda</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                {["Hakkında", "Kariyer", "Basın", "Sürdürülebilirlik"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Üyelik</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                {["Nike Üyeliği", "Uygulamayı İndir", "Blog"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-600">
            © 2026 Nike, Inc. Tüm Hakları Saklıdır
          </div>
        </div>
      </footer>
    </div>
  )
}
