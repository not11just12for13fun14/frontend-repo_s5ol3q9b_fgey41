import { useState } from 'react'
import { UploadCloud, Loader2 } from 'lucide-react'

function UploadForm({ onUploaded }) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [genre, setGenre] = useState('')
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }

  const onFileChange = (e) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    setError('')
    if (!file) {
      setError('Please choose an audio file to upload')
      return
    }
    if (!title.trim()) {
      setError('Please add a title')
      return
    }

    try {
      setLoading(true)
      const form = new FormData()
      form.append('file', file)
      form.append('title', title)
      if (artist) form.append('artist', artist)
      if (album) form.append('album', album)
      if (genre) form.append('genre', genre)

      const res = await fetch(`${baseUrl}/api/tracks/upload`, {
        method: 'POST',
        body: form,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || `Upload failed (${res.status})`)
      }

      const data = await res.json()
      onUploaded?.(data)
      setTitle('')
      setArtist('')
      setAlbum('')
      setGenre('')
      setFile(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 space-y-5">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 transition ${isDragging ? 'border-blue-400 bg-blue-500/5' : 'border-slate-600/60 bg-slate-900/40'}`}
      >
        {file ? (
          <div className="text-center">
            <p className="text-blue-100 font-medium">{file.name}</p>
            <p className="text-blue-300/60 text-sm">{(file.size / (1024*1024)).toFixed(2)} MB</p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-10 h-10 text-blue-300" />
            <p className="text-blue-100 font-medium">Drag & drop your audio here</p>
            <p className="text-blue-300/60 text-sm">MP3, WAV, AAC and more</p>
            <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition">
              <input type="file" accept="audio/*" className="hidden" onChange={onFileChange} />
              Choose file
            </label>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Song title" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Artist</label>
          <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist name" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Album</label>
          <input value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Album" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Genre</label>
          <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-60">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />} Upload
      </button>
    </form>
  )
}

export default UploadForm
