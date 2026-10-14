import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Leaf, Sprout, WheatOff, Star, X } from "lucide-react";
import { restaurant, formatPrice, type Dish } from "@/data/restaurant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${restaurant.name} ${restaurant.tagline} — Menú` },
      {
        name: "description",
        content:
          "Menú visual del restaurante. Mirá las fotos reales de cada plato antes de elegir.",
      },
      { property: "og:title", content: `${restaurant.name} ${restaurant.tagline} — Menú` },
      {
        property: "og:description",
        content: "Menú visual con fotos reales de cada plato.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(restaurant.categories[0].id);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isClickScrolling = useRef(false);

  // Scroll-spy: highlight category as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when dialog open
  useEffect(() => {
    document.body.style.overflow = selectedDish ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDish]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    isClickScrolling.current = true;
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header + category nav */}
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 pt-4 pb-2 flex flex-col items-center text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-primary leading-none">
            {restaurant.name.toUpperCase()}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-px w-6 bg-primary/40" />
            <span className="text-[0.65rem] tracking-[0.25em] text-primary/80 font-medium">
              {restaurant.tagline.toUpperCase()}
            </span>
            <span className="h-px w-6 bg-primary/40" />
          </div>
        </div>

        <nav
          className="no-scrollbar overflow-x-auto"
          aria-label="Categorías"
        >
          <div className="mx-auto flex gap-2 px-4 pb-3 pt-1 w-max">
            {restaurant.categories.map((c) => {
              const active = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => scrollToCategory(c.id)}
                  className={[
                    "shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-soft"
                      : "bg-card text-foreground/80 border-border hover:border-primary/40",
                  ].join(" ")}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <div className="pt-2" />

      {/* Sections */}
      <main className="mx-auto max-w-3xl px-4 pb-32">
        {restaurant.categories.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            ref={(el) => {
              sectionRefs.current[cat.id] = el;
            }}
            className="scroll-mt-32 pt-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-primary">
                {cat.name}
              </h3>
              <span className="flex-1 h-px bg-primary/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.dishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onClick={() => setSelectedDish(dish)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8 px-4">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <p className="text-xs text-muted-foreground italic">
            ❦ &nbsp;{restaurant.footerNote}&nbsp; ❦
          </p>

          <ReviewCta />

          <p className="text-[0.72rem] tracking-[0.16em] text-muted-foreground/90">
            Desarrollado por{" "}
            <a
              href={restaurant.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Conocé ${restaurant.developerCredit}`}
              className="font-semibold text-primary underline-offset-4 transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:rounded-sm"
            >
              {restaurant.developerCredit}
            </a>
          </p>
        </div>
      </footer>

      {selectedDish && (
        <DishDetail dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </div>
  );
}

function DishCard({ dish, onClick }: { dish: Dish; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left overflow-hidden rounded-2xl shadow-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-transform active:scale-[0.98]"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Bottom gradient + text overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black/85 via-black/45 to-transparent">
        <h4 className="font-display text-xl font-semibold text-white leading-tight">
          {dish.name}
        </h4>
        <p className="text-[0.8rem] text-white/85 leading-snug mt-1 line-clamp-2">
          {dish.shortDescription}
        </p>
      </div>
    </button>
  );
}

function DishDetail({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={dish.name}
    >
      <div
        className="relative w-full sm:max-w-lg bg-card text-card-foreground rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-card max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md hover:bg-black/65 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="aspect-square w-full overflow-hidden bg-black flex items-center justify-center">
          <img
            src={dish.image}
            alt={dish.name}
            width={1024}
            height={1024}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-3xl font-semibold text-primary leading-tight flex-1">
              {dish.name}
            </h3>
            <DietaryBadges dish={dish} />
            <span className="shrink-0 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-base font-semibold shadow-soft">
              {formatPrice(dish.price)}
            </span>
          </div>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/85">
            {dish.longDescription ?? dish.shortDescription}
          </p>

          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="mt-6">
              <p className="text-[0.7rem] tracking-[0.22em] font-semibold text-primary/70 uppercase mb-3">
                Ingredientes
              </p>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {i}
                  </span>
            ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Íconos dietarios del plato: solo aparecen si el plato tiene ese atributo. */
function DietaryBadges({ dish }: { dish: Dish }) {
  const badges = [
    { key: "vegetarian", label: "Vegetariano", active: dish.vegetarian, Icon: Leaf },
    { key: "vegan", label: "Vegano", active: dish.vegan, Icon: Sprout },
    { key: "glutenFree", label: "Sin TACC", active: dish.glutenFree, Icon: WheatOff },
  ].filter((b) => b.active);

  if (badges.length === 0) return null;

  return (
    <span
      className="flex shrink-0 items-center gap-1.5 mt-1"
      role="list"
      aria-label="Aptitudes dietarias"
    >
      {badges.map(({ key, label, Icon }) => (
        <span
          key={key}
          role="listitem"
          title={label}
          aria-label={label}
          className="grid h-8 w-8 place-items-center rounded-full border border-primary/25 bg-secondary text-primary"
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
      ))}
    </span>
  );
}

/** Bloque de reseñas: logo + 5 estrellas de Google, enlaza a la ficha para reseñar. */
function ReviewCta() {
  return (
    <a
      href={restaurant.googleReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Dejá tu reseña de ${restaurant.name} en Google`}
      className="group mx-auto flex w-full max-w-xs flex-col items-center gap-3 rounded-3xl border border-border/70 bg-card/70 px-6 py-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <span className="font-display text-3xl font-bold leading-none tracking-[0.16em] text-primary">
        {restaurant.name.toUpperCase()}
      </span>

      <span
        className="flex items-center gap-1.5"
        role="img"
        aria-label="5 estrellas en Google"
      >
        <GoogleMark className="h-4 w-4 shrink-0" />
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-star text-star transition-transform duration-300 group-hover:scale-110"
          />
        ))}
      </span>

      <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-primary/80">
        Dejá tu reseña en Google
      </span>
    </a>
  );
}

/** Marca "G" de Google con sus colores de marca fijos. */
function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}
