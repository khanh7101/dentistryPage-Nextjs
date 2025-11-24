/**
 * Type definitions for services
 */

export interface ServiceOption {
  key: string;
  label: string;
}

export interface TableRow {
  col1: string;
  col2: string;
  col3: string;
}

export interface TableData {
  header: [string, string, string];
  rows: TableRow[];
}

