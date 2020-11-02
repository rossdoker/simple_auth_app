import { Router } from 'express';

export interface IRoutesArrayItem { type: 'public' | 'private' | 'admin'; router: Router; prefix: string; };
export type IRoutesArray = IRoutesArrayItem[];