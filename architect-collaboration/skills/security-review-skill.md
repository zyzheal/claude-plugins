---
name: "Security Review Skill"
description: Professional security review capability covering threat modeling, OWASP Top 10, API security, data encryption. 安全评审、威胁建模、OWASP 检查、API 安全
triggers:
  - "security review"
  - "threat modeling"
  - "security assessment"
  - "安全评审"
  - "安全检查"
  - "威胁建模"
  - "漏洞扫描"
  - "API 安全"
  - "数据安全"
---

# Security Review Skill - 安全专家评审技能

本技能提供专业、系统的安全评审能力，覆盖架构设计、开发实现、发布上线全生命周期。

## 参与阶段

| 阶段 | 评审重点 | 产出物 |
|------|----------|--------|
| **Phase 2 技术设计** | 威胁建模、安全架构、认证授权设计 | 威胁模型图、安全架构设计 |
| **Phase 4 功能开发** | 代码安全、API 安全、输入验证 | 安全代码审查报告 |
| **发布评审** | 漏洞扫描、渗透测试、合规检查 | 安全发布报告 |

---

## 评审维度

### 1. 认证与授权 (Authentication & Authorization)

| 检查项 | 说明 | 检查方法 |
|--------|------|----------|
| **身份验证** | 用户认证机制是否安全 | 检查登录流程、MFA 支持 |
| **会话管理** | Session/JWT 管理是否安全 | 检查过期时间、刷新机制 |
| **权限控制** | RBAC/ABAC 模型是否完善 | 检查权限矩阵、越权访问 |
| **API 认证** | API 访问是否有认证 | 检查 API Key、OAuth、JWT |

**安全红线**（发现即阻塞）：
- 明文传输密码
- 无速率限制的登录接口
- 硬编码凭证
- 权限校验缺失的敏感接口

---

### 2. 数据安全 (Data Security)

| 检查项 | 说明 | 检查方法 |
|--------|------|----------|
| **传输加密** | HTTPS/TLS 是否启用 | 检查证书、TLS 版本 |
| **存储加密** | 敏感数据是否加密存储 | 检查密码、密钥、PII 加密 |
| **数据脱敏** | 日志/展示是否脱敏 | 检查日志、API 响应 |
| **密钥管理** | 密钥是否安全存储 | 检查密钥管理系统、轮转策略 |

**安全红线**：
- 明文存储密码（应使用 bcrypt/argon2）
- 日志中记录敏感数据
- 硬编码 API 密钥

---

### 3. OWASP Top 10 防护

| 风险 | 检查项 | 防护措施 |
|------|--------|----------|
| **A01: Broken Access Control** | 越权访问检查 | 权限校验、最小权限原则 |
| **A02: Cryptographic Failures** | 加密机制检查 | 强加密算法、密钥管理 |
| **A03: Injection** | SQL/命令注入检查 | 参数化查询、输入验证 |
| **A04: Insecure Design** | 设计缺陷检查 | 威胁建模、安全设计模式 |
| **A05: Security Misconfiguration** | 配置安全检查 | 默认配置、错误处理 |
| **A06: Vulnerable Components** | 依赖安全检查 | SCA 扫描、漏洞监控 |
| **A07: Auth Failures** | 认证失败检查 | MFA、登录限制、会话管理 |
| **A08: Data Integrity** | 数据完整性检查 | 数字签名、校验和 |
| **A09: Logging Failures** | 日志审计检查 | 安全事件日志、审计追踪 |
| **A10: SSRF** | 服务端请求伪造 | URL 验证、白名单机制 |

---

### 4. API 安全

| 检查项 | 说明 | 检查方法 |
|--------|------|----------|
| **输入验证** | 所有输入是否验证 | 检查参数校验、类型检查 |
| **输出编码** | 输出是否适当编码 | 检查 XSS 防护 |
| **速率限制** | API 限流是否配置 | 检查 Rate Limiting |
| **错误处理** | 错误信息是否泄露 | 检查错误返回 |
| **CORS** | 跨域配置是否正确 | 检查 CORS 策略 |

---

### 5. 依赖安全

| 检查项 | 说明 | 检查方法 |
|--------|------|----------|
| **SCA 扫描** | 依赖是否有已知漏洞 | 检查 Snyk/Dependabot 报告 |
| **License 合规** | License 是否符合要求 | 检查 License 清单 |
| **社区活跃度** | 依赖是否维护良好 | 检查最后更新时间、Issue 数 |
| **版本锁定** | 是否锁定依赖版本 | 检查 lock 文件 |

---

## 评审流程

### Phase 2: 技术设计安全评审

```
1. 威胁建模 (Threat Modeling)
   ├── 识别资产 (Assets)
   ├── 识别威胁 (STRIDE 模型)
   ├── 评估风险 (DREAD 评分)
   └── 制定缓解措施

2. 安全架构设计
   ├── 认证授权架构
   ├── 数据加密策略
   ├── 网络安全设计
   └── 日志审计设计

3. 产出物
   ├── 威胁模型图
   ├── 安全架构设计文档
   └── 安全需求清单
```

### Phase 4: 代码安全评审

```
1. 自动化扫描
   ├── SAST 静态分析 (SonarQube/Semgrep)
   ├── SCA 依赖扫描 (Snyk/Dependabot)
   └── 密钥扫描 (GitLeaks)

2. 人工审查
   ├── 认证授权逻辑
   ├── 输入验证代码
   ├── 错误处理代码
   └── 日志代码

3. 产出物
   └── 代码安全审查报告
```

### 发布评审

