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
import { CourrierRepository } from "@repositories/sql/typeorm/courrier.repository";
import { PromotionRepository } from "@repositories/sql/typeorm/promotions.repository";
import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
import { IAddressEntity } from "@entities/sql/interfaces/address.entity.interface";
import { IPaymentCardEntity } from "@entities/sql/interfaces/payment-card.entity.interface";
import { IProductEntity } from "@entities/sql/interfaces/product.entity.interface";
import { IReviewEntity } from "@entities/sql/interfaces/review.entity.interface";
import { IProductPriceHistoryEntity } from "@entities/sql/interfaces/product-price-history.entity.interface";
import { IProductImageEntity } from "@entities/sql/interfaces/product-image.entity.interface";
import { ShoppingCartRepository } from "@repositories/sql/typeorm/shopping-cart.repository";
import { IShoppingCartEntity } from "@entities/sql/interfaces/shopping-cart.entity.interface";
import { IWishlistItemEntity } from "@entities/sql/interfaces/wishlist-item.entity.interface";
import { WishlistRepository } from "@repositories/sql/typeorm/wishlist.repository";
import { WishlistItemRepository } from "@repositories/sql/typeorm/wishlist-item.repository";
import { IOrderItemEntity } from "@entities/sql/interfaces/order-item.entity.interface";
import { IOrderEntity } from "@entities/sql/interfaces/order.entity.interface";
import { IReturnItemEntity } from "@entities/sql/interfaces/return-item.entity.interface";
import { IReturnEntity } from "@entities/sql/interfaces/return.entity.interface";
import { IRefundEntity } from "@entities/sql/interfaces/refund.entity.interface";
import { OrderRepository } from "@repositories/sql/typeorm/order.repository";
import { OrderItemRepository } from "@repositories/sql/typeorm/order-item.repository";
import { ReturnRepository } from "@repositories/sql/typeorm/return.repository";
import { ReturnItemRepository } from "@repositories/sql/typeorm/return-item.repository";
import { RefundRepository } from "@repositories/sql/typeorm/refund.repository";
import { SaleRepository } from "@repositories/sql/typeorm/sale.repository";
import { InvoiceRepository } from "@repositories/sql/typeorm/invoice.repository";

interface IDummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

interface IDummyProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

type generatedOrderAndReturnItems = {
  orderTotal: number;
  orderedItems: IOrderItemEntity[];
  returnTotal: number;
  returnedItems: IReturnItemEntity[];
};

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

const totalUsers = 208;
const totalAddresses = totalUsers * 2;
const totalProducts = 194;
const totalCourriers = 5;
const totalOrderStatuses = 19;

