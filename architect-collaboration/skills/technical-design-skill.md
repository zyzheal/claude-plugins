---
name: "Technical Design Skill"
description: "Interactive guidance for Phase 2 of the Senior Architect Collaboration workflow - Technical architecture, solution design, and documentation. 技术方案设计、架构设计、TDD 方法"
triggers:
  - "design solution"
  - "technical architecture"
  - "TDD approach"
  - "system design"
  - "solution architecture"
  - "create technical design"
  - "设计方案"
  - "技术设计"
  - "架构设计"
  - "系统设计"
  - "技术方案"
  - "技术评审"
---

# Technical Design Skill

This skill guides senior architects through **Phase 2: Technical Design** of the collaborative workflow. It ensures comprehensive solution architecture, test-driven development approach, and complete technical documentation.

## When to Use

Use this skill when:
- Moving from requirements to technical implementation
- Designing system architecture
- Choosing technology stack
- Planning integration patterns
- Creating technical documentation
- Implementing TDD approach

## How to Use

Invoke the skill by describing your design challenge. The skill will:
1. **Analyze requirements** and identify technical implications
2. **Propose architecture options** with pros/cons
3. **Guide TDD approach** with test-first examples
4. **Generate technical documentation** with diagrams and pseudo-code
5. **Validate design** against requirements and constraints

## Key Activities

### 1. Feasibility Analysis (TDD Approach)

The skill helps you:
- Write test cases before implementation
- Identify edge cases and error scenarios
- Define interfaces and contracts
- Validate technical approach

### 2. Architecture Design

**Process**:
- Break down system into components
- Define component interactions
- Choose architectural patterns
- Document decision rationale

**Considerations**:
- Scalability requirements
- Performance constraints
- Security implications
- Maintainability
- Integration points

### 3. Documentation Generation

The skill creates:
- Technical Design Document
- Flow diagrams
- Component architecture
- API specifications
- Database design (if applicable)

## Outputs Generated

The skill creates a comprehensive **Technical Design Document**:

```markdown
## 1. 需求基础

### 1.1 需求详情
- 核心需求描述
- 需求目的：背景与上下文
- 历史业务逻辑（可选）：关联的过往逻辑

### 1.2 技术约束
- 技术栈限制
- 性能要求
- 安全要求
- 合规要求

## 2. 技术方案

### 2.1 业务逻辑
- 核心逻辑描述
- 业务流程图
- 状态转换图
- 数据流图

### 2.2 架构设计

#### 2.2.1 整体架构
- 架构图
- 分层设计
- 模块划分
- 组件职责

#### 2.2.2 详细设计
- 核心组件详细设计
- 接口设计
- 数据模型
- 算法设计

#### 2.2.3 集成设计
- 外部系统集成
- API设计
- 消息传递
- 事件驱动架构

### 2.3 关键技术选择

#### 2.3.1 技术栈
- 后端技术选择及理由
- 前端技术选择及理由
- 数据库选择及理由
- 中间件选择及理由

#### 2.3.2 框架与工具
- 开发框架
- 测试框架
- 监控工具
- 部署工具

### 2.4 伪代码

```pseudo
// 核心算法伪代码
// 包含关键步骤、判断/循环、边界条件

function processPayment(orderId, paymentMethod):
    // 验证订单
    order = validateOrder(orderId)
    if not order:
        throw OrderNotFoundError

    // 检查库存
    inventory = checkInventory(order.items)
    if inventory.insufficient:
        throw InsufficientInventoryError

    // 处理支付
    payment = processPaymentTransaction(order.total, paymentMethod)
    if payment.failed:
        handlePaymentFailure(payment)
        return PaymentResult(success: false, reason: payment.error)

    // 更新订单状态
    updateOrderStatus(orderId, "paid")

    // 触发后续流程
    triggerFulfillmentWorkflow(orderId)

    return PaymentResult(success: true, transactionId: payment.id)
