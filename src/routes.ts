/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './application/controllers/user.controller';
import { iocContainer } from './config/tsoa.ioc';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "dateOfBirth": {"dataType":"datetime","required":true},
            "mobile": {"dataType":"string","required":true},
            "credit": {"dataType":"double","required":true},
            "userRoles": {"dataType":"array","array":{"dataType":"refObject","ref":"UserRoleEntity"},"required":true},
            "roles": {"dataType":"array","array":{"dataType":"refObject","ref":"RoleEntity"},"required":true},
            "userAddressses": {"dataType":"array","array":{"dataType":"refObject","ref":"UserAddressEntity"},"required":true},
            "addresses": {"dataType":"array","array":{"dataType":"refObject","ref":"AddressEntity"},"required":true},
            "wishlists": {"dataType":"array","array":{"dataType":"refObject","ref":"WishlistEntity"},"required":true},
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderEntity"},"required":true},
            "shoppingCartItems": {"dataType":"array","array":{"dataType":"refObject","ref":"ShoppingCartEntity"},"required":true},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"ReviewEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRoleEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "userId": {"dataType":"double","required":true},
            "roleId": {"dataType":"double","required":true},
            "user": {"ref":"UserEntity","required":true},
            "role": {"ref":"RoleEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "roleName": {"dataType":"string","required":true},
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"UserRoleEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAddressEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "userId": {"dataType":"double","required":true},
            "addressId": {"dataType":"double","required":true},
            "addressTypeId": {"dataType":"double","required":true},
            "user": {"ref":"UserEntity","required":true},
            "address": {"ref":"AddressEntity","required":true},
            "addressType": {"ref":"AddressTypeEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "addressId": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "orderDate": {"dataType":"datetime","required":true},
            "shippedDate": {"dataType":"datetime","required":true},
            "courrierId": {"dataType":"double","required":true},
            "orderStatusId": {"dataType":"double","required":true},
            "totalDue": {"dataType":"double","required":true},
            "paymentCardId": {"dataType":"double","required":true},
            "orderItems": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderItemEntity"},"required":true},
            "user": {"ref":"UserEntity","required":true},
            "address": {"ref":"AddressEntity","required":true},
            "courrier": {"ref":"CourrierEntity","required":true},
            "paymentCard": {"ref":"PaymentCardEntity","required":true},
            "orderStatus": {"ref":"OrderStatusEntity","required":true},
            "invoice": {"ref":"InvoiceEntity","required":true},
            "return": {"ref":"ReturnEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "price": {"dataType":"double","required":true},
            "weight": {"dataType":"double","required":true},
            "length": {"dataType":"double","required":true},
            "width": {"dataType":"double","required":true},
            "height": {"dataType":"double","required":true},
            "brand": {"dataType":"string","required":true},
            "categoryId": {"dataType":"double","required":true},
            "category": {"ref":"ProductCategoryEntity","required":true},
            "images": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductImageEntity"},"required":true},
            "priceHistory": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductPriceHistoryEntity"},"required":true},
            "promotions": {"dataType":"array","array":{"dataType":"refObject","ref":"PromotionEntity"},"required":true},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"ReviewEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductCategoryEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "products": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductImageEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "product": {"ref":"ProductEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductPriceHistoryEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "price": {"dataType":"double","required":true},
            "startDate": {"dataType":"datetime","required":true},
            "endDate": {"dataType":"datetime","required":true},
            "product": {"ref":"ProductEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PromotionEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "productId": {"dataType":"double","required":true},
            "discount": {"dataType":"double","required":true},
            "startDate": {"dataType":"datetime","required":true},
            "endDate": {"dataType":"datetime","required":true},
            "product": {"ref":"ProductEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "comment": {"dataType":"string","required":true},
            "reviewDate": {"dataType":"datetime","required":true},
            "user": {"ref":"UserEntity","required":true},
            "product": {"ref":"ProductEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderItemEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "orderId": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "price": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "order": {"ref":"OrderEntity","required":true},
            "product": {"ref":"ProductEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddressEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "buildingCompanyName": {"dataType":"string"},
            "street": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "postCode": {"dataType":"double","required":true},
            "userAddressses": {"dataType":"array","array":{"dataType":"refObject","ref":"UserAddressEntity"},"required":true},
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"UserEntity"},"required":true},
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CourrierEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "contactNumber": {"dataType":"string","required":true},
            "shippingCost": {"dataType":"double","required":true},
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReturnEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "orderId": {"dataType":"double","required":true},
            "returnDate": {"dataType":"datetime","required":true},
            "status": {"dataType":"string","required":true},
            "reason": {"dataType":"string","required":true},
            "refundMethod": {"dataType":"string","required":true},
            "total": {"dataType":"double","required":true},
            "order": {"ref":"OrderEntity","required":true},
            "returnItems": {"dataType":"array","array":{"dataType":"refObject","ref":"ReturnItemEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReturnItemEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "returnId": {"dataType":"double","required":true},
            "orderItemId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "return": {"ref":"ReturnEntity","required":true},
            "orderItem": {"ref":"OrderItemEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentCardEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "cardType": {"dataType":"string","required":true},
            "lastFourDigits": {"dataType":"string","required":true},
            "expiryMonth": {"dataType":"double","required":true},
            "expiryYear": {"dataType":"double","required":true},
            "cardToken": {"dataType":"string","required":true},
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderEntity"},"required":true},
            "refunds": {"dataType":"array","array":{"dataType":"refObject","ref":"RefundEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RefundEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "returnId": {"dataType":"double","required":true},
            "paymentCardId": {"dataType":"double","required":true},
            "date": {"dataType":"datetime","required":true},
            "amount": {"dataType":"double","required":true},
            "return": {"ref":"ReturnEntity","required":true},
            "paymentCard": {"ref":"PaymentCardEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderStatusEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "status": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "orderId": {"dataType":"double","required":true},
            "invoiceDate": {"dataType":"datetime","required":true},
            "totalDue": {"dataType":"double","required":true},
            "vatDue": {"dataType":"double","required":true},
            "order": {"ref":"OrderEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddressTypeEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "addressType": {"dataType":"string","required":true},
            "addresses": {"dataType":"array","array":{"dataType":"refObject","ref":"UserAddressEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WishlistEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "userId": {"dataType":"double","required":true},
            "user": {"ref":"UserEntity","required":true},
            "wishlistItems": {"dataType":"array","array":{"dataType":"refObject","ref":"WishlistItemEntity"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WishlistItemEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "wishlistId": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "wishlist": {"ref":"WishlistEntity","required":true},
            "product": {"ref":"ProductEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ShoppingCartEntity": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "user": {"ref":"UserEntity","required":true},
            "product": {"ref":"ProductEntity","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserModel": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "phoneNumbers": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "roles": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsers)),

            async function UserController_getUsers(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              templateService.apiHandler({
                methodName: 'getUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/users/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUser)),

            async function UserController_getUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              templateService.apiHandler({
                methodName: 'getUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
