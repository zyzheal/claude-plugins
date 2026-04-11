---
name: "Feature Development Skill"
description: "Interactive guidance for Phase 4 of the Senior Architect Collaboration workflow - Implementation, testing, and quality assurance. 功能开发、代码实现、TDD 测试驱动开发"
triggers:
  - "implement feature"
  - "develop code"
  - "write tests"
  - "code development"
  - "feature implementation"
  - "TDD development"
  - "实现功能"
  - "功能开发"
  - "代码开发"
  - "编写代码"
  - "编写测试"
  - "TDD 开发"
---

# Feature Development Skill

This skill guides developers through **Phase 4: Feature Development** of the collaborative workflow. It ensures disciplined implementation following TDD principles, comprehensive testing, and quality standards.

## When to Use

Use this skill when:
- Starting feature implementation
- Writing code for assigned tasks
- Need guidance on best practices
- Ensuring code quality and test coverage
- Tracking progress during development
- Resolving implementation challenges

## How to Use

Invoke the skill by describing your development task. The skill will:
1. **Review task requirements** from 开发任务.md
2. **Guide TDD approach** with test-first development
3. **Ensure code quality** with best practices
4. **Validate test coverage** (≥80% threshold)
5. **Update progress** and task status

## Development Workflow

### Phase 4 Execution Process

1. **Task Maintenance**
   - Read 技术文档.md and 开发任务.md
   - Understand task goals and acceptance criteria
   - Identify dependencies and prerequisites

2. **Development Execution**
   - Follow 开发任务.md step-by-step
   - Update task status after each subtask
   - Submit for review after completion

3. **Code Standards**
   - Follow project architecture and design patterns
   - Keep implementations simple unless complexity is required
   - Write self-documenting code with clear naming

4. **Testing Requirements**
   - Write tests BEFORE implementation (TDD)
   - Achieve ≥80% code coverage
   - Include unit, integration, and E2E tests as appropriate

## TDD Approach

This skill enforces **Test-Driven Development**:

### Step 1: Write Test (Red)
```typescript
// test/payment-processor.test.ts
describe('PaymentProcessor', () => {
  it('should process successful payment', async () => {
    // Given
    const order = createTestOrder(100);
    const paymentMethod = createTestPaymentMethod();

    // When
    const result = await paymentProcessor.process(order, paymentMethod);

    // Then
    expect(result.success).toBe(true);
    expect(result.transactionId).toBeDefined();
    expect(result.amount).toBe(100);
  });

  it('should handle insufficient inventory', async () => {
    // Given
    const order = createTestOrderWithUnavailableItems();
    const paymentMethod = createTestPaymentMethod();

    // When
    const result = await paymentProcessor.process(order, paymentMethod);

    // Then
    expect(result.success).toBe(false);
    expect(result.error).toBe('INSUFFICIENT_INVENTORY');
  });
});
```

### Step 2: Write Minimal Code (Green)
```typescript
// src/payment-processor.ts
export class PaymentProcessor {
  async process(order: Order, paymentMethod: PaymentMethod): Promise<PaymentResult> {
    // Minimal implementation to pass tests
    const inventory = await this.checkInventory(order.items);

    if (inventory.insufficient) {
      return {
        success: false,
        error: 'INSUFFICIENT_INVENTORY'
      };
    }

    const transaction = await this.chargePayment(order.total, paymentMethod);

    return {
      success: true,
      transactionId: transaction.id,
      amount: order.total
    };
  }

  private async checkInventory(items: OrderItem[]): Promise<InventoryStatus> {
    // Implementation
  }

  private async chargePayment(amount: number, paymentMethod: PaymentMethod): Promise<Transaction> {
    // Implementation
  }
}
```

### Step 3: Refactor (Refactor)
```typescript
// Improve code quality while keeping tests green
export class PaymentProcessor {
  constructor(
    private inventoryService: InventoryService,
    private paymentGateway: PaymentGateway,
    private orderRepository: OrderRepository
  ) {}

  async process(order: Order, paymentMethod: PaymentMethod): Promise<PaymentResult> {
    try {
      await this.validateOrder(order);
      await this.checkInventory(order.items);

      const transaction = await this.chargePayment(order.total, paymentMethod);
      await this.updateOrderStatus(order.id, 'paid');

      return {
        success: true,
        transactionId: transaction.id,
        amount: order.total
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
```

## Code Quality Standards

### 1. SOLID Principles

