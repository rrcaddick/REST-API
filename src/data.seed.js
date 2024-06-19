const axios = require("axios");
const { UserEntity } = require("./infrastructure/entities/sql/typeorm/user.entity");

class DataSeedService {
  userDataUrl = "https://dummyjson.com/users?limit=5";
  categoryDataUrl = "https://dummyjson.com/products/categories?limit=0";

  generateEmailDomain() {
    const domains = ["gmail", "yahoo", "outlook", "hotmail", "protonmail", "zoho", "icloud", "aol"];

    return domains[Math.floor(Math.random() * domains.length)];
  }

  extractUser(data) {
    const { id, firstName, lastName, email, password, birthDate: dateOfBirth, phone } = data;

    const mobile = `+27${phone.replace(/-/g, "").substring(4)}`.substring(0, 12);

    const gmail = email.replace("x.dummyjson", this.generateEmailDomain());

    return {
      id,
      firstName,
      lastName,
      email: gmail,
      password,
      dateOfBirth,
      mobile,
      credit: 0,
    };
  }

  extractAddresses(data) {
    const homeAddress = data?.address;

    const workAddress = data?.company?.address;

    return [homeAddress, workAddress];
  }

  extractCardData(data) {
    const { cardType, cardNumber, cardExpire, iban } = data?.bank;

    return {
      userId: data.id,
      cardType,
      lastFourDigits: cardNumber.slice(-4),
      expiryMonth: cardExpire.slice(0, 2),
      expiryYear: cardExpire.slice(-2),
      cardToken: iban,
    };
  }

  async seedRoleData() {
    const roles = ["ADMIN", "PRODUCT MANAGER", "FINANCE MANAGER", "CS AGENT", "CUSTOMER"];

    for (const role of roles) {
      // TODO:Write data to the database
    }
  }

  async seedUserData() {
    const response = await axios.get(this.userDataUrl);

    for (const data of response.data.users) {
      const user = this.extractUser(data);

      const addresses = this.extractAddresses(data);

      const cardData = this.extractCardData(data);

      // TODO:Write data to the database
    }
  }

  async seedCategoryData() {
    const response = await axios.get(this.categoryDataUrl);

    for (const data of response.data) {
      const { name } = data;

      // TODO:Write data to the database
    }
  }
}

const seedService = new DataSeedService();

// seedService.seedUserData();
