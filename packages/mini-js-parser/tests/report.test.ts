import { describe, expect, it } from 'vitest';
import type { ErrorWithCause } from '../src';
import { createParser, report } from '../src';

describe('Report', () => {
  it('报告生成-语法错误', () => {
    let code = `let = 1;`;
    let parser = createParser(code);

    try {
      parser.parseSourceFile();
    } catch (e) {
      const error = e as ErrorWithCause;
      const output = report('test.js', code, error.message, error.cause);
      expect(output).toMatchInlineSnapshot(`
        "[31mError[0m: let 语句必须绑定一个标识符。
          [38;5;246m╭─[[0mtest.js:1:1[38;5;246m][0m
          [38;5;246m│[0m
        [38;5;246m1 │[0m let = 1;
          [38;5;246m│[0m [31m─┬─[0m
          [38;5;246m│[0m  [31m╰───────────────────────[0m let 语句必须绑定一个标识符。
        [38;5;246m──╯[0m"
      `);
    }

    code = `a`;
    parser = createParser(code);
    try {
      parser.parseSourceFile();
    } catch (e) {
      const error = e as ErrorWithCause;
      const output = report('test.js', code, error.message, error.cause);
      expect(output).toMatchInlineSnapshot(`
        "[31mError[0m: 缺少分号。
          [38;5;246m╭─[[0mtest.js:1:2[38;5;246m][0m
          [38;5;246m│[0m
        [38;5;246m1 │[0m a
          [38;5;246m│[0m  [31m┬[0m
          [38;5;246m│[0m  [31m╰───────────────────────[0m 缺失符号
        [38;5;246m──╯[0m"
      `);
    }

    code = `function () {}`;
    parser = createParser(code);
    try {
      parser.parseSourceFile();
    } catch (e) {
      const error = e as ErrorWithCause;
      const output = report('test.js', code, error.message, error.cause);
      expect(output).toMatchInlineSnapshot(`
        "[31mError[0m: 函数声明语句必须绑定一个标识符。
          [38;5;246m╭─[[0mtest.js:1:10[38;5;246m][0m
          [38;5;246m│[0m
        [38;5;246m1 │[0m function () {}
          [38;5;246m│[0m          [31m┬[0m
          [38;5;246m│[0m          [31m╰───────────────[0m 缺少标识符
        [38;5;246m──╯[0m"
      `);
    }

    code = `{`;
    parser = createParser(code);
    try {
      parser.parseSourceFile();
    } catch (e) {
      const error = e as ErrorWithCause;
      const output = report('test.js', code, error.message, error.cause);
      expect(output).toMatchInlineSnapshot(`
        "[31mError[0m: 缺少右大括号 '}'。
          [38;5;246m╭─[[0mtest.js:1:2[38;5;246m][0m
          [38;5;246m│[0m
        [38;5;246m1 │[0m {
          [38;5;246m│[0m  [31m┬[0m
          [38;5;246m│[0m  [31m╰───────────────────────[0m 缺失符号
        [38;5;246m──╯[0m"
      `);
    }

    code = `return 1;`;
    parser = createParser(code);
    try {
      parser.parseSourceFile();
    } catch (e) {
      const error = e as ErrorWithCause;
      const output = report('test.js', code, error.message, error.cause);
      expect(output).toMatchInlineSnapshot(`
        "[31mError[0m: return 语句只能在函数体中使用。
          [38;5;246m╭─[[0mtest.js:1:1[38;5;246m][0m
          [38;5;246m│[0m
        [38;5;246m1 │[0m return 1;
          [38;5;246m│[0m [31m───┬──[0m
          [38;5;246m│[0m    [31m╰─────────────────────[0m 返回语句不在函数中
        [38;5;246m──╯[0m"
      `);
    }

    code = `let a = 1 *;`;
    parser = createParser(code);
    try {
      parser.parseSourceFile();
    } catch (e) {
      const error = e as ErrorWithCause;
      const output = report('test.js', code, error.message, error.cause);
      expect(output).toMatchInlineSnapshot(`
        "[31mError[0m: 无效表达式。
          [38;5;246m╭─[[0mtest.js:1:12[38;5;246m][0m
          [38;5;246m│[0m
        [38;5;246m1 │[0m let a = 1 *;
          [38;5;246m│[0m            [31m┬[0m
          [38;5;246m│[0m            [31m╰─────────────[0m 无效表达式
        [38;5;246m──╯[0m"
      `);
    }

    code = `function a(,) {}`;
    parser = createParser(code);
    try {
      parser.parseSourceFile();
    } catch (e) {
      const error = e as ErrorWithCause;
      const output = report('test.js', code, error.message, error.cause);
      expect(output).toMatchInlineSnapshot(`
        "[31mError[0m: 函数参数必须绑定一个标识符。
          [38;5;246m╭─[[0mtest.js:1:12[38;5;246m][0m
          [38;5;246m│[0m
        [38;5;246m1 │[0m function a(,) {}
          [38;5;246m│[0m            [31m┬[0m
          [38;5;246m│[0m            [31m╰─────────────[0m 无效函数参数
        [38;5;246m──╯[0m"
      `);
    }
  });
});
