import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIs } from "src/environments/environment";
import { ObservableService } from "../../util/observablefn.service";

@Injectable({
  providedIn: "root",
})
export class AddDocumentService {
  imageUpload: string = "";
  documentCategories: string = "";
  document: string = "";

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private os: ObservableService) {
    this.headers = this.os.headers();

    this.imageUpload = APIs['imageUpload'];
    this.documentCategories = APIs['documentCategories'];
    this.document = APIs['document'];

    this.headers.append("content-type", "multipart/form-data");
  }

  uploadImage(formData): Observable<any> {
    return this.http.post(this.imageUpload, formData, {
      headers: this.headers,
    });
  }
  getFilteredLocationForDocument(cId, filter) {
    const body = { cId, filter };
    return this.http.post(
      `${this.document}/getFilteredLocationForDocument`,
      body,
      {
        headers: this.headers,
      }
    );
  }
  saveDocumentsList(cId, userId, documentIds) {
    const body = {
      cId,
      userId,
      documentIds,
    };
    return this.http.post(`${this.document}/saveDocumentsList`, body, {
      headers: this.headers,
    });
  }

  getAllCategoriesWithFields(ids) {
    const body = { ...ids };

    return this.http.post(
      `${this.documentCategories}/getAllCategoriesWithFields`,
      body,
      {
        headers: this.headers,
      }
    );
  }

  getDocumentCategoryField(cId, categoryId) {
    const body = {
      cId,
      categoryId,
    };

    return this.http.post(`${this.documentCategories}/fields`, body, {
      headers: this.headers,
    });
  }

  addDocument(body) {
    return this.http.post(this.document, body, {
      headers: this.headers,
    });
  }

  getUserDocuments(userId) {
    let body = {};
    if(userId)
      body = { userId };
    return this.http.post(`${this.document}/getUserDocuments`, body, {
      headers: this.headers,
    });
  }

  addFileInPhysicalLocation(cliendId, userId, uploadedBy, body) {
    body.cId = cliendId;
    body.userId = userId;
    body.uploadedBy = uploadedBy;

    console.log(body);

    return this.http.post(`${this.document}/addFileInPhysicalLocation`, body, {
      headers: this.headers,
    });
  }

  updateFileLocation(id, cliendId, userId, uploadedBy, body) {
    body.cId = cliendId;
    body.userId = userId;
    body.uploadedBy = uploadedBy;
    body.id = id;

    return this.http.post(`${this.document}/updateFileLocation`, body, {
      headers: this.headers,
    });
  }
  getDocumentFileLocation(userId) {
    return this.http.get(`${this.document}/getDocumentFileLocation/${userId}`, {
      headers: this.headers,
    });
  }

  deleteDocument(userId, id) {
    return this.http.delete(`${this.document}/${id}/${userId}`, {
      headers: this.headers,
    });
  }
}
