import { Component } from 'vue';

declare module 'vue' {
  export interface GlobalComponents {
    [key: string]: Component<any, any, any>;
  }
}
