import { z } from "zod";

/**
 * エラーメッセージのカスタム
 */
export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.too_small: {
      if (issue.type === "string" && issue.minimum === 1) {
        return { message: "入力してください" };
      }
      return { message: `最低${issue.minimum}文字を入力してください。` };
    }
    case z.ZodIssueCode.too_big: {
      return { message: `${issue.maximum}文字以上は入力できません。` };
    }
    case z.ZodIssueCode.invalid_type: {
      if (issue.received === "null" || issue.received === "undefined") {
        return { message: "入力してください" };
      }
    }
    case z.ZodIssueCode.invalid_string: {
      if (issue.path[0] === "email") {
        return { message: "メールアドレスの形式で入力してください" };
      }
    }
    default: {
      return { message: ctx.defaultError };
    }
  }
};

/**
 * 独自のエラールール
 */
/** superRefineに渡すバリデーションメソッド */
type Refinement<Value> = (value: Value, ctx: z.RefinementCtx) => void;

export const passwordRule = ({
  message = "半角英数字8文字以上(記号最低1文字)を入力してください",
}: {
  message?: string;
} = {}): Refinement<string> => {
  return (value, ctx) => {
    if (!value) return;
    if (!/^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{8,}$/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      });
    }
  };
};
