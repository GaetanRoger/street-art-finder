import {Control, ControlPosition, Map} from 'leaflet';

export interface LeafletButton {
  icon: string;
  title: string;
  onClick: (c: Control.EasyButton, m: Map) => void;
  position?: ControlPosition;
}