**Single Responsibility Principle**
```typescript
// ✅ Good - One reason to change
class OrderValidator {
  validate(order: Order): ValidationResult {
    // Only validates orders
  }
}

// ❌ Bad - Multiple responsibilities
class OrderProcessor {
  validate(order: Order): ValidationResult { }
  process(order: Order): OrderResult { }
  notify(order: Order): void { }
}
```

**Open/Closed Principle**
```typescript
// ✅ Good - Open for extension
abstract class PaymentMethod {
  abstract validate(): boolean;
  abstract charge(amount: number): Promise<PaymentResult>;
}

class CreditCardPayment extends PaymentMethod {
  validate(): boolean {
    // Credit card specific validation
  }
}

// ❌ Bad - Requires modification for new payment types
class PaymentProcessor {
  processPayment(method: string, amount: number) {
    if (method === 'credit') { /* ... */ }
    if (method === 'debit') { /* ... */ }
    // Need to modify for new methods
  }
}
```

### 2. Clean Code Practices

**Meaningful Names**
```typescript
// ✅ Good
const activeUsers = users.filter(user => user.status === UserStatus.ACTIVE);
const expiredOrders = orders.filter(order => order.expiryDate < now);

// ❌ Bad
const x = users.filter(u => u.s === UserStatus.ACTIVE);
const y = orders.filter(o => o.e < now);
```

**Functions Should Be Small**
```typescript
// ✅ Good
async function processOrder(order: Order): Promise<void> {
  await validateOrder(order);
  await checkInventory(order.items);
  await chargePayment(order);
  await updateOrderStatus(order.id, 'processed');
  await sendConfirmationEmail(order.customer);
}

// ❌ Bad
async function processOrder(order: Order): Promise<void> {
  // 100 lines of mixed logic
}
```

### 3. Error Handling

```typescript
// ✅ Good - Specific error handling
try {
  const result = await paymentGateway.charge(amount, paymentMethod);
  return { success: true, data: result };
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    return { success: false, error: 'INSUFFICIENT_FUNDS' };
  }
  if (error instanceof PaymentDeclinedError) {
    return { success: false, error: 'PAYMENT_DECLINED' };
  }
  logger.error('Unexpected payment error', error);
  return { success: false, error: 'PAYMENT_FAILED' };
}

// ❌ Bad - Generic error handling
try {
  return await paymentGateway.charge(amount, paymentMethod);
} catch (error) {
  return { success: false, error: 'ERROR' };
}
```

## Testing Requirements

### Coverage Threshold: ≥80%

**Coverage Report**
```
Statements   : 85.23% ( 234/275 )
Branches     : 82.14% ( 115/140 )
Functions    : 83.33% ( 50/60 )
Lines        : 84.61% ( 220/260 )
```

### Test Types

**1. Unit Tests**
```typescript
describe('OrderValidator', () => {
  describe('validate', () => {
    it('should reject orders with no items', () => {
      const emptyOrder = createOrderWithNoItems();
      const result = validator.validate(emptyOrder);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('NO_ITEMS');
    });
  });
});
```

**2. Integration Tests**
```typescript
describe('Payment Integration', () => {
  it('should complete full payment flow', async () => {
    const order = await createTestOrder();
    const payment = await processPayment(order, validPaymentMethod);

    expect(payment.success).toBe(true);

    const updatedOrder = await orderRepository.findById(order.id);
    expect(updatedOrder.status).toBe('PAID');
  });
});
```

**3. E2E Tests** (when applicable)
```typescript
describe('Checkout Flow E2E', () => {
  it('should complete purchase from cart to confirmation', async () => {
    await page.goto('/cart');
    await page.click('[data-testid=checkout-button]');
    await page.fill('[data-testid=shipping-address]', shippingAddress);
    await page.selectOption('[data-testid=payment-method]', 'credit-card');
    await page.click('[data-testid=place-order]');

    await expect(page.locator('[data-testid=order-confirmation]')).toBeVisible();
  });
});
```

## Progress Tracking

### Task Status Updates

Update 开发任务.md after each subtask:

```markdown
[ ] 任务1: 用户认证模块
  - **描述**: 实现账号密码登录功能
  - **进度**: 50%
  - **当前状态**: 进行中
  - **子任务**:
    - [x] 设计API接口
    - [x] 实现用户验证逻辑
    - [ ] 集成JWT token生成
    - [ ] 编写单元测试
    - [ ] 编写集成测试
  - **预计完成**: 2024-01-15
```

### Daily Progress Template

