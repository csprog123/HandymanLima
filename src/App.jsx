import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Bell,
  MapPin,
  Plus,
  Minus,
  CheckCircle,
  LogOut,
  Send,
  X,
  Languages,
  Wrench,
  Zap,
  Paintbrush,
  Truck,
  Sparkles,
  Lock,
  Shield,
  Star,
  Search,
  Phone,
  ChevronDown,
} from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────
const DISTRICTS = [
  "Miraflores",
  "San Isidro",
  "Barranco",
  "Surco",
  "La Molina",
  "San Borja",
  "Magdalena",
  "Jesús María",
  "Lince",
];

const CATEGORIES = [
  {
    slug: "cleaning",
    name: { es: "Limpieza", en: "Cleaning" },
    Icon: Sparkles,
    color: "text-blue-500",
    bg: "bg-blue-50",
    priceRange: { es: "desde S/89", en: "from S/89" },
    techsAvail: 8,
    avgRating: 4.8,
  },
  {
    slug: "plumbing",
    name: { es: "Gasfitería", en: "Plumbing" },
    Icon: Wrench,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    priceRange: { es: "desde S/30", en: "from S/30" },
    techsAvail: 5,
    avgRating: 4.9,
  },
  {
    slug: "electrician",
    name: { es: "Electricista", en: "Electrician" },
    Icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    priceRange: { es: "desde S/50", en: "from S/50" },
    techsAvail: 6,
    avgRating: 4.7,
  },
  {
    slug: "cerrajeria",
    name: { es: "Cerrajería", en: "Locksmith" },
    Icon: Lock,
    color: "text-purple-500",
    bg: "bg-purple-50",
    priceRange: { es: "desde S/40", en: "from S/40" },
    techsAvail: 4,
    avgRating: 4.8,
  },
  {
    slug: "painting",
    name: { es: "Pintura", en: "Painting" },
    Icon: Paintbrush,
    color: "text-rose-500",
    bg: "bg-rose-50",
    priceRange: { es: "desde S/200", en: "from S/200" },
    techsAvail: 7,
    avgRating: 4.8,
  },
  {
    slug: "moving",
    name: { es: "Mudanza", en: "Moving" },
    Icon: Truck,
    color: "text-orange-500",
    bg: "bg-orange-50",
    priceRange: { es: "desde S/150", en: "from S/150" },
    techsAvail: 3,
    avgRating: 4.6,
  },
];