```
1. 渗透测试
   ├── 手动渗透测试
   ├── 自动化扫描 (Burp/ZAP)
   └── 红队演练 (如需要)

2. 合规检查
   ├── GDPR 合规
   ├── 等保 2.0 合规
   └── 行业特定合规

3. 产出物
   ├── 渗透测试报告
   ├── 漏洞扫描报告
   └── 发布安全批准
```

---

## 输出格式

### 安全评审报告模板

```markdown
# 安全评审报告

**评审对象**: [项目/功能名称]
**评审人**: Security Expert
**评审时间**: YYYY-MM-DD
**评审阶段**: Phase 2/Phase 4/发布评审

---

## 📊 评审结论

**总体评级**: ✅ 通过 / ⚠️ 条件通过 / ❌ 不通过

| 维度 | 得分 | 满分 | 评级 |
|------|------|------|------|
| 认证授权 | XX | 25 | 🟢/🟡/🔴 |
| 数据安全 | XX | 25 | 🟢/🟡/🔴 |
| OWASP 防护 | XX | 25 | 🟢/🟡/🔴 |
| API 安全 | XX | 15 | 🟢/🟡/🔴 |
| 依赖安全 | XX | 10 | 🟢/🟡/🔴 |
| **总分** | **XX** | **100** | **A/B/C/D** |

---

## 🔴 阻塞问题 (必须修复)

### [编号] 问题简述
- **位置**: `文件/接口路径`
- **风险等级**: 高/中/低
- **OWASP 分类**: [如 A03: Injection]
- **问题描述**: [详细说明]
- **利用场景**: [攻击者如何利用]
- **修复建议**: 
  ```code
  // 修复前
  [原代码]
  
  // 修复后
  [建议代码]
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

## ✅ 安全亮点

- [值得肯定的安全设计]
- [优秀的实践]

---

## 📋 行动项

| 优先级 | 问题编号 | 描述 | OWASP | 责任人 | 截止日期 |
|--------|----------|------|-------|--------|----------|
| P0 | #1 | [问题简述] | A03 | @xxx | [日期] |
| P1 | #2 | [问题简述] | A07 | @xxx | [日期] |

---

## 附录：检查清单

### 认证授权
- [ ] 密码使用 bcrypt/argon2 加密
- [ ] 登录接口有速率限制
- [ ] Session/JWT 有过期时间
- [ ] 权限校验覆盖所有敏感操作

### 数据安全
- [ ] 敏感数据传输使用 HTTPS
- [ ] 敏感数据存储已加密
- [ ] 日志中无敏感数据
- [ ] 密钥使用密钥管理系统

### OWASP Top 10
- [ ] 所有输入已验证
- [ ] 使用参数化查询
- [ ] 输出已编码
- [ ] 错误信息不泄露敏感数据

### API 安全
- [ ] API 有认证机制
- [ ] 有速率限制
- [ ] CORS 配置正确
- [ ] 错误处理不泄露信息

### 依赖安全
- [ ] 无已知高危漏洞
- [ ] License 合规
- [ ] 依赖版本锁定
```

---

## 触发方式

### 自然语言触发

```
# Phase 2 技术设计阶段
"进行安全评审"
"做威胁建模"
"检查这个设计的安全性"
"设计认证授权方案"

# Phase 4 功能开发阶段
"审查代码安全性"
"检查 API 安全"
"检查是否有 SQL 注入风险"
"审查认证逻辑"

# 发布评审阶段
"发布前安全检查"
"漏洞扫描报告"
"渗透测试"
```

---

## 与其他 Skill 集成

### 与 Technical Design Skill 集成

```
Technical Design Skill
    ↓
生成技术架构设计
    ↓
Security Review Skill (自动/手动触发)
    ↓
威胁建模 + 安全架构评审
    ↓
输出：安全需求清单 → 反馈给 Technical Design
```

### 与 Code Review Skill 集成

```
Feature Development Skill
    ↓
代码实现完成
    ↓
Code Review Skill (5 维度审查)
    ↓
Security Review Skill (深度安全审查)
    ↓
输出：安全审查报告
```

---

## 工具推荐

| 类型 | 工具 | 用途 |
|------|------|------|
| **SAST** | SonarQube, Semgrep | 静态代码安全分析 |
| **SCA** | Snyk, Dependabot | 依赖漏洞扫描 |
| **DAST** | OWASP ZAP, Burp | 动态安全测试 |
| **密钥扫描** | GitLeaks, TruffleHog | 检测泄露的密钥 |
| **威胁建模** | Microsoft Threat Modeling | 图形化威胁建模 |
| **合规检查** | CloudCompliance | 云合规检查 |

---

## 常见安全问题速查

### 1. SQL 注入
```
❌ 错误：const sql = `SELECT * FROM users WHERE id = ${id}`;
✅ 正确：const sql = `SELECT * FROM users WHERE id = ?`;
```

### 2. XSS 防护
```
❌ 错误：div.innerHTML = userInput;
✅ 正确：div.textContent = userInput;
```

### 3. 密码存储
```
❌ 错误：password = md5(password);
✅ 正确：passwordHash = await bcrypt.hash(password, 12);
```

### 4. JWT 安全
```
❌ 错误：jwt.sign(payload, 'hardcoded-secret');
✅ 正确：jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
```

### 5. 输入验证
```
❌ 错误：const email = req.body.email;
✅ 正确：const email = validateEmail(req.body.email);
```

---

**版本**: v1.0
**最后更新**: 2024-01-15
**参考标准**: OWASP Top 10 2021, NIST Cybersecurity Framework
