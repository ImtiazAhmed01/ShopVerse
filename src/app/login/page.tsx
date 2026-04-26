export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:py-24 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">About Odyssey</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Odyssey is a modern Next.js E-Commerce prototype built to demonstrate
                    high-quality frontend architecture, premium design aesthetics, and robust React state management.
                </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
                <div className="bg-card p-8 rounded-3xl border border-border">
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We believe that online shopping should be more than just transactional. It should be an experience. Our platform is designed with extreme attention to detail, ensuring that every interaction feels smooth, intuitive, and visually stunning.
                    </p>
                </div>
                <div className="bg-primary text-primary-foreground p-8 rounded-3xl border border-primary">
                    <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
                    <ul className="space-y-3 font-medium text-primary-foreground/90">
                        <li className="flex items-center gap-2">✓ Next.js 15 (App Router)</li>
                        <li className="flex items-center gap-2">✓ React Context API</li>
                        <li className="flex items-center gap-2">✓ Tailwind CSS v4</li>
                        <li className="flex items-center gap-2">✓ Lucide Icons</li>
                        <li className="flex items-center gap-2">✓ Fake Store API Integration</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
