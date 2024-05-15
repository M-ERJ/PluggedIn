"use client";
import useSWR from "swr";
import fetchSongs from "@/utils/fetchSongs";
import { useState, useEffect } from "react";
import { Database } from "@/types_db";
import Image from "next/image";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const SongList = () => {
  const { data: songList, error } = useSWR<Song[] | undefined>(
    "songs",
    fetchSongs,
  );

  if (error) return <div>Failed to load song list</div>;

  if (!songList)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div>
      {songList?.map((song, index) => (
        <div key={index} className="flex">
          <Image
            src={
              `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}` ||
              ""
            }
            alt={song.title || ""}
            width={200}
            height={200}
          />
          <div className="flex flex-col">
            <p>{song.title}</p>
            <p>{song.author}</p>
            <button>Play</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
