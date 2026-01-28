export enum SyntaxKind {
  Unknown,
  EndOfFileToken,

  // Keywords
  FunctionKeyword, // function
  LetKeyword, // let
  IfKeyword, // if
  ElseKeyword, // else
  WhileKeyword, // while
  ForKeyword, // for
  InKeyword, // in
  ReturnKeyword, // return
  TrueKeyword, // true
  FalseKeyword, // false
  DeleteKeyword, // delete

  // Punctuation
  OpenBraceToken, // {
  CloseBraceToken, // }
  OpenParenToken, // (
  CloseParenToken, // )
  OpenBracketToken, // [
  CloseBracketToken, // ]
  SemicolonToken, // ;
  CommaToken, // ,
  DotToken, // .
  ColonToken, // :
  QuestionToken, // ?

  // Operators
  EqualsToken, // =
  PlusToken, // +
  MinusToken, // -
  AsteriskToken, // *
  SlashToken, // /
  PlusPlusToken, // ++
  MinusMinusToken, // --
  EqualsEqualsToken, // ==
  LessThanToken, // <
  LessThanEqualsToken, // <=
  GreaterThanToken, // >
  GreaterThanEqualsToken, // >=
}
