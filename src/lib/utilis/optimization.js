import * as XLSX from "xlsx";

export const handleFileChange = (e, setExperimentalData) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const binaryData = event.target.result;
    const workbook = XLSX.read(binaryData, { type: "binary" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const jsonData = { t: [], x: [], s: [], p: [] };
    data.slice(1).forEach((row) => {
      jsonData.t.push(row[0]);
      jsonData.x.push(row[1]);
      jsonData.p.push(row[2]);
      jsonData.s.push(row[3]);
    });

    // jsonData
    setExperimentalData(jsonData);

    localStorage.setItem("experimentalData", JSON.stringify(jsonData));
  };
  reader.readAsBinaryString(file);
};
