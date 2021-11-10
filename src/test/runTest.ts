import { runTests } from "@vscode/test-electron"
import * as path from "path"

// Place the mock binary into PATH.
process.env.PATH = `${path.resolve(__dirname, "../../fixtures")}${path.delimiter}${process.env.PATH}`

// TODO: Cannot seem to get Windows to find the binary in the path.
if (process.platform === "win32") {
  process.env.CODER_BINARY = `sh ${path.resolve(__dirname, "../../fixtures")}/coder`
}

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../..")

    // The path to test runner
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, "./runner")

    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to run tests")
    process.exit(1)
  }
}

main()
