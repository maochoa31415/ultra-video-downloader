import type { Format } from './Format'
import type { Thumbnail } from './Thumbnail'

export interface VideoInfo {
  formats: Array<Format>;
  thumbnails: Array<Thumbnail> | string;
  thumbnail: string;
  title: string;
  upload_date: string;
  filename: string;
  description: string;
  duration_string: number | string;
}
