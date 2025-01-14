export const LOGIN_USER = `/auth/login`;
export const REGISTER_USER = `/auth/register`;
export const LOGOUT_USER = `/auth/logout`;
export const GET_ALL_USERS = `/users/list`;
export const GET_PROFILE_USER = `/users/profile`;
export const GET_ROOMS = `/rooms/lists`;
export const CREATE_ROOMS = `/rooms/create`;
export const GET_ROOM_MESSAGES = (room : string) => `/messages/${room}`
