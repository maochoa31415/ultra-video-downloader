export interface Format {
  format_id: string;
  format_note: string;
  ext: string;
  acodec: string;
  vcodec: string;
  url: string;
  width: number;
  height: number;
  fps: number;
  audio_ext: string;
  video_ext: string;
  resolution: string;
  aspect_ratio: number;
  filesize?: number | string;
}
