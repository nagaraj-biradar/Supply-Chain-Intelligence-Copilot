#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const configurationDir = path.join(projectRoot, "configuration");

const configFiles = {
  manifest: path.join(configurationDir, "manifest.json"),
  settings: path.join(configurationDir, "settings.json"),
  authentication: path.join(configurationDir, "authentication.json"),
};

const errors = [];
const warnings = [];

function exists(filePath) {
  return fs.existsSync(filePath);
}

function loadJson(filePath, label) {
  if (!exists(filePath)) {
    errors.push(`Missing ${label} file: ${filePath}`);
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    errors.push(`Invalid JSON in ${label} file (${filePath}): ${error.message}`);
    return null;
  }
}

function getAtPath(obj, dottedPath) {
  return dottedPath.split(".").reduce((current, part) => {
    if (current && Object.prototype.hasOwnProperty.call(current, part)) {
      return current[part];
    }
    return undefined;
  }, obj);
}

function requirePaths(obj, label, paths) {
  for (const dottedPath of paths) {
    const value = getAtPath(obj, dottedPath);
    if (value === undefined || value === null || value === "") {
      errors.push(`${label}: missing required field "${dottedPath}"`);
    }
  }
}

function warnIfPlaceholder(value, label) {
  if (typeof value === "string" && /^\$\{[A-Z0-9_]+\}$/.test(value)) {
    warnings.push(`${label} uses environment placeholder ${value}`);
  }
}

function validateManifest(manifestJson) {
  requirePaths(manifestJson, "manifest.json", [
    "manifest.copilotId",
    "manifest.name",
    "manifest.version",
    "manifest.authentication.provider",
  ]);
}

function validateSettings(settingsJson) {
  requirePaths(settingsJson, "settings.json", [
    "settings.copilot.name",
    "settings.nlp.confidenceThreshold",
    "settings.queryDefaults.maxRecords",
    "settings.security.authentication.provider",
  ]);
}

function validateAuthentication(authJson) {
  requirePaths(authJson, "authentication.json", [
    "authentication.providers",
    "authorization.rbac.roles",
  ]);

  const providers = getAtPath(authJson, "authentication.providers");
  if (!Array.isArray(providers) || providers.length === 0) {
    errors.push("authentication.json: authentication.providers must be a non-empty array");
    return;
  }

  const defaultProviders = providers.filter((provider) => provider && provider.default);
  if (defaultProviders.length === 0) {
    errors.push("authentication.json: no default provider set in authentication.providers");
  } else if (defaultProviders.length > 1) {
    errors.push("authentication.json: multiple default providers found in authentication.providers");
  }
}

function validateCrossReferences(manifestJson, settingsJson, authJson) {
  const manifestProvider = getAtPath(manifestJson, "manifest.authentication.provider");
  const settingsProvider = getAtPath(settingsJson, "settings.security.authentication.provider");
  const providers = getAtPath(authJson, "authentication.providers") || [];

  if (manifestProvider && settingsProvider && manifestProvider !== settingsProvider) {
    errors.push(
      `Provider mismatch: manifest.json uses "${manifestProvider}" but settings.json uses "${settingsProvider}"`
    );
  }

  if (manifestProvider) {
    const matchedProvider = providers.find((provider) => provider && provider.name === manifestProvider);
    if (!matchedProvider) {
      errors.push(`manifest.json provider "${manifestProvider}" is not present in authentication.json`);
    }
  }

  const defaultProvider = providers.find((provider) => provider && provider.default);
  if (defaultProvider && manifestProvider && defaultProvider.name !== manifestProvider) {
    warnings.push(
      `Default provider in authentication.json is "${defaultProvider.name}" while manifest.json uses "${manifestProvider}"`
    );
  }

  const authConfig = defaultProvider && defaultProvider.config ? defaultProvider.config : {};
  warnIfPlaceholder(authConfig.clientId, "authentication.providers[].config.clientId");
  warnIfPlaceholder(authConfig.clientSecret, "authentication.providers[].config.clientSecret");
}

function main() {
  const manifestJson = loadJson(configFiles.manifest, "manifest");
  const settingsJson = loadJson(configFiles.settings, "settings");
  const authJson = loadJson(configFiles.authentication, "authentication");

  if (manifestJson) {
    validateManifest(manifestJson);
  }
  if (settingsJson) {
    validateSettings(settingsJson);
  }
  if (authJson) {
    validateAuthentication(authJson);
  }

  if (manifestJson && settingsJson && authJson) {
    validateCrossReferences(manifestJson, settingsJson, authJson);
  }

  if (errors.length > 0) {
    console.error("Configuration validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    if (warnings.length > 0) {
      console.error("\nWarnings:");
      for (const warning of warnings) {
        console.error(`- ${warning}`);
      }
    }
    process.exitCode = 1;
    return;
  }

  console.log("Configuration validation passed.");
  if (warnings.length > 0) {
    console.log("\nWarnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }
}

main();
