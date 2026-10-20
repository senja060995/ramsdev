import { Fragment } from "react";

/**
 * Memecah teks menjadi <span> per kata untuk efek "word-light" saat scroll
 * (lihat WordLightObserver). Elemen pembungkus wajib diberi atribut `data-words`.
 */
export default function Words({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">{w}</span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
