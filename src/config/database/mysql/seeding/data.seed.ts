import "module-alias/register";
import "reflect-metadata";
import { config } from "dotenv";
config();
import "@config/di.config";
import axios from "axios";
import { autoInjectable, inject } from "tsyringe";
import { UserRepository } from "@repositories/sql/typeorm/user.repository";
import { IDataSource } from "@config/db.config.interface";
import { RoleRepository } from "@repositories/sql/typeorm/role.repository";
import { AddressTypeRepository } from "@repositories/sql/typeorm/address-type.repository";
import { ProductCategoryRepository } from "@repositories/sql/typeorm/product-category.repository";
import { OrderStatusRepository } from "@repositories/sql/typeorm/order-status.repository";
import { AddressRepository } from "@repositories/sql/typeorm/address.respository";
import { UserAddressRepository } from "@repositories/sql/typeorm/user-address.repository";
import { PaymentCardRepository } from "@repositories/sql/typeorm/payment-card.repository";
import { UserRoleRepository } from "@repositories/sql/typeorm/user-role.repository";
import { ProductRepository } from "@repositories/sql/typeorm/product.repository";
import { ReviewRepository } from "@repositories/sql/typeorm/review.repository";
import { ProductPriceHistoryRepository } from "@repositories/sql/typeorm/product-price-history.repository";
import { ProductImageRepository } from "@repositories/sql/typeorm/product-image.repository";
import { InventoryRepository } from "@repositories/sql/typeorm/inventory.repository";

const categoryIds: { [key: string]: number } = {
  beauty: 1,
  fragrances: 2,
  furniture: 3,
  groceries: 4,
  "home-decoration": 5,
  "kitchen-accessories": 6,
  laptops: 7,
  "mens-shirts": 8,
  "mens-shoes": 9,
  "mens-watches": 10,
  "mobile-accessories": 11,
  motorcycle: 12,
  "skin-care": 13,
  smartphones: 14,
  "sports-accessories": 15,
  sunglasses: 16,
  tablets: 17,
  tops: 18,
  vehicle: 19,
  "womens-bags": 20,
  "womens-dresses": 21,
  "womens-jewellery": 22,
  "womens-shoes": 23,
  "womens-watches": 24,
};

@autoInjectable()
export class DataSeedService {
  private userDataUrl = "https://dummyjson.com/users?limit=0";
  private categoryDataUrl = "https://dummyjson.com/products/categories?limit=0";
  private productDataUrl = "https://dummyjson.com/products?limit=0";

  constructor(
    @inject("DataSource") private dataSource?: IDataSource,
    @inject("UserRepo") private userRepo?: UserRepository,
    @inject("RoleRepo") private roleRepo?: RoleRepository,
    @inject("UserRoleRepo") private userRoleRepo?: UserRoleRepository,
    @inject("AddressTypeRepo") private addressTypeRepo?: AddressTypeRepository,
    @inject("AddressRepo") private addressRepo?: AddressRepository,
    @inject("UserAddressRepo") private userAddressRepo?: UserAddressRepository,
    @inject("PaymentCardRepo") private paymentCardRepo?: PaymentCardRepository,
    @inject("ProductCategoryRepo") private productCategoryRepo?: ProductCategoryRepository,
    @inject("OrderStatusRepo") private orderStatusRepo?: OrderStatusRepository,
    @inject("ProductRepo") private productRepo?: ProductRepository,
    @inject("ReviewRepo") private reviewRepo?: ReviewRepository,
    @inject("ProductPriceHistoryRepo") private productPriceHistoryRepo?: ProductPriceHistoryRepository,
    @inject("ProductImageRepo") private productImageRepo?: ProductImageRepository,
    @inject("InventoryRepo") private inventoryRepo?: InventoryRepository
  ) {}

  async connect() {
    await this.dataSource?.connect();
  }

  private generateRandomDate(startDate: Date, endDate: Date = new Date()) {
    const start = startDate.getTime();
    const end = endDate.getTime();

    const randomTimestamp = start + Math.random() * (end - start);

    return new Date(randomTimestamp);
  }

  private generateEmailDomain() {
    const domains = ["gmail", "yahoo", "outlook", "hotmail", "protonmail", "zoho", "icloud", "aol"];

    return domains[Math.floor(Math.random() * domains.length)];
  }

