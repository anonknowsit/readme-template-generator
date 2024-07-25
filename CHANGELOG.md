# Changelog

All notable changes to the "readme-template-generator" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.3] - 2024-07-25

### Added

- Added an icon for the extension

## [0.0.2] - 2024-07-24

### Added

- Separated README templates into individual files for easier management:
  - Created a `templates` folder to store template files
  - Added `devops-engineer.ts` for DevOps engineer README template
  - Added `software-engineer.ts` for Software engineer README template
- Updated `extension.ts` to import and use the new template files

### Changed

- Refactored code structure for better maintainability
- Updated README generation logic to use the new template files

## [0.0.1] - 2024-07-24

### Added

- Initial release of the README Template Generator extension
- Implemented basic functionality to generate README.md files
- Added support for two template types: DevOps Engineer and Software Engineer
- Included right-click context menu option to generate README.md in selected folder