```

### 2.5 错误处理

#### 2.5.1 错误分类
- 业务错误
- 系统错误
- 外部依赖错误

#### 2.5.2 处理策略
- 重试机制
- 回滚策略
- 降级方案
- 错误监控

## 3. 数据库设计（如适用）

### 3.1 概念模型
- ER图
- 实体关系
- 业务规则

### 3.2 逻辑模型
- 表结构设计
- 索引策略
- 分区策略

### 3.3 物理模型
- 存储引擎
- 性能优化
- 备份策略

## 4. API设计（如适用）

### 4.1 RESTful API
- 端点列表
- 请求/响应格式
- 状态码
- 错误处理

### 4.2 GraphQL API（如适用）
- Schema定义
- 查询类型
- 变更类型
- 订阅类型

## 5. 测试策略

### 5.1 测试金字塔
- 单元测试覆盖
- 集成测试覆盖
- 端到端测试覆盖

### 5.2 TDD实施
```pseudo
// 测试用例示例
describe("PaymentProcessor"):
    test("should process successful payment"):
        // Given
        order = createTestOrder(amount: 100)
        paymentMethod = createTestPaymentMethod()

        // When
        result = processPayment(order, paymentMethod)

        // Then
        assert(result.success == true)
        assert(result.transactionId != null)
        assert(order.status == "paid")

    test("should handle insufficient inventory"):
        // Given
        order = createTestOrder(items: [unavailableItem])
        paymentMethod = createTestPaymentMethod()

        // When
        result = processPayment(order, paymentMethod)

        // Then
        assert(result.success == false)
        assert(result.error == "INSUFFICIENT_INVENTORY")
        assert(order.status == "pending")
```

## 6. 性能考虑

### 6.1 性能目标
- 响应时间要求
- 吞吐量要求
- 并发用户数
- 数据处理量

### 6.2 性能优化策略
- 缓存策略
- 异步处理
- 数据库优化
- CDN使用

### 6.3 监控与度量
- 关键性能指标
- 监控方案
- 告警策略

## 7. 安全设计

### 7.1 认证与授权
- 身份验证机制
- 权限控制模型
- 会话管理

### 7.2 数据安全
- 数据加密
- 敏感数据处理
- 数据脱敏

### 7.3 安全防护
- XSS防护
- CSRF防护
- SQL注入防护
- 输入验证

## 8. 部署架构

### 8.1 环境规划
- 开发环境
- 测试环境
- 预生产环境
- 生产环境

### 8.2 部署策略
- 容器化方案
- CI/CD流程
- 蓝绿部署
- 滚动更新

### 8.3 运维监控
- 日志收集
- 性能监控
- 错误追踪
- 健康检查

## 9. 风险评估

### 9.1 技术风险
- 技术选型风险
- 集成风险
- 性能风险
- 安全风险

### 9.2 应对策略
- 风险缓解措施
- 备用方案
- 监控预警

## 10. 实施计划

### 10.1 开发阶段
- 阶段划分
- 里程碑
- 交付物

### 10.2 任务分解
- 任务列表
- 依赖关系
- 优先级

### 10.3 时间估算
- 工作量估算
- 关键路径
- 缓冲时间
```

## TDD Approach

This skill emphasizes **Test-Driven Development**:

1. **Write Tests First**
   - Define expected behavior
   - Identify edge cases
   - Create acceptance criteria

2. **Implement Minimal Code**
   - Make tests pass
   - Keep it simple
   - Refactor continuously

3. **Validate Design**
   - Ensure tests cover requirements
   - Verify error handling
   - Check edge cases

## Quality Criteria

Technical design is validated against:

- ✅ **Completeness** - All requirements addressed
- ✅ **Consistency** - Design is coherent
- ✅ **Correctness** - Design meets requirements
- ✅ **Clarity** - Easy to understand
- ✅ **Feasibility** - Can be implemented
- ✅ **Maintainability** - Easy to evolve

---

## Multi-Role Review Checklist (多角色评审清单)

### ⑧ 数据库专家视角检查清单

- [ ] **表结构设计** - ER 图完整、范式/反范式合理
- [ ] **索引策略** - 查询热点已分析、索引覆盖合理
- [ ] **数据一致性** - 事务边界清晰、隔离级别适当
- [ ] **扩展性** - 分区/分片策略、读写分离设计
- [ ] **备份恢复** - 备份策略、RTO/RPO 定义

### ⑬ 可观测性专家视角检查清单

- [ ] **日志设计** - 结构化日志、日志级别、敏感数据脱敏
- [ ] **指标监控** - 关键业务指标、技术指标已定义
- [ ] **链路追踪** - 分布式追踪方案、TraceID 传递
- [ ] **告警设计** - 告警分级、收敛策略、通知渠道
- [ ] **Dashboard** - 关键视图已定义

### ⑮ SRE 专家视角检查清单