  private extractUser(data: any) {
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

  private extractAddresses(data: any) {
    const { address: street, city, state, postalCode: postCode } = data?.address;

    const {
      name: buildingCompanyName,
      address: { address: street1, city: city1, state: state1, postalCode: postCode1 },
    } = data?.company;

    return {
      homeAddress: {
        street,
        city,
        state,
        postCode,
      },
      workAddress: {
        buildingCompanyName,
        street: street1,
        city: city1,
        state: state1,
        postCode: postCode1,
      },
    };
  }

  private extractCardData(data: any) {
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

  private extractProductData(data: any) {
    const {
      id,
      title: name,
      description,
      price,
      weight,
      dimensions: { depth: length, width, height },
      brand,
      category,
    } = data;

    const categoryId = categoryIds[category];

    return {
      id,
      name,
      description,
      price,
      weight,
      length,
      width,
      height,
      brand: brand ?? "This one",
      categoryId,
    };
  }

  private extractReviewData(data: any, reviewCount: number) {
    const reviews = [];

    const productId = data.id;

    for (const [index, review] of data.reviews.entries()) {
      const userId = Math.floor(Math.random() * 208) + 1;
      const { rating, comment, date } = review;
      reviews.push({ id: reviewCount + index + 1, userId, productId, rating, comment, reviewDate: date });
    }

    const extraReviewCount = Math.floor(Math.random() * 10) + 1;
    const startingId = reviewCount + data.reviews.length + 1;

    for (let i = 0; i < extraReviewCount; i++) {
      const userId = Math.floor(Math.random() * 208) + 1;
      const randomRating = Math.floor(Math.random() * 5) + 1;
      reviews.push({
        id: startingId + i,
        userId,
        productId,
        rating: randomRating,
        reviewDate: this.generateRandomDate(new Date(2022, 0, 1)),
      });
    }

    return reviews;
  }

  private extractPriceHistoryData(data: any, priceHistoryCount: number) {
    const { id: productId, price } = data;
    const priceHistories = [];
    const priceChanges = Math.floor(Math.random() * 4) + 1;
    let startDate = new Date(2022, 0, 1);

    for (let i = 0; i < priceChanges; i++) {
      let endDate = this.generateRandomDate(startDate);
      const discount = i + 1 / 10;
      priceHistories.push({
        id: priceHistoryCount + i + 1,
        productId,
        price: price * 1 - discount,
        startDate: startDate,
        endDate,
      });
      startDate = endDate;
    }

    return priceHistories;
  }

  private extractProductImages(data: any, productImageCount: number) {
    const { id, images } = data;

    return images.map((image: string, index: number) => ({
      id: productImageCount + index + 1,
      productId: id,
      imageUrl: image,
    }));
  }

  private async seedRoleData() {
    const roles = ["ADMIN", "PRODUCT MANAGER", "FINANCE MANAGER", "CS AGENT", "CUSTOMER"];

    await this.roleRepo?.insertMany(roles.map((name, index) => ({ id: index + 1, roleName: name })));
  }

  private async seedAddressTypeData() {
    const roles = ["HOME", "WORK"];

    await this.addressTypeRepo?.insertMany(roles.map((name, index) => ({ id: index + 1, addressType: name })));
  }

  private async seedOrderStatusData() {
    const orderStatuses = [
      { id: 1, status: "Pending", description: "The order has been created but not yet confirmed or processed" },
      { id: 2, status: "Confirmed", description: "The order has been confirmed and is ready for processing" },
      { id: 3, status: "Processing", description: "The order is currently being packed" },
      { id: 4, status: "Shipped", description: "The order has been dispatched and is on its way to the customer" },
      { id: 5, status: "Out for Delivery", description: "The order is out with the courier" },
      { id: 6, status: "Delivered", description: "The order has been delivered to the customer" },
      { id: 7, status: "Completed", description: "The order has been successfully completed" },
      { id: 8, status: "Cancelled", description: "The order has been cancelled by the customer or the seller" },
      { id: 9, status: "Failed", description: "The order processing failed due to payment or other issues" },
      { id: 10, status: "Returned", description: "The customer has returned the order" },
      { id: 11, status: "Refunded", description: "The customer has been refunded for the order" },
      { id: 12, status: "On Hold", description: "The order is on hold, awaiting customer actions or issue resolution" },
      { id: 13, status: "Awaiting Payment", description: "The order is waiting for payment confirmation" },
      { id: 14, status: "Awaiting Fulfillment", description: "The order is waiting to be fulfilled" },
      { id: 15, status: "Awaiting Shipment", description: "The order is waiting to be shipped" },
      { id: 16, status: "Awaiting Pickup", description: "The order is ready for pickup by the customer" },
      { id: 17, status: "Partially Shipped", description: "Only part of the order has been shipped" },
      { id: 18, status: "Partially Delivered", description: "Only part of the order has been delivered" },
      { id: 19, status: "Disputed", description: "There is a dispute regarding the order" },
    ];

    await this.orderStatusRepo?.insertMany(orderStatuses);
  }

  private async seedProductCategoryData() {
    const response = await axios.get(this.categoryDataUrl);

    const categories = [];
    for (const [index, data] of response.data.entries()) {
      const { name } = data;

      categories.push({ id: index + 1, name });
    }

    await this.productCategoryRepo?.insertMany(categories);
  }

  private async seedUserData() {
    const response = await axios.get(this.userDataUrl);

    const users = [];
    const userRoles = [];
    const addresses = [];
    const userAddresses = [];
    const paymentsCards = [];

    for (const [index, data] of response.data.users.entries()) {
      // Add Users
      users.push(this.extractUser(data));

      // Add UserRoles
      // First 3 users are admin
      if (index < 3) {
        userRoles.push({ userId: data.id, roleId: 1 });
      }

      // Randomly Assign Employee Roles 10% of the time
      if (Math.random() < 0.1 && index >= 3) {
        userRoles.push({ userId: data.id, roleId: Math.floor(Math.random() * 3) + 2 });
      }

      // Customer role
      userRoles.push({ userId: data.id, roleId: 5 });

      // Add Addresses
      const { homeAddress, workAddress } = this.extractAddresses(data);

      const homeId = index * 2 + 1;
      const workId = index * 2 + 2;

      addresses.push({ id: homeId, ...homeAddress });
      addresses.push({ id: workId, ...workAddress });

      // Add userAddresses
      userAddresses.push({ userId: data.id, addressId: homeId, addressTypeId: 1 });
      userAddresses.push({ userId: data.id, addressId: workId, addressTypeId: 2 });

      // Add Payment Cards
      paymentsCards.push({ id: index + 1, ...this.extractCardData(data) });
    }

    // Write users
    await this.userRepo?.insertMany(users);

    // Write userRoles
    await this.userRoleRepo?.insertMany(userRoles);

    // Write addresses
    await this.addressRepo?.insertMany(addresses);

    // Write UserAddresses
    await this.userAddressRepo?.insertMany(userAddresses);

    // Write PaymentCards
    await this.paymentCardRepo?.insertMany(paymentsCards);
  }

  private async seedProductData() {
    const response = await axios.get(this.productDataUrl);
    const products = [];
    const reviews = [];
    const priceHistories = [];
    const productImages = [];
    const inventory = [];

    for (const [index, data] of response.data.products.entries()) {
      // Add product
      products.push(this.extractProductData(data));

      // Add reviews
      reviews.push(...this.extractReviewData(data, reviews.length));

      // Add product price history
      priceHistories.push(...this.extractPriceHistoryData(data, priceHistories.length));

      // Add product images
      productImages.push(...this.extractProductImages(data, productImages.length));

      // Add inventory
      inventory.push({ id: index + 1, productId: data.id, quantity: data.stock });
    }

    await this.productRepo?.insertMany(products);

    await this.reviewRepo?.insertMany(reviews);

    await this.productPriceHistoryRepo?.insertMany(priceHistories);

    await this.productImageRepo?.insertMany(productImages);

    await this.inventoryRepo?.insertMany(inventory);
  }

  public async seedData() {
    await this.connect();

    await this.seedRoleData();

    await this.seedAddressTypeData();

    await this.seedProductCategoryData();

    await this.seedOrderStatusData();

    await this.seedUserData();

    await this.seedProductData();
  }

  public async clearData() {
    await this.connect();

    await this.reviewRepo?.deletAll();

    await this.userRoleRepo?.deletAll();
    await this.userAddressRepo?.deletAll();

    await this.roleRepo?.deletAll();
    await this.addressTypeRepo?.deletAll();

    await this.orderStatusRepo?.deletAll();

    await this.paymentCardRepo?.deletAll();
    await this.userRepo?.deletAll();
    await this.addressRepo?.deletAll();

    await this.productPriceHistoryRepo?.deletAll();
    await this.productImageRepo?.deletAll();
    await this.inventoryRepo?.deletAll();

    await this.productRepo?.deletAll();

    await this.productCategoryRepo?.deletAll();
  }
}

// (async () => {
//   const dataSeedService = new DataSeedService();
//   await dataSeedService.seedData();
//   process.exit(0);
// })();
