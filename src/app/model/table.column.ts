export interface TableColumn {
    header: string;
    field: string;
    dataType: string;
    displayHeader?: (column: TableColumn) => string;
}
