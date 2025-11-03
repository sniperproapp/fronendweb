import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

// Define el tipo de archivo para Excel
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

// Definición de tipos para el JSON
interface Referrer {
  name: string;
  email: string;
 referrals:Referrals[]
}

interface Referrals{
  estado:number
  monto:number
}

interface User {
  name: string;
  email: string;
  id:number
  referrerId: number;
  referrer: Referrer;
  phone:string
}

interface Transaccion {
  total: number;
  n_transaccion: string;
  status: string;
  created_at: string;

  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  /**
   * Procesa y exporta la matriz de transacciones a un archivo Excel.
   * @param json Matriz de transacciones a exportar.
   * @param excelFileName Nombre del archivo final.
   */
  public exportAsExcelFile(json: Transaccion[], excelFileName: string): void {
    
    // 1. Mapear y aplanar el JSON
    const dataToExport = this.mapJsonToExportableArray(json);

    // 2. Crear la hoja de cálculo
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    
    // 3. Crear el libro y escribir el archivo
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // 4. Guardar el archivo usando FileSaver
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
  // Función de mapeo y aplanamiento
  private mapJsonToExportableArray(data: Transaccion[]): any[] {


    console.log(data)
    return data.map(t => ({
      'Total': t.total,
      'Nro. Transacción': t.n_transaccion,
      'Estado': t.status,
      'Fecha Creación': new Date(t.created_at).toLocaleDateString(),
      // Datos del Usuario Comprador
      'Usuario Comprador': t.user.name,
      'Email Comprador': t.user.email,
      // Datos del Referente
      'telefono': t.user.phone,
      'Nombre Referente': t.user.referrer.name,
      'Email Referente': t.user.referrer.email,
      'comision': t.user.referrer.referrals.find((p:any) => p.referredUserId ===t.user.id)?.monto,
       'estado': t.user.referrer.referrals.find((p:any) => p.referredUserId ===t.user.id)?.estado==1?"pagado":"no pagado",
    }));
  }

  // Función privada para guardar el buffer
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}