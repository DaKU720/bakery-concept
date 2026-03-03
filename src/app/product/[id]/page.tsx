import { mockProducts } from "@/data/products";
import { notFound } from "next/navigation";
import { TopNavbar } from "@/components/TopNavbar";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { ProductClientView } from "./ProductClientView";

// Using a Promise for params for Next 15+ compatibility
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = mockProducts.find((p) => p.id === resolvedParams.id);

    if (!product) {
        notFound();
    }

    return (
        <>
            <TopNavbar />
            <main className="max-w-4xl mx-auto px-4 pb-32 pt-6">
                <ProductClientView product={product} />
            </main>
            <CartDrawer />
            <CheckoutModal />
        </>
    );
}
