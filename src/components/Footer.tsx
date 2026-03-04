import { Facebook, Instagram, MapPin, Clock, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-orange-50/50 pt-16 pb-32 md:pb-16 mt-12 border-t border-orange-100/50">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={`${process.env.NODE_ENV === 'production' ? '/bakery-concept' : ''}/images/logo.png`} alt="Oli Emblem" className="w-12 h-12 rounded-full border-2 border-primary shadow-sm object-cover" />
                        <h2 className="text-xl font-black tracking-tight">Cukiernia "Słodka Ola"</h2>
                    </div>
                    <p className="text-foreground/70 text-sm mb-6 max-w-sm">
                        Twoje codzienne źródło radości. Wypiekamy tradycyjnie, dbamy
                        o zadowolenie i dostarczamy słodkie uśmiechy prosto do Waszych rąk.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4">Znajdź nas</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                            <span>ul. Testowa 1/4B<br />05-120 Legionowo<br /><span className="text-xs text-primary font-bold">Domowa Pracownia Cukiernicza</span></span>
                        </li>
                        <li className="flex items-center gap-3 mt-4">
                            <Phone size={18} className="text-primary shrink-0" />
                            <span>+48 123 456 789</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4">Godziny pieczenia</h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                        <li className="flex items-center gap-3">
                            <Clock size={18} className="text-primary shrink-0" />
                            <span>Zawsze ze świeżego pieca:</span>
                        </li>
                        <li className="flex justify-between max-w-[200px] border-b border-orange-100 pb-1 mt-2">
                            <span>Pon - Pt</span>
                            <span className="font-medium">07:00 - 18:00</span>
                        </li>
                        <li className="flex justify-between max-w-[200px] border-b border-orange-100 pb-1">
                            <span>Sobota</span>
                            <span className="font-medium">08:00 - 16:00</span>
                        </li>
                        <li className="flex justify-between max-w-[200px] pb-1">
                            <span>Niedziela</span>
                            <span className="font-medium text-primary">Zamknięte</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4">Zapisz się na słodkości</h3>
                    <p className="text-sm text-foreground/70 mb-3">Darmowe pączki za polecenie? Zostaw maila na nowości!</p>
                    <form className="flex w-full max-w-sm">
                        <input type="email" placeholder="Twój e-mail" className="px-4 py-2.5 rounded-l-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-11 w-full min-w-0 bg-white shadow-sm text-sm" />
                        <button type="button" className="bg-foreground text-white font-bold h-11 px-4 rounded-r-xl border border-foreground hover:bg-foreground/90 transition-colors shadow-sm text-sm shrink-0 whitespace-nowrap">
                            Subskrybuj
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-orange-200/50 text-center text-sm text-foreground/60 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2026 Cukiernia "Słodka Ola". PWA Prototype.</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-primary transition-colors">Regulamin</a>
                    <a href="#" className="hover:text-primary transition-colors">Polityka Prywatności</a>
                </div>
            </div>
        </footer>
    );
}
