import * as XLSX from "xlsx";

export const handleMCFileChange = (e, setMCData) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const binaryData = event.target.result;
    const workbook = XLSX.read(binaryData, { type: "binary" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = data[0]; // Assuming headers are in the first row
    const jsonData = {};

    // Initialize arrays for each column based on the header names
    headers.forEach((header) => {
      jsonData[header] = [];
    });

    data.slice(1).forEach((row) => {
      row.forEach((value, index) => {
        const header = headers[index];
        if (header) {
          // Ignore columns beyond the headers
          jsonData[header].push(value);
        }
      });
    });

    const columnNames = Object.keys(jsonData);

    setMCData({
      experimentalMCData: jsonData,
      xAxisVar: columnNames[0],
      yAxisVar: columnNames[1],
      zAxisVar: columnNames[2],
    });

    localStorage.setItem("experimentalMCData", JSON.stringify(jsonData));
  };
  reader.readAsBinaryString(file);
};
