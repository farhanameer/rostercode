export interface IBranch {
  loc_id: number;
  loc_desc: string;
}

export interface IBuilding {
  id?: number;
  building_number: number;
  branch_id: number;
}

export interface IFloor {
  id?: number;
  floor_number: number;
  building_id: number;
}

export interface IBox {
    id?: number;
    box_number: number;
    floor_id: number;
}

export interface ICabinet {
    id?: number;
    cabinet_number: number;
    box_id: number;
}

export interface IDrawer {
  id?: number;
  drawer_number: number;
  cabinet_id: string;
}

export interface IFlap {
  id?: number;
  flap_number: number;
  cabinet_id: string;
}
