import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactElement, type ReactNode, cloneElement } from "react";
import heroImage from "@/assets/isee-hero.jpg";
import curlyImage from "@/assets/isee-curly.jpg";
import straightImage from "@/assets/isee-straight.jpg";
import highlightImage from "@/assets/isee-highlight.jpg";
import brandLogo from "@/assets/bigcrown-hair-logo-purple.png";
import { useProducts, useCategories } from "@/hooks/useCatalog";
import { cartApi } from "@/lib/api";
import {
  Heart,
  Headphones,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Truck,
  RotateCcw,
  CreditCard,
  Star,
  Plus,
} from "lucide-react";

const heroSlides = [
  {
    image: heroImage,
    kicker: "BIGCROWN FEATHER WIG",
    title: "Let Your Hair Flow",
    subtitle: "Barely There. Naturally You.",
    link: "Shop feather wigs",
  },
  {
    image: straightImage,
    kicker: "BEST SELLERS",
    title: "Your Everyday Hair",
    subtitle: "Made for real life, made to move.",
    link: "Shop best sellers",
  },
  {
    image: curlyImage,
    kicker: "CROCHET HAIR",
    title: "Texture, Reimagined",
    subtitle: "A new way to wear what feels like you.",
    link: "Shop crochet hair",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BIGCROWN Hair | Premium Wigs & Boutique Styles" },
      {
        name: "description",
        content:
          "Shop BIGCROWN Hair premium wigs, wear-go styles, crochet hair, bundles, and new arrivals.",
      },
      {
        property: "og:title",
        content: "BIGCROWN Hair | Premium Wigs & Boutique Styles",
      },
      {
        property: "og:description",
        content: "Natural-looking, easy-to-wear human hair wigs made for your everyday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [slide, setSlide] = useState(0);
  const [cart, setCart] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { data: productData, isLoading: productsLoading } = useProducts({ bestSeller: true, limit: 6 });
  const { data: categoryData } = useCategories();
  const products = productData?.items ?? [];
  const categories = categoryData ?? [];
  const categoryImage = (key?: string) => ({ curly: curlyImage, straight: straightImage, highlight: highlightImage }[key ?? ""] ?? straightImage);
  const current = heroSlides[slide] ??
    heroSlides[0] ?? { image: "", kicker: "", title: "", subtitle: "", link: "" };

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((value) => (value + 1) % heroSlides.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const toggleFavorite = (index: number) =>
    setFavorites((items) =>
      items.includes(index) ? items.filter((item) => item !== index) : [...items, index],
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-ink px-4 py-2 text-center text-xs font-semibold tracking-[0.16em] text-background">
        <span>Full Look · Less Effort · 60% Off</span>
        <span className="ml-4 hidden text-brand sm:inline">18 : 35 : 19</span>
        <ArrowRight className="ml-2 inline-block size-3" />
      </div>

      <div className="border-b border-border bg-background text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3">
          <span>
            🇺🇸 USD <ChevronDown className="ml-1 inline size-3" />
          </span>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <MessageCircle className="size-4 text-brand" /> Free Shipping For US, UK, FR, etc
          </span>
          <div className="flex items-center gap-4">
            <span>Track Order</span>
            <span>Contact Us</span>
            <span>Wholesale</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4">
          <button
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <a href="#top" aria-label="BIGCROWN Hair home" className="shrink-0">
            <img
              src={brandLogo}
              alt="BIGCROWN Hair — Wig Boutique"
              className="h-16 w-auto sm:h-20"
            />
          </a>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#help" aria-label="Chat with us" className="hidden sm:block">
              <MessageCircle className="size-5" />
            </a>
            <button aria-label="Account">
              <UserRound className="size-5" />
            </button>
            <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="size-5" />
            </button>
            <button
              aria-label="Shopping bag"
              className="relative"
              onClick={() => setCart((value) => value + 1)}
            >
              <ShoppingBag className="size-5" />
              {cart > 0 && (
                <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-primary-foreground">
                  {cart}
                </span>
              )}
            </button>
          </div>
        </div>
        <nav className={`${menuOpen ? "block" : "hidden"} border-t border-border lg:block`}>
          <div className="mx-auto flex max-w-[1400px] flex-col items-stretch gap-0 px-5 lg:flex-row lg:items-center lg:justify-center lg:gap-9">
            {[
              "HOME",
              "WIG",
              "WEAR GO® WIG",
              "CROCHET HAIR",
              "NEW ARRIVALS",
              "HUMAN HAIR BUNDLES",
              "BEST SELLERS",
              "PROMOTIONS",
            ].map((item, index) => (
              <a
                key={item}
                href={index === 0 ? "#top" : "#best-sellers"}
                className="border-b border-border py-4 text-center text-xs font-bold tracking-wide transition-colors hover:text-brand lg:border-0 lg:py-4"
              >
                {item}
                {[1, 2, 3, 4, 5, 7].includes(index) && (
                  <ChevronDown className="ml-1 inline size-3" />
                )}
                {[2, 3, 4, 7].includes(index) && (
                  <span className="ml-1 rounded bg-brand px-1 py-0.5 text-[8px] text-primary-foreground">
                    {index === 4 ? "NEW" : "HOT"}
                  </span>
                )}
              </a>
            ))}
          </div>
        </nav>
        {searchOpen && (
          <div className="border-t border-border px-5 py-4">
            <div className="mx-auto flex max-w-xl items-center gap-3 border-b border-foreground pb-2">
              <Search className="size-4" />
              <input
                autoFocus
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Search wigs, textures, colors..."
              />
            </div>
          </div>
        )}
      </header>

      <div className="bg-ink text-background">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-background/20 sm:grid-cols-5">
          <Benefit icon={<Truck />} text="Worldwide Shipping" />
          <Benefit icon={<RotateCcw />} text="30-Day Return" />
          <Benefit icon={<CreditCard />} text="Pay Later" />
          <Benefit icon={<Truck />} text="100% Human Hair" />
          <Benefit icon={<Star />} text="Trusted By 1M+ Customers" />
        </div>
      </div>

      <main id="top">
        <section
          className="relative flex min-h-[72vh] items-end overflow-hidden bg-ink bg-cover bg-center sm:min-h-[680px] sm:items-center"
          style={{ backgroundImage: `url(${current.image})` }}
          aria-label={current.kicker}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent sm:hidden" />
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-28 sm:px-12 sm:py-24 lg:px-20">
            <div className="max-w-xl text-background">
              <p className="animate-rise-in text-sm font-semibold uppercase tracking-[0.3em] text-brand">
                {current.kicker}
              </p>
              <h1 className="animate-rise-in mt-5 font-display text-5xl leading-[0.98] drop-shadow-lg sm:text-7xl">
                {current.title}
              </h1>
              <p className="mt-6 max-w-sm border-t border-background/40 pt-5 text-base text-background/90 drop-shadow-md">
                {current.subtitle}
              </p>
              <a
                href="#best-sellers"
                className="mt-8 inline-flex w-fit items-center gap-3 border border-background bg-ink/25 px-7 py-3 text-sm font-bold uppercase tracking-widest backdrop-blur-sm transition-colors hover:bg-brand hover:text-primary-foreground"
              >
                {current.link}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setSlide(index)}
                className={`h-1 transition-all ${index === slide ? "w-12 bg-brand" : "w-6 bg-foreground/30"}`}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 sm:py-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                Shop by mood
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
                Find your next look
              </h2>
            </div>
            <a href="#best-sellers" className="hidden items-center gap-2 text-sm font-bold sm:flex">
              View all <ArrowRight className="size-4 text-brand" />
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-5 sm:grid-cols-6">
            {categories.map((category: { _id: string; name: string; imageKey?: string }) => (
              <a href="#best-sellers" key={category._id} className="group text-center">
                <div className="mx-auto aspect-square max-w-[170px] overflow-hidden rounded-full bg-secondary">
                  <img
                    src={categoryImage(category.imageKey)}
                    alt={category.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide group-hover:text-brand">
                  {category.name}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-warm px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                  Limited-time perks
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Flash Offers</h2>
              </div>
              <a href="#best-sellers" className="text-sm font-bold">
                View More <ArrowRight className="ml-1 inline size-4 text-brand" />
              </a>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="relative min-h-56 overflow-hidden bg-ink p-8 text-background">
                <div className="relative z-10 max-w-xs">
                  <p className="text-xs uppercase tracking-[0.25em] text-brand">Today only</p>
                  <h3 className="mt-3 font-display text-3xl">Full look, less effort.</h3>
                  <p className="mt-3 text-sm text-background/70">
                    Save on styles designed to get you out the door beautifully.
                  </p>
                  <a
                    href="#best-sellers"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                  >
                    Shop the edit <ArrowRight className="size-4" />
                  </a>
                </div>
                <div
                  className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center opacity-60"
                  style={{ backgroundImage: `url(${curlyImage})` }}
                />
              </div>
              <div className="flex min-h-56 items-center justify-between border border-brand bg-brand px-8 text-primary-foreground">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em]">New user exclusive</p>
                  <h3 className="mt-3 font-display text-4xl">$300 off</h3>
                  <p className="mt-2 text-sm">+ a free wig on qualifying orders</p>
                </div>
                <div className="hidden size-28 items-center justify-center rounded-full border border-primary-foreground/50 text-center text-xs font-bold uppercase tracking-widest sm:flex">
                  Claim
                  <br />
                  offer
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="best-sellers" className="mx-auto max-w-[1400px] px-5 py-14 sm:py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                Loved by the BIGCROWN girl
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Best Sellers</h2>
            </div>
            <a href="#best-sellers" className="text-sm font-bold">
              View More <ArrowRight className="ml-1 inline size-4 text-brand" />
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {productsLoading ? (
              Array.from({ length: 6 }).map((_, index) => <div key={index} className="aspect-[0.82] animate-pulse bg-secondary" />)
            ) : products.map((product: any, index: number) => (
              <article key={product._id ?? product.slug ?? product.name} className="group min-w-0">
                <div className="relative aspect-[0.82] overflow-hidden bg-secondary">
                  <img
                    src={categoryImage(product.imageKey)}
                    alt={product.name}
                    className="size-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 bg-brand px-2 py-1 text-[10px] font-bold text-primary-foreground">
                    -{index > 2 ? "34" : "20"}%
                  </span>
                  <button
                    aria-label={`Save ${product.name}`}
                    onClick={() => toggleFavorite(index)}
                    className="absolute right-2 top-2 rounded-full bg-background/90 p-2"
                  >
                    <Heart
                      className={`size-4 ${favorites.includes(index) ? "fill-brand text-brand" : ""}`}
                    />
                  </button>
                  <button
                    aria-label={`Add ${product.name} to bag`}
                    onClick={async () => {
                      try {
                        await cartApi.add(product._id, 1);
                        setCart((value) => value + 1);
                      } catch {
                        // Cart requires login; keep the visual interaction harmless for now.
                      }
                    }}
                    className="absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-brand hover:text-primary-foreground"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <div className="pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-brand">
                    {product.tags?.[0] ?? "BIGCROWN HAIR"}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold">{product.currency === "USD" ? "$" : ""}{Number(product.price).toFixed(2)}</span>
                    {product.compareAtPrice && <del className="text-xs text-muted-foreground">{product.currency === "USD" ? "$" : ""}{Number(product.compareAtPrice).toFixed(2)}</del>}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-brand text-brand" /> {product.rating ?? 0} <span>·</span>{" "}
                    {Number(product.soldCount ?? 0).toLocaleString()} sold
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-ink px-5 py-12 text-background">
        <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={brandLogo}
              alt="BIGCROWN Hair — Wig Boutique"
              className="h-auto w-full max-w-[260px]"
            />
            <p className="mt-4 max-w-xs text-sm leading-6 text-background/60">
              Natural-looking hair, effortless styling, and a little more confidence in every
              strand.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Customer care
            </h3>
            <div className="mt-4 space-y-3 text-sm text-background/70">
              <p>Contact Us</p>
              <p>Track Order</p>
              <p>Shipping & Returns</p>
              <p>FAQ</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Explore</h3>
            <div className="mt-4 space-y-3 text-sm text-background/70">
              <p>Wear Go® Wig</p>
              <p>New Arrivals</p>
              <p>Human Hair Bundles</p>
              <p>Best Sellers</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Stay in the know
            </h3>
            <p className="mt-4 text-sm text-background/60">
              Get first access to new drops and private offers.
            </p>
            <div className="mt-4 flex border-b border-background/40 pb-2">
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-background/50"
                placeholder="Your email address"
              />
              <ArrowRight className="size-4 text-brand" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-[1400px] border-t border-background/15 pt-5 text-xs text-background/40">
          © 2026 BIGCROWN Hair. All rights reserved.
        </div>
      </footer>

      <div
        id="help"
        className="fixed bottom-5 left-5 z-20 flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg"
      >
        <Headphones className="size-4" /> Help
      </div>

      {offerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 px-4">
          <div className="relative w-full max-w-[480px] rounded-2xl bg-gradient-to-br from-warm to-background p-7 text-center shadow-2xl sm:p-10">
            <button
              aria-label="Close offer"
              onClick={() => setOfferOpen(false)}
              className="absolute right-5 top-5"
            >
              <X className="size-5" />
            </button>
            <p className="font-display text-3xl font-bold text-brand">New User Exclusive</p>
            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="rounded-xl bg-warm px-3 py-6 text-2xl font-black text-brand-strong">
                $300<small className="block text-base">OFF</small>
              </div>
              <span className="text-3xl">+</span>
              <div className="rounded-xl bg-brand px-3 py-6 text-2xl font-black text-primary-foreground">
                FREE<small className="block text-base">WIG</small>
              </div>
            </div>
            <input
              className="mt-7 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
              placeholder="Enter your email to enjoy now"
            />
            <button
              onClick={() => setOfferOpen(false)}
              className="mt-3 w-full rounded-md bg-brand px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-brand-strong"
            >
              Get it now
            </button>
            <p className="mt-4 text-[11px] leading-4 text-muted-foreground">
              By clicking the button, you agree to BIGCROWN Hair's privacy policy and terms of use.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Benefit({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-wide sm:gap-3 sm:py-4 sm:text-xs">
      {cloneElement(icon as ReactElement<{ className?: string }>, {
        className: "size-4 shrink-0 text-brand",
      })}
      <span>{text}</span>
    </div>
  );
}
