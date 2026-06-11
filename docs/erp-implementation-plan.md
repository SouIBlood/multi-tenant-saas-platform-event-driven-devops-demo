# ERP Backend Implementation Plan

This document captures the exact implementation plan for the SaaS ERP backend in `apps/backend`.

## Phase 1: Infrastructure and dependencies

1. Add runtime dependencies
   - `typeorm`
   - `pg`
   - `@nestjs/typeorm`
   - `bullmq`
   - `ioredis`
   - `pusher`

2. Extend `apps/backend/src/config/`
   - add `redis.config.ts`
   - add `pusher.config.ts`

3. Update `apps/backend/src/config/db.config.ts`
   - support Postgres-specific DB configuration
   - include DB host/port/user/password/name/logging

4. Update `apps/backend/src/app.module.ts`
   - import `TypeOrmModule.forRoot(...)`
   - import a new `QueueModule`
   - import new ERP feature modules when defined

## Phase 2: Domain entity design

Create TypeORM entities for:

- `Tenant`
  - owns organizations
- `Organization`
  - belongs to tenant
  - owns branches, users, master data, sales orders
- `Branch`
  - belongs to organization
  - has `morningNotificationTime`
  - has `notificationEnabled`
- `User`
  - belongs to tenant
  - belongs to organization
  - maps to Auth0 identity
- `Driver`
  - organization-scoped profile
  - linked to `User`
- `BranchDriverAccess`
  - join table for drivers/users and branches
  - allows driver eligibility by branch
- `Customer`
  - organization-scoped
  - fields: `name`, `contactPhone`
- `Item`
  - organization-scoped
  - fields: `name`, `sku`, `price`
- `SalesOrder`
  - belongs to organization
  - references `Customer`
  - contains line items
- `SalesOrderLineItem`
  - references `Item`
  - includes quantity and price
- `DeliveryOrder`
  - belongs to branch
  - references `SalesOrder`
  - assigned to one `Driver`
  - has status and completion metadata

## Phase 3: Module and GraphQL structure

Create new Nest modules under `apps/backend/src/app/modules/`:

- `tenant/`
  - `tenant.module.ts`
  - `tenant.resolver.ts`
  - `tenant.service.ts`
- `organization/`
  - `organization.module.ts`
  - `organization.resolver.ts`
  - `organization.service.ts`
- `branch/`
  - `branch.module.ts`
  - `branch.resolver.ts`
  - `branch.service.ts`
- `user/`
  - `user.module.ts`
  - `user.service.ts`
  - optionally `user.resolver.ts`
- `driver/`
  - `driver.module.ts`
  - `driver.resolver.ts`
  - `driver.service.ts`
- `master-data/`
  - `customer.module.ts`
  - `item.module.ts`
  - `customer.resolver.ts`
  - `item.resolver.ts`
  - `customer.service.ts`
  - `item.service.ts`
- `order/`
  - `order.module.ts`
  - `order.resolver.ts`
  - `order.service.ts`
  - `delivery-order.resolver.ts`
  - `delivery-order.service.ts`
- `notification/`
  - `notification.module.ts`
  - `notification.service.ts`
  - `notification.queue.ts`

Use `HelloModule` as the structural template for module/resolver patterns.

## Phase 4: GraphQL API design

Expose the following operations and types:

- Tenant registration with first admin user
- Organization CRUD
- Branch CRUD and branch notification config
- User/driver profile mapping
- Customer and Item master data CRUD
- Sales order creation and querying
- Delivery order creation from sales order
- Delivery order driver assignment
- Delivery order completion status update
- Manual notification triggers:
  - assign-notification trigger
  - branch today-orders trigger

Queries should include:

- driver branch eligibility
- branch today’s orders summary
- delivery order status

## Phase 5: Auth and tenancy enforcement

1. Keep `UserAuthGuard` and `User` decorator
   - continue Auth0 JWT auth flow

2. Map authenticated users to local records
   - resolve local `User` from Auth0 identity
   - store tenant and organization membership

3. Enforce scope in services and resolvers
   - tenant-level operations limited to authenticated tenant
   - organization-level data cannot cross organizations
   - branch and delivery actions validate branch access

4. Driver eligibility
   - allow assignment only if driver has access to the branch

## Phase 6: Queue and notification workflow

1. Create `QueueModule`
   - configure BullMQ with Redis from `redis.config.ts`
   - provide producer service for jobs
   - register worker(s) for notification jobs

2. Job types
   - `DeliveryOrderAssignedJob`
   - `BranchMorningDigestJob`
   - `ManualBranchDigestJob`

3. Notification service
   - wrap Pusher publish logic
   - use driver-specific channels for assigned orders
   - use branch-scoped channels for morning summaries

4. Job behavior
   - enqueue assignment notifications immediately on assignment
   - enqueue manual branch digest immediately on trigger
   - execute branch morning digests at branch-configured morning time

5. Push notification payloads
   - keep payloads generic and event-driven
   - include assigned order metadata and today-order summary metadata

## Phase 7: Verification and testing

1. Unit tests
   - service logic for tenancy and scope
   - driver assignment eligibility
   - order creation and status flows
   - notification job enqueueing

2. Integration tests
   - sales order → delivery order assignment → driver notification
   - manual notification trigger behavior

3. Build/test checks
   - verify `pnpm` build for `apps/backend`
   - confirm GraphQL schema generation and endpoint availability
   - test Redis/BullMQ and Pusher wiring

## Files and areas to update

- `apps/backend/package.json`
- `apps/backend/src/app.module.ts`
- `apps/backend/src/config/db.config.ts`
- `apps/backend/src/config/app.config.ts`
- `apps/backend/src/config/auth.config.ts`
- `apps/backend/src/config/redis.config.ts`
- `apps/backend/src/config/pusher.config.ts`
- `apps/backend/src/app/modules/*`
- `apps/backend/src/auth/user-auth.guard.ts`
- `apps/backend/src/app/helpers/http.helper.ts` if needed
- `apps/backend/src/test/*`

## Final decisions

- Persistence: `Postgres`
- ORM: `TypeORM`
- Notifications: `BullMQ + Redis` for jobs, `Pusher` for real-time delivery
- Driver: organization-scoped profile attached to existing user
- Data scope: `Customer`, `Item`, and driver branch access under organization
- Sales order: organization-scoped
- Delivery order: branch-scoped and assigned to eligible drivers
