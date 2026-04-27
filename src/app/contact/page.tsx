import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
    title: "Contact Us - ShopVerse",
    description: "Get in touch with the ShopVerse team.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
                <p className="text-muted-foreground mb-12">
                    Have a question or feedback? We would love to hear from you. Fill out the form below or reach us directly.
                </p>
            </div>

            <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-2">
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Our Location</h3>
                            <p className="text-sm text-muted-foreground">123 ShopVerse Way, E-commerce City<br />Web Land, 10001</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Email Us</h3>
                            <p className="text-sm text-muted-foreground">support@shopverse.fake</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Call Us</h3>
                            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>

                <form className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
                        <input type="text" id="name" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                        <input type="email" id="email" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
                        <textarea id="message" rows={4} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="How can we help?"></textarea>
                    </div>
                    <button type="button" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