const SERVICES = [
  {
    id: "s1",
    cat: "cleaning",
    price: 89,
    dur: "3-4 hrs",
    stars: 4.8,
    reviews: 120,
    name: {
      es: "Limpieza de Departamento (Básico)",
      en: "Apartment Cleaning (Basic)",
    },
    desc: {
      es: "Limpieza general de pisos, baños y cocina. Ideal para mantenimiento semanal.",
      en: "General cleaning of floors, bathrooms, and kitchen. Ideal for weekly maintenance.",
    },
  },
  {
    id: "s2",
    cat: "cleaning",
    price: 150,
    dur: "5-6 hrs",
    stars: 4.9,
    reviews: 85,
    name: {
      es: "Limpieza Profunda + Desinfección",
      en: "Deep Cleaning + Disinfection",
    },
    desc: {
      es: "Limpieza detallada incluyendo ventanas, muebles y desinfección completa.",
      en: "Detailed cleaning including windows, furniture, and full disinfection.",
    },
  },
  {
    id: "s4",
    cat: "plumbing",
    price: 30,
    dur: "30 min",
    stars: 4.9,
    reviews: 340,
    name: {
      es: "Visita Técnica / Diagnóstico",
      en: "Technical Visit / Diagnosis",
    },
    desc: {
      es: "Evaluación por gasfitero certificado. El costo se descuenta si realizas el servicio.",
      en: "Evaluation by a certified plumber. Cost is discounted if service is performed.",
    },
  },
  {
    id: "s5",
    cat: "plumbing",
    price: 120,
    dur: "1-2 hrs",
    stars: 4.8,
    reviews: 210,
    name: { es: "Instalación de Terma", en: "Water Heater Installation" },
    desc: {
      es: "Instalación segura de terma eléctrica o a gas. Incluye pruebas de fuga.",
      en: "Safe installation of electric or gas water heater. Includes leak testing.",
    },
  },
  {
    id: "s6",
    cat: "electrician",
    price: 50,
    dur: "1 hr",
    stars: 4.7,
    reviews: 180,
    name: { es: "Instalación de Tomacorriente", en: "Outlet Installation" },
    desc: {
      es: "Instalación o reparación de tomacorrientes. Trabajo certificado y seguro.",
      en: "Outlet installation or repair. Certified and safe work.",
    },
  },
  {
    id: "s7",
    cat: "electrician",
    price: 80,
    dur: "2 hrs",
    stars: 4.8,
    reviews: 132,
    name: {
      es: "Revisión del Tablero Eléctrico",
      en: "Electrical Panel Inspection",
    },
    desc: {
      es: "Revisión completa del sistema eléctrico. Detectamos fallas antes de que sean peligrosas.",
      en: "Complete electrical system review. We detect failures before they become dangerous.",
    },
  },
  {
    id: "s11",
    cat: "cerrajeria",
    price: 40,
    dur: "30 min",
    stars: 4.8,
    reviews: 95,
    name: {
      es: "Apertura de Puerta de Emergencia",
      en: "Emergency Door Opening",
    },
    desc: {
      es: "Apertura de puertas sin daño al cerrojo. Disponible las 24 horas.",
      en: "Door opening without damage to the lock. Available 24 hours.",
    },
  },
  {
    id: "s12",
    cat: "cerrajeria",
    price: 80,
    dur: "1 hr",
    stars: 4.9,
    reviews: 67,
    name: {
      es: "Cambio de Cerradura de Alta Seguridad",
      en: "High-Security Lock Replacement",
    },
    desc: {
      es: "Instalación de cerradura nueva de alta seguridad. Incluye 3 llaves y garantía.",
      en: "New high-security lock installation. Includes 3 keys and warranty.",
    },
  },
  {
    id: "s13",
    cat: "moving",
    price: 150,
    dur: "3-5 hrs",
    stars: 4.6,
    reviews: 54,
    name: {
      es: "Mudanza Local (hasta 3 ambientes)",
      en: "Local Move (up to 3 rooms)",
    },
    desc: {
      es: "Traslado de muebles y cajas en Lima. Camión y personal incluidos.",
      en: "Furniture and box transport within Lima. Truck and staff included.",
    },
  },
  {
    id: "s14",
    cat: "painting",
    price: 200,
    dur: "1 day",
    stars: 4.8,
    reviews: 78,
    name: { es: "Pintura de Habitación", en: "Room Painting" },
    desc: {
      es: "Pintura completa de habitación hasta 15m². Incluye masillado básico.",
      en: "Complete painting of a room up to 15m². Includes basic puttying.",
    },
  },
];

const TESTIMONIALS = [
  {
    name: "María G.",
    district: "Miraflores",
    service: { es: "Limpieza profunda", en: "Deep cleaning" },
    text: {
      es: "Excelente servicio, llegaron puntual y dejaron el depto impecable.",
      en: "Excellent service, arrived on time and left the apartment spotless.",
    },
    rating: 5,
  },
  {
    name: "Carlos R.",
    district: "San Isidro",
    service: { es: "Gasfitería", en: "Plumbing" },
    text: {
      es: "Resolvieron el caño roto en menos de una hora. Lo recomiendo 100%.",
      en: "Fixed the broken pipe in under an hour. 100% recommend.",
    },
    rating: 5,
  },
  {
    name: "Lucía P.",
    district: "Surco",
    service: { es: "Electricista", en: "Electrician" },
    text: {
      es: "Técnico muy profesional y honesto con el presupuesto. Volvería a contratar.",
      en: "Very professional, honest about the estimate. Would hire again.",
    },
    rating: 5,
  },
];

