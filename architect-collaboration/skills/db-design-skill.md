---
name: "DB Design Skill"
description: "Professional database design review capability covering ER modeling, index strategy, data consistency, scaling, backup/recovery. 数据库设计、ER 建模、索引优化、分库分表"
triggers:
  - "database design"
  - "ER modeling"
  - "index strategy"
  - "schema design"
  - "数据库设计"
  - "ER 图"
  - "索引优化"
  - "表结构设计"
  - "数据库评审"
  - "数据建模"
---

# DB Design Skill - 数据库专家评审技能

本技能提供专业的数据库设计评审能力，覆盖概念模型、逻辑模型、物理模型全生命周期。

## 参与阶段

| 阶段 | 评审重点 | 产出物 |
|------|----------|--------|
| **Phase 1 需求分析** | 数据需求分析、实体识别 | 初步 ER 图、数据字典 |
| **Phase 2 技术设计** | 表结构设计、索引策略、一致性方案 | 完整 ER 图、DDL 脚本、索引分析报告 |
| **Phase 4 功能开发** | SQL 审查、性能优化 | SQL 审查报告、慢查询分析 |
| **发布评审** | 数据迁移、备份策略验证 | 数据迁移方案、灾备报告 |

---

## 评审维度

### 1. 概念模型设计 (Conceptual Design)

| 检查项 | 说明 | 检查方法 |
|--------|------|----------|
| **实体识别** | 是否识别所有业务实体 | 对照需求文档检查 |
| **关系定义** | 实体间关系是否清晰 (1:1/1:N/M:N) | 检查 ER 图关系连线 |
| **主键设计** | 主键选择是否合理 | 检查业务主键 vs 代理主键 |
| **属性完整性** | 实体属性是否完整 | 检查字段覆盖度 |

**设计原则**：
- 实体职责单一，符合单一职责原则
- 关系方向正确，避免循环依赖
- 主键稳定，不随业务变化

---

### 2. 逻辑模型设计 (Logical Design)

| 检查项 | 说明 | 合格标准 |
|--------|------|----------|
| **范式选择** | 范式/反范式选择合理 | 核心业务 3NF，查询优化适当反范式 |
| **表结构设计** | 字段类型、长度合理 | 无过度设计或设计不足 |
| **约束定义** | 主键、外键、唯一约束完整 | 数据完整性有保障 |
| **默认值** | 默认值设置合理 | 避免 NULL 陷阱 |

**范式检查清单**：
- [ ] **1NF** - 字段原子性，不可再分
- [ ] **2NF** - 非主键字段完全依赖于主键
- [ ] **3NF** - 非主键字段间无传递依赖
- [ ] **BCNF** - 所有决定因素都是候选键 (如需要)

---

### 3. 索引策略 (Index Strategy)

| 检查项 | 说明 | 检查方法 |
|--------|------|----------|
| **查询热点分析** | 是否识别高频查询 | 分析业务场景、SQL 日志 |
| **覆盖索引** | 高频查询是否有覆盖索引 | 检查 EXPLAIN 计划 |
| **复合索引** | 复合索引字段顺序合理 | 最左前缀原则 |
| **唯一索引** | 业务唯一键是否有唯一索引 | 检查唯一约束 |
| **索引维护** | 索引更新成本评估 | 写密集型表谨慎建索引 |

**索引设计原则**：
```
✅ 应该建索引的场景：
- WHERE 子句字段
- JOIN 连接字段
- ORDER BY 字段
- GROUP BY 字段
- 区分度高的字段（基数/表行数 > 0.1）

❌ 不建议建索引的场景：
- 表记录数少（< 1000）
- 字段区分度低（如性别、状态）
- 频繁更新的字段
- 大文本字段
```

---

### 4. 数据一致性 (Data Consistency)

| 检查项 | 说明 | 解决方案 |
|--------|------|----------|
| **事务边界** | 事务范围是否合理 | 避免长事务 |
| **隔离级别** | 隔离级别选择适当 | 读已提交/可重复读 |
| **并发控制** | 并发更新是否有锁机制 | 乐观锁/悲观锁 |
| **分布式事务** | 跨库/服务事务方案 | TCC/Saga/最终一致性 |

**一致性方案选择**：
```
| 场景 | 一致性要求 | 推荐方案 |
|------|------------|----------|
| 支付/转账 | 强一致性 | 本地事务/XA |
| 库存扣减 | 最终一致性 | TCC/ Saga |
| 用户信息更新 | 最终一致性 | 消息队列 |
| 订单状态流转 | 强一致性 | 状态机 + 本地事务 |
```

