# `useTwBelt` 稳定性重构

## 背景

`frontend/core/hooks/useTwBelt/index.ts` 在每次 render 中创建大量样式 helper，最后再用一个
`useMemo` 返回包含这些 helper 的对象。当前 memo 只依赖：

- `containerClass`
- `pageClass`
- `isAvatarSquare`
- `primaryColor`
- `accentColor`

这些值目前基本覆盖了 helper 的行为，因此尚未确认存在错误样式；但返回对象持有的是某一轮
render 创建的闭包。`pnpm run doctor:core` 已通过 `react-doctor/exhaustive-deps` 规则在
`hooks/useTwBelt/index.ts:387` 将该 memo 报告为潜在 stale，并明确列出缺失的运行时 helper：
`container`、`containerWrapper`、`hoverBr`、`primary`、`accent`、`linker`、`hoverLink`、
`avatar`、`menu`、`selectable`。后续给任一 helper 增加新的 render 输入时，也很容易漏掉 memo
依赖并产生 stale closure。

Core 的 Oxlint 配置已在 `frontend/core/config/oxlint.json:43` 关闭 `react/exhaustive-deps`，因此
当前这项诊断的唯一报告来源是 React Doctor。

## 当前问题

### 正确性依赖人工维护

`primary`、`accent`、`linker`、`hoverBr`、`hoverLink`、`avatar`、`menu`、`selectable`
等 helper 之间还有调用关系。最外层依赖数组无法直接表达这张闭包依赖图，只能依靠维护者同步
更新。

### memo 边界与创建边界不一致

所有 helper 都在 `useMemo` 外创建，即使最终返回旧 memo 对象，本次 render 仍会创建一整套新
函数。memo 稳定了返回对象，却没有避免 helper 的构造，也让代码看起来像是依赖了新函数、实际
返回的却是旧函数。

### 影响面较大

`useTwBelt` 是 Core 的共享样式能力。当前 `frontend` 下有 756 个包含 `useTwBelt` 的文件，其中
633 个位于 Core。返回对象 identity 和各 helper identity 可能被下游组件用作 hook 依赖，因此
不适合通过“把所有函数加入依赖数组”机械修复；那会让整个返回对象每次 render 变化，扩大重渲染
范围。

## 目标方案

把读取 runtime state 与构造 belt object 分成两个明确阶段：

1. hook 顶层只读取 `metric`、avatar layout、primary color 和 accent color。
2. 在单个 `useMemo` 内创建所有依赖 runtime state 的 helper，并直接返回完整 `TRet`。
3. memo 只依赖构造过程真正需要的 primitive source。
4. 不在 memo 外创建会被返回对象持有的闭包。
5. 能提升为模块级纯函数或常量的 helper 不再放进 hook；`pageClass` 常量和 `page()` 也一并提升。

helper 的目标归属如下，实施时不扩大或缩小这条边界：

表中的模块级归属包含 `cn`、`cachedMargin` 等已经处于模块级、无需再次提升的导入。

| 归属               | helper                                                                                                                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 模块级纯函数或常量 | `cn`、`fg`、`bg`、`fill`、`br`、`rainbow`、`rainbowLite`、`resolveCustomRainbowToken`、`linkable`、`underline`、`hoverLinkIcon`、`zise`、`cachedMargin`、`divider`、`VDivider`、`sexyBorder`、`sexyVBorder`、`gradientBar`、`vividDark`、`dimDark`、`shadow`、`scrollbar`、`cut`、`landingTitle`、`panel`、`hover`、`zIndex`、`pageClass`、`page` |
| 留在 memo 内       | `container`、`containerWrapper`、`hoverBr`、`primary`、`accent`、`linker`、`hoverLink`、`avatar`、`menu`、`selectable`                                                                                                                                                                                                                            |

后一组恰好是 React Doctor 标记的 10 个运行时 helper；它们依赖 `metric`、`isAvatarSquare`、
`primaryColor`、`accentColor` 中的一个或多个。前一组只依赖模块级常量、`STATIC_CLS`、
`keyToClass` 或已提升的纯 helper。

建议结构：

```ts
export default function useTwBelt(): TRet {
  const metric = useMetric()
  const { isSquare: isAvatarSquare } = useAvatarLayout()
  const primaryColor = usePrimaryColor()
  const accentColor = useAccentColor()

  return useMemo(() => {
    const containerClass = `container-${metric.toLowerCase()}`
    const primary = (...) => ...
    const accent = (...) => ...
    const menu = (...) => ...

    return {
      // 完整 TRet
    }
  }, [metric, isAvatarSquare, primaryColor, accentColor])
}
```

## 不采用的方案

### 把所有本地函数加入依赖数组

这些函数每次 render 都重新创建，会使 `useMemo` 永远失效，等同于删除 memo，同时让所有下游
依赖 belt object 的 effect/memo 重新执行。

### 对每个 helper 单独使用 `useCallback`

这会产生大量互相依赖的 callback 和依赖数组，维护成本更高，也没有改善整体闭包图的可读性。

### 直接删除最外层 `useMemo`

这能够消除 stale memo 的表象，但会改变共享返回对象的 identity 合同。在确认全部调用方之前，
不应把这种变化混入 lint 清理。

## 实施步骤

1. 通过 CodeGraph 列出所有调用方，识别将整个 belt object 或单个 helper 放入依赖数组的代码。
2. 将无 runtime state 的 helper 提升为模块级纯函数。
3. 将其余 helper 和返回对象一起迁入单个 `useMemo`。
4. 保持 `TRet` 的字段、函数参数、返回 class string 完全不变。
5. 为 `useTwBelt` 增加定向测试，覆盖 primary/accent、avatar shape、metric 四类输入。当前没有
   `useTwBelt` 测试；可沿用 `useMetric/index.test.tsx`、`usePrimaryColor/index.test.tsx`、
   `useAccentColor/index.test.tsx` 已确立的 hook 测试模式。四类输入在 hook 边界最终都收敛为
   primitive 值，因此目标依赖数组可使用 `[metric, isAvatarSquare, primaryColor, accentColor]`。
6. 运行 Core 全量 type-check、`useTwBelt` 定向单元测试和 React Doctor。
7. 优先对 Core 中覆盖 class、hover、menu 和容器布局的代表性消费方做 smoke test；再补充
   Dashboard、Community、Landing 的高频宿主路径 smoke test。

## 验收标准

- React Doctor 的 `react-doctor/exhaustive-deps` 不再报告 `hooks/useTwBelt/index.ts:387`。该命令在
  存在 warning 时仍可能返回成功退出码，验收必须检查目标诊断是否消失，不能只检查命令退出码。
- 相同输入下 belt object 和其中 helper 的 identity 保持稳定。
- metric、avatar shape、primary color 或 accent color 改变时，相关 class 正确更新。
- `TRet` 公共 API 与生成的 class string 不变。
- Core 全量 type-check 和 `useTwBelt` 定向测试通过。
- 下游没有新增 effect 重跑或明显的渲染回归。
