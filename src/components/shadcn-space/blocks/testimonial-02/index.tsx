import BrandSlider, { BrandList } from "@/components/shadcn-space/blocks/testimonial-02/brand-slider";
import Testimonial01Inner, { Testimonial } from "@/components/shadcn-space/blocks/testimonial-02/testimonial";

const brandList: BrandList[] = [
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-1.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-1.svg",
        name: "Brand 1",
    },
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-2.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-2.svg",
        name: "Brand 2",
    },
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-3.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-3.svg",
        name: "Brand 3",
    },
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-4.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-4.svg",
        name: "Brand 4",
    },
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-5.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-5.svg",
        name: "Brand 5",
    },
];

const defaultTestimonials: Testimonial[] = [
    {
        quote: "Captiveau benar-benar mengubah cara kami mengembangkan produk digital. Tim mereka berhasil membangun MVP kami dalam 8 minggu. Sekarang kami bisa fokus pada strategi bisnis, bukan masalah teknis.",
        author: "Budi Santoso",
        role: "CEO di TechStart Indonesia",
        image: "https://images.shadcnspace.com/assets/profiles/testimonial-user.png",
    },
    {
        quote: "Awalnya saya ragu dengan software house lokal, tapi Captiveau membuktikan kualitas mereka. Aplikasi e-learning kami mendapat rating 4.8 di Play Store. Tim mereka sangat profesional dan responsif.",
        author: "Sari Dewi",
        role: "Founder di EduTech Solutions",
        image: "https://images.shadcnspace.com/assets/profiles/testimonial-user-2.png",
    },
];

export default function Testimonial01() {
    return (
        <main>
            <Testimonial01Inner testimonials={defaultTestimonials} />
            <BrandSlider brandList={brandList} />
        </main>
    );
}
