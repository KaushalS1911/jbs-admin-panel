import { createAction } from '@reduxjs/toolkit';

export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';
export const LOGIN_SUCCESS = '@user/LOGIN_SUCCESS';

export const loginSuccess = createAction(LOGIN_SUCCESS);
export const setMenu = createAction(SET_MENU);