import { describe, it, expect } from 'vitest';
import { SyntaxKind, createParser } from '../src';

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
});
