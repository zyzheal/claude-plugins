---
name: "Observability Skill"
description: "Professional observability design review covering logging, metrics, tracing, alerting. 可观测性设计、日志规范、监控指标、链路追踪、告警策略"
triggers:
  - "observability design"
  - "logging design"
  - "metrics definition"
  - "tracing implementation"
  - "alerting strategy"
  - "监控设计"
  - "日志规范"
  - "指标定义"
  - "链路追踪"
  - "告警策略"
  - "Dashboard 设计"
---

# Observability Skill - 可观测性专家评审技能

本技能提供专业的可观测性设计评审能力，覆盖日志 (Logging)、指标 (Metrics)、追踪 (Tracing)、告警 (Alerting) 四大支柱。

## 参与阶段

| 阶段 | 评审重点 | 产出物 |
|------|----------|--------|
| **Phase 2 技术设计** | 可观测性架构、日志规范、指标定义 | 监控 Dashboard 设计、告警规则表 |
| **Phase 4 功能开发** | 日志实现、指标埋点、TraceID 传递 | 可观测性实现报告 |
| **发布评审** | 监控告警验证、Dashboard 上线 | 监控验收报告 |
| **上线后** | 告警优化、指标迭代 | 告警分析报告 |

---

## 评审维度

### 1. 日志设计 (Logging)

| 检查项 | 说明 | 合格标准 |
|--------|------|----------|
| **结构化日志** | 日志格式是否结构化 | JSON 格式 |
| **日志级别** | 日志级别使用合理 | DEBUG/INFO/WARN/ERROR 规范 |
| **敏感数据脱敏** | 敏感信息是否脱敏 | 密码/密钥/PII 脱敏 |
| **日志聚合** | 日志收集方案 | 集中式日志系统 |
| **TraceID 传递** | 分布式追踪 ID | 全链路传递 |

**日志级别规范**：
```
DEBUG - 调试信息，开发/排查问题时使用
  - 详细的状态信息
  - 方法入参/出参
  - 不生产环境下开启

INFO - 关键业务节点信息
  - 用户操作记录
  - 业务流程节点
  - 系统启动/关闭

WARN - 警告信息，不影响系统运行
  - 可恢复的异常
  - 配置问题
  - 需要关注的情况

ERROR - 错误信息，需要处理
  - 业务异常
  - 系统异常
  - 需要立即处理
```

**日志字段规范**：
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "INFO",
  "service": "order-service",
  "trace_id": "abc123def456",
  "span_id": "span789",
  "user_id": "user_001",
  "action": "order_created",
  "message": "订单创建成功",
  "duration_ms": 150,
  "data": {
    "order_id": "order_12345",
    "amount": 299.00
  }
}
```

---

### 2. 指标监控 (Metrics)

| 检查项 | 说明 | 检查方法 |
|--------|------|----------|
| **业务指标** | 核心业务数据 | DAU/GMV/订单量 |
| **技术指标** | 系统性能数据 | QPS/Latency/Error Rate |
| **资源指标** | 基础设施数据 | CPU/Memory/Disk |
| **指标采集** | 采集频率和方式 | Push/Pull 模式 |
| **指标聚合** | 多维度聚合 | 按服务/实例/区域 |

**黄金四指标 (Four Golden Signals)**：
```
1. 延迟 (Latency)
   - 处理请求所需时间
   - 区分成功请求和失败请求
   - p50/p95/p99 分位值

2. 流量 (Traffic)
   - 系统请求量
   - QPS/RPS
   - 并发连接数

3. 错误 (Errors)
   - 请求失败率
   - HTTP 5xx 比例
   - 业务错误码统计

4. 饱和度 (Saturation)
   - 资源使用率
   - CPU/内存使用率
   - 队列长度
```

**指标命名规范**：
```
# Prometheus 风格命名
<服务名>_<模块名>_<指标类型>_<单位>

示例：
order_api_request_total           # 请求总数
order_api_request_duration_seconds # 请求耗时
order_api_error_total             # 错误总数
jvm_memory_used_bytes             # JVM 内存使用
```

---

### 3. 链路追踪 (Distributed Tracing)

| 检查项 | 说明 | 合格标准 |
|--------|------|----------|
| **TraceID 生成** | 唯一追踪 ID 生成 | UUID/Guid |
| **TraceID 传递** | 跨服务传递 | HTTP Header/RPC Context |
| **Span 设计** | Span 粒度合理 | 关键操作有 Span |
| **采样策略** | 采样比例合理 | 1%-100% 动态调整 |
| **上下文传递** | 线程池/异步传递 | InheritableThreadLocal |

**Trace 传播机制**：
```
Client → Service A → Service B → Service C
  │         │            │           │
  │         │            │           │
  └─────────┴────────────┴───────────┘
            TraceID: abc123
            
            Span A: Service A处理
            ├─ Span A.1: DB 查询
            └─ Span A.2: HTTP 调用 Service B
            
            Span B: Service B 处理
            ├─ Span B.1: 缓存查询
            └─ Span B.2: 业务逻辑
            
            Span C: Service C 处理
