export default interface IAd {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: Array<string>;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  gameId?: string;
  createdAt?: string;
}