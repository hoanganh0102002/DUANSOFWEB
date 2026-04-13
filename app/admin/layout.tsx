// Admin pages layout - No navbar/footer/chatbot
// This layout isolates admin pages from the public site layout

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