```

---

### 4. 告警设计 (Alerting)

| 检查项 | 说明 | 合格标准 |
|--------|------|----------|
| **告警分级** | P0/P1/P2 定义 | 响应时间明确 |
| **告警收敛** | 告警聚合/抑制 | 避免告警风暴 |
| **通知渠道** | 多渠道通知 | 短信/邮件/IM |
| **升级机制** | 超时升级 | 未响应自动升级 |
| **值班排班** | 值班安排 | 7x24 覆盖 |

**告警分级标准**：
```
| 级别 | 响应时间 | 通知渠道 | 升级时间 | 示例 |
|------|----------|----------|----------|------|
| P0 | < 5 分钟 | 电话 + 短信 + IM | 15 分钟 | 核心服务不可用 |
| P1 | < 15 分钟 | 短信 + IM | 30 分钟 | 错误率 > 5% |
| P2 | < 30 分钟 | IM | 1 小时 | 延迟 p99 > 500ms |
| P3 | < 1 小时 | 邮件 | 4 小时 | 磁盘使用率 > 80% |
```

**告警收敛策略**：
```yaml
# 告警分组配置
group_wait: 30s        # 等待新告警加入组
group_interval: 5m     # 同一组告警间隔
repeat_interval: 4h    # 重复告警间隔

# 告警抑制配置
inhibit_rules:
  # 如果 P0 告警触发，抑制同服务的 P1/P2 告警
  - source_match:
      severity: critical
    target_match:
      severity: warning
    equal: [alertname, service]
```

---

### 5. Dashboard 设计

| 检查项 | 说明 | 合格标准 |
|--------|------|----------|
| **核心视图** | 关键指标展示 | 黄金四指标 |
| **分层视图** | 不同层级视图 | 业务/应用/基础设施 |
| **下钻能力** | 从聚合到明细 | 支持点击下钻 |
| **对比能力** | 同比/环比 | 趋势分析 |

**Dashboard 层级设计**：
```
L1 - 业务概览 Dashboard
   ├── GMV/订单量/转化率
   └── 核心业务健康度

L2 - 服务层 Dashboard
   ├── 各服务 QPS/Latency/Error Rate
   └── 服务依赖拓扑

L3 - 实例层 Dashboard
   ├── 单实例 CPU/内存/网络
   └── JVM/Runtime 指标

L4 - 中间件 Dashboard
   ├── 数据库连接数/慢查询
   ├── 缓存命中率
   └── MQ 积压量
```

---

## 评审流程

### Phase 2: 技术设计评审

```markdown
1. 日志设计评审
   ├── 日志格式规范
   ├── 日志级别规范
   ├── 敏感数据脱敏
   └── 日志聚合方案

2. 指标定义评审
   ├── 业务指标定义
   ├── 技术指标定义
   └── 指标采集方案

3. 链路追踪评审
   ├── TraceID 方案
   ├── Span 设计
   └── 采样策略

4. 告警设计评审
   ├── 告警规则
   ├── 告警分级
   └── 通知渠道

5. 产出物
   ├── 监控 Dashboard 设计
   ├── 告警规则表
   └── 链路追踪方案
```

### Phase 4: 实现评审

```markdown
1. 日志实现检查
   ├── 结构化日志实现
   ├── TraceID 传递检查
   └── 敏感数据脱敏检查

2. 指标埋点检查
   ├── 关键指标埋点
   └── 指标命名规范

3. 产出物
   └── 可观测性实现报告
```

---

## 输出格式

### 可观测性评审报告

```markdown
# 可观测性评审报告

**评审对象**: [项目/功能名称]
**评审人**: Observability Expert
**评审时间**: YYYY-MM-DD
**评审阶段**: Phase 2/Phase 4

---

## 📊 评审结论

**总体评级**: ✅ 通过 / ⚠️ 条件通过 / ❌ 不通过

| 维度 | 得分 | 满分 | 评级 |
|------|------|------|------|
| 日志设计 | XX | 20 | 🟢/🟡/🔴 |
| 指标监控 | XX | 25 | 🟢/🟡/🔴 |
| 链路追踪 | XX | 20 | 🟢/🟡/🔴 |
| 告警设计 | XX | 25 | 🟢/🟡/🔴 |
| Dashboard | XX | 10 | 🟢/🟡/🔴 |
| **总分** | **XX** | **100** | **A/B/C/D** |

---

