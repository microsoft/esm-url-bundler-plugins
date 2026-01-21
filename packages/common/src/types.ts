/**
 * Information passed to the getOutputFileName callback.
 */
export interface OutputFileNameInfo {
  /** Full absolute path to the worker/module file */
  filePath: string;
  /** The auto-generated suggested name (without extension) */
  suggestedName: string;
}

/**
 * A raw match from the code scanner (before path resolution).
 */
export interface RawMatch {
  /** The URL string found (e.g., './worker.js?esm') */
  urlString: string;
  /** Start position in source code */
  start: number;
  /** End position in source code */
  end: number;
}

/**
 * A fully resolved match with file path and entry name.
 */
export interface EsmUrlMatch {
  /** Absolute path to the worker/module file */
  filePath: string;
  /** Generated entry name for the bundle */
  entryName: string;
  /** Original query string (e.g., '?esm' or '?esm&foo=1') */
  originalQuery: string;
  /** Start position in source code */
  start: number;
  /** End position in source code */
  end: number;
}
