import { HttpClient, HttpHeaders, HttpBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { APIs } from "src/environments/environment";

import { ObservableService } from "../../util/observablefn.service";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  imageUpload: string = "";
  headers: HttpHeaders = new HttpHeaders();
  fileTypes;
  availeFileTypes;

  private httpClient: HttpClient;
  constructor(
    private http: HttpClient,
    private os: ObservableService,
    private handler: HttpBackend
  ) {
    this.httpClient = new HttpClient(handler);
    this.imageUpload = APIs["imageUpload"];
    this.headers = this.os.headers();

    this.headers.set("content-type", "multipart/form-data");

    this.fileTypes = {
      "image/png": true,
      "image/jpeg": true,
      "image/jpg": true,
      "application/pdf": true,
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        true,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        false,
      "application/msword": true,
    };

    this.availeFileTypes = {
      png: "image/png",
      jpeg: "image/jpeg",
      jpg: "image/jpg",
      pdf: "application/pdf",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      doc: "application/msword",
      csv: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
  }

  validateAttachment(file, fileType = null) {
    let formData: FormData = new FormData();

    if (this.fileTypes[file.type]) {
      if (fileType != null) {
        console.log(this.availeFileTypes[fileType]);

        console.log(fileType);
        console.log(file.type);
        if (fileType != file.type) {
          return false;
        }
      }
      formData.append("image", file);
      return formData;
    }
    return false;
  }

  uploadFile(file, fileType = null) {
    return new Promise(async (resolve, reject) => {
      const fileUploadResponse = { success: true, data: "", error: "" };

      const fileData = this.validateAttachment(file, fileType);
      if (!fileData) {
        console.log("error");
        fileUploadResponse.success = false;
        fileUploadResponse.data = null;
        fileUploadResponse.error = "invalid file is selected";
        resolve(fileUploadResponse);
        return;
      }
      console.log(fileData.get("image"));

      const result = await this.os.asSubscribed(this.upload(fileData));

      console.log(result);

      if (result.status) {
        console.log("in serivce of ressolved");
        console.log(result);

        fileUploadResponse.success = true;
        fileUploadResponse.data = result.payload;
        fileUploadResponse.error = null;

        console.log(fileUploadResponse);

        resolve(fileUploadResponse);
        return;
      }
      fileUploadResponse.success = false;
      fileUploadResponse.error = result.message;
      resolve(fileUploadResponse);
    });
  }

  upload(formData) {
    return this.http.post(`${this.imageUpload}`, formData, {
      headers: this.headers,
    });
  }

  getFileTypes() {
    return this.availeFileTypes;
  }

  downloadFile(url): any {
    const headers = new HttpHeaders();
    headers.delete("Authorization");
    console.log(headers);

    return this.httpClient.get(`${url}`, { headers, responseType: "blob" });
  }
}