- [ ] **SLO 定义** - 可用性、延迟、吞吐量 SLO 已定义
- [ ] **故障域隔离** - 优雅降级、熔断、限流设计
- [ ] **灾备设计** - 多活/主备、故障切换策略
- [ ] **容量规划** - 资源估算、弹性伸缩策略
- [ ] **Runbook** - 故障处理流程已定义

### ⑦ AI/算法专家视角检查清单（如适用）

- [ ] **模型选型** - 模型对比、选型理由充分
- [ ] **推理延迟** - 延迟预算、优化策略
- [ ] **Token 成本** - 成本估算、优化方案
- [ ] **Prompt 管理** - Prompt 版本管理、测试策略

### ⑨ 开源集成视角检查清单

- [ ] **选型成熟度** - 社区活跃度、版本稳定性
- [ ] **License 合规** - License 清单、合规风险
- [ ] **替代方案** - 备选方案、迁移成本

### ⑭ 中间件专家视角检查清单

- [ ] **消息队列** - 选型合理、消息可靠性保证
- [ ] **缓存设计** - 缓存策略、一致性方案
- [ ] **API 网关** - 路由、限流、认证设计
- [ ] **高可用** - 集群、故障切换设计

### ⑪ 安全专家视角检查清单

- [ ] **威胁建模** - STRIDE 分析完成
- [ ] **认证授权** - 认证流程、权限模型清晰
- [ ] **数据加密** - 传输/存储加密方案
- [ ] **OWASP 防护** - Top 10 防护措施到位

### ⑫ 合规专家视角检查清单

- [ ] **数据本地化** - 数据驻留要求满足
- [ ] **隐私保护** - GDPR/个人信息保护合规
- [ ] **审计要求** - 审计日志、追溯能力

---

## Enterprise Architecture Checklist (企业级架构检查清单)

Before completing Phase 2, ensure enterprise-level concerns are addressed:

| 角色 | 评审维度 | 检查状态 | 产出物 |
|------|----------|----------|--------|
| ⑧ 数据库专家 | 表结构、索引、一致性、扩展性 | [ ] | ER 图、索引分析报告 |
| ⑬ 可观测性专家 | 日志、指标、追踪、告警 | [ ] | 监控 Dashboard、告警规则表 |
| ⑮ SRE 专家 | SLO、故障域、灾备、容量 | [ ] | SLO 报告、故障树、降级策略表 |
| ⑦ AI/算法专家 | 模型选型、延迟、成本 | [ ] | 模型选型对比表、成本估算表 |
| ⑨ 开源集成专家 | 成熟度、License、社区 | [ ] | 技术选型对比表、License 清单 |
| ⑭ 中间件专家 | MQ、缓存、网关、高可用 | [ ] | 消息流向图、缓存架构拓扑 |
| ⑪ 安全专家 | 威胁建模、认证、加密、OWASP | [ ] | 威胁模型图、安全架构设计 |
| ⑫ 合规专家 | 数据本地化、隐私、审计 | [ ] | 合规检查清单、数据流向图 |

## Best Practices

1. **Document Decisions** - Record why you chose each option
2. **Consider Trade-offs** - Acknowledge pros/cons
3. **Plan for Failure** - Design for resilience
4. **Keep It Simple** - Avoid over-engineering
5. **Version Your Design** - Track evolution

## Examples

### Example 1: Payment System
```
"Design a payment processing system"

The skill will guide you through:
- Architecture options (microservices vs monolith)
- Payment flow design
- Error handling and retries
- Security and PCI compliance
- Integration with payment gateways
- TDD approach with test cases
```

### Example 2: Real-time Analytics
```
"Design real-time user analytics pipeline"

The skill will explore:
- Event streaming architecture
- Data processing pipeline
- Aggregation strategies
- Query performance optimization
- Scalability planning
```

## Risk Communication

This skill proactively identifies:

- **Architecture Risks**: Scalability limits, single points of failure
- **Technology Risks**: Immature technologies, vendor lock-in
- **Integration Risks**: External dependencies, API changes
- **Performance Risks**: Bottlenecks, resource constraints
- **Security Risks**: Vulnerabilities, compliance gaps

## Next Steps

After completing technical design:
1. Review technical design document
2. Validate with technical team
3. Proceed to **Phase 3: Task Breakdown**
4. Use Task Breakdown Skill for implementation planning

---

**Remember**: Good technical design prevents costly refactoring and enables smooth development.
