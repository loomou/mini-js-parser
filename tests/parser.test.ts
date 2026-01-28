import { describe, it, expect } from 'vitest';
import { FunctionDeclaration, SyntaxKind, createParser } from '../src';

describe('Parser', () => {
  it('解析 let 语句', () => {
    const code = 'let a = 1;';
    const parser = createParser(code);
    const sourceFile = parser.parseSourceFile();

    expect(sourceFile.statements).toHaveLength(1);
    const statement = sourceFile.statements[0];
    expect(statement.kind).toBe(SyntaxKind.VariableStatement);
    const declaration = (statement as any).declaration;
    expect(declaration.kind).toBe(SyntaxKind.VariableDeclaration);
    expect(declaration.name.kind).toBe(SyntaxKind.Identifier);
    expect(declaration.name.text).toBe('a');
    // 暂时用 StringLiteral 表示
    expect(declaration.initializer?.kind).toBe(SyntaxKind.StringLiteral);
    expect(declaration.initializer?.text).toBe('1');
  });

  it('解析函数声明语句', () => {
    const code = 'function a() {}';
    const parser = createParser(code);
    const sourceFile = parser.parseSourceFile();

    expect(sourceFile.statements).toHaveLength(1);
    const functionDecl = sourceFile.statements[0] as FunctionDeclaration;
    expect(functionDecl.kind).toBe(SyntaxKind.FunctionDecl);
    expect(functionDecl.name.kind).toBe(SyntaxKind.Identifier);
    expect(functionDecl.name.text).toBe('a');
  });

  it('解析函数参数', () => {
    const code = 'function A(a, b) {}';
    const parser = createParser(code);
    const sourceFile = parser.parseSourceFile();

    expect(sourceFile.statements).toHaveLength(1);
    const functionDecl = sourceFile.statements[0] as FunctionDeclaration;
    expect(functionDecl.kind).toBe(SyntaxKind.FunctionDecl);
    expect(functionDecl.parameters).toHaveLength(2);
    expect(functionDecl.parameters[0].kind).toBe(SyntaxKind.ParameterDecl);
    expect(functionDecl.parameters[0].name.text).toBe('a');
    expect(functionDecl.parameters[1].kind).toBe(SyntaxKind.ParameterDecl);
    expect(functionDecl.parameters[1].name.text).toBe('b');
  });
});
