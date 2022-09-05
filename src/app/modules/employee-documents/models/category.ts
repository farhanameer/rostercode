export class SubCategoryDataModel {
  parentCategoryId = null;
  id = null;
  value: "";
}

export class SubCategoryModel {
  parentId = null;
  sub: Array<SubCategoryDataModel> = [];
}

export class CategoryModel {
  designation = "";
  empCode = "";
  name = "";
  sub: Array<SubCategoryModel> = [];
}
