import * as path from 'path';

/**
 * Generates a bundle entry name from a file path relative to a context directory.
 * 
 * @param absolutePath - Absolute path to the worker/module file
 * @param contextDir - Context directory to compute relative path from
 * @returns A sanitized entry name suitable for use as a bundle filename
 */
export function generateEntryName(absolutePath: string, contextDir: string): string {
  let relativePath = path.relative(contextDir, absolutePath);
  
  // Handle cross-drive paths on Windows: path.relative() returns absolute path
  // when paths are on different drives (e.g., C: vs D:)
  if (path.isAbsolute(relativePath)) {
    // Strip drive letter (e.g., "D:" or "D:\") on Windows
    relativePath = relativePath.replace(/^[a-zA-Z]:[\\\/]?/, '');
  }
  
  return relativePath
    .replace(/\.[^/.]+$/, '')   // Remove extension
    .replace(/\\/g, '/')        // Normalize Windows slashes
    .replace(/^(\.\.\/)+/g, '') // Remove leading ../ segments
    .replace(/^\.\//, '')       // Remove leading ./
    .replace(/\//g, '-')        // Replace slashes with dashes
    .replace(/^\.+/, '');       // Remove any remaining leading dots
}