---

### 5. 扩展性设计 (Scalability)

| 检查项 | 说明 | 检查方法 |
|--------|------|----------|
| **分区策略** | 是否定义分区方案 | 按时间/范围/哈希分区 |
| **分片策略** | 水平拆分方案 | 分片键选择合理 |
| **读写分离** | 读写分离方案 | 主从复制、读写路由 |
| **归档策略** | 历史数据归档方案 | 冷热数据分离 |

**分片键选择原则**：
- 高频查询字段
- 数据分布均匀
- 避免数据倾斜
- 支持跨片查询最小化

---

### 6. 备份与恢复 (Backup & Recovery)

| 检查项 | 说明 | 合格标准 |
|--------|------|----------|
| **备份策略** | 全量/增量备份计划 | RPO ≤ 1 小时 |
| **恢复演练** | 恢复流程验证 | RTO ≤ 4 小时 |
| **日志保留** | Binlog/WAL 保留策略 | 满足审计要求 |
| **异地容灾** | 异地备份方案 | 关键数据异地存储 |

---

## 评审流程

### Phase 2: 技术设计评审

```markdown
1. ER 图审查
   ├── 实体完整性检查
   ├── 关系合理性检查
   └── 属性覆盖度检查

2. 表结构设计审查
   ├── 字段类型检查
   ├── 约束完整性检查
   └── 范式合规性检查

3. 索引策略审查
   ├── 查询热点分析
   ├── 索引覆盖检查
   └── 索引效率评估

4. 产出物
   ├── ER 图（概念/逻辑/物理）
   ├── DDL 脚本
   ├── 索引设计报告
   └── 数据字典
```

### Phase 4: SQL 审查

```markdown
1. SQL 静态分析
   ├── EXPLAIN 执行计划分析
   ├── 索引使用情况检查
   └── 潜在慢查询识别

2. SQL 优化建议
   ├── 查询重写建议
   ├── 索引优化建议
   └── 批量操作建议

3. 产出物
   └── SQL 审查报告
```

---

## 输出格式

### 数据库设计评审报告

```markdown
# 数据库设计评审报告

**评审对象**: [项目/功能名称]
**评审人**: Database Expert
**评审时间**: YYYY-MM-DD
**评审阶段**: Phase 2/Phase 4

---

## 📊 评审结论

**总体评级**: ✅ 通过 / ⚠️ 条件通过 / ❌ 不通过

| 维度 | 得分 | 满分 | 评级 |
|------|------|------|------|
| 概念模型 | XX | 15 | 🟢/🟡/🔴 |
| 逻辑模型 | XX | 20 | 🟢/🟡/🔴 |
| 索引策略 | XX | 25 | 🟢/🟡/🔴 |
| 数据一致性 | XX | 20 | 🟢/🟡/🔴 |
| 扩展性 | XX | 10 | 🟢/🟡/🔴 |
| 备份恢复 | XX | 10 | 🟢/🟡/🔴 |
| **总分** | **XX** | **100** | **A/B/C/D** |

---

## 🔴 阻塞问题 (必须修复)

### [编号] 问题简述
- **位置**: `表名/字段名`
- **风险等级**: 高/中/低
- **问题描述**: [详细说明]
- **影响范围**: [影响的功能]
- **修复建议**: 
  ```sql
  -- 修复前
  [原 DDL/SQL]
  
  -- 修复后
  [建议 DDL/SQL]
  ```

---

## 🟠 严重问题 (强烈建议修复)

[格式同上]

---

## 🟡 主要问题 (推荐修复)

[格式同上]

---

## 🟢 次要问题 (可选优化)

[格式同上]

---

## ✅ 设计亮点

- [值得肯定的设计]
- [优秀的实践]

---

## 📋 行动项

| 优先级 | 问题编号 | 描述 | 责任人 | 截止日期 |
|--------|----------|------|--------|----------|
| P0 | #1 | [问题简述] | @xxx | [日期] |
| P1 | #2 | [问题简述] | @xxx | [日期] |

---

## 附录：检查清单

### 概念模型
- [ ] 所有业务实体已识别
- [ ] 实体关系定义清晰
- [ ] 主键选择合理

### 逻辑模型
- [ ] 表结构符合 3NF（或反范式有理由）
- [ ] 字段类型选择合理
- [ ] 约束完整（主键、外键、唯一、检查）

### 索引策略
- [ ] 高频查询有覆盖索引
- [ ] 复合索引顺序合理
- [ ] 索引数量适中

### 数据一致性
- [ ] 事务边界清晰
- [ ] 隔离级别适当
- [ ] 并发控制方案明确

### 扩展性
- [ ] 分区/分片策略定义
- [ ] 读写分离方案明确
- [ ] 归档策略定义

### 备份恢复
- [ ] 备份策略定义
- [ ] 恢复流程文档化
- [ ] RTO/RPO 定义
```

