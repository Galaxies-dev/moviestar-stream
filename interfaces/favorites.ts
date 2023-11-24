import { MediaType } from '@/interfaces/apiresults';

export type Favorite = {
  id: string;
  mediaType: MediaType;
  name: string;
  thumb: string;
};
