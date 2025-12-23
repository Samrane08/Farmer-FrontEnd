import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToExcel = (data: any[], fileName: string, Heading: any) => {
  //Had to create a new workbook and then add the header
  const wb = XLSX.utils.book_new();
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, Heading);

  //Starting in the second row to avoid overriding and skipping headers
  XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const excelToJson = async (file: any) => {
  try {
    const filea = file;
    const data = await filea.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    return jsonData;
  } catch (error) {
    return error;
  }
};

export const exportToPDF = (
  data: any[],
  fileName: string,
  Headers: string[][]
) => {
  if (!data || data.length === 0 || !Headers || Headers.length === 0) {
    console.warn('Missing data or headers');
    return;
  }
  const doc = new jsPDF('landscape', 'pt', 'a3'); // More width
  //doc.setFontSize(14);
  //doc.text(fileName, 40, 30);

  // Extract keys from the first object for value mapping
  const dataKeys = Object.keys(data[0]);

  // Prepare rows based on headers
  const rows = data.map((row) =>
    dataKeys.map((key) => row[key] ?? 'N/A')
  );

  // Auto-column styles with max width
  const columnStyles: Record<number, any> = {};
  Headers[0].forEach((_, index) => {
    columnStyles[index] = {
      cellWidth: 90, // Prevent overlap
    };
  });

  autoTable(doc, {
    startY: 50,
    head: Headers,
    body: rows,
    styles: {
      fontSize: 9,
      cellPadding: 4,
      overflow: 'linebreak',
      valign: 'top',
      textColor: 20,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    columnStyles,
    theme: 'grid',
  });
  //debugger;
  doc.save(`${fileName}.pdf`);
};