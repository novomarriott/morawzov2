import { useState } from "react";

const images = [
  { before: "https://i.imgur.com/3c3iJgF.jpeg", after: "https://i.imgur.com/4Un5icV.jpeg" },
  { before: "https://i.imgur.com/uJzkG4s.jpeg", after: "https://i.imgur.com/yHs3KZP.jpeg" },
  { before: "https://i.imgur.com/YE9clsp.jpeg", after: "https://i.imgur.com/IfbHE0p.jpeg" },
  { before: "https://i.imgur.com/DaCqYK8.jpeg", after: "https://i.imgur.com/Roi0QTQ.jpeg" }
];

export default function Portfolio() {
  const [fullscreenIndex, setFullscreenIndex] = useState(null);

  return (
    <div className="p-6 min-h-screen text-white text-center bg-gradient-to-b from-gray-800 to-black relative">
      <h1 className="text-3xl font-bold mb-2">ПОРТФОЛИО</h1>
      <p className="text-gray-500 text-sm mb-6">ретушь</p>
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        {images.map((img, index) => (
          <ImageToggle key={index} before={img.before} after={img.after} onFullscreen={() => setFullscreenIndex(index)} />
        ))}
      </div>
      {fullscreenIndex !== null && (
        <FullscreenView
          image={images[fullscreenIndex]}
          onClose={() => setFullscreenIndex(null)}
          onNext={() => setFullscreenIndex((fullscreenIndex + 1) % images.length)}
          onPrev={() => setFullscreenIndex((fullscreenIndex - 1 + images.length) % images.length)}
        />
      )}
    </div>
  );
}

function ImageToggle({ before, after, onFullscreen }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="relative w-full aspect-[4/5] border-2 border-gray-700 rounded-lg overflow-hidden cursor-pointer" onClick={() => setShowAfter(!showAfter)}>
      <img src={showAfter ? after : before} alt="Before/After" className="w-full h-full object-cover transition-all duration-300" />
      <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-3 py-1 text-sm rounded">{showAfter ? "После" : "До"}</p>
      <button onClick={(e) => { e.stopPropagation(); onFullscreen(); }} className="absolute top-2 right-2 bg-gray-700 bg-opacity-70 text-white px-3 py-1 text-sm rounded">⛶</button>
    </div>
  );
}

function FullscreenView({ image, onClose, onNext, onPrev }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <button className="absolute top-4 right-4 text-white text-3xl" onClick={onClose}>×</button>
      <button className="absolute left-4 text-white text-3xl" onClick={onPrev}>❮</button>
      <button className="absolute right-4 text-white text-3xl" onClick={onNext}>❯</button>
      <div className="relative max-w-full max-h-full cursor-pointer" onClick={() => setShowAfter(!showAfter)}>
        <img src={showAfter ? image.after : image.before} alt="Before/After" className="max-w-full max-h-full object-contain" />
        <p className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 text-sm rounded text-white">{showAfter ? "После" : "До"}</p>
      </div>
    </div>
  );
}
