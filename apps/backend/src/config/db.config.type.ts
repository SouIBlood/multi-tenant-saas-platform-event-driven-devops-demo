export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema: string;
  logging: boolean;
  ssl?: boolean;
  ca?: string;
}
