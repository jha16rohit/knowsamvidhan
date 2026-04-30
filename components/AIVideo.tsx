"use client";

export default function AIVideo() {
  return (
    <div className="
      fixed bottom-5 right-5 z-50
      w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
      rounded-full overflow-hidden
      shadow-[0_10px_30px_rgba(0,0,0,0.25)]
      border border-[#cbb896]
      bg-black
      flex items-center justify-center
    ">
      
      {/* VIDEO */}
      <video
        src="/ai-avatar.mp4"   // 👈 put your video in public folder
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

    </div>
  );
}