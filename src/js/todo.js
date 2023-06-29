class todo {
  constructor(userId, id, title, completed) {
    this._userId = userId;
    this._id = id;
    this._title = title;
    this._completed = completed;
  }
  get userId() {
    return this._userId;
  }
  set userId(in_userId) {
    this._userId = in_userId;
  }

  get id() {
    return this._id;
  }
  set id(in_id) {
    this._id = in_id;
  }

  get title() {
    return this._title;
  }
  set title(in_title) {
    this._title = in_title;
  }

  get completed() {
    return this._completed;
  }
  set completed(in_completed) {
    this._completed = in_completed;
  }
}

export default todo;
