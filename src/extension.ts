import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { generateDevOpsReadme } from "./templates/devops-engineer";
import { generateSoftwareEngineerReadme } from "./templates/software-engineer";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "readme-template-generator.generateReadme",
    async (uri: vscode.Uri) => {
      if (uri && uri.fsPath) {
        const folderPath = uri.fsPath;
        const readmePath = path.join(folderPath, "README.md");

        if (fs.existsSync(readmePath)) {
          vscode.window.showErrorMessage(
            "README.md already exists in this folder."
          );
          return;
        }

        const templateChoice = await vscode.window.showQuickPick(
          ["DevOps Engineer", "Software Engineer"],
          { placeHolder: "Select a README template" }
        );

        if (!templateChoice) {
          return; // User cancelled the selection
        }

        let readmeContent: string;

        switch (templateChoice) {
          case "DevOps Engineer":
            readmeContent = generateDevOpsReadme();
            break;
          case "Software Engineer":
            readmeContent = generateSoftwareEngineerReadme();
            break;
          default:
            vscode.window.showErrorMessage("Invalid template choice.");
            return;
        }

        fs.writeFileSync(readmePath, readmeContent);
        vscode.window.showInformationMessage(
          `${templateChoice} README.md has been generated successfully!`
        );
      } else {
        vscode.window.showErrorMessage(
          "Please right-click on a folder to generate a README.md"
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
