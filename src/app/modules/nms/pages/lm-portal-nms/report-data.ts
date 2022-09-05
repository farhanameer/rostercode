export class ReportData {
  static reporting = {
    reportingLevel: [
      { id: 'directReporting', name: "Direct Reporting" },
      { id: '2level', name: "2nd Level" },
      { id: 'AllReporting', name: "All Reporting" },
    ],
    reportingDepartment: [
      { id: 'mainDepartment', name: "Main department" },
      { id: 'subDepartment', name: "Sub departments" },
      { id: 'AllDepartment', name: "All (Department & Sub departments)" },
    ],
  };
}