## 🔴 阻塞问题 (必须修复)

### [编号] 问题简述
- **位置**: [服务/模块名称]
- **风险等级**: 高/中/低
- **问题描述**: [详细说明]
- **影响范围**: [影响的功能]
- **修复建议**: [具体建议]

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
- [优秀的可观测性实践]

---

## 📋 行动项

| 优先级 | 问题编号 | 描述 | 责任人 | 截止日期 |
|--------|----------|------|--------|----------|
| P0 | #1 | [问题简述] | @xxx | [日期] |
| P1 | #2 | [问题简述] | @xxx | [日期] |

---

## 附录：可观测性检查清单

### 日志设计
- [ ] 结构化日志格式（JSON）
- [ ] 日志级别规范使用
- [ ] 敏感数据脱敏
- [ ] TraceID 集成
- [ ] 日志聚合方案

### 指标监控
- [ ] 业务指标定义（DAU/GMV）
- [ ] 技术指标定义（QPS/Latency）
- [ ] 黄金四指标覆盖
- [ ] 指标命名规范
- [ ] 采集频率合理

### 链路追踪
- [ ] TraceID 生成方案
- [ ] 全链路传递
- [ ] Span 设计合理
- [ ] 采样策略
- [ ] 异步上下文传递

### 告警设计
- [ ] 告警分级定义（P0/P1/P2）
- [ ] 告警收敛策略
- [ ] 通知渠道配置
- [ ] 升级机制
- [ ] 值班排班

### Dashboard
- [ ] 核心视图设计
- [ ] 分层视图设计
- [ ] 下钻能力
- [ ] 对比能力（同比/环比）
```

---

## 日志规范模板

### 应用日志配置

```yaml
# logback-spring.xml (Java 示例)
<configuration>
    <appender name="JSON_CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"service":"order-service","env":"${SPRING_PROFILES_ACTIVE}"}</customFields>
        </encoder>
    </appender>
    
    <!-- TraceID 注入 -->
    <filter class="org.springframework.cloud.sleuth.instrument.logging.TraceIdLoggingWebMvcFilter"/>
    
    <root level="INFO">
        <appender-ref ref="JSON_CONSOLE"/>
    </root>
</configuration>
```

### 日志脱敏规则

```java
// 敏感数据脱敏拦截器
public class SensitiveDataInterceptor implements MessageInterceptor {
    
    private static final Set<String> SENSITIVE_FIELDS = Set.of(
        "password", "secret", "token", "creditCard", "phone", "idCard"
    );
    
    @Override
    public Object intercept(Object message) {
        if (message instanceof LogEvent) {
            maskSensitiveData((LogEvent) message);
        }
        return message;
    }
    
    private void maskSensitiveData(LogEvent event) {
        for (String field : SENSITIVE_FIELDS) {
            if (event.getData().containsKey(field)) {
                event.getData().put(field, "***MASKED***");
            }
        }
    }
}
```

---

## 指标定义模板

### 业务指标定义表

```markdown
| 指标名称 | 类型 | 采集频率 | 告警阈值 | 说明 |
|----------|------|----------|----------|------|
| order_created_total | Counter | 实时 | - | 订单创建总数 |
| order_amount_total | Gauge | 实时 | - | 订单总金额 (GMV) |
| payment_success_rate | Ratio | 1m | < 95% | 支付成功率 |
| user_active_count | Gauge | 5m | - | 活跃用户数 |
```

### 技术指标定义表

```markdown
| 指标名称 | 类型 | 采集频率 | 告警阈值 | 说明 |
|----------|------|----------|----------|------|
| http_request_duration_seconds | Histogram | 实时 | p99 > 1s | 请求延迟 |
| http_request_total | Counter | 实时 | - | 请求总数 |
| http_request_error_rate | Ratio | 1m | > 5% | 错误率 |
| jvm_memory_used_ratio | Gauge | 30s | > 85% | JVM 内存使用率 |
| db_connection_active | Gauge | 30s | > 80% | 数据库连接数 |
```

---

## 告警规则模板

### Prometheus Alert Rules

```yaml
# alerting-rules.yaml
groups:
  - name: order-service-alerts
    interval: 30s
    rules:
      # P0: 服务不可用
      - alert: ServiceDown
        expr: up{service="order-service"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "服务 {{ $labels.instance }} 不可用"
          description: "订单服务实例 {{ $labels.instance }} 已宕机"
      
      # P1: 错误率高
      - alert: HighErrorRate
        expr: |
          sum(rate(http_request_error_total{service="order-service"}[5m])) 
          / sum(rate(http_request_total{service="order-service"}[5m])) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "订单服务错误率过高"
          description: "当前错误率 {{ $value | humanizePercentage }}"
      
      # P2: 延迟过高
      - alert: HighLatency
        expr: |
          histogram_quantile(0.99, 
            sum(rate(http_request_duration_seconds_bucket{service="order-service"}[5m])) 
            by (le)) > 1
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "订单服务延迟过高"
          description: "p99 延迟 {{ $value }}s"
      
      # P3: 磁盘使用率高
      - alert: DiskUsageHigh
        expr: |
          node_filesystem_avail_ratio{mountpoint="/"} < 0.2
        for: 30m
        labels:
          severity: info
        annotations:
          summary: "磁盘使用率过高"
          description: "可用磁盘空间 {{ $value | humanizePercentage }}"
```

---

## Dashboard 模板

### Grafana Dashboard JSON (简化版)

```json
{
  "dashboard": {
    "title": "订单服务监控",
    "panels": [
      {
        "title": "QPS",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_request_total{service=\"order-service\"}[1m]))"
          }
        ]
      },
      {
        "title": "延迟 (p50/p95/p99)",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.50, sum(rate(http_request_duration_seconds_bucket{service=\"order-service\"}[1m])) by (le))",
            "legendFormat": "p50"
          },
          {
            "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service=\"order-service\"}[1m])) by (le))",
            "legendFormat": "p95"
          },
          {
            "expr": "histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket{service=\"order-service\"}[1m])) by (le))",
            "legendFormat": "p99"
          }
        ]
      },
      {
        "title": "错误率",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_request_error_total{service=\"order-service\"}[1m])) / sum(rate(http_request_total{service=\"order-service\"}[1m]))"
          }
        ]
      }
    ]
  }
}
```

---

## 常见反模式

### 1. 日志反模式

```
❌ 错误：日志中记录敏感数据
   log.info("用户登录：username={}, password={}", username, password);

