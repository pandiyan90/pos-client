export class ApiResponse<T> {
    payload: T;
    totalRecords: number;
    totalPages: number;
    filteredRecords: number;
    pageSize: number;
    pageNumber: number;
  
    constructor(
      payload: T,
      totalRecords: number,
      totalPages: number,
      filteredRecords: number,
      pageSize: number,
      pageNumber: number
    ) {
      this.payload = payload;
      this.totalRecords = totalRecords;
      this.totalPages = totalPages;
      this.filteredRecords = filteredRecords;
      this.pageSize = pageSize;
      this.pageNumber = pageNumber;
    }
  }
  