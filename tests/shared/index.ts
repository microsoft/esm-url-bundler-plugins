import * as path from 'path';

export * from './types';
export * from './fixtureLoader';
export * from './snapshotUtils';
export * from './testRunner';

/**
 * Information passed to the getOutputFileName callback.
 */
export interface OutputFileNameInfo {
  filePath: string;
  suggestedName: string;
}

/**
 * Converts a customOutputFileName strategy to an actual function.
 */
export function getOutputFileNameFunction(
  strategy: 'basename' | undefined
): ((info: OutputFileNameInfo) => string) | undefined {
  if (!strategy) return undefined;
  
  switch (strategy) {
    case 'basename':
      return ({ filePath }) => {
        // Extract just the filename without extension
        return path.basename(filePath).replace(/\.[^/.]+$/, '');
      };
    default:
      return undefined;
  }
}