❌ 错误：日志级别滥用
   log.debug("DEBUG: 进入方法");  // 大量无意义 DEBUG

❌ 错误：日志格式不统一
   2024-01-15 用户下单成功
   {"time":"2024-01-15","msg":"order created"}  // 混合格式

✅ 正确：结构化日志 + 脱敏
   log.info("用户登录成功", 
       Map.of("username", mask(username), "userId", userId));
```

### 2. 指标反模式

```
❌ 错误：指标命名不规范
   myapp_counter_1
   request_num
   
❌ 错误：高基数标签
   http_request_total{user_id="xxx"}  // user_id 基数过大

✅ 正确：规范命名 + 合理标签
   order_service_request_total{method="create", status="success"}
```

### 3. 告警反模式

```
❌ 错误：告警阈值过低
   错误率 > 0.1% 就告警 → 告警疲劳

❌ 错误：告警无分级
   所有告警都发短信 → 狼来了

❌ 错误：告警无收敛
   100 个实例同时告警 → 告警风暴

✅ 正确：合理阈值 + 分级 + 收敛
   P0: > 10% 错误率 (电话)
   P1: > 5% 错误率 (短信)
   分组聚合，抑制重复
```

---

## 工具推荐

| 类型 | 工具 | 用途 |
|------|------|------|
| **日志收集** | Fluentd, Filebeat | 日志采集 |
| **日志存储** | Elasticsearch, Loki | 日志存储检索 |
| **日志展示** | Kibana, Grafana | 日志可视化 |
| **指标监控** | Prometheus, VictoriaMetrics | 指标采集存储 |
| **Dashboard** | Grafana | 指标展示 |
| **链路追踪** | Jaeger, Zipkin, SkyWalking | 分布式追踪 |
| **告警管理** | Alertmanager, Opsgenie | 告警路由通知 |

---

## 与其他 Skill 集成

### 与 Technical Design Skill 集成

```
Technical Design Skill
    ↓
生成系统架构设计
    ↓
Observability Skill (自动/手动触发)
    ↓
可观测性设计评审
    ↓
输出：监控 Dashboard、告警规则 → 反馈给 Technical Design
```

### 与 SRE Review Skill 集成

```
Observability Skill
    ↓
告警规则定义
    ↓
SRE Review Skill
    ↓
故障应急流程集成
    ↓
输出：统一监控告警体系
```

---

## 触发方式

### 自然语言触发

```
# Phase 2 技术设计阶段
"设计监控方案"
"定义监控指标"
"设计日志规范"
"配置告警规则"
"设计链路追踪方案"
"创建 Dashboard"

# Phase 4 功能开发阶段
"检查日志实现"
"添加指标埋点"
"实现 TraceID 传递"

# 上线后优化
"分析告警数据"
"优化告警规则"
"调整监控阈值"
```

---

**版本**: v1.0
**最后更新**: 2024-01-15
**参考标准**: Google SRE Handbook, CNCF Observability Best Practices
