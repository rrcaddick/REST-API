import { NamingStrategyInterface, DefaultNamingStrategy, Table } from "typeorm";

export class NamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  // PK__<table_name>__id
  primaryKeyName(tableOrName: Table | string): string {
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `PK__${tableName.toLowerCase()}__id`;
  }

  // FK__<current_table>__<referenced_table>__<join_column_names>
  foreignKeyName(tableOrName: Table | string, columnNames: string[], referencedTablePath?: string): string {
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const refTableName = referencedTablePath ? referencedTablePath.split(".").pop() : "";
    const joinColumnName = columnNames.join("__").toLowerCase();
    return `FK__${tableName.toLowerCase()}__${refTableName}__${joinColumnName}`;
  }

  relationConstraintName(tableOrName: Table | string, columnNames: string[], referencedTablePath?: string): string {
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const refTableName = referencedTablePath ? referencedTablePath.split(".").pop() : "";
    const joinColumnName = columnNames.join("").toLowerCase();
    return `REL__${tableName.toLowerCase()}__${refTableName}__${joinColumnName}`;
  }

  // IDX__<table_name>__<column_names>
  indexName(tableOrName: Table | string, columnNames: string[]): string {
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `IDX__${tableName.toLowerCase()}__${columnNames.join("__").toLowerCase()}`;
  }
}
