# Backend 非 Commands 写入口决策

> 状态：已收口（2026-10-20）

本轮检查 `Commands/` 之外的 job、maintenance、workflow、facade 与 transaction owner，目的只是发现遗漏的顶层业务 Command，不要求所有数据库写入进入 pipeline。

## 决策原则

只有同时承担下列职责的顶层动作才考虑迁入 Command/pipeline：

1. 推进 canonical domain state；
2. 拥有稳定的 command/operation identity；
3. 明确拥有 canonical load、锁和主事务；
4. 需要统一 retry、recovery 或失败补偿；
5. 是用户或内部系统可独立调用的完整业务动作。

下列实现默认保留现有 owner：

- leaf Persist、row primitive、query、codec 和 helper；
- projection、cache、search、analytics 与 Outbox delivery；
- 有界 retention、cleanup、backfill 和 reconciliation；
- 已经拥有 job identity、重试和补偿的 durable workflow；
- seed、bootstrap、migration 和测试基础设施。

出现 `Repo`、`Ecto.Multi`、Persist 调用或 `Workflow` 名称，只是写入信号，不是迁移理由。

## 收口结论

- Articles maintenance 的 user/internal 协议已经拆开；两者共享领域 owner，不使用特殊 actor、空 `command_id` 或运行时 flag 切换协议。
- Trash permanent-delete 的用户动作使用 Receipt；scheduler 使用独立 internal direct pipeline，因为两者的 actor、identity 与恢复协议不同。
- Community creation/setup 继续由 Oban Job 直接调用 `CMS.Communities` facade，再进入 `Communities.Creation` / `Setup` workflow owner。它们已经拥有 operation identity、锁、事务、重试与 exhaustion compensation，不增加纯代理 Command。
- Assets upload、Content Import、Community Application expiry、Wallpaper reconciliation 与其他 durable workflow 保留现有 owner。
- Outbox、cache、search、insights 与普通 projection/delivery job 不 Command 化。
- leaf Persist、States、Refs、Query 和 transaction helper 不 Command 化。

## 维护方式

本决策不再维护 repository-wide semantic evidence ledger、逐条 inventory 或 freshness gate。以后只在以下情况重新评估某个入口：

- 新增顶层用户或 internal action；
- 一个 facade 开始直接拥有多 owner 写入；
- user/internal 协议混用；
- 发生 identity、锁、事务、重试或 partial-success 问题；
- 现有 Workflow 开始承担新的独立业务入口职责。

评估结果记录在相关领域文档和行为测试中，不再生成全 Backend 的证明型 manifest。
