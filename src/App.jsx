import { useState } from 'react'
import Header from './components/Header'
import UploadForm from './components/UploadForm'
import TrackList from './components/TrackList'

function App() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.15),transparent_55%)]" />
      <div className="relative max-w-4xl mx-auto p-6">
        <Header />

        <div className="grid md:grid-cols-5 gap-6 mt-6">
          <div className="md:col-span-3 space-y-6">
            <UploadForm onUploaded={() => setRefresh((v) => v + 1)} />
            <TrackList refreshSignal={refresh} />
          </div>
          <aside className="md:col-span-2 bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">How it works</h3>
            <ul className="text-blue-200/80 text-sm list-disc pl-5 space-y-2">
              <li>Select an audio file or drag it into the box.</li>
              <li>Add a title and optional details.</li>
              <li>Hit upload and it will appear below with a player.</li>
            </ul>
            <a href="/test" className="inline-block mt-4 text-blue-300 hover:text-blue-200 text-sm">Check backend status →</a>
          </aside>
        </div>

        <footer className="mt-10 text-center text-blue-300/60 text-sm">
          Built with love for music creators.
        </footer>
      </div>
    </div>
  )
}

export default App
