import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FileUploadService } from "../../../services/file-upload/file-upload.service";

@Component({
  selector: "document-viewer-modal",
  templateUrl: "document-viewer-modal.html",
  encapsulation: ViewEncapsulation.None,
})
export class DocumentViewerModal {
  viewer: string = "";
  documentsList = [];
  currentDocument = {};
  currentIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DocumentViewerModal>,
    private fileUploadService: FileUploadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentDocument["title"] = data.currentDocument.category_field_name;
    this.currentDocument["fileUrl"] = data.currentDocument.file_url;
    this.currentDocument["fileFormat"] = data.currentDocument.file_format;
    this.currentDocument["id"] = data.currentDocument.id;
    this.documentsList = data.documentsList;
    console.log(this.documentsList);

    this.currentIndex = this.documentsList.findIndex(
      (value) => this.currentDocument["id"] == value.id
    );
    this.checkformat();
  }
  checkformat() {
    if (
      this.currentDocument["fileFormat"].toLowerCase() == "png" ||
      this.currentDocument["fileFormat"].toLowerCase() == "jpeg" ||
      this.currentDocument["fileFormat"].toLowerCase() == "jpg"
    ) {
      this.viewer = "image";
    } else if (
      this.currentDocument["fileFormat"] == "doc" ||
      this.currentDocument["fileFormat"] == "docs" ||
      this.currentDocument["fileFormat"] == "docx"
    ) {
      this.viewer = "google";
    } else if (this.currentDocument["fileFormat"] == "pdf") this.viewer = "pdf";
  }

  close(): void {
    this.dialogRef.close();
  }

  navDocument(nav) {
    if (nav == "next") {
      if (this.documentsList.length > this.currentIndex + 1)
        this.currentIndex++;
      else this.currentIndex = 0;
    } else if ((nav == "prev")) {
      if (this.currentIndex > 0) this.currentIndex--;
      else this.currentIndex = this.documentsList.length - 1;
    }
    this.currentDocument["title"] =
      this.documentsList[this.currentIndex]["category_field_name"];
    this.currentDocument["fileUrl"] = this.documentsList[this.currentIndex]["file_url"]
;
    this.currentDocument["fileFormat"] =
      this.documentsList[this.currentIndex]["file_format"];
    this.currentDocument["id"] = this.documentsList[this.currentIndex]["id"];

    this.checkformat();
    console.log(this.currentDocument, this.documentsList);
  }
  
  async downloadFile(url, name, ext) {
    console.log(url, name, ext);

    this.fileUploadService.downloadFile(url).subscribe(
      success =>{
        console.log(success);
        const blob = new Blob([success]);
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${name}.${ext}`;
        console.log(link.download);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    );
  }
  openFileInNewTab(url) {
    window.open(url, '_blank')
  }
}
