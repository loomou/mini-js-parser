# Mini JS Parser

一个使用 TypeScript 编写的简易 JavaScript 解析器（Parser）。它实现了从源码到抽象语法树（AST）的完整解析过程，包括词法分析（Scanner）和语法分析（Parser）。

本项目旨在用于学习和理解编译器前端的基本原理，支持 JavaScript 的一个常用子集。

## 特性

- **零依赖**：核心解析逻辑不依赖任何第三方库。
- **手写解析器**：采用递归下降（Recursive Descent）算法手动实现。
- **完整流程**：包含 Scanner（词法分析器）和 Parser（语法分析器）。
- **类型安全**：完全使用 TypeScript 编写，提供完整的 AST 类型定义。

## 功能支持

支持以下 JavaScript 语法特性的解析：

- **变量声明**: `let`
- **函数声明**: `function name(args) { ... }`
- **控制流**:
  - `if` / `else`
  - `while`
  - `for` (包括 `for...in`)
  - `return`
- **表达式**:
  - 赋值 (`=`)
  - 二元运算 (`+`, `-`, `*`, `/`, `&&`, `||`, `==`, `!=`, `<`, `>`)
  - 一元运算 (`++`, `--`, `+`, `-`, `delete`)
  - 函数调用
  - 成员访问 (`.` 和 `[]`)
  - 字面量 (数字, 字符串, 布尔值, 数组 `[]`, 对象 `{}`)

详细的语法定义请参考 [Grammar 文档](./docs/grammar.md)。

## 安装与使用

### 安装依赖

```bash
pnpm install
```

### 使用示例

```typescript
import { createParser } from './src';

const code = `
function add(a, b) {
  return a + b;
}
let result = add(1, 2);
`;

// 创建解析器实例
const parser = createParser(code);

// 解析生成 AST
const sourceFile = parser.parseSourceFile();

console.log(JSON.stringify(sourceFile, null, 2));
```

## 开发

本项目使用 `pnpm` 进行包管理，`vitest` 进行测试。

### 构建

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

## 项目结构

- `src/`
  - `scanner.ts`: 词法分析器，将源代码转换为 Token 流。
  - `parser.ts`: 语法分析器，将 Token 流转换为 AST。
  - `ast.ts`: 定义 AST 节点类型和语法种类（SyntaxKind）。
  - `index.ts`: 统一导出。
- `tests/`: 包含针对 Scanner 和 Parser 的单元测试。
- `docs/`: 文档目录，包含语法定义。

## License

MIT
