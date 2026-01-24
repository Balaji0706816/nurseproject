export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
  }
  
  export enum AppView {
    HERO = 'HERO',
    LOGIN = 'LOGIN',
    DASHBOARD = 'DASHBOARD'
  }