// Bloated class on purpose, because it only serves one purpose on application initialization
@autoInjectable()
export class DataSeedService {
  private userDataUrl = `https://dummyjson.com/users?limit=${totalUsers}`;
  private categoryDataUrl = "https://dummyjson.com/products/categories?limit=0";
  private productDataUrl = `https://dummyjson.com/products?limit=${totalProducts}`;

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
    @inject("InventoryRepo") private inventoryRepo?: InventoryRepository,
    @inject("CourrierRepo") private courrierRepo?: CourrierRepository,
    @inject("PromotionRepo") private promotionRepo?: PromotionRepository,
    @inject("ShoppingCartRepo") private shoppingCartRepo?: ShoppingCartRepository,
    @inject("WishlistRepo") private wishlistRepo?: WishlistRepository,
    @inject("WishlistItemRepo") private wishlistItemRepo?: WishlistItemRepository,
    @inject("OrderRepo") private orderRepo?: OrderRepository,
    @inject("OrderItemRepo") private orderItemRepo?: OrderItemRepository,
    @inject("ReturnRepo") private returnRepo?: ReturnRepository,
    @inject("ReturnItemRepo") private returnItemRepo?: ReturnItemRepository,
    @inject("RefundRepo") private refundRepo?: RefundRepository,
    @inject("SaleRepo") private saleRepo?: SaleRepository,
    @inject("InvoiceRepo") private invoiceRepo?: InvoiceRepository
  ) {}

  async connect(): Promise<void> {
    await this.dataSource?.connect();
  }

  private generateRandomDate(startDate: Date, endDate: Date = new Date()): Date {
    const start = startDate.getTime();
    const end = endDate.getTime();

    const randomTimestamp = start + Math.random() * (end - start);

    return new Date(randomTimestamp);
  }

  private generateEmailDomain(): string {
    const domains = ["gmail", "yahoo", "outlook", "hotmail", "protonmail", "zoho", "icloud", "aol"];

    return domains[this.randomNumber(domains.length) - 1];
  }

  private randomNumber(maxId: number): number {
    return Math.floor(Math.random() * maxId) + 1;
  }

  private extractUser(data: IDummyUser): IUserEntity {
    const { id, firstName, lastName, email, password, birthDate, phone } = data;

    const mobile = `+27${phone.replace(/-/g, "").substring(4)}`.substring(0, 12);

    const gmail = email.replace("x.dummyjson", this.generateEmailDomain());

    const user = {
      id,
      firstName,
      lastName,
      email: gmail,
      password,
      dateOfBirth: new Date(birthDate),
      mobile,
      credit: 0,
    };

    return user;
  }

  private extractAddresses(data: IDummyUser): { [key: string]: Omit<IAddressEntity, "id"> } {
    const { address: street, city, state, postalCode } = data?.address;

    const {
      name: buildingCompanyName,
      address: { address: street1, city: city1, state: state1, postalCode: postCode1 },
    } = data?.company;

    return {
      homeAddress: {
        street,
        city,
        state,
        postCode: parseInt(postalCode),
      },
      workAddress: {
        buildingCompanyName,
        street: street1,
        city: city1,
        state: state1,
        postCode: parseInt(postCode1),
      },
    };
  }

  private extractCardData(data: IDummyUser): Omit<IPaymentCardEntity, "id"> {
    const { cardType, cardNumber, cardExpire, iban } = data?.bank;

    return {
      userId: data.id,
      cardType,
      lastFourDigits: cardNumber.slice(-4),
      expiryMonth: parseInt(cardExpire.slice(0, 2)),
      expiryYear: parseInt(cardExpire.slice(-2)),
      cardToken: iban,
    };
  }

  private extractProductData(data: IDummyProduct): IProductEntity {
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
      brand: brand ?? "RayTech",
      categoryId,
    };
  }

  private extractReviewData(data: IDummyProduct, reviewCount: number): IReviewEntity[] {
    const reviews = [];

    const productId = data.id;

    for (const [index, review] of data.reviews.entries()) {
      const userId = this.randomNumber(totalUsers);
      const { rating, comment, date } = review;
      reviews.push({ id: reviewCount + index + 1, userId, productId, rating, comment, reviewDate: new Date(date) });
    }

    const extraReviewCount = this.randomNumber(10);
    const startingId = reviewCount + data.reviews.length + 1;

    for (let i = 0; i < extraReviewCount; i++) {
      const userId = this.randomNumber(totalUsers);
      const randomRating = this.randomNumber(5);
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

  private extractPriceHistoryData(data: IDummyProduct, priceHistoryCount: number): IProductPriceHistoryEntity[] {
    const priceHistories = [];

    const { id: productId, price } = data;
    const priceChanges = this.randomNumber(4);
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

  private extractProductImages(data: IDummyProduct, productImageCount: number): IProductImageEntity[] {
    const { id, images } = data;

    return images.map((image: string, index: number) => ({
      id: productImageCount + index + 1,
      productId: id,
      imageUrl: image,
    }));
  }

  private generateOrderAndReturnItems(
    products: IDummyProduct[],
    orderId: number,
    orderCount: number,
    returnId: number | undefined
  ): generatedOrderAndReturnItems {
    const itemCount = this.randomNumber(5);

    const orderedItems: IOrderItemEntity[] = [];
    const returnedItems: IReturnItemEntity[] = [];

    const startingId = orderCount + 1;

    let orderTotal = 0;
    let returnTotal = 0;

    // Generate Order Items
    for (let i = 0; i < itemCount; i++) {
      const productId = this.randomNumber(totalProducts);
      const { price } = products.find((product) => product.id === productId) ?? { price: 0 };
      const quantity = this.randomNumber(3);
      orderedItems.push({ id: startingId + i, orderId, productId, price, quantity });
      orderTotal += price * quantity;
    }

    // Generate Return Items
    if (returnId) {
      const returnCount = this.randomNumber(Math.ceil(itemCount / 2));

      for (let i = 0; i < returnCount; i++) {
        const index = this.randomNumber(orderedItems.length) - 1;
        let orderItem = orderedItems[index];

        while (returnedItems.find((returnedItems) => returnedItems.orderItemId === orderItem.id)) {
          orderItem = orderedItems[this.randomNumber(orderedItems.length) - 1];
        }

        const { id: orderItemId, quantity } = orderItem;
        const returnQuantity = this.randomNumber(quantity);

        returnTotal += orderItem.price * returnQuantity;

        returnedItems.push({ returnId, orderItemId, quantity: returnQuantity });
      }
    }

    return { orderTotal, orderedItems, returnTotal, returnedItems };
  }

  private generateReturn(
    returnCount: number,
    refundCount: number,
    order: Omit<IOrderEntity, "totalDue">
  ): { generatedReturn: Partial<IReturnEntity>; refund: Partial<IRefundEntity> } {
    const generatedReturn: Partial<IReturnEntity> = {};
    const refund: Partial<IRefundEntity> = {};

    const { id: orderId, shippedDate, userId } = order;

    if (Math.random() < 0.1) {
      const returnStatuses = ["Pending", "Approved", "Rejected"];
      const refundMethods = ["Payment Card", "Customer Credit"];
      const returnReasons = [
        "Item not as described",
        "Wrong item shipped",
        "Item arrived damaged",
        "Better price available",
        "Changed mind",
        "Found a better product",
        "Item arrived too late",
        "Unwanted gift",
        "Defective item",
        "Not compatible",
        "Poor quality",
        "Ordered wrong item",
      ];

      generatedReturn.id = returnCount + 1;
      generatedReturn.orderId = orderId;
      generatedReturn.returnDate = new Date(new Date(shippedDate).setDate(shippedDate.getDate() + 7));
      generatedReturn.status = returnStatuses[this.randomNumber(returnStatuses.length) - 1];
      generatedReturn.reason = returnReasons[this.randomNumber(returnReasons.length) - 1];

      if (generatedReturn.status === "Approved") {
        generatedReturn.refundMethod = refundMethods[this.randomNumber(refundMethods.length) - 1];

        if ((generatedReturn.refundMethod = "Payment Card")) {
          refund.id = refundCount + 1;
          refund.returnId = generatedReturn.id;
          refund.paymentCardId = userId;
          refund.date = new Date(
            new Date(generatedReturn.returnDate).setDate(generatedReturn.returnDate.getDate() + 7)
          );
        }
      }
    }

    return { generatedReturn, refund };
  }

  private async seedRoleData(): Promise<void> {
    const roles = ["ADMIN", "PRODUCT MANAGER", "FINANCE MANAGER", "CS AGENT", "CUSTOMER"];

    await this.roleRepo?.insertMany(roles.map((name, index) => ({ id: index + 1, roleName: name })));
  }

  private async seedAddressTypeData(): Promise<void> {
    const roles = ["HOME", "WORK"];

    await this.addressTypeRepo?.insertMany(roles.map((name, index) => ({ id: index + 1, addressType: name })));
  }

  private async seedOrderStatusData(): Promise<void> {
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

  private async seedProductCategoryData(): Promise<void> {
    const response = await axios.get(this.categoryDataUrl);

    const categories = [];
    for (const [index, data] of response.data.entries()) {
      const { name } = data;

      categories.push({ id: index + 1, name });
    }

    await this.productCategoryRepo?.insertMany(categories);
  }

  private async seedUserData(): Promise<void> {
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

  private async seedProductData(): Promise<void> {
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

  private async seedCourrierData(): Promise<void> {
    const couriers = [
      {
        id: 1,
        name: "FedEx",
        contactNumber: "18004633339",
        shippingCost: 10.99,
      },
      {
        id: 2,
        name: "DHL",
        contactNumber: "18002255345",
        shippingCost: 12.5,
      },
      {
        id: 3,
        name: "UPS",
        contactNumber: "18007425877",
        shippingCost: 9.99,
      },
      {
        id: 4,
        name: "USPS",
        contactNumber: "18002758777",
        shippingCost: 8.5,
      },
      {
        id: 5,
        name: "TNT",
        contactNumber: "18005585555",
        shippingCost: 11.75,
      },
    ];

    await this.courrierRepo?.insertMany(couriers);
  }

  private async seedPromotionsData(): Promise<void> {
    const promotionsCount = 40;
    const promotionNames = [
      "Sale",
      "Clearance",
      "Limited Offer",
      "Flash Sale",
      "Holiday Special",
      "Exclusive Deal",
      "Member Special",
      "Weekend Sale",
    ];

    const promotions = [];

    const end = new Date(new Date().setMonth(new Date().getMonth() + 6));

    for (let i = 0; i < promotionsCount; i++) {
      const startDate = this.generateRandomDate(new Date(2022, 0, 1));
      const endDate = this.generateRandomDate(startDate, end);
      const productId = this.randomNumber(totalProducts);
      const name = promotionNames[this.randomNumber(promotionNames.length) - 1];
      const discount = parseFloat((0.1 + Math.random() * 0.4).toFixed(2));

      promotions.push({
        id: i + 1,
        productId,
        name,
        discount,
        startDate,
        endDate,
      });
    }

    await this.promotionRepo?.insertMany(promotions);
  }

  private async seedShoppingCartData(): Promise<void> {
    const shoppingCartCount = 50;
    const shoppingCarts = [];

    const generateProducts = (userId: number): IShoppingCartEntity[] => {
      const cartItems = [];
      const startId = shoppingCarts.length + 1;

      for (let i = 0; i < this.randomNumber(5); i++) {
        const productId = this.randomNumber(totalProducts);
        const quantity = this.randomNumber(5);

        cartItems.push({ id: startId + i, userId, productId, quantity });
      }

      return cartItems;
    };

    for (let i = 0; i < shoppingCartCount; i++) {
      const userId = this.randomNumber(totalUsers);

      shoppingCarts.push(...generateProducts(userId));
    }

    await this.shoppingCartRepo?.insertMany(shoppingCarts);
  }

  private async seedWishListdData(): Promise<void> {
    const wishListCount = 50;
    const wishListNames = [
      "Summer Vacation",
      "Birthday Gifts",
      "Holiday Shopping",
      "Tech Gadgets",
      "Home Improvements",
      "Fitness Goals",
      "Reading List",
      "Travel Destinations",
      "Cooking Supplies",
      "Fashion Wishlist",
      "Music & Instruments",
      "Gaming Gear",
      "Photography Equipment",
      "Outdoor Adventures",
      "Pet Supplies",
      "Car Accessories",
      "Office Essentials",
      "Beauty Products",
      "DIY Projects",
      "Garden Tools",
      "Baby Essentials",
      "Health & Wellness",
      "Hobbies & Crafts",
      "Sports Equipment",
      "Collectibles",
    ];

    const wishlists = [];
    const wishlistItems = [];

    const generateWishlistItems = (wishlistId: number): IWishlistItemEntity[] => {
      const wishlistItems: IWishlistItemEntity[] = [];

      for (let i = 0; i < this.randomNumber(5); i++) {
        let productId = this.randomNumber(totalProducts);

        while (wishlistItems.find((x) => x.productId === productId)) {
          productId = this.randomNumber(totalProducts);
        }

        wishlistItems.push({ wishlistId, productId });
      }

      return wishlistItems;
    };

    for (let i = 0; i < wishListCount; i++) {
      const id = i + 1;
      const name = wishListNames[this.randomNumber(wishListNames.length) - 1];
      const userId = this.randomNumber(totalUsers);

      wishlists.push({ id, name, userId });
      wishlistItems.push(...generateWishlistItems(id));
    }

    await this.wishlistRepo?.insertMany(wishlists);
    await this.wishlistItemRepo?.insertMany(wishlistItems);
  }

  private async seedOrderData(): Promise<void> {
    const response = await axios.get(this.productDataUrl);
    const products: IDummyProduct[] = response?.data?.products;

    const orderCount = 300;

    const orders = [];
    const orderItems = [];

    const returns = [];
    const returnItems = [];

    const refunds = [];

    const sales = [];

    const invoices = [];

    for (let i = 0; i < orderCount; i++) {
      // Generate Order
      const orderDate = this.generateRandomDate(new Date(2022, 0, 1));
      const shippedDate = new Date(new Date(orderDate).setDate(orderDate.getDate() + 7));

      const order = {
        id: i + 1,
        orderDate,
        shippedDate,
        userId: this.randomNumber(totalUsers),
        addressId: this.randomNumber(totalAddresses),
        courrierId: this.randomNumber(totalCourriers),
        orderStatusId: this.randomNumber(totalOrderStatuses),
        paymentCardId: this.randomNumber(totalUsers),
      };

      // Generate Returns and Refunds 10% of the time
      const { generatedReturn, refund } = this.generateReturn(returns.length, refunds.length, order);

      // Generate Order and Return Items
      const {
        orderTotal: totalDue,
        orderedItems,
        returnTotal,
        returnedItems,
      } = this.generateOrderAndReturnItems(products, order.id, orderItems.length, generatedReturn?.id);

      // Add Orders
      orderItems.push(...orderedItems);
      orders.push({ ...order, totalDue });

      // Add Returns
      if (generatedReturn?.id) {
        returnItems.push(...returnedItems);
        returns.push({ ...generatedReturn, total: returnTotal } as IReturnEntity);
      }

      // Add Refunds
      if (refund?.id) {
        refunds.push({ ...refund, amount: returnTotal } as IRefundEntity);
      }

      // Add Sales
      const saleItems = orderedItems.map((item) => ({
        id: item.id,
        userId: order.userId,
        productId: item.productId,
        date: order.orderDate,
        quantity: item.quantity,
        price: item.price,
      }));

      sales.push(...saleItems);

      // Add Invoice
      const invoice = {
        id: i + 1,
        invoiceDate: orderDate,
        totalDue,
        vatDue: totalDue * 0.15,
        orderId: order.id,
      };
      invoices.push(invoice);
    }

    await this.orderRepo?.insertMany(orders);
    await this.orderItemRepo?.insertMany(orderItems);

    await this.returnRepo?.insertMany(returns);
    await this.returnItemRepo?.insertMany(returnItems);

    await this.refundRepo?.insertMany(refunds);

    await this.saleRepo?.insertMany(sales);

    await this.invoiceRepo?.insertMany(invoices);
  }

  public async seedData(): Promise<void> {
    await this.connect();

    await this.seedRoleData();

    await this.seedAddressTypeData();

    await this.seedProductCategoryData();

    await this.seedOrderStatusData();

    await this.seedUserData();

    await this.seedProductData();

    await this.seedCourrierData();

    await this.seedPromotionsData();

    await this.seedShoppingCartData();

    await this.seedWishListdData();

    await this.seedOrderData();
  }

  public async clearData(): Promise<void> {
    await this.connect();

    await this.reviewRepo?.deletAll();

    await this.userRoleRepo?.deletAll();
    await this.userAddressRepo?.deletAll();

    await this.roleRepo?.deletAll();
    await this.addressTypeRepo?.deletAll();

    await this.orderStatusRepo?.deletAll();

    await this.shoppingCartRepo?.deletAll();
    await this.wishlistItemRepo?.deletAll();
    await this.wishlistRepo?.deletAll();

    await this.paymentCardRepo?.deletAll();
    await this.userRepo?.deletAll();
    await this.addressRepo?.deletAll();

    await this.productPriceHistoryRepo?.deletAll();
    await this.productImageRepo?.deletAll();
    await this.inventoryRepo?.deletAll();

    await this.productRepo?.deletAll();

    await this.productCategoryRepo?.deletAll();

    await this.courrierRepo?.deletAll();
    await this.promotionRepo?.deletAll();

    await this.orderRepo?.deletAll();
    await this.orderItemRepo?.deletAll();

    await this.returnRepo?.deletAll();
    await this.returnItemRepo?.deletAll();

    await this.refundRepo?.deletAll();

    await this.saleRepo?.deletAll();

    await this.invoiceRepo?.deletAll();
  }
}

// (async () => {
//   const dataSeedService = new DataSeedService();
//   await dataSeedService.seedData();
//   process.exit(0);
// })();
