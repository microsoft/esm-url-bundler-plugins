import * as fs from 'fs';
import * as path from 'path';

const root = path.resolve(__dirname, '..');
const rootLicense = fs.readFileSync(path.join(root, 'LICENSE'), 'utf8');

const publishedPackages = fs
  .readdirSync(path.join(root, 'packages'))
  .filter((dir) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'packages', dir, 'package.json'), 'utf8'));
    return !pkg.private;
  });

describe('published package metadata', () => {
  it.each(publishedPackages)('%s ships the root LICENSE and repository metadata', (dir) => {
    const packageDir = path.join(root, 'packages', dir);
    const pkg = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'));

    // License checkers (ClearlyDefined, VS Code's OSS license check) read LICENSE from the npm tarball.
    expect(fs.readFileSync(path.join(packageDir, 'LICENSE'), 'utf8')).toBe(rootLicense);
    expect(pkg.license).toBe('MIT');
    expect(pkg.repository).toEqual({
      type: 'git',
      url: 'git+https://github.com/microsoft/esm-url-bundler-plugins.git',
      directory: `packages/${dir}`,
    });
  });
});
