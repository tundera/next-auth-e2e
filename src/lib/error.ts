// Inspired by and adapted from the example code in this article by Kent C. Dodds
// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

// Example of using this function in a try/catch block with some async code
//
// async function main() {
//   try {
//     await runAsyncTask()
//   } catch (err) {
//     throw new Error(`Failed to run task: ${getErrorMessage(err)}`)
//   }
// }
