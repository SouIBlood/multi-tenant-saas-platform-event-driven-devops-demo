export interface AppConfig {
  name: string;
  env: 'development' | 'production';
  port: number;
  apiPrefix: string;
}
