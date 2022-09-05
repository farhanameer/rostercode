export interface ICountry {
    country_id: number;
    country: string;
}

export interface IState {
    id: number;
    value: string;
}

export interface ICity {
    id: number;
    country_id: number;
    city_name: string;
}