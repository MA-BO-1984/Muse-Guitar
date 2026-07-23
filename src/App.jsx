import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, PlayCircle, Info, Youtube, Tag } from 'lucide-react';

const initialMansonGuitars = [
  {
    "id": "guitar-1784699177190",
    "name": "M1D1 Stealth",
    "tag": "Sustainer,XY MIDI Pad",
    "accentColor": "from-red-500 to-rose-600",
    "borderColor": "border-red-500 shadow-red-950/50",
    "glowColor": "rgba(239, 68, 68, 0.5)",
    "imageUrl": "https://drive.google.com/file/d/1sSznbQSRiQEN2cFC9Sak7HO9NhUfwxyu/view?usp=sharing",
    "description": "2015年から現在まで何度かのパーツのマイナーチェンジを経てKAOSS PADを使う曲、主にSupermassive Black Holeをプレイする際に利用している。ギターのパッド自体はあくまでコントローラーであり、音の出力や音色は、接続先であるKAOSS PADから出力されている。",
    "videos": [
      {
        "id": "v1",
        "song": "Supermassive Black Hole",
        "live": "Live Performance",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=JbTAJwgPV4g"
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
    "imageUrl": "https://drive.google.com/file/d/19IGnfV077OlOX4dZ1gi9gGsgGV9Dx4pP/view?usp=sharing",
    "description": "初めてファンフレット仕様（フレットを扇状（斜め）に配置し、低音弦側を長く、高音弦側を短く設計）が施されたギター。これにより、太い低音弦のピッチ（音程）が安定し、たるみやビビリを防ぎ、低音弦のダウンチューニングの最適化が期待できる。　アルバム\"Will Of The People\"で特に利用され、Won't Stand Down,Kill Or Be Killed等のダウンチューニングかつヘビィな曲で利用された。",
    "videos": [
      {
        "id": "v1",
        "song": "Kill Or Be Killed",
        "live": "MV",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=GgyQufB1Yic"
      },
      {
        "id": "v-1784767059688",
        "song": "Won't Stand Down",
        "live": "Live Performance",
        "youtubeUrl": "https://www.youtube.com/watch?v=UjXa7So10Yo"
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
    "imageUrl": "https://drive.google.com/file/d/11bbp9xioV23_fq8rEAnMR7h_rvUxKM05/view?usp=sharing",
    "description": "Manson製Stratocasterシャイプのシグネチャーモデル。名前の通りWill Of The People収録のVeronaの演奏用に用いられる。特徴的なのはピックアップガードが金属製になっており、ジェフバックリーが生前利用していたテレキャスターも同一で、この仕様により通常のギターより金属感ある煌びやかな音が出るという事を継承させる為に備えたと思われる。",
    "videos": [
      {
        "id": "v1",
        "song": "Verona",
        "live": "MV",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=NN1OtIJu_Bk"
      },
      {
        "id": "v-1784734547035",
        "song": "Verona",
        "live": "Live Performance",
        "youtubeUrl": "https://www.youtube.com/watch?v=HnkXWqbuQvc"
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
    "imageUrl": "https://drive.google.com/file/d/1xfSQHx_hP5cDIq0p_OfNxpUW96EoI-6t/view?usp=sharing",
    "description": "2017年のフェスツアーから利用開始。サスティナーとフロイドローズが備わっている事から、それ以外の特殊なデバイスを用いた楽曲以外は本機で再現できる事から近年一番利用頻度が高いギターである。Yes/Noスイッチがついているが、キルスイッチの挙動を反転させる切り替えスイッチとなっている。",
    "videos": [
      {
        "id": "v1",
        "song": "WE ARE FUCKING FUCKED",
        "live": "Live Performance",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=ac4E_UsmB1g"
      },
      {
        "id": "v-1784734752271",
        "song": "EUPHORIA",
        "live": "Live Performance",
        "youtubeUrl": "https://www.youtube.com/watch?v=zHNWEfES6XI"
      }
    ]
  },
  {
    "id": "delorean",
    "name": "Oryx 8-String Midnight Purple",
    "tag": "8-String",
    "accentColor": "from-rose-500 to-red-600",
    "borderColor": "border-rose-500 shadow-rose-950/50",
    "glowColor": "rgba(244, 63, 94, 0.5)",
    "imageUrl": "https://drive.google.com/file/d/1Rr4RtsL1lKkAk8afdOwWINIgPRFrE_Op/view?usp=sharing",
    "description": "2025年6月11日にリリースされたシングル\"UNRAVELLING\"にて初使用。　サポートメンバーであるダン ランカスターとの会話の中で8弦ギターの利用を思いつき、UNRAVELLINGのリフが閃いたとの事。",
    "videos": [
      {
        "id": "2",
        "song": "Unravelling",
        "live": "MV",
        "length": "04:20",
        "youtubeUrl": "https://www.youtube.com/watch?v=jXmUJvNSSm0"
      },
      {
        "id": "3",
        "song": "Unravelling",
        "live": "Live Performance",
        "length": "03:50",
        "youtubeUrl": "https://www.youtube.com/watch?v=-66qG84KR2M"
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
    "imageUrl": "https://drive.google.com/file/d/1LvixnuycCXlIGzGapLkI8y0HEDOJOzq-/view?usp=drive_link",
    "description": "2012年(The 2nd Law)から利用され、サスティナー(磁力と電力で弦振動を永続させる装置)を備えたスタンダードなモデル。\n利用頻度が高く大量生産されており、ギター破壊パフォーマンスにも用いられこれまで何十台も破壊されてきた。\n時期によって、ピックアップ、ブリッジ、ペグ等パーツ類が変更されている。",
    "videos": [
      {
        "id": "1",
        "song": "Psycho",
        "live": "Live Performance",
        "length": "04:15",
        "youtubeUrl": "https://youtu.be/bQJqrxIVKAI?si=JyVg78_aNPLZ4JoG"
      },
      {
        "id": "2",
        "song": "Reapers",
        "live": "Live Performance",
        "length": "06:30",
        "youtubeUrl": "https://www.youtube.com/watch?v=XHH4XWAD9pw"
      },
      {
        "id": "3",
        "song": "Uprising",
        "live": "Live Performance",
        "length": "04:00",
        "youtubeUrl": "https://www.youtube.com/watch?v=zO7k53pXw-o&t=105s"
      }
    ]
  },
  {
    "id": "guitar-1784767930339",
    "name": "MB-1 Blue",
    "tag": "Sustainer",
    "accentColor": "from-blue-500 to-cyan-600",
    "borderColor": "border-blue-500 shadow-blue-950/50",
    "glowColor": "rgba(59, 130, 246, 0.5)",
    "imageUrl": "https://drive.google.com/file/d/1gKvehFwLTlRja4SSRqcjHsgU6J9REsnq/view?usp=sharing",
    "description": "2023年のWOTPツアーから利用。サスティナーのみ装備し、MUSEの中でスタンダードな仕様となる1本。本ツアーのTime is Running Out、Madness、Resistance等で利用された。\nRock Werchter 2023にて機材トラブルでKnights Of Cydoniaが演奏できなくなり、代わりにサプライズで披露したShowbiz演奏後に破壊された。",
    "videos": [
      {
        "id": "v1",
        "song": "Resistance",
        "live": "Live Performance",
        "youtubeUrl": "https://youtube.com/shorts/pMVzQQKzkjc?si=AoIA9UHb4xO7T_Kj"
      },
      {
        "id": "v-1784768721668",
        "song": "Showbiz",
        "live": "Live Performance",
        "youtubeUrl": "https://www.youtube.com/watch?v=haSZt4N2UJ8"
      }
    ]
  }
];

export default function App() {
  const [guitars, setGuitars] = useState(initialMansonGuitars);
  const [selectedGuitar, setSelectedGuitar] = useState(initialMansonGuitars[0]);
  const [selectedVideo, setSelectedVideo] = useState(initialMansonGuitars[0]?.videos?.[0] || null);

  // Sync state if initial data changes
  useEffect(() => {
    setGuitars(initialMansonGuitars);
    setSelectedGuitar(initialMansonGuitars[0]);
    setSelectedVideo(initialMansonGuitars[0]?.videos?.[0] || null);
  }, []);

  const getDriveImageUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/d\/(.+?)\//);
      if (match && match[1]) {
        // Appending =s1600 ensures high resolution for expanding
        return `https://drive.google.com/uc?id=${match[1]}&export=download=s1600`;
      }
    }
    return url;
  };

  const getYoutubeId = (url) => {
    if (!url) return null;
    // Extract ID from shorts url
    if (url.includes('/shorts/')) {
      const match = url.match(/\/shorts\/([^?&#]+)/);
      return match ? match[1] : null;
    }
    // Extract ID from standard urls
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(guitars, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    
    // Get YYYY-MM-DD
    const date = new Date().toISOString().split('T')[0];
    link.download = `muse_guitars_data_${date}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    if (window.confirm('データを初期状態にリセットしますか？')) {
      setGuitars(initialMansonGuitars);
      setSelectedGuitar(initialMansonGuitars[0]);
      setSelectedVideo(initialMansonGuitars[0]?.videos?.[0] || null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-rose-500/30">
      
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center font-bold text-white shadow-lg shadow-rose-500/20">
              M
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white">Muse Guitar Gallery</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {}
        <div className="lg:col-span-4 space-y-4 max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
          {guitars.map(guitar => {
            const isSelected = selectedGuitar.id === guitar.id;
            const tags = guitar.tag ? guitar.tag.split(',') : [];

            return (
              <button
                key={guitar.id}
                onClick={() => {
                  setSelectedGuitar(guitar);
                  setSelectedVideo(guitar.videos?.[0] || null);
                }}
                className={`w-full text-left rounded-xl transition-all duration-300 overflow-hidden border ${
                  isSelected
                    ? `border-rose-500 bg-neutral-900/80 shadow-[0_0_15px_rgba(244,63,94,0.15)]`
                    : `border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800 hover:border-neutral-700`
                }`}
              >
                <div className="flex items-start p-3 gap-4">
                  
                  {/* Aspect Ratio 3/4 with object-cover */}
                  <div className="w-24 shrink-0 rounded-lg overflow-hidden bg-neutral-950 aspect-[3/4] border border-neutral-800">
                    <img
                      src={getDriveImageUrl(guitar.imageUrl)}
                      alt={guitar.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Info: Tag is moved below the name */}
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-bold text-lg text-neutral-100 truncate">{guitar.name}</h3>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] uppercase tracking-wider bg-neutral-800 text-neutral-400 px-2 py-1 rounded-md border border-neutral-700/50">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Active Indicator positioned at top-right of the card */}
                  {isSelected && (
                    <div className="shrink-0 pt-1">
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
                        ACTIVE
                      </span>
                    </div>
                  )}

                </div>
              </button>
            );
          })}
        </div>

        {}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {selectedGuitar ? (
            <>
              {/* Top Detail Card */}
              <div className={`rounded-2xl border ${selectedGuitar.borderColor} bg-neutral-900 overflow-hidden shadow-2xl transition-all duration-500`}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  
                  {/* Big Image: aspect 3/4 & object-cover */}
                  <div className="bg-neutral-950 flex items-center justify-center p-6 md:p-8 aspect-[3/4]">
                     <div className="relative w-full h-full">
                        {/* Glow effect */}
                        <div 
                           className="absolute inset-0 blur-3xl opacity-20 scale-90 rounded-full"
                           style={{ backgroundColor: selectedGuitar.glowColor }}
                        />
                        <img
                          src={getDriveImageUrl(selectedGuitar.imageUrl)}
                          alt={selectedGuitar.name}
                          className="relative z-10 w-full h-full object-cover rounded-lg shadow-xl"
                        />
                     </div>
                  </div>

                  {/* Description Info */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-rose-500 mb-2">
                      <Tag size={16} />
                      <span className="text-sm font-semibold tracking-wider uppercase">
                        {selectedGuitar.tag.split(',').join(' • ')}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
                      {selectedGuitar.name}
                    </h2>
                    
                    <div className="space-y-4 text-neutral-300 leading-relaxed whitespace-pre-wrap">
                      <div className="flex gap-3 items-start">
                        <Info size={20} className="text-neutral-500 shrink-0 mt-1" />
                        <p>{selectedGuitar.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Youtube className="text-rose-500" size={24} />
                  <h3 className="text-xl font-bold text-white">Live Performances</h3>
                </div>
                
                {selectedGuitar.videos && selectedGuitar.videos.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Video Player */}
                    <div className="lg:col-span-2 rounded-xl overflow-hidden bg-black aspect-video border border-neutral-800 shadow-xl">
                      {selectedVideo ? (
                        <iframe
                          className="w-full h-full"
                          // autoplay=0 added here to prevent auto-playing
                          src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo.youtubeUrl)}?autoplay=0&rel=0`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600">
                          Select a video to play
                        </div>
                      )}
                    </div>

                    {/* Video List */}
                    <div className="space-y-2">
                      {selectedGuitar.videos.map((video) => (
                        <button
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors border text-left ${
                            selectedVideo?.id === video.id
                              ? 'bg-rose-500/10 border-rose-500/30 text-white'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                          }`}
                        >
                          <PlayCircle size={20} className={selectedVideo?.id === video.id ? 'text-rose-500 shrink-0' : 'text-neutral-500 shrink-0'} />
                          <div className="min-w-0">
                            <div className="font-semibold truncate">{video.song}</div>
                            <div className="text-xs opacity-70 flex gap-2">
                              <span>{video.live}</span>
                              {video.length && <span>• {video.length}</span>}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-neutral-500">
                    No videos available for this guitar.
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-neutral-500">
              Select a guitar from the list
            </div>
          )}
          
          {}
          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap gap-4">
            <button
              onClick={resetData}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600 transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} />
              初期化 (Reset)
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors text-sm font-medium shadow-lg shadow-rose-900/50"
            >
              <Download size={16} />
              JSONファイル保存 (Save)
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}