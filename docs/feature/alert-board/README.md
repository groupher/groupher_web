# AlertBoard / ReviewBot

> 状态：in-progress

本文是当前文档入口；AlertBoard / ReviewBot 的 D1–D5 旧链清理及 N1–N7 运行时代码已落地，本地自动化回归通过。真实浏览器验收与目标环境维护切换仍需完成，当前不可视为已上线功能。

- [设计合同](./design.md)：管理员事务公告板、自动检测、发布模式、UGC 与 Doc 边界。
- [实施合同](./implementation.md)：数据模型、状态流转、权限、事务、provider 与 GraphQL。
- [批次与验收](./delivery.md)：D1–D5 删除、N1–N8 实施及 T01–T25 行为验收（T01a 为独立记录的子用例）。
- [旧 Audit 全链路退役](../../migrations/legacy-content-audit-removal.md)：实际代码扫描、删除与替代、切换条件。
- [逐文件扫描清单](../../migrations/legacy-content-audit-inventory.md)：扫描命中位置、分类及处理方向。
