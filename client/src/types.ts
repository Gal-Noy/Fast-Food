export interface StartGameRequest {
  username: string;
}

export interface SubmitScoreRequest {
  username: string;
}

export interface UserData {
  name: string;
  email: string;
  location: string;
  phone: string;
  picture: string;
}

export interface User {
  username: string;
  score: number;
  gender: string;
  data?: UserData;
}

export enum IndicatorMode {
  Left = "left",
  Right = "right",
  Hidden = "hidden",
}
