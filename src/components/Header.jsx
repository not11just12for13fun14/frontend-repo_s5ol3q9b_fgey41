import { Music } from 'lucide-react'

function Header() {
  return (
    <header className="py-8 text-center">
      <div className="inline-flex items-center gap-3 mb-3">
        <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-400/30">
          <Music className="w-8 h-8 text-blue-300" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">WaveDrop</h1>
      </div>
      <p className="text-blue-200/80 max-w-2xl mx-auto">
        Upload your audio, add details, and play it back instantly. Simple, fast, and beautiful.
      </p>
    </header>
  )
}

export default Header
