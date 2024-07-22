import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

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

function generateDevOpsReadme(): string {
  return `<div align="center">

# Name		

<img src="https://api.dicebear.com/9.x/icons/svg?seed=Midnight&backgroundColor[]&icon=lightbulb" height="100" alt="avatar" />


[Overview](#📋-overview) •
[Quick Start](#🚀-quick-start) •
[Installation](#💻-installation) •
[Configuration](#⚙️-configuration) •
[Usage](#📘-usage) •
[Parameters](#📊-parameters) •
[Integration](#🔗-integration) •
[Troubleshooting](#🔍-troubleshooting)

</div>

---

## 📋 Overview

Provide a concise description and the primary use case. Highlight key features and benefits.

## 🚀 Quick Start

Get up and running with these simple steps:

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/tool-name.git

# Navigate to the tool directory
cd tool-name

# Run the tool
./tool_name --option value
\`\`\`

### ✅ Prerequisites

Before you begin, ensure you have met the following requirements:

- [ ] Dependency 1 (version X.Y.Z)
- [ ] Dependency 2 (version X.Y.Z)
- [ ] ...

## 💻 Installation

Follow these steps to install the tool:

\`\`\`bash
# Navigate to the tool directory
cd tool-name

# Run the installation script
./install.sh

# Verify installation
tool_name --version
\`\`\`

## ⚙️ Configuration

Key configuration elements:

### Configuration File (\`config.yaml\`)

| Option | Description | Default |
|--------|-------------|---------|
| \`option1\` | Description of option1 | \`default_value\` |
| \`option2\` | Description of option2 | \`default_value\` |

### Environment Variables

| Variable | Description |
|----------|-------------|
| \`TOOL_API_KEY\` | API key for external service integration |

## 📘 Usage

Here are some common usage scenarios:

### Basic Usage

\`\`\`bash
tool_name --input file.txt --output result.json
\`\`\`

### Advanced Usage

\`\`\`bash
tool_name --config custom_config.yaml --verbose
\`\`\`

## 📊 Parameters

| Parameter | Description | Default | Required |
|-----------|-------------|---------|----------|
| \`--input\`   | Input file path | - | Yes |
| \`--output\`  | Output file path | \`./output.txt\` | No |
| \`--verbose\` | Enable verbose logging | \`false\` | No |

## 🔗 Integration

Integrate with other tools:

### CI/CD Pipeline

Add the following step to your Jenkins/GitLab CI file:

\`\`\`yaml
stages:
  - devops_tool

run_devops_tool:
  stage: devops_tool
  script:
    - tool_name --input $CI_PROJECT_DIR/input.txt --output $CI_PROJECT_DIR/output.json
\`\`\`

### Terraform

Use the provided module in your Terraform scripts:

\`\`\`hcl
module "devops_tool" {
  source = "github.com/your-org/tool-name//terraform_module"
  
  input_file  = "path/to/input.txt"
  output_file = "path/to/output.json"
}
\`\`\`

## 🔍 Troubleshooting

Common issues and their solutions:

<details>
<summary><strong>Error: API key not found</strong></summary>

Ensure the \`TOOL_API_KEY\` environment variable is set:

\`\`\`bash
export TOOL_API_KEY=your_api_key_here
\`\`\`
</details>

<details>
<summary><strong>Error: Dependency not found</strong></summary>

Check that all prerequisites are installed and in your PATH:

\`\`\`bash
# Example for checking Python version
python --version

# Example for checking Node.js version
node --version
\`\`\`
</details>
`;
}

function generateSoftwareEngineerReadme(): string {
  return `<div align="center">
  
# Name

<img src="https://api.dicebear.com/9.x/icons/svg?seed=Midnight&backgroundColor[]&icon=lightbulb" height="100" alt="avatar" />

[Overview](#🎯-overview) •
[Features](#✨-features) •
[Getting Started](#🚀-getting-started) •
[Usage](#📘-usage) •
[API](#📚-api)

</div>

---

## 🎯 Overview

Provide a concise description of what your software project does and its main objectives. For example:

"This project is a web application that allows users to manage their tasks efficiently. It includes features such as task creation, categorization, and deadline reminders. The main objective is to help users stay organized and increase productivity."

## ✨ Features

- **Task Management**: Create, update, and delete tasks.
- **Categorization**: Organize tasks into categories for better management.
- **Reminders**: Set deadlines and receive notifications.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Works on both desktop and mobile devices.

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Git

### Installation

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/your-username/project-name.git
   cd project-name
   \`\`\`

2. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

## 📘 Usage

Provide examples of how to use your software:

\`\`\`javascript
const project = require("your-project");
project.awesomeFunction();
\`\`\`

For instance, if you want to create a new task, you can do the following:

\`\`\`
const TaskManager = require('your-project');

const taskManager = new TaskManager();
taskManager.createTask('Finish report', 'Work', '2024-07-25');
\`\`\`

## 📚 API

This section documents the main functions and classes of the API. Each function is described with its parameters, return values, and examples for clarity.

### \`createTask(title, category, dueDate)\`

Creates a new task with the specified details.

| Parameter  | Type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| \`title\`    | String | The title of the task.                        |
| \`category\` | String | The category under which the task falls.      |
| \`dueDate\`  | String | The due date of the task (YYYY-MM-DD format). |

**Returns**: An object representing the created task.

**Example**:

\`\`\`javascript
const TaskManager = require("your-project");

const taskManager = new TaskManager();
const newTask = taskManager.createTask("Finish report", "Work", "2024-07-25");
console.log(newTask);
\`\`\`

### \`deleteTask(taskId)\`

Deletes the task with the specified ID.

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| \`taskId\`  | String | The ID of the task to delete. |

**Returns**: A boolean indicating whether the deletion was successful.

**Example**:

\`\`\`javascript
const taskId = "12345";
const wasDeleted = taskManager.deleteTask(taskId);
console.log(wasDeleted ? "Task deleted successfully!" : "Task not found.");
\`\`\`

### \`getTask(taskId)\`

Retrieves the details of a specific task.

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| \`taskId\`  | String | The ID of the task to retrieve. |

**Returns**: An object containing the task details.

**Example**:

\`\`\`javascript
const allTasks = taskManager.listTasks();
console.log(allTasks);
\`\`\`
`;
}

export function deactivate() {}
