import { useEffect, useState } from 'react'
import { Music2, Disc3 } from 'lucide-react'

function TrackList({ refreshSignal }) {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/api/tracks`)
      const data = await res.json()
      setTracks(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSignal])

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Your uploads</h3>
      {loading && <p className="text-blue-300/80 text-sm">Loading...</p>}
      {tracks.length === 0 && !loading && (
        <p className="text-blue-300/60 text-sm">No tracks yet. Upload your first track above.</p>
      )}
      <ul className="divide-y divide-slate-700/60">
        {tracks.map(t => (
          <li key={t._id} className="py-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-900/60 border border-slate-700 flex items-center justify-center">
              {t.cover_url ? (
                <img src={t.cover_url} alt={t.title} className="w-12 h-12 object-cover rounded-lg" />
              ) : (
                <Disc3 className="w-6 h-6 text-blue-300" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{t.title}</p>
              <p className="text-blue-300/60 text-xs truncate">{t.artist || 'Unknown artist'} • {t.genre || 'Unknown genre'}</p>
              <audio className="mt-2 w-full" controls src={`${baseUrl}${t.media_url}`}></audio>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrackList
