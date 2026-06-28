'use client'
import { useState } from 'react'
const LOCATIONS = ['forest','ocean','rain','mountain','river','desert','jungle','wind','fire','night']
export default function Home() {
  const [location, setLocation] = useState('forest')
  const [sounds, setSounds] = useState<any[]>([])
  const [playing, setPlaying] = useState<string | null>(null)
  const fetchSounds = async () => {
    const res = await fetch(`/api/sounds?location=${location}`)
    const data = await res.json()
    setSounds(data.sounds || [])
  }
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Earth</h1>
        <p className="text-gray-400 mb-8">Nature soundscapes from around the world</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {LOCATIONS.map(l => (
            <button key={l} onClick={() => setLocation(l)} className={`px-5 py-3 rounded-xl transition-all capitalize ${location === l ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>{l}</button>
          ))}
        </div>
        <button onClick={fetchSounds} className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition mb-8">Browse Sounds</button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sounds.map((s) => (
            <div key={s.id} className={`bg-white/10 backdrop-blur rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 ${playing === s.id ? 'ring-2 ring-emerald-500' : ''}`} onClick={() => setPlaying(playing === s.id ? null : s.id)}>
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="text-lg font-semibold mb-1">{s.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{s.location} - {s.duration}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{playing === s.id ? '⏸' : '▶'}</span>
                <div className="flex-1 h-1 bg-white/20 rounded">{playing === s.id && <div className="h-full bg-emerald-500 rounded animate-pulse" style={{width:'40%'}} />}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
