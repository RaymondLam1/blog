
---
title: DDD 架构
category:
  - 架构
tag:
  - 技术
---


::: info
https://mp.weixin.qq.com/s/htRzBdHrJCsfhh1UbUAIiQ
:::

DDD 是思想，六边形/菱形/整洁架构是分层，DDD 通过建模思想，指导我们以从用例图（use case diagram）出发，与产品、研发、测试一起在一个规范下，脑暴建模。在这个过程中，以结果为导向，分析出可能存在的领域服务。这些领域服务，如登录完成，下单完成，支付完成，收货完成，根据结果态，分析支撑这样的服务所需的对象（实体）、流程、规则等。这样我们可以更加清晰的构建一套系统。而六边形（常用的）架构，则是用于承接 DDD 领域驱动设计对系统分析后的编码实现。六边形可以说是专门为 DDD 做的配套架构，虽然也可以用 MVC 来编写，但这样是会失去面向对象设计和编码的优势，让代码逻辑混乱在一起。所以，这也是各个互联网公司开始往 DDD 架构切换的目的。

* 首先，六边形架构，以 DDD 领域驱动实际为指引，为 domain 层，设计充血模型结构，如；登录、下单、支付，在每个模块下，包含完整的服务、模型、适配。适配的目的是这个领域里所需的数据，都通过适配的方式从外部调用进来，比如；数据库、缓存、接口等。这是一种 ACL 防腐设计，将来外部的接口变化了，也不会影响我们的领域服务，只要按照领域服务的适配标准提供即可。
* 之后，围绕着领域 domain 开始，需要啥就让外部的基础设施层实现领域层的接口来提供。而接口要提供啥能力，就调用 case 编排 domain 层，或则简单的由 domain 层直接提供也可以。
* 最后，也就是 trigger 触发器，我们把接口、任务、mq等都理解为一种触发，之后让 trigger 调用 case 层。case 或者 domain 的目的，就是分摊 trigger 以前 Controller 编写逻辑代码的压力。让 trigger 只是负责对外逻辑的封装，错误码，异常即可。

``` mermaid
graph TD
    subgraph MVC_Architecture ["MVC 架构 (东西多了，有点乱！)"]
        direction TB
        m_model[model - 模型层: req, res, vo, dto]
        m_service[service - 业务层]
        m_controller[controller - 控制层: http, rpc, job, mq]
        m_export[export - 提供接口]
        m_rpc[rpc - 对接接口]
        m_dao[dao - 数据库操作: dao, pojo]

        m_controller --> m_service
        m_export --> m_controller
        m_service --> m_rpc
        m_service --> m_dao
    end

    MVC_Architecture --> DDD_Architecture

    subgraph DDD_Architecture ["DDD 架构 (清晰多了！)"]
        direction TB
        d_api[api - 接口定义: http, rpc, dto/response]
        d_app[app - 应用入口]
        d_case[case - 服务编排]
        d_domain[domain - 领域服务]
        d_infra[infrastructure - 基础设施层]
        d_trigger[trigger - 触发器层: JOB, MQ, HTTP, RPC]
        d_types[types - 通用层]

        %% 核心流程
        d_api --> d_app
        d_app --> d_domain
        d_case --> d_domain
        d_trigger --> d_infra
        d_trigger -- 复杂流程 --> d_case
        d_infra --> d_domain

        %% 领域模型细节 (以节点形式表现内部逻辑)
        subgraph Domain_Detail ["领域服务内部 (登录校验 / 商品下单)"]
            direction LR
            adapter --> model
            model --> entity[实体]
            model --> val[值对象]
            model --> agg[聚合]
            service_inner[service]
        end

        d_domain -.-> Domain_Detail
        Domain_Detail --> d_infra
    end

    %% 样式美化
    style MVC_Architecture fill:#fff9f0,stroke:#d4a373,stroke-dasharray: 5 5
    style DDD_Architecture fill:#f0f7f4,stroke:#2d6a4f,stroke-dasharray: 5 5
    style d_app fill:#800000,color:#fff
    style d_domain fill:#fff4b3
    style d_infra fill:#6200ea,color:#fff
    style d_trigger fill:#29b6f6,color:#fff
    style d_api fill:#80deea
    style d_case fill:#d81b60,color:#fff

```