const DICT = {
  es: {
    app_name: "PeruServ",
    location: "Ubicación actual",
    banner_badge: "100% Verificados",
    banner_title: "Tu casa, como nueva.",
    banner_sub: "15% de descuento en tu primera reserva.",
    banner_btn: "Reservar limpieza",
    pop_services: "Servicios Populares",
    ai_cta_title: "Sube una foto del problema",
    ai_cta_sub: "Te decimos qué técnico necesitas en segundos",
    ai_cta_btn: "Probar ahora",
    nav_home: "Inicio",
    nav_bookings: "Reservas",
    nav_profile: "Perfil",
    view_cart: "Ver carrito",
    add_btn: "+ Agregar",
    summary: "Resumen de Reserva",
    selected_svcs: "Servicios seleccionados",
    address_title: "Dirección del servicio",
    district_label: "Distrito",
    address_placeholder: "Ej: Av. Larco 345, Dpto 201",
    datetime_title: "Fecha y Hora",
    payment_detail: "Detalle de Pago",
    payment_methods: "Métodos de pago aceptados",
    subtotal: "Subtotal",
    tax: "IGV (18%)",
    fee: "Tarifa",
    total: "Total",
    confirm_btn: "Confirmar y Pagar",
    processing: "Procesando...",
    empty_cart: "Tu carrito está vacío",
    explore: "Explorar servicios",
    my_bookings: "Mis Reservas",
    no_bookings: "No tienes reservas aún",
    login_required: "Inicia sesión para continuar",
    login_btn: "Iniciar sesión",
    welcome: "Bienvenido",
    login_sub: "Inicia sesión en PeruServ",
    email: "Email",
    password: "Contraseña",
    no_account: "¿No tienes cuenta?",
    register: "Regístrate",
    create_account: "Crear cuenta",
    full_name: "Nombre completo",
    have_account: "¿Ya tienes cuenta?",
    logout: "Cerrar sesión",
    settings: "Configuración",
    virtual_master: "Maestro Virtual",
    ai_sub: "Potenciado por Gemini IA",
    ai_intro:
      "¡Hola jefe/a! Soy el Maestro Virtual ✨. Puedes describirme el problema o subir una foto, y te digo qué técnico necesitas.",
    ai_thinking: "El maestro está pensando...",
    toast_added: "agregado al carrito",
    toast_confirmed: "¡Reserva confirmada! 🎉",
    status_confirmed: "Confirmada",
    status_pending: "Pendiente",
    trust_strip: "+5,000 limeños confían en PeruServ",
    verified_badge: "Técnicos Verificados",
    verified_tooltip: "Verificación de identidad, antecedentes y seguro incluidos",
    search_placeholder: "¿Qué necesitas hoy?",
    techs_available: "técnicos disponibles",
    testimonials_title: "Lo que dicen nuestros clientes",
    whatsapp_cta: "WhatsApp",
    change_district: "Cambiar distrito",
  },
  en: {
    app_name: "PeruServ",
    location: "Current Location",
    banner_badge: "100% Verified",
    banner_title: "Your home, like new.",
    banner_sub: "15% off your first booking.",
    banner_btn: "Book cleaning",
    pop_services: "Popular Services",
    ai_cta_title: "Upload a photo of the problem",
    ai_cta_sub: "We'll tell you which technician you need in seconds",
    ai_cta_btn: "Try it now",
    nav_home: "Home",
    nav_bookings: "Bookings",
    nav_profile: "Profile",
    view_cart: "View Cart",
    add_btn: "+ Add",
    summary: "Booking Summary",
    selected_svcs: "Selected Services",
    address_title: "Service Address",
    district_label: "District",
    address_placeholder: "Ex: Larco Ave 345, Apt 201",
    datetime_title: "Date & Time",
    payment_detail: "Payment Details",
    payment_methods: "Accepted payment methods",
    subtotal: "Subtotal",
    tax: "Tax (18%)",
    fee: "Service Fee",
    total: "Total",
    confirm_btn: "Confirm & Pay",
    processing: "Processing...",
    empty_cart: "Your cart is empty",
    explore: "Explore services",
    my_bookings: "My Bookings",
    no_bookings: "You have no bookings yet",
    login_required: "Please log in to continue",
    login_btn: "Log In",
    welcome: "Welcome",
    login_sub: "Sign in to PeruServ",
    email: "Email",
    password: "Password",
    no_account: "Don't have an account?",
    register: "Sign Up",
    create_account: "Create Account",
    full_name: "Full Name",
    have_account: "Already have an account?",
    logout: "Log Out",
    settings: "Settings",
    virtual_master: "Virtual Master",
    ai_sub: "Powered by Gemini AI",
    ai_intro:
      "Hello boss! I'm the Virtual Master ✨. Describe your problem or upload a photo and I'll tell you which technician you need.",
    ai_thinking: "The master is thinking...",
    toast_added: "added to cart",
    toast_confirmed: "Booking confirmed! 🎉",
    status_confirmed: "Confirmed",
    status_pending: "Pending",
    trust_strip: "+5,000 Lima residents trust PeruServ",
    verified_badge: "Verified Technicians",
    verified_tooltip: "ID check, background check, and insurance included",
    search_placeholder: "What do you need today?",
    techs_available: "technicians available",
    testimonials_title: "What our customers say",
    whatsapp_cta: "WhatsApp",
    change_district: "Change district",
  },
};

