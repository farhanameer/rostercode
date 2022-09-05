export class DocumentValueModel {
  id = null;
  value = "";
}

export class DocumentModel {
  parentId = null;
  sub: Array<DocumentValueModel> = [];
}

export class UserDocumentModel {
  designation = "";
  empCode = "";
  name = "";
  documents: Array<DocumentModel> = [];
}
