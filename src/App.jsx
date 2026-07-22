import React, { useState, useEffect } from 'react';

// YouTubeの共有URL（https://youtu.be/... または https://www.youtube.com/watch?v=...）から
// 埋め込み用IDを抽出するヘルパー関数
const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  let videoId = '';
  
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v');
  } else {
    videoId = url;
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

// 初期データセット
const initialMansonGuitars = [
  {
    "id": "delorean",
    "name": "Oryx 8-String Midnight Purple",
    "tag": "8-String",
    "accentColor": "from-rose-500 to-red-600",
    "borderColor": "border-rose-500 shadow-rose-950/50",
    "glowColor": "rgba(244, 63, 94, 0.5)",
    "imageUrl": "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRI2nnWbJC0zKyIcCiWWIWKxrGaIEhpRLHVXDB0emXbFD8asPcS5Yj6pMjfh6OCEKSkzvDcP-VlAahTA18",
    "description": "2025年6月11日にリリースされたシングル\"UNRAVELLING\"にて初使用。　サポートメンバーであるダン ランカスターとの会話の中で8弦ギターの利用を思いつき、UNRAVELLINGのリフが閃いたとの事。",
    "videos": [
      {
        "id": "1",
        "song": "Plug In Baby",
        "live": "Live Performance",
        "length": "03:45",
        "youtubeUrl": "https://youtu.be/dbB-mZKt33w"
      },
      {
        "id": "2",
        "song": "Bliss",
        "live": "Live Performance",
        "length": "04:20",
        "youtubeUrl": "https://youtu.be/gXN9acC9KMQ"
      },
      {
        "id": "3",
        "song": "Hysteria",
        "live": "Live Performance",
        "length": "03:50",
        "youtubeUrl": "https://youtu.be/3dm_5qWWDV8"
      }
    ]
  },
  {
    "id": "m1d1-mirror",
    "name": "MATT BLACK",
    "tag": "Sustainer",
    "accentColor": "from-red-500 to-rose-600",
    "borderColor": "border-red-500 shadow-red-950/50",
    "glowColor": "rgba(239, 68, 68, 0.5)",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuK_x9TTHh965scMkykCTDpWbazqD9xm2EBG-jXuphvQ&s=10",
    "description": "2012年(The 2nd Law)から利用され、サスティナー(磁力と電力で弦振動を永続させる装置)を備えたスタンダードなモデル。\n利用頻度が高く大量生産されており、ギター破壊パフォーマンスにも用いられこれまで何十台も破壊されてきた。\n時期によって、ピックアップ、ブリッジ、ペグ等パーツ類が変更されている。",
    "videos": [
      {
        "id": "1",
        "song": "Supermassive Black Hole",
        "live": "Live Performance",
        "length": "04:15",
        "youtubeUrl": "https://www.youtube.com/watch?v=8tugqHunwDA"
      },
      {
        "id": "2",
        "song": "New Born",
        "live": "Live Performance",
        "length": "06:30",
        "youtubeUrl": "https://youtu.be/0J2QdDbelmY"
      },
      {
        "id": "3",
        "song": "Starlight",
        "live": "Live Performance",
        "length": "04:00",
        "youtubeUrl": "https://youtu.be/Pgum6OCIVME"
      }
    ]
  },
  {
    "id": "guitar-1784698490576",
    "name": "Chrome FR",
    "tag": "Floyd Rose,Kill Switch,Sustainer",
    "accentColor": "from-red-500 to-rose-600",
    "borderColor": "border-red-500 shadow-red-950/50",
    "glowColor": "rgba(239, 68, 68, 0.5)",
    "imageUrl": "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop",
    "description": "2017年のフェスツアーから利用開始。サスティナーとフロイドローズが備わっている事から、それ以外の特殊なデバイスを用いた楽曲以外は本機で再現できる事から近年一番利用頻度が高いギターである。Yes/Noスイッチがついているが、キルスイッチの挙動を反転させる切り替えスイッチとなっている。",
    "videos": [
      {
        "id": "v1",
        "song": "Sample Song",
        "live": "Live Performance",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=8tugqHunwDA"
      }
    ]
  },
  {
    "id": "guitar-1784700031335",
    "name": "Oryx",
    "tag": "Fanned Frets",
    "accentColor": "from-red-500 to-rose-600",
    "borderColor": "border-red-500 shadow-red-950/50",
    "glowColor": "rgba(239, 68, 68, 0.5)",
    "imageUrl": "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop",
    "description": "初めてファンフレット仕様（フレットを扇状（斜め）に配置し、低音弦側を長く、高音弦側を短く設計）が施されたギター。これにより、太い低音弦のピッチ（音程）が安定し、たるみやビビリを防ぎ、低音弦のダウンチューニングの最適化が期待できる。　アルバム\"Will Of The People\"で特に利用され、Won't Stand Down,Kill Or Be Killed等のダウンチューニングかつヘビィな曲で利用された。",
    "videos": [
      {
        "id": "v1",
        "song": "Kill Or Be Killed",
        "live": "MV",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=GgyQufB1Yic"
      }
    ]
  },
  {
    "id": "guitar-1784699177190",
    "name": "M1D1 Stealth",
    "tag": "Sustainer,XY MIDI Pad",
    "accentColor": "from-red-500 to-rose-600",
    "borderColor": "border-red-500 shadow-red-950/50",
    "glowColor": "rgba(239, 68, 68, 0.5)",
    "imageUrl": "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop",
    "description": "2015年から現在まで何度かのパーツのマイナーチェンジを経てKAOSS PADを使う曲、主にSupermassive Black Holeをプレイする際に利用している。ギターのパッド自体はあくまでコントローラーであり、音の出力や音色は、接続先であるKAOSS PADから出力されている。",
    "videos": [
      {
        "id": "v1",
        "song": "Sample Song",
        "live": "Live Performance",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=8tugqHunwDA"
      }
    ]
  },
  {
    "id": "guitar-1784703143745",
    "name": "Verona Sky",
    "tag": "ST Shape,Tremolo",
    "accentColor": "from-red-500 to-rose-600",
    "borderColor": "border-red-500 shadow-red-950/50",
    "glowColor": "rgba(239, 68, 68, 0.5)",
    "imageUrl": "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop",
    "description": "Manson製Stratocasterシャイプのシグネチャーモデル。名前の通りWill Of The People収録のVeronaの演奏用に用いられる。特徴的なのはピックアップガードが金属製になっており、ジェフバックリーが生前利用していたテレキャスターも同一で、この仕様により通常のギターより金属感ある煌びやかな音が出るという事を継承させる為に備えたと思われる。",
    "videos": [
      {
        "id": "v1",
        "song": "Verona",
        "live": "MV",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=NN1OtIJu_Bk"
      }
    ]
  }
];

export default function App() {
  const [mansonGuitars, setMansonGuitars] = useState(() => {
    try {
      const saved = localStorage.getItem('muse_guitars_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    const shuffled = [...initialMansonGuitars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  useEffect(() => {
    try {
      localStorage.setItem('muse_guitars_data', JSON.stringify(mansonGuitars));
    } catch (e) {
      console.error(e);
    }
  }, [mansonGuitars]);

  const [selectedGuitar, setSelectedGuitar] = useState(mansonGuitars[0] || initialMansonGuitars[0]);
  const [selectedVideo, setSelectedVideo] = useState(mansonGuitars[0]?.videos[0] || initialMansonGuitars[0].videos[0]);
  
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPassInput, setAdminPassInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [editingGuitar, setEditingGuitar] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedTagFilter, setSelectedTagFilter] = useState('ALL');

  const allAvailableTags = React.useMemo(() => {
    const set = new Set();
    mansonGuitars.forEach((g) => {
      if (g.tag) {
        g.tag.split(',').forEach((t) => {
          const trimmed = t.trim();
          if (trimmed) set.add(trimmed);
        });
      }
    });
    return Array.from(set);
  }, [mansonGuitars]);

  const filteredGuitars = React.useMemo(() => {
    if (selectedTagFilter === 'ALL') return mansonGuitars;
    return mansonGuitars.filter((g) => {
      if (!g.tag) return false;
      const tags = g.tag.split(',').map((t) => t.trim().toLowerCase());
      return tags.includes(selectedTagFilter.toLowerCase());
    });
  }, [mansonGuitars, selectedTagFilter]);

  useEffect(() => {
    const exists = filteredGuitars.find((g) => g.id === selectedGuitar?.id);
    if (!exists && filteredGuitars.length > 0) {
      setSelectedGuitar(filteredGuitars[0]);
      setSelectedVideo(filteredGuitars[0].videos[0]);
    } else if (exists) {
      const vidExists = exists.videos.find((v) => v.id === selectedVideo?.id);
      if (!vidExists && exists.videos.length > 0) {
        setSelectedVideo(exists.videos[0]);
      }
    }
  }, [filteredGuitars, selectedGuitar, selectedVideo]);

  const handleSelectGuitar = (guitar) => {
    setSelectedGuitar(guitar);
    if (guitar.videos && guitar.videos.length > 0) {
      setSelectedVideo(guitar.videos[0]);
    }
  };

  const handleAddNewGuitar = () => {
    const newId = `guitar-${Date.now()}`;
    const newGuitar = {
      id: newId,
      name: 'NEW GUITAR MODEL',
      tag: 'NEW, CUSTOM',
      accentColor: 'from-red-500 to-rose-600',
      borderColor: 'border-red-500 shadow-red-950/50',
      glowColor: 'rgba(239, 68, 68, 0.5)',
      imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop',
      description: 'ギターの詳細説明を入力してください。',
      videos: [
        {
          id: 'v1',
          song: 'Sample Song',
          live: 'Live Performance',
          length: '04:00',
          youtubeUrl: 'https://www.youtube.com/watch?v=8tugqHunwDA',
        },
      ],
    };
    setEditingGuitar(newGuitar);
  };

  const handleSaveGuitar = (guitarToSave) => {
    setMansonGuitars((prev) => {
      const idx = prev.findIndex((g) => g.id === guitarToSave.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = guitarToSave;
        return updated;
      } else {
        return [...prev, guitarToSave];
      }
    });
    setEditingGuitar(null);
  };

  const handleDeleteGuitar = (id) => {
    if (mansonGuitars.length <= 1) {
      console.warn('最低1つのモデルを残す必要があります。');
      return;
    }
    setMansonGuitars((prev) => prev.filter((g) => g.id !== id));
  };

  const handleResetData = () => {
    const shuffled = [...initialMansonGuitars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setMansonGuitars(shuffled);
    try {
      localStorage.removeItem('muse_guitars_data');
    } catch (e) {}
    setSelectedTagFilter('ALL');
  };

  const handleCopyJSON = () => {
    const jsonStr = JSON.stringify(mansonGuitars, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const embedBaseUrl = getYouTubeEmbedUrl(selectedVideo?.youtubeUrl);

  return (
    <div className="min-h-screen bg-[#0d0608] text-red-200 font-rajdhani selection:bg-red-600 selection:text-white pb-12 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Orbitron:wght@600;800;900&family=Rajdhani:wght@500;600;700&display=swap');

        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-chakra { font-family: 'Chakra Petch', sans-serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }

        .wow-signal-glow {
          text-shadow: 0 0 12px rgba(239, 68, 68, 0.7), 0 0 24px rgba(225, 29, 72, 0.4);
        }

        .cyber-scroll::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .cyber-scroll::-webkit-scrollbar-track {
          background: #18090c;
          border-radius: 999px;
        }
        .cyber-scroll::-webkit-scrollbar-thumb {
          background: #5c0f16;
          border-radius: 999px;
        }
        .cyber-scroll::-webkit-scrollbar-thumb:hover {
          background: #ef4444;
        }
      `}</style>

      {/* Header */}
      <header className="p-6 md:p-10 border-b border-red-950/70 bg-[#120709]/90 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
        <div className="max-w-[1600px] mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/60 text-[11px] font-chakra text-red-400 mb-2 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            SIGNAL DETECTED // 6EQUJ5
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider font-orbitron wow-signal-glow bg-gradient-to-r from-red-500 via-rose-200 to-red-600 bg-clip-text text-transparent">
            MUSE GUITAR GALLERY
          </h1>
          <p className="text-red-400/90 font-chakra text-xs md:text-sm mt-1 tracking-wide">
            MATTHEW BELLAMY SIGNATURE CUSTOM MODELS & LIVE PERFORMANCES
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto">
        {/* Tag Filtering & Models Display */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold font-orbitron tracking-widest text-red-500 flex items-center gap-2 wow-signal-glow px-1">
              <span className="text-red-400">[01]</span> SELECT MODEL ({filteredGuitars.length})
            </h2>

            {/* Tag Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTagFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-chakra font-semibold transition-all ${
                  selectedTagFilter === 'ALL'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950'
                    : 'bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900/50'
                }`}
              >
                ALL ({mansonGuitars.length})
              </button>
              {allAvailableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTagFilter(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-chakra font-semibold transition-all ${
                    selectedTagFilter === tag
                      ? 'bg-red-600 text-white shadow-md shadow-red-950'
                      : 'bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Guitar Cards - Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-5 pb-4 cyber-scroll snap-x snap-mandatory">
            {filteredGuitars.map((guitar) => {
              const isSelected = selectedGuitar?.id === guitar.id;
              return (
                <div
                  key={guitar.id}
                  onClick={() => handleSelectGuitar(guitar)}
                  className={`cursor-pointer group relative bg-[#120709] border rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0 snap-start ${
                    isSelected
                      ? 'border-red-500 shadow-xl shadow-red-950/60 bg-[#19090c]'
                      : 'border-red-950 hover:border-red-800/80 hover:bg-[#15080b]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold font-orbitron text-red-100 tracking-wider group-hover:text-red-400 transition-colors">
                        {guitar.name}
                      </h3>
                      {guitar.tag && (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {guitar.tag.split(',').map((t, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded text-[10px] font-chakra font-bold bg-red-950/80 border border-red-800/60 text-red-300"
                            >
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/60 border border-red-950/60 p-2 flex items-center justify-center">
                      <img
                        src={guitar.imageUrl}
                        alt={guitar.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <p className="text-xs font-chakra text-red-300/80 leading-relaxed line-clamp-3">
                      {guitar.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-red-950/60 flex items-center justify-between text-xs font-chakra text-red-400/80">
                    <span>{guitar.videos?.length || 0} TRACKS AVAILABLE</span>
                    <span className={`font-bold transition-transform ${isSelected ? 'text-red-400 translate-x-1' : 'group-hover:translate-x-1'}`}>
                      VIEW DETAILS →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Video Playlist Section */}
        {selectedGuitar && selectedVideo && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-orbitron tracking-widest text-red-500 flex items-center gap-2 wow-signal-glow px-1">
              <span className="text-red-400">[02]</span> VIDEO ({selectedGuitar.videos?.length || 0} TRACKS)
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#120709] border border-red-950 rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="lg:col-span-8 rounded-xl overflow-hidden bg-black border border-red-950 aspect-video relative group flex flex-col justify-between">
                <iframe
                  key={embedBaseUrl}
                  src={`${embedBaseUrl}?autoplay=1&rel=0`}
                  title={`${selectedGuitar.name} - ${selectedVideo.song}`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>

                <div className="p-3 bg-red-950/90 border-t border-red-900/80 flex items-center justify-between text-xs font-chakra">
                  <span className="text-red-300">※動画が再生できない場合は直接YouTubeで開いてください</span>
                  <a
                    href={selectedVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded flex items-center gap-1 transition-colors"
                  >
                    Watch on YouTube ↗
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                  <span className="text-xs font-chakra text-red-400/80 uppercase tracking-wider block px-1">
                    PLAYLIST // {selectedGuitar.name}
                  </span>
                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto cyber-scroll pr-1">
                    {selectedGuitar.videos?.map((vid) => {
                      const isVidSelected = selectedVideo.id === vid.id;
                      return (
                        <button
                          key={vid.id}
                          onClick={() => setSelectedVideo(vid)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                            isVidSelected
                              ? 'bg-red-950/70 border-red-500/80 shadow-md shadow-red-950/50'
                              : 'bg-[#180a0d]/60 border-red-950/80 hover:bg-red-950/40 hover:border-red-900/60'
                          }`}
                        >
                          <div className="space-y-1 overflow-hidden pr-2">
                            <div className={`font-orbitron text-xs md:text-sm font-bold truncate ${isVidSelected ? 'text-red-200 wow-signal-glow' : 'text-red-300'}`}>
                              {vid.song}
                            </div>
                            <div className="font-chakra text-[11px] text-red-400/70 truncate">
                              {vid.live}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-[10px] font-mono text-red-400/60">{vid.length}</span>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isVidSelected ? 'bg-red-600 text-white' : 'bg-red-950 text-red-500 group-hover:bg-red-900'}`}>
                              <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-red-950/30 border border-red-950 text-[11px] font-chakra text-red-400/80 flex items-center justify-between">
                  <span>SIGNAL TRACKING ACTIVE</span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Admin Mode Toggle & Management Area (Bottom of Main Content) */}
        <section className="pt-8 border-t border-red-950/80 space-y-6">
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (!isManagerOpen && !isAdminAuthenticated) {
                  setAdminIdInput('');
                  setAdminPassInput('');
                  setAuthError('');
                }
                setIsManagerOpen(!isManagerOpen);
              }}
              className="px-5 py-2.5 bg-red-950/80 hover:bg-red-900/80 border border-red-600/80 text-red-200 text-xs font-chakra font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-950/50 hover:scale-105"
            >
              <span>⚙️</span>
              <span>{isManagerOpen ? 'CLOSE ADMIN MANAGER' : 'OPEN ADMIN MODE'}</span>
            </button>
          </div>

          {isManagerOpen && (
            <div className="bg-[#180a0d] border border-red-600/60 rounded-2xl p-6 space-y-6 shadow-2xl relative animate-fadeIn">
              {!isAdminAuthenticated ? (
                <div className="max-w-md mx-auto py-6 space-y-4 text-center">
                  <div className="inline-block p-3 rounded-full bg-red-950/80 border border-red-800 text-xl mb-1">🔒</div>
                  <h3 className="text-xl font-bold font-orbitron text-red-200">ADMIN AUTHENTICATION REQUIRED</h3>
                  <p className="text-xs font-chakra text-red-400">
                    管理モードにアクセスするには認証情報の入力が必要です。
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (adminIdInput === 'Admin' && adminPassInput === 'muse1984') {
                        setIsAdminAuthenticated(true);
                        setAuthError('');
                      } else {
                        setAuthError('IDまたはパスワードが正しくありません。');
                      }
                    }}
                    className="space-y-3 pt-2 text-left"
                  >
                    <div>
                      <label className="block text-xs font-chakra text-red-400 mb-1">ID</label>
                      <input
                        type="text"
                        value={adminIdInput}
                        onChange={(e) => setAdminIdInput(e.target.value)}
                        className="w-full bg-[#0b0304] border border-red-900 rounded p-2.5 text-red-200 text-xs font-chakra focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-chakra text-red-400 mb-1">PASSWORD</label>
                      <input
                        type="password"
                        value={adminPassInput}
                        onChange={(e) => setAdminPassInput(e.target.value)}
                        className="w-full bg-[#0b0304] border border-red-900 rounded p-2.5 text-red-200 text-xs font-chakra focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>

                    {authError && (
                      <div className="p-2.5 bg-red-950/80 border border-red-700 text-red-300 text-xs font-chakra rounded text-center">
                        {authError}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsManagerOpen(false)}
                        className="w-1/2 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded font-bold text-xs font-chakra"
                      >
                        キャンセル
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-xs font-chakra shadow-lg shadow-red-950"
                      >
                        ログイン
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-red-900/60 pb-4 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold font-orbitron text-red-200 flex items-center gap-2">
                          <span>⚙️</span> DATA MANAGEMENT PANEL
                        </h3>
                        <span className="text-[10px] bg-red-950 border border-red-600 text-red-300 px-2 py-0.5 rounded font-mono">AUTHENTICATED</span>
                      </div>
                      <p className="text-xs font-chakra text-red-400 mt-0.5">
                        ギターの追加、編集、削除や、JSONデータのエクスポートを行えます。
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleAddNewGuitar}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-chakra rounded-md transition-colors flex items-center gap-1"
                      >
                        <span>+</span> ギターを新規追加
                      </button>
                      <button
                        onClick={handleCopyJSON}
                        className="px-3 py-1.5 bg-red-950 hover:bg-red-900 border border-red-700 text-red-300 font-bold text-xs font-chakra rounded-md transition-colors"
                      >
                        {copySuccess ? '✓ JSONコピー完了!' : '📋 JSON出力（コピー）'}
                      </button>
                      <button
                        onClick={handleResetData}
                        className="px-3 py-1.5 bg-zinc-900 hover:bg-red-950 border border-zinc-700 text-zinc-400 hover:text-red-300 font-bold text-xs font-chakra rounded-md transition-colors"
                      >
                        🔄 初期化
                      </button>
                      <button
                        onClick={() => setIsAdminAuthenticated(false)}
                        className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-red-400 font-bold text-xs font-chakra rounded-md transition-colors"
                      >
                        ログアウト
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[350px] overflow-y-auto cyber-scroll pr-2">
                    {mansonGuitars.map((g) => (
                      <div
                        key={g.id}
                        className="p-3 bg-[#110507] border border-red-900/50 rounded-xl flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img src={g.imageUrl} alt={g.name} className="w-10 h-10 object-contain rounded bg-black/60 p-1 flex-shrink-0" />
                          <div className="truncate">
                            <div className="font-orbitron text-xs font-bold text-red-200 truncate">{g.name}</div>
                            <div className="text-[10px] font-chakra text-red-400/70 truncate">{g.tag}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => setEditingGuitar(g)}
                            className="p-1.5 text-xs bg-red-950 hover:bg-red-800 text-red-200 rounded border border-red-800/60"
                            title="編集"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteGuitar(g.id)}
                            className="p-1.5 text-xs bg-red-950 hover:bg-red-900 text-red-400 hover:text-red-200 rounded border border-red-800/60"
                            title="削除"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-red-950/70 bg-[#120709]/80 py-6 px-4 text-center">
        <div className="max-w-[1600px] mx-auto space-y-2">
          <p className="text-xs font-chakra text-red-400/80">
            当サイトで使用している画像、写真はサイト制作者に帰属します。
          </p>
          <p className="text-[10px] font-mono text-red-500/60 tracking-wider">
            © MUSE GUITAR GALLERY // ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>

      {/* ギター編集モーダル */}
      {editingGuitar && (
        <GuitarEditModal
          guitar={editingGuitar}
          onSave={handleSaveGuitar}
          onClose={() => setEditingGuitar(null)}
        />
      )}
    </div>
  );
}

function GuitarEditModal({ guitar, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...guitar });

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleVideoChange = (index, field, val) => {
    const updatedVideos = [...formData.videos];
    updatedVideos[index] = { ...updatedVideos[index], [field]: val };
    setFormData((prev) => ({ ...prev, videos: updatedVideos }));
  };

  const handleAddVideo = () => {
    const newVideo = {
      id: `v-${Date.now()}`,
      song: 'New Song',
      live: 'Live Performance',
      length: '04:00',
      youtubeUrl: '',
    };
    setFormData((prev) => ({ ...prev, videos: [...prev.videos, newVideo] }));
  };

  const handleRemoveVideo = (index) => {
    if (formData.videos.length <= 1) {
      console.warn('最低1個の動画登録が必要です。');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#16080b] border border-red-600/80 rounded-2xl w-full max-w-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto cyber-scroll my-auto shadow-2xl">
        <div className="flex items-center justify-between border-b border-red-900/60 pb-3">
          <h3 className="text-xl font-bold font-orbitron text-red-200">
            {guitar.id ? 'EDIT GUITAR MODEL' : 'ADD NEW GUITAR'}
          </h3>
          <button onClick={onClose} className="text-red-400 hover:text-white font-bold text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs font-chakra">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-red-400 mb-1">モデル名 (MODEL NAME)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="w-full bg-[#0b0304] border border-red-900 rounded p-2 text-red-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-red-400 mb-1">タグ（カンマ区切りで複数入力）</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => handleChange('tag', e.target.value)}
                placeholder="例: SUSTAINIAC, ORIGINAL, MIDI"
                className="w-full bg-[#0b0304] border border-red-900 rounded p-2 text-red-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-red-400 mb-1">画像URL (IMAGE URL)</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                required
                className="w-full bg-[#0b0304] border border-red-900 rounded p-2 text-red-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-red-400 mb-1">説明 (DESCRIPTION)</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full bg-[#0b0304] border border-red-900 rounded p-2 text-red-200 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="space-y-3 border-t border-red-950 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-300 font-orbitron">LIVE VIDEOS ({formData.videos.length})</span>
              <button
                type="button"
                onClick={handleAddVideo}
                className="px-2 py-1 bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 rounded text-[11px]"
              >
                + 動画を追加
              </button>
            </div>

            {formData.videos.map((vid, idx) => (
              <div key={vid.id || idx} className="p-3 bg-[#0c0305] border border-red-950 rounded-lg space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-red-400 font-mono">TRACK #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(idx)}
                    className="text-red-500 hover:text-red-300 text-[10px]"
                  >
                    削除
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="曲名 (Song)"
                    value={vid.song}
                    onChange={(e) => handleVideoChange(idx, 'song', e.target.value)}
                    required
                    className="bg-[#140608] border border-red-950 rounded p-1.5 text-red-200"
                  />
                  <input
                    type="text"
                    placeholder="演奏場所/イベント (Live)"
                    value={vid.live}
                    onChange={(e) => handleVideoChange(idx, 'live', e.target.value)}
                    className="bg-[#140608] border border-red-950 rounded p-1.5 text-red-200"
                  />
                  <input
                    type="text"
                    placeholder="長さ (Length)"
                    value={vid.length}
                    onChange={(e) => handleVideoChange(idx, 'length', e.target.value)}
                    className="bg-[#140608] border border-red-950 rounded p-1.5 text-red-200"
                  />
                </div>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  value={vid.youtubeUrl}
                  onChange={(e) => handleVideoChange(idx, 'youtubeUrl', e.target.value)}
                  required
                  className="w-full bg-[#140608] border border-red-950 rounded p-1.5 text-red-200"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-red-900/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded font-bold"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold"
            >
              保存する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}