export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // h-screen + overflow-hidden keeps the chat perfectly contained
    <div className="h-screen w-full overflow-hidden">
      {children}
    </div>
  );
}