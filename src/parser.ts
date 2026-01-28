import type {
  Expression,
  Identifier,
  SourceFile,
  Statement,
  VariableStatement,
} from './ast';
import { SyntaxKind } from './ast';
import { createScanner } from './scanner';

export function createParser(text: string) {
  const scanner = createScanner(text);
  let token: SyntaxKind;

  return {
    parseSourceFile,
  };

  function curToken() {
    return token;
  }

  function nextToken() {
    return (token = scanner.scan());
  }

  function parseSourceFile(): SourceFile {
    nextToken();
    const statements: Statement[] = [];
    while (curToken() !== SyntaxKind.EndOfFileToken) {
      statements.push(parseStatement());
    }

    return {
      kind: SyntaxKind.SourceFile,
      pos: 0,
      end: scanner.getTextPos(),
      statements,
      text,
    };
  }

  function parseStatement(): Statement {
    switch (curToken()) {
      case SyntaxKind.LetKeyword:
        if (isLetDeclaration()) {
          return parseVariableStatement();
        }
        break;
    }
    return {
      kind: SyntaxKind.ExpressionStatement,
      pos: 0,
      end: 0,
      _statementBrand: undefined,
    };
  }

  function parseVariableStatement(): VariableStatement {
    const pos = scanner.getTokenPos();
    nextToken();

    if (curToken() !== SyntaxKind.Identifier) {
      throw new Error('let 语句必须绑定一个标识符');
    }
    const identifier = parseIdentifier();

    let initializer: Expression | undefined;
    if (curToken() === SyntaxKind.EqualsToken) {
      nextToken();
      initializer = parseExpression();
    }

    parseSemicolon();

    return {
      kind: SyntaxKind.VariableStatement,
      pos,
      end: scanner.getTokenPos(),
      declaration: {
        kind: SyntaxKind.VariableDeclaration,
        pos: identifier.pos,
        end: initializer ? initializer.end : identifier.end,
        name: identifier,
        initializer,
      },
      _statementBrand: null,
    };
  }

  function parseIdentifier(): Identifier {
    const pos = scanner.getTokenPos();
    const text = scanner.getTokenValue();
    nextToken();
    return {
      kind: SyntaxKind.Identifier,
      pos,
      end: scanner.getTokenPos(),
      text,
      _expressionBrand: null,
    };
  }

  function parseExpression(): Expression {
    const pos = scanner.getTokenPos();
    const text = scanner.getTokenValue();
    nextToken();
    // 暂时用 StringLiteral 表示
    return {
      kind: SyntaxKind.StringLiteral,
      pos,
      end: scanner.getTokenPos(),
      text,
      _expressionBrand: null,
    } as Expression;
  }

  function parseSemicolon() {
    if (curToken() !== SyntaxKind.SemicolonToken) {
      throw new Error('变量声明语句必须以分号结尾');
    }
    nextToken();
  }

  function lookAhead<T>(callback: () => T): T {
    return scanner.lookAhead(callback);
  }

  function isLetDeclaration(): boolean {
    return lookAhead(nextTokenIsBindingIdentifier);
  }

  function isBindingIdentifier(): boolean {
    return curToken() === SyntaxKind.Identifier;
  }

  function nextTokenIsBindingIdentifier(): boolean {
    nextToken();
    return isBindingIdentifier();
  }
}