const ls = {
  get: (k) => {
    try {
      return JSON.parse(localStorage.getItem(k));
    } catch {
      return null;
    }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  del: (k) => localStorage.removeItem(k),
};

// ─── App Component ─────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState(() => ls.get("ps_lang") || "es");
  const [page, setPage] = useState("home");
  const [catSlug, setCatSlug] = useState(null);
  const [user, setUser] = useState(() => ls.get("ps_user"));
  const [cart, setCart] = useState([]);
  const [bookings, setBookings] = useState(() => ls.get("ps_bookings") || []);
  const [showChat, setShowChat] = useState(false);
  const [toast, setToast] = useState(null);

  const t = (key) => DICT[lang][key] || key;

  useEffect(() => {
    ls.set("ps_lang", lang);
  }, [lang]);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const nav = (p, opts = {}) => {
    setPage(p);
    if (opts.cat) setCatSlug(opts.cat);
    window.scrollTo(0, 0);
  };

  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"));

  const addToCart = (svc) => {
    setCart((p) => {
      const ex = p.find((i) => i.svc.id === svc.id);
      return ex
        ? p.map((i) => (i.svc.id === svc.id ? { ...i, qty: i.qty + 1 } : i))
        : [...p, { svc, qty: 1 }];
    });
    notify(`"${svc.name[lang]}" ${t("toast_added")} ✓`);
  };

  const setQty = (id, qty) => {
    if (qty < 1) {
      setCart((p) => p.filter((i) => i.svc.id !== id));
      return;
    }
    setCart((p) => p.map((i) => (i.svc.id === id ? { ...i, qty } : i)));
  };

  const cartTotal = cart.reduce((s, i) => s + i.svc.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const isAuthPage = ["login", "register"].includes(page);

  const whatsappUrl = `https://wa.me/6597593232?text=${encodeURIComponent(
    lang === "es"
      ? "Hola, necesito un servicio en Lima"
      : "Hello, I need a service in Lima"
  )}`;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 relative shadow-2xl overflow-x-hidden font-sans pb-20">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm z-50 shadow-lg animate-bounce">
          {toast}
        </div>
      )}

      <main className={isAuthPage ? "pb-0" : ""}>
        {page === "home" && (
          <HomePage
            nav={nav}
            setShowChat={setShowChat}
            t={t}
            lang={lang}
            toggleLang={toggleLang}
          />
        )}
        {page === "category" && (
          <CategoryPage
            slug={catSlug}
            nav={nav}
            addToCart={addToCart}
            t={t}
            lang={lang}
            toggleLang={toggleLang}
          />
        )}
        {page === "checkout" && (
          <CheckoutPage
            cart={cart}
            user={user}
            nav={nav}
            clearCart={() => setCart([])}
            addBooking={(b) => {
              const up = [b, ...bookings];
              setBookings(up);
              ls.set("ps_bookings", up);
            }}
            setQty={setQty}
            notify={notify}
            t={t}
            lang={lang}
            toggleLang={toggleLang}
          />
        )}
        {page === "bookings" && (
          <BookingsPage
            bookings={bookings}
            nav={nav}
            user={user}
            t={t}
            lang={lang}
            toggleLang={toggleLang}
          />
        )}
        {page === "profile" && (
          <ProfilePage
            user={user}
            logout={() => {
              ls.del("ps_user");
              setUser(null);
              setCart([]);
              nav("home");
            }}
            nav={nav}
            notify={notify}
            t={t}
            lang={lang}
            toggleLang={toggleLang}
          />
        )}
        {page === "login" && (
          <LoginPage
            login={(u) => {
              ls.set("ps_user", u);
              setUser(u);
            }}
            nav={nav}
            t={t}
          />
        )}
        {page === "register" && (
          <RegisterPage
            login={(u) => {
              ls.set("ps_user", u);
              setUser(u);
            }}
            nav={nav}
            t={t}
          />
        )}
      </main>

      {cartCount > 0 && page !== "checkout" && !isAuthPage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-30">
          <button
            onClick={() => (user ? nav("checkout") : nav("login"))}
            className="w-full bg-indigo-600 text-white rounded-xl p-4 flex justify-between items-center shadow-xl hover:bg-indigo-700 active:scale-95 transition-all font-bold"
          >
            <span className="bg-white text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">
              {cartCount}
            </span>
            <span>{t("view_cart")}</span>
            <span>S/ {cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {!isAuthPage && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 py-2 px-8 flex justify-between items-center z-40">
          <NavBtn
            icon={<Home size={22} />}
            label={t("nav_home")}
            active={page === "home"}
            onClick={() => nav("home")}
          />
          <NavBtn
            icon={<Calendar size={22} />}
            label={t("nav_bookings")}
            active={page === "bookings"}
            onClick={() => (user ? nav("bookings") : nav("login"))}
          />
          <NavBtn
            icon={<User size={22} />}
            label={t("nav_profile")}
            active={page === "profile"}
            onClick={() => (user ? nav("profile") : nav("login"))}
          />
        </nav>
      )}

      {/* WhatsApp floating button — distinct from AI chat */}
      {!isAuthPage && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-52 right-4 bg-green-500 text-white h-12 px-4 rounded-full flex items-center gap-2 shadow-2xl z-40 font-bold text-sm hover:bg-green-600 active:scale-95 transition-all"
          aria-label="WhatsApp"
        >
          <Phone size={18} />
          <span>{t("whatsapp_cta")}</span>
        </a>
      )}

      {!showChat && !isAuthPage && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-36 right-4 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-40 animate-pulse"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {showChat && (
        <ChatModal onClose={() => setShowChat(false)} t={t} lang={lang} />
      )}
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${
        active ? "text-indigo-600 font-bold" : "text-gray-400"
      }`}
    >
      {icon}
      <span className="text-[10px] uppercase tracking-tighter">{label}</span>
    </button>
  );
}

// ─── Pages ──────────────────────────────────────────────────────────────────
function Header({ title, nav, back, toggleLang, lang }) {
  return (
    <div className="sticky top-0 bg-white px-4 py-4 border-b border-gray-100 flex justify-between items-center z-20">
      <div className="flex items-center gap-3">
        {back && (
          <button
            onClick={() => nav(back)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
      <button
        onClick={toggleLang}
        className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        <Languages size={16} />
        {lang === "es" ? "EN" : "ES"}
      </button>
    </div>
  );
}

function HomePage({ nav, setShowChat, t, lang, toggleLang }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [district, setDistrict] = useState("Miraflores");
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);

  const filteredCategories = searchQuery.trim()
    ? CATEGORIES.filter((c) =>
        c.name[lang].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : CATEGORIES;

  return (
    <>
      {/* Header with PeruServ branding + tappable location */}
      <div className="px-4 pt-8 pb-4 flex justify-between items-center bg-white relative">
        <div>
          <p className="text-lg font-black text-indigo-600 leading-none mb-1">
            PeruServ
          </p>
          <button
            onClick={() => setShowDistrictPicker((v) => !v)}
            className="flex items-center gap-1 text-gray-800 font-bold"
          >
            <MapPin size={16} className="text-indigo-600" />
            {district}, Lima
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleLang}
            className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center"
          >
            <Languages size={20} />
          </button>
          <button className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* District picker dropdown — fixed to avoid overflow clipping */}
      {showDistrictPicker && (
        <div className="fixed left-4 top-24 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 w-56 max-h-52 overflow-y-auto">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 pt-3 pb-1">
            {t("change_district")}
          </p>
          {DISTRICTS.map((d) => (
            <button
              key={d}
              onClick={() => {
                setDistrict(d);
                setShowDistrictPicker(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2 ${
                district === d ? "text-indigo-600 font-bold" : "text-gray-700"
              }`}
            >
              {district === d && <CheckCircle size={12} />}
              {d}
            </button>
          ))}
        </div>
      )}

      {/* Trust strip */}
      <div className="px-4 pb-4 bg-white">
        <div className="bg-indigo-50 rounded-2xl px-4 py-3 flex items-center gap-3">
          <Shield size={20} className="text-indigo-600 shrink-0" />
          <p className="text-indigo-700 text-sm font-bold">
            {t("trust_strip")}
          </p>
        </div>
      </div>

      {/* Hero banner */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest flex items-center gap-1 w-fit">
              <CheckCircle size={12} />
              {t("banner_badge")}
            </span>
            <h2 className="text-2xl font-black mt-3 leading-tight">
              {t("banner_title")}
            </h2>
            <p className="text-indigo-100 text-sm mt-2 opacity-90">
              {t("banner_sub")}
            </p>
            <button
              onClick={() => nav("category", { cat: "cleaning" })}
              className="mt-6 bg-white text-indigo-700 px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-100 active:scale-95 transition-all"
            >
              {t("banner_btn")}
            </button>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 mb-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Category grid */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {t("pop_services")}
          </h3>
          <span className="text-xs text-indigo-600 font-bold flex items-center gap-1">
            <Shield size={12} />
            {t("verified_badge")}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {filteredCategories.map((c) => {
            const CatIcon = c.Icon;
            return (
              <button
                key={c.slug}
                onClick={() => nav("category", { cat: c.slug })}
                className="flex flex-col items-start gap-2 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 group active:scale-95 transition-transform text-left"
              >
                <div
                  className={`w-10 h-10 ${c.bg} ${c.color} rounded-xl flex items-center justify-center`}
                >
                  <CatIcon size={22} strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold text-gray-700 leading-tight">
                  {c.name[lang]}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {c.priceRange[lang]}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] text-gray-500 font-bold">
                    {c.avgRating}
                  </span>
                  <span className="text-[10px] text-green-500 font-bold ml-1">
                    · {c.techsAvail} {t("techs_available")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-4 mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-3">
          {t("testimonials_title")}
        </h3>
        <div className="space-y-3">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-black shrink-0 text-sm">
                  {item.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-sm text-gray-800">
                      {item.name}
                    </span>
                    <div className="flex">
                      {[...Array(item.rating)].map((_, j) => (
                        <Star
                          key={j}
                          size={10}
                          className="text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-1">
                    {item.district} · {item.service[lang]}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    "{item.text[lang]}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI card — concrete value proposition, single entry point explanation */}
      <div className="px-4 pb-6">
        <div
          onClick={() => setShowChat(true)}
          className="bg-gray-900 rounded-2xl p-4 flex items-center justify-between cursor-pointer group hover:bg-black transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shrink-0">
              ✨
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">
                {t("ai_cta_title")}
              </h4>
              <p className="text-gray-400 text-[11px]">{t("ai_cta_sub")}</p>
            </div>
          </div>
          <span className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter shrink-0 ml-2">
            {t("ai_cta_btn")}
          </span>
        </div>
      </div>
    </>
  );
}

function CategoryPage({ slug, nav, addToCart, t, lang, toggleLang }) {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const svcs = SERVICES.filter((s) => s.cat === slug);
  const CatIcon = cat?.Icon;

  return (
    <div>
      <Header
        title={cat?.name[lang] || slug}
        nav={nav}
        back="home"
        toggleLang={toggleLang}
        lang={lang}
      />
      {cat && (
        <div className="px-4 pt-4 pb-2 flex items-center gap-3">
          <div
            className={`w-10 h-10 ${cat.bg} ${cat.color} rounded-xl flex items-center justify-center`}
          >
            {CatIcon && <CatIcon size={22} strokeWidth={2} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">
                {cat.priceRange[lang]}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <Star size={11} className="fill-amber-400" />
                {cat.avgRating}
              </span>
            </div>
            <span className="text-[10px] text-green-600 font-bold">
              {cat.techsAvail} {t("techs_available")}
            </span>
          </div>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-full">
            <Shield size={10} />
            {t("verified_badge")}
          </span>
        </div>
      )}
      <div className="p-4 space-y-4">
        {svcs.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800 text-lg leading-tight flex-1 pr-4">
                {svc.name[lang]}
              </h3>
              <span className="text-indigo-600 font-black text-xl">
                S/ {svc.price}
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {svc.desc[lang]}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-xs font-bold text-gray-400">
                <span className="flex items-center gap-1">⏱ {svc.dur}</span>
                <span className="flex items-center gap-1 text-amber-500">
                  ⭐ {svc.stars} ({svc.reviews})
                </span>
              </div>
              <button
                onClick={() => addToCart(svc)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 active:scale-95 transition-all"
              >
                {t("add_btn")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckoutPage({
  cart,
  user,
  nav,
  clearCart,
  addBooking,
  setQty,
  notify,
  t,
  lang,
  toggleLang,
}) {
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [address, setAddress] = useState("");
  const [datetime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.svc.price * i.qty, 0);
  const tax = subtotal * 0.18,
    fee = 2,
    total = subtotal + tax + fee;

  const handlePay = async () => {
    if (!address.trim()) {
      notify(
        lang === "es"
          ? "Por favor ingresa tu dirección"
          : "Please enter your address"
      );
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    addBooking({
      id: Date.now().toString(),
      code,
      services: cart.map((i) => ({
        name: i.svc.name[lang],
        price: i.svc.price,
        qty: i.qty,
      })),
      total,
      date: datetime
        ? new Date(datetime).toLocaleString(lang === "es" ? "es-PE" : "en-US")
        : new Date().toLocaleDateString(lang === "es" ? "es-PE" : "en-US"),
      district,
      address,
      status: "confirmed",
    });
    clearCart();
    setLoading(false);
    notify(t("toast_confirmed"));
    nav("bookings");
  };

  if (!cart.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800">{t("empty_cart")}</h2>
        <button
          onClick={() => nav("home")}
          className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
        >
          {t("explore")}
        </button>
      </div>
    );

  return (
    <div>
      <Header
        title={t("summary")}
        nav={nav}
        back="home"
        toggleLang={toggleLang}
        lang={lang}
      />
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">{t("selected_svcs")}</h3>
          {cart.map((item) => (
            <div
              key={item.svc.id}
              className="flex justify-between items-center mb-4 last:mb-0"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">
                  {item.svc.name[lang]}
                </p>
                <p className="text-xs text-gray-400">S/ {item.svc.price} ea</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                <button
                  onClick={() => setQty(item.svc.id, item.qty - 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-sm w-4 text-center">
                  {item.qty}
                </span>
                <button
                  onClick={() => setQty(item.svc.id, item.qty + 1)}
                  className="w-8 h-8 flex items-center justify-center text-indigo-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">{t("address_title")}</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                {t("district_label")}
              </label>
              <select
                className="w-full bg-gray-50 border-0 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                {DISTRICTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder={t("address_placeholder")}
              className="w-full bg-gray-50 border-0 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">{t("datetime_title")}</h3>
          <input
            type="datetime-local"
            className="w-full bg-gray-50 border-0 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">
            {t("payment_detail")}
          </h3>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>{t("subtotal")}</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("tax")}</span>
              <span>S/ {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("fee")}</span>
              <span>S/ {fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100 text-lg font-black text-gray-900">
              <span>{t("total")}</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              {t("payment_methods")}
            </p>
            <div className="flex gap-2">
              <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-3 py-1.5 rounded-lg">
                YAPE
              </span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-lg">
                PLIN
              </span>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-3 py-1.5 rounded-lg">
                TARJETA
              </span>
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1.5 rounded-lg">
                EFECTIVO
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? t("processing") : t("confirm_btn")}
        </button>
      </div>
    </div>
  );
}

function BookingsPage({ bookings, nav, user, t, lang, toggleLang }) {
  return (
    <div>
      <Header
        title={t("my_bookings")}
        nav={nav}
        toggleLang={toggleLang}
        lang={lang}
      />
      <div className="p-4 space-y-4">
        {!user ? (
          <div className="text-center bg-white p-12 rounded-3xl border border-dashed border-gray-200">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold mb-6">
              {t("login_required")}
            </p>
            <button
              onClick={() => nav("login")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold"
            >
              {t("login_btn")}
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center p-12">
            <div className="text-6xl mb-4 opacity-20">📅</div>
            <p className="text-gray-400 font-bold">{t("no_bookings")}</p>
          </div>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-black text-indigo-600 tracking-widest">
                    #{b.code}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{b.date}</p>
                  {b.district && (
                    <p className="text-xs text-gray-400">
                      {b.district}
                      {b.address ? ` — ${b.address}` : ""}
                    </p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    b.status === "confirmed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {t(`status_${b.status}`)}
                </span>
              </div>
              <div className="border-t border-gray-50 pt-4 space-y-2">
                {b.services.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-xs font-bold text-gray-700"
                  >
                    <span>
                      {s.qty}x {s.name}
                    </span>
                    <span>S/ {(s.price * s.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-50 font-black text-gray-900">
                <span>Total</span>
                <span>S/ {b.total.toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ProfilePage({ user, logout, nav, notify, t, lang, toggleLang }) {
  if (!user)
    return (
      <BookingsPage
        user={user}
        nav={nav}
        bookings={[]}
        t={t}
        lang={lang}
        toggleLang={toggleLang}
      />
    );

  return (
    <div>
      <Header
        title={t("nav_profile")}
        nav={nav}
        toggleLang={toggleLang}
        lang={lang}
      />
      <div className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-4xl mb-4 font-black">
            {user.name[0]}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="font-black text-xs text-gray-400 uppercase tracking-widest">
              {t("settings")}
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              "Account Info",
              "Saved Addresses",
              "Notifications",
              "Language",
            ].map((item) => (
              <button
                key={item}
                className="w-full flex justify-between items-center p-5 text-gray-700 font-bold hover:bg-gray-50 text-sm"
              >
                <span>{item}</span>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
            <button
              onClick={logout}
              className="w-full flex justify-between items-center p-5 text-rose-500 font-bold hover:bg-rose-50 text-sm"
            >
              <span>{t("logout")}</span>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ login, nav, t }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !pass) return;
    login({ name: email.split("@")[0], email });
    nav("home");
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center">
      <div className="text-5xl mb-6">🏠</div>
      <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">
        {t("welcome")}
      </h2>
      <p className="text-gray-400 mb-8">{t("login_sub")}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">
            {t("email")}
          </label>
          <input
            type="email"
            className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600"
            placeholder="juan@perez.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">
            {t("password")}
          </label>
          <input
            type="password"
            className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600"
            placeholder="••••••••"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 mt-4 active:scale-95 transition-all">
          {t("login_btn")}
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-500">
        {t("no_account")}{" "}
        <button
          onClick={() => nav("register")}
          className="text-indigo-600 font-black"
        >
          {t("register")}
        </button>
      </p>
    </div>
  );
}

function RegisterPage({ login, nav, t }) {
  const [form, setForm] = useState({ name: "", email: "", pass: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.pass) return;
    login({ name: form.name, email: form.email });
    nav("home");
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center">
      <div className="text-5xl mb-6">✍️</div>
      <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">
        {t("create_account")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">
            {t("full_name")}
          </label>
          <input
            type="text"
            className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">
            {t("email")}
          </label>
          <input
            type="email"
            className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">
            {t("password")}
          </label>
          <input
            type="password"
            className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600"
            value={form.pass}
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
          />
        </div>
        <button className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 mt-4 active:scale-95 transition-all">
          {t("create_account")}
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-500">
        {t("have_account")}{" "}
        <button
          onClick={() => nav("login")}
          className="text-indigo-600 font-black"
        >
          {t("login_btn")}
        </button>
      </p>
    </div>
  );
}

// ─── Chat Component ────────────────────────────────────────────────────────
function ChatModal({ onClose, t, lang }) {
  const [msgs, setMsgs] = useState([{ role: "model", text: t("ai_intro") }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const SYSTEM_PROMPT = `
    You are the "Virtual Master" (Maestro Virtual) of PeruServ, the official home services app for Lima, Peru.

    LANGUAGE: Current user language is ${
      lang === "es" ? "Spanish" : "English"
    }. Respond ALWAYS in ${lang === "es" ? "Spanish" : "English"}.

    PRICES (Soles): Cleaning S/89-150. Plumbing S/30-180. Electrician S/50-80. Locksmith S/40-80. Painting S/200-350. Moving S/150+.
    FEES: Total = price + 18% IGV + S/2 service fee.

    TONE: Helpful, friendly, slightly informal like a local handyman (use 'jefe/a' in Spanish or 'boss' in English).
    Short answers (max 3-4 sentences).
    If the user asks for materials, suggest Sodimac or Promart.
    If the user describes a problem, diagnose it and recommend which category (cleaning, plumbing, electrician, locksmith, painting, or moving) they need.
  `;

  const handleSend = async () => {
    if (!input.trim() || busy) return;
    const txt = input.trim();
    setInput("");
    setMsgs((p) => [...p, { role: "user", text: txt }]);
    setBusy(true);

    try {
      const history = msgs.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      history.push({ role: "user", parts: [{ text: txt }] });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: history,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText.slice(0, 100)}`);
      }

      const data = await res.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        (lang === "es"
          ? "¡Uy! No pude procesar eso."
          : "Oops! Couldn't process that.");
      setMsgs((p) => [...p, { role: "model", text: reply }]);
    } catch (e) {
      setMsgs((p) => [...p, { role: "model", text: `Error: ${e.message}` }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md h-[85vh] rounded-t-[2.5rem] sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white text-2xl">
              🤖
            </div>
            <div>
              <h3 className="text-white font-black text-lg leading-none">
                {t("virtual_master")}
              </h3>
              <p className="text-indigo-100 text-[10px] uppercase font-bold tracking-widest mt-1 opacity-70">
                {t("ai_sub")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 text-gray-400 p-4 rounded-2xl rounded-tl-none text-xs italic">
                {t("ai_thinking")}
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            className="flex-1 bg-gray-50 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600"
            placeholder={lang === "es" ? "Escribe aquí..." : "Type here..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={busy}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || busy}
            className="bg-indigo-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-50 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
