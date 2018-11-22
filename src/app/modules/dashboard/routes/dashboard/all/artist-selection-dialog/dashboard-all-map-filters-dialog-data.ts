import {ArtistPreview} from '../../../../../shared/types/artist';

export interface DashboardAllMapFiltersDialogData {
  artists: ArtistPreview[];
  onlyNotFound: boolean;
  selectedArtistId: string;
}
