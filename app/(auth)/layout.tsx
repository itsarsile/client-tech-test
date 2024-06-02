import '../globals.css';
import { GeistSans } from 'geist/font/sans';
import { AppShell } from "@/components/AppShell"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      {children}
    </div>
  )
}
