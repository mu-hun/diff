# diff

[![CI](https://github.com/mu-hun/diff/actions/workflows/ci.yml/badge.svg)](https://github.com/mu-hun/diff/actions/workflows/ci.yml)

## 사용법

### API

[`src/index.ts`](src/index.ts) 의 API 명세입니다.

#### `generateDiff<T extends string | string[]>(original: T, modified: T): Data[]`

문자열 또는 문자열 배열을 비교할 수 있는 함수입니다. 첫번째 인자는 원본 텍스트가 오고, 두번째 인자는 수정된 텍스트를 넣고, 아래에서 설명할 `Data` 인터페이스를 반환합니다.

#### `Data`

```ts
interface Data {
  type: Type;
  content: string;
}
```

각 문자열을 비교한 결과를 담은 타입입니다. `type`은 Diff 상태를 담은 것으로, `Type` enum을 갖고 있습니다.

순서대로 `IDLE`는 수정하지 않았다, `DELETE`는 삭제 되었다. `ADD`는 추가되었다는 의미를 갖고 있습니다.

`content`의 경우 Diff 상태의 대상 문자열 정보를 갖고 있습니다.

```ts
[
  { type: Type.IDLE, content: 'a' },
  { type: Type.IDLE, content: 'b' },
  { type: Type.DELETE, content: 'c' },
  { type: Type.ADD, content: 'f' },
];
```

위 블럭의 경우 원래 문자열인 `abc` 에서 `c` 가 삭제되고 `f`가 들어왔다는 것을 알 수 있습니다.

### 레퍼런스 CLI 앱

```
yarn diff [원래 파일 경로] [수정한 파일 경로]
```

변경 사항을 라인 단위로 표시합니다. 추가는 초록 배경으로, 삭제는 빨간 배경으로 알려줍니다.

샘플 자료로 `samples/original.txt`, `samples/modefied.txt` 문서를 준비해뒀습니다.