```markdown
## 2024-01-10 进度更新

### 完成
- ✅ API接口设计与评审
- ✅ 用户验证逻辑实现
- ✅ 单元测试编写 (覆盖率 85%)

### 进行中
- 🔄 JWT token集成 (预计完成时间: 2024-01-11)
  - 已完成: Token生成逻辑
  - 待完成: Token验证中间件

### 阻塞
- ⛔ 依赖外部认证服务配置 (等待 DevOps)

### 明日计划
- [ ] 完成JWT token集成
- [ ] 编写集成测试
- [ ] 代码审查准备

### 风险
- 外部服务配置可能延期，影响后续任务
```

## Code Review Checklist

Before submitting for review, ensure:

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] Test coverage ≥ 80%
- [ ] No commented-out code
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Documentation updated
- [ ] Self-review completed

### Review Comments Template

```markdown
## 代码审查结果

### 通过 ✅
- [代码区域]: [正面反馈]

### 需要修改 ⚠️
- [代码区域]: [问题描述]
  - 建议: [改进方案]
  - 影响: [如果未修复的影响]

### 严重问题 ❌
- [代码区域]: [严重问题]
  - 必须修复: [原因]
  - 建议: [解决方案]
```

## Best Practices

1. **Start with Tests** - Write failing test first
2. **Small Commits** - Commit often with clear messages
3. **Code Reviews** - Welcome feedback
4. **Refactor Continuously** - Improve code iteratively
5. **Document Decisions** - Explain why, not just what
6. **Handle Errors** - Plan for failure scenarios
7. **Monitor Performance** - Profile critical paths

## Example Workflow

### Scenario: Implementing User Authentication

```
Developer: "Help me implement user authentication"

Skill Guidance:

1. "Let's start with the test. What's the first user story?"
   → "User logs in with email and password"

2. "Write the test first. What should happen when credentials are valid?"
   → Shows TDD test example

3. "Now implement the minimal code to pass the test"
   → Provides code template

4. "Great! What's the next test case?"
   → "User enters invalid password"

5. "Continue this cycle until all scenarios are covered"

6. "Now let's add error handling tests"
   → Shows error handling patterns

7. "Time to refactor. Can you extract the validation logic?"
   → Guides refactoring

8. "Run coverage report - we need ≥80%"
   → Verifies coverage

9. "Update your task status and submit for review"
   → Completes workflow
```

## Debugging Guide

### Common Issues

**1. Test Failures**
```
Problem: Test passes locally but fails in CI
Solution:
- Check environment variables
- Verify test data isolation
- Ensure async operations complete
- Review timing dependencies
```

**2. Low Coverage**
```
Problem: Coverage below 80%
Solution:
- Identify uncovered branches
- Add edge case tests
- Test error handling paths
- Cover configuration branches
```

**3. Integration Issues**
```
Problem: Components don't work together
Solution:
- Check contract definitions
- Verify data formats
- Review integration points
- Add integration tests
```

## Quality Metrics

Track these metrics during development:

- **Code Coverage**: ≥ 80%
- **Cyclomatic Complexity**: ≤ 10 per function
- **Code Duplication**: ≤ 5%
- **Technical Debt Ratio**: ≤ 5%
- **Test Execution Time**: ≤ 5 minutes
- **Code Review Turnaround**: ≤ 24 hours

## Next Steps

After completing feature development:
1. Submit code for review
2. Address review feedback
3. Merge to main branch
4. Update task status to completed
5. Begin next task in 开发任务.md
6. Continue until all tasks complete

---

## Multi-Role Review Checklist (多角色评审清单)

### ⑩ 测试专家视角检查清单

- [ ] **单元测试覆盖率** - 代码覆盖率 ≥ 80%
- [ ] **边界条件测试** - 空值、极值、异常值测试完整
- [ ] **集成测试** - 模块交互、接口测试通过
- [ ] **E2E 测试** - 核心业务流程测试覆盖
- [ ] **测试数据** - 测试数据准备充分
- [ ] **自动化测试** - 测试脚本可自动化执行

### ⑪ 安全专家视角检查清单

- [ ] **输入验证** - 所有外部输入已验证
- [ ] **认证授权** - 权限校验完整
- [ ] **数据安全** - 敏感数据加密/脱敏
- [ ] **错误处理** - 错误信息不泄露敏感数据
- [ ] **依赖安全** - 无已知安全漏洞

---

## Completion Criteria

A feature is complete when:
- ✅ All acceptance criteria met
- ✅ Tests pass (unit, integration, E2E)
- ✅ Code coverage ≥ 80%
- ✅ Code review approved
- ✅ Documentation updated
- ✅ Feature deployed to environment
- ✅ QA validation passed
- ✅ Task status updated to completed

---

**Remember**: Quality is not an act, it is a habit. Follow TDD and maintain high standards throughout development.
