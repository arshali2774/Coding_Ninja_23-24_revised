export default class ApplicantsModel {
  constructor(id, name, email, contact, resumePath) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
  }
  static add(id, name, email, contact, resumePath) {
    const newApplicant = new ApplicantsModel(
      id,
      name,
      email,
      contact,
      resumePath
    );

    applicants.push(newApplicant);
  }
  static getApplicants() {
    return applicants;
  }
}

let applicants = [];
