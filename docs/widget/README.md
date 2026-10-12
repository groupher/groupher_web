# Widget

> 状态：in-progress

Widget 是可嵌入外部页面的独立前端应用。mock-first runtime、embedding protocol、构建产物和 demo 已完成；
生产 API、持久化与部署路由仍在推进，范围见 [Widget V1](./v1.md)。

## 边界

- Widget 只通过公开服务合同读取或提交数据，不直接依赖其他前端应用的运行时状态；
- 可复用 `frontend/core` 的稳定 UI、GraphQL 和 Query 能力，但不能把 Community/Dash 页面组件作为公共 API；
- host 页面、身份传递、origin、CSP、尺寸与交互协议必须在实施前冻结；
- 尚未落地的能力不能在根项目 README 中描述为已发布产品。
