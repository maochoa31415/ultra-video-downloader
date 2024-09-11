export type Audio = 'audio';
export type Video = 'video';
export type Full = 'full';
export enum FilterTypes {
  Audio = 'audio',
  Video = 'video',
  Full = 'full',
  None = 'none',
}
export type FilterType = Video | Audio | Full | null;
