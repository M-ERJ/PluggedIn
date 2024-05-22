"use client";
import { useEffect } from "react";
import { Database } from "@/types_db";
import Image from "next/image";
import useCurrentSong from "@/stores/useCurrentSong";
import { FaHeartCircleCheck, FaHeartCircleXmark } from "react-icons/fa6";
import { useSongs } from "@/hooks/useSongs";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const DiscoverList = () => {
  const { songs: songList, error, isLoading } = useSongs();
  const { currentSong, setCurrentSong } = useCurrentSong();

  const handlePlay = async (song: Song) => {
    await fetch("/api/current-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song }),
    });
    setCurrentSong(song);
  };

  const playRandomSong = () => {
    if (songList && songList.length > 0) {
      const randomNum = Math.floor(Math.random() * songList.length);
      handlePlay(songList[randomNum]);
    }
  };

  useEffect(() => {
    if (songList && songList.length > 0) {
      playRandomSong();
    }
  }, [songList]);

  if (error) return <div>Failed to load song list</div>;

  if (isLoading && !currentSong)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth h-[100vh] w-full p-4 snap-y snap-mandatory">
      <div className="relative flex flex-col items-center p-8 w-full max-w-2xl h-[600px] mb-4 snap-start border border-gray-300 rounded-lg shadow-lg">
        <div className="absolute top-4 left-4 text-left">
          <h2 className="font-bold text-2xl">{currentSong?.title}</h2>
          <p className="text-lg">{currentSong?.author}</p>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          {currentSong?.image_path && (
            <div className="flex justify-center items-center w-[300px] h-[300px]">
              <Image
                src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${currentSong.image_path}`}
                alt={currentSong.title || "Current Song"}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 space-x-8">
        <button onClick={playRandomSong}>
          <FaHeartCircleXmark className="text-7xl text-white p-2 hover:bg-slate-50 transition-colors rounded-full hover:text-rose-400" />
        </button>
        <button onClick={playRandomSong}>
          <FaHeartCircleCheck className="text-7xl text-green-400 p-2 hover:bg-slate-50 transition-colors rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default DiscoverList;
