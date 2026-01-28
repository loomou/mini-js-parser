import { describe, it, expect } from 'vitest';
import { SyntaxKind, createScanner } from '../src';

describe('Scanner', () => {
  function scanAll(text: string) {
    const scanner = createScanner(text);
    const tokens: SyntaxKind[] = [];
    let token = scanner.scan();
    while (token !== SyntaxKind.EndOfFileToken) {
      tokens.push(token);
      token = scanner.scan();
    }
    return tokens;
  }

  it('关键字识别', () => {
    const tokens = scanAll(
      'else function let if while for in return true false delete',
    );
    expect(tokens).toEqual([
      SyntaxKind.ElseKeyword,
      SyntaxKind.FunctionKeyword,
      SyntaxKind.LetKeyword,
      SyntaxKind.IfKeyword,
      SyntaxKind.WhileKeyword,
      SyntaxKind.ForKeyword,
      SyntaxKind.InKeyword,
      SyntaxKind.ReturnKeyword,
      SyntaxKind.TrueKeyword,
      SyntaxKind.FalseKeyword,
      SyntaxKind.DeleteKeyword,
    ]);
  });

  it('标识符识别', () => {
    const scanner = createScanner('myVar _temp $val');

    expect(scanner.scan()).toBe(SyntaxKind.Identifier);
    expect(scanner.getTokenValue()).toBe('myVar');

    expect(scanner.scan()).toBe(SyntaxKind.Identifier);
    expect(scanner.getTokenValue()).toBe('_temp');

    expect(scanner.scan()).toBe(SyntaxKind.Identifier);
    expect(scanner.getTokenValue()).toBe('$val');
  });

  it('数字识别', () => {
    const scanner = createScanner('123 0 456');

    expect(scanner.scan()).toBe(SyntaxKind.NumericLiteral);
    expect(scanner.getTokenValue()).toBe('123');

    expect(scanner.scan()).toBe(SyntaxKind.NumericLiteral);
    expect(scanner.getTokenValue()).toBe('0');

    expect(scanner.scan()).toBe(SyntaxKind.NumericLiteral);
    expect(scanner.getTokenValue()).toBe('456');
  });

  it('数字识别-无效', () => {
    expect(() => {
      const scanner = createScanner('01');
      scanner.scan();
    }).toThrow(/Numeric literal cannot start with 0/);

    expect(() => {
      const scanner = createScanner('007');
      scanner.scan();
    }).toThrow(/Numeric literal cannot start with 0/);
  });

  it('字符串识别', () => {
    const scanner = createScanner('"hello" "world"');

    expect(scanner.scan()).toBe(SyntaxKind.StringLiteral);
    expect(scanner.getTokenValue()).toBe('hello');

    expect(scanner.scan()).toBe(SyntaxKind.StringLiteral);
    expect(scanner.getTokenValue()).toBe('world');
  });

  it('布尔值识别', () => {
    const tokens = scanAll('true false');
    expect(tokens).toEqual([SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword]);
  });

  it('运算符识别', () => {
    const text = '+ - * / = == < <= > >= { } ( ) [ ] . , ; : ?';
    const tokens = scanAll(text);
    expect(tokens).toEqual([
      SyntaxKind.PlusToken,
      SyntaxKind.MinusToken,
      SyntaxKind.AsteriskToken,
      SyntaxKind.SlashToken,
      SyntaxKind.EqualsToken,
      SyntaxKind.EqualsEqualsToken,
      SyntaxKind.LessThanToken,
      SyntaxKind.LessThanEqualsToken,
      SyntaxKind.GreaterThanToken,
      SyntaxKind.GreaterThanEqualsToken,
      SyntaxKind.OpenBraceToken,
      SyntaxKind.CloseBraceToken,
      SyntaxKind.OpenParenToken,
      SyntaxKind.CloseParenToken,
      SyntaxKind.OpenBracketToken,
      SyntaxKind.CloseBracketToken,
      SyntaxKind.DotToken,
      SyntaxKind.CommaToken,
      SyntaxKind.SemicolonToken,
      SyntaxKind.ColonToken,
      SyntaxKind.QuestionToken,
    ]);
  });

  it('语句识别', () => {
    const tokens = scanAll('  let    x  =  1  ;  ');
    expect(tokens).toEqual([
      SyntaxKind.LetKeyword,
      SyntaxKind.Identifier,
      SyntaxKind.EqualsToken,
      SyntaxKind.NumericLiteral,
      SyntaxKind.SemicolonToken,
    ]);
  });
});