---

## 数据库设计模板

### DDL 脚本模板

```sql
-- ============================================
-- 表名：users
-- 描述：用户基础信息表
-- 数据量预估：1000 万
-- 增长预测：10 万/月
-- ============================================

CREATE TABLE users (
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户 ID',
    username        VARCHAR(64) NOT NULL COMMENT '用户名',
    email           VARCHAR(128) NOT NULL COMMENT '邮箱',
    password_hash   VARCHAR(255) NOT NULL COMMENT '密码哈希 (bcrypt)',
    phone           VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    status          TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1-正常 0-禁用',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username),
    UNIQUE KEY uk_email (email),
    KEY idx_status_created (status, created_at),
    KEY idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基础信息表';
```

---

## 常见反模式

### 1. 表设计反模式

```sql
-- ❌ 错误：字段缺乏原子性
CREATE TABLE users (
    full_address VARCHAR(255)  -- 包含省市区街道
);

-- ✅ 正确：拆分为原子字段
CREATE TABLE users (
    province VARCHAR(50),
    city VARCHAR(50),
    district VARCHAR(50),
    street VARCHAR(100)
);
```

### 2. 索引反模式

```sql
-- ❌ 错误：区分度低的字段建索引
CREATE INDEX idx_gender ON users(gender);  -- 性别只有 2 个值

-- ❌ 错误：索引过多
CREATE INDEX idx_created ON users(created_at);
CREATE INDEX idx_updated ON users(updated_at);
CREATE INDEX idx_status ON users(status);
-- 写操作需要维护多个索引

-- ✅ 正确：复合索引
CREATE INDEX idx_status_created ON users(status, created_at);
```

### 3. SQL 反模式

```sql
-- ❌ 错误：SELECT *
SELECT * FROM users WHERE id = 1;

-- ✅ 正确：只选择需要的字段
SELECT id, username, email FROM users WHERE id = 1;

-- ❌ 错误：隐式类型转换
SELECT * FROM users WHERE phone = 13800138000;  -- phone 是字符串

-- ✅ 正确：显式类型匹配
SELECT * FROM users WHERE phone = '13800138000';

-- ❌ 错误：LIKE 前缀通配符
SELECT * FROM users WHERE email LIKE '%@gmail.com';  -- 无法使用索引

-- ✅ 正确：使用全文索引或其他方案
```

### 4. 事务反模式

```sql
-- ❌ 错误：长事务
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- 执行耗时操作（HTTP 请求、文件 IO）
COMMIT;

-- ✅ 正确：短事务
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

---

## 工具推荐

| 类型 | 工具 | 用途 |
|------|------|------|
| **建模工具** | MySQL Workbench, dbdiagram.io | ER 图设计 |
| **SQL 分析** | EXPLAIN, pt-query-digest | 执行计划分析 |
| **性能监控** | Percona Monitoring, Prometheus MySQL | 性能指标监控 |
| **数据同步** | Canal, Debezium | CDC 数据同步 |
| **备份工具** | mysqldump, XtraBackup | 数据备份 |

---

## 与其他 Skill 集成

### 与 Technical Design Skill 集成

```
Technical Design Skill
    ↓
生成系统架构设计
    ↓
DB Design Skill (自动/手动触发)
    ↓
数据库设计评审
    ↓
输出：ER 图、DDL 脚本、索引报告 → 反馈给 Technical Design
```

### 与 Security Review Skill 集成

```
DB Design Skill
    ↓
识别敏感数据字段
    ↓
Security Review Skill
    ↓
加密方案评审
    ↓
输出：数据加密策略
```

---

## 触发方式

### 自然语言触发

```
# Phase 2 技术设计阶段
"设计数据库表结构"
"画 ER 图"
"设计索引策略"
"评审数据库设计"
"设计分库分表方案"

# Phase 4 功能开发阶段
"审查 SQL 性能"
"优化慢查询"
"分析执行计划"
```

---

**版本**: v1.0
**最后更新**: 2024-01-15
**参考标准**: Data Model Patterns, SQL Performance Explained